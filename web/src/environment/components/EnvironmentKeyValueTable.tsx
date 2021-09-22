import * as React from 'react';
import {DataGrid, GridColDef, GridDensityTypes} from '@material-ui/data-grid';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 125},
    {
        field: 'key',
        headerName: 'Key',
        width: 250,
        editable: true,
    },
    {
        field: 'value',
        headerName: 'Value',
        width: 250,
        sortable: false,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description (Optional)',
        width: 500,
        sortable: false,
        editable: true,
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

export default function EnvironmentKeyValueTable() {
    return (
        <div style={{height: 500, width: '100%', backgroundColor: "#fff"}}>
            <DataGrid
                style={{fontFamily: "monospace"}}
                density={GridDensityTypes.Standard}
                rows={rows}
                columns={columns}
                pageSize={25}
                disableSelectionOnClick
            />
        </div>
    );
}