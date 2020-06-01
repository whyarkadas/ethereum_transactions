export const getColumnDefs = [
  {
    headerName: 'Block ID',
    sortable: true,
    filter: 'agNumberColumnFilter',
    field: 'block_id',
    //width: 100,
  },
  {
    headerName: 'From',
    sortable: true,
    filter: 'agTextColumnFilter',
    field: 'from',
    //width: 100,
  },
  {
    headerName: 'To',
    sortable: true,
    filter: 'agTextColumnFilter',
    field: 'to',
   //width: 100,
  }, 
  {
    headerName: 'Value',
    sortable: true,
    filter: 'agNumberColumnFilter',
    field: 'value',
    //width: 100,
  },
  {
    headerName: 'Date',
    sortable: true,
    filter: 'agNumberColumnFilter',
    field: 'date',
    //width: 100,
  },
];

export const defaultColDef = {
  //width: 100,
  resizable: true,
};  