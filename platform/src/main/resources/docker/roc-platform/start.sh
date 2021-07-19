cd /home/git

chown -R git:git .ssh
chmod 700 .ssh
chmod -R 600 .ssh/*

/usr/sbin/sshd && java -jar /app/platform.jar