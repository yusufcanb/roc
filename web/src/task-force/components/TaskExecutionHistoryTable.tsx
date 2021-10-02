import * as React from 'react';
import {DataGrid, GridColDef, GridDensityTypes} from '@material-ui/data-grid';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 125},
    {
        field: 'key',
        headerName: 'Key',
        width: 250,
        editable: false,
        sortable: false
    },
    {
        field: 'value',
        headerName: 'Value',
        width: 250,
        sortable: false,
        editable: false,
    },
    {
        field: 'description',
        headerName: 'Description (Optional)',
        width: 500,
        sortable: false,
        editable: false,
    }
];

const rows = [
    {id: 1, key: 'MYSQL_VERSION', value: 'Jon', description: 35},
    {id: 2, key: 'DB_HOST', value: 'Cersei', description: 42},
    {id: 3, key: 'DB_PORT', value: 'Jaime', description: 45},
    {id: 4, key: 'DB_PORT', value: 'Jaime', description: 45},
    {id: 5, key: 'DB_PORT', value: 'Jaime', description: 45},
    {id: 6, key: 'DB_PORT', value: 'Jaime', description: 45},
    {id: 7, key: 'DB_PORT', value: 'Jaime', description: 45},
    {id: 8, key: 'DB_PORT', value: 'Jaime', description: 45},
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 500,
            width: '100%',
            backgroundColor: '#fff',
            margin: 0,
            padding: 0
        },
        grid: {fontFamily: "monospace", border: "none"}
    }),
);

export default function TaskExecutionHistoryTable() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <DataGrid
                className={classes.grid}
                density={GridDensityTypes.Compact}
                rows={rows}
                columns={columns}
                pageSize={25}
                disableSelectionOnClick
            />
        </div>
    );
}