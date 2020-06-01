import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { Header, Container } from 'semantic-ui-react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { defaultColDef, frameworkComponents, getColumnDefs } from './util/helpers';
import './Transactions.scss'

const Transactions = ({ transactions }) => {  
 
  const [gridApi, setGridApi] = useState({});
  
  return (
    <div className="Transactions">
      <Container>
        <React.Fragment>
          <Header>Ethereum Transactions</Header>
          <div className="ag-theme-balham" style={{ width: '100%', height: '475px' }}>
              <AgGridReact
              onGridReady={({ api }) => setGridApi(api)}
              rowData={transactions}
              columnDefs={getColumnDefs}
              defaultColDef={defaultColDef}
              rowSelection="single"
              headerHeight="50"
              rowHeight="40"
              />
          </div>
        </React.Fragment>
      </Container>
    </div>
  );  
}

export default Transactions;
