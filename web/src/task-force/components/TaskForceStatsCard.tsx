import React, {FunctionComponent, PropsWithChildren} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';

const data = [
    {
        month: '2015.01',
        success: 12,
        failed: 3,
        canceled: 0,
    },
    {
        month: '2015.02',
        success: 2,
        failed: 23,
        canceled: 10,
    },
    {
        month: '2015.03',
        success: 2000,
        failed: 9800,
        canceled: 2290,
    },
    {
        month: '2015.04',
        success: 2780,
        failed: 3908,
        canceled: 2000,
    },
    {
        month: '2015.05',
        success: 1890,
        failed: 4800,
        canceled: 2181,
    }
];


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: "100%"
    },
    title: {
        fontSize: 12,
    },
    pos: {
        marginBottom: 12,
    },
});

const toPercent = (decimal: number, fixed: number = 0) => `${(decimal * 100).toFixed(fixed)}%`;
const getPercent = (value: number, total: number) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any) => {
    const {payload, label} = o;
    const total = payload.reduce((result: any, entry: any) => result + entry.value, 0);

    return (
        <div className="customized-tooltip-content">
            <p className="total">{`${label} (Total: ${total})`}</p>
            <ul className="list">
                {payload.map((entry: any, index: any) => (
                    <li key={`item-${index}`} style={{color: entry.color}}>
                        {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

interface TaskForceStatsCardProps {
    name: string;
    width?: number;
    height?: number;
}

const TaskForceStatsCard: FunctionComponent<TaskForceStatsCardProps> = (props: PropsWithChildren<TaskForceStatsCardProps>) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Task Force Timeline
                </Typography>
                <AreaChart
                    style={{fontFamily: "monospace", fontSize: 12}}
                    width={1200}
                    height={175}
                    data={data}
                    stackOffset={"expand"}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis tickFormatter={(value: any, index: any) => toPercent(value)}/>
                    <Tooltip content={renderTooltipContent}/>
                    <Area type="monotone" dataKey="success" stackId="1" stroke="#007E33" fill="#53a653"/>
                    <Area type="monotone" dataKey="failed" stackId="1" stroke="#cc0000" fill="#ff4444"/>
                    <Area type="monotone" dataKey="canceled" stackId="1" stroke="#d3d3d3" fill="#ffc107"/>
                </AreaChart>
            </CardContent>
        </Card>
    );
}

export default TaskForceStatsCard;