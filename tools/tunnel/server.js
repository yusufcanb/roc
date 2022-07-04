const websocket = require("ws")
const redis = require("redis")

// Configuration: adapt to your environment
const REDIS_SERVER = process.env.REDIS_URL || "redis://localhost:6379";

const TUNNEL_HOST = process.env.TUNNEL_HOST || "0.0.0.0"
const TUNNEL_PORT = parseInt(process.env.TUNNEL_PORT) || 5000;

// Connect to Redis and subscribe to "app:notifications" channel
var redisClient = redis.createClient({
    url: REDIS_SERVER
})

// Create & Start the WebSocket server
const server = new websocket.Server({ host: TUNNEL_HOST, port: TUNNEL_PORT });

// Register event for client connection
server.on('connection', async (ws) => {
    console.log("connected")

    // new redis connection for each websocket connection
    const subscriber = redisClient.duplicate();
    await subscriber.connect();

    await subscriber.pSubscribe('*', (message, channel) => {
        console.log(`New event received -> ${channel}::${message}`)
        ws.send(`${channel}::${message}`);
    });

});

console.log(`WS Tunnel started at ws://${TUNNEL_HOST}:${TUNNEL_PORT}`);