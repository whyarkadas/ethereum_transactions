import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import { Header, Container } from 'semantic-ui-react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { defaultColDef, frameworkComponents, getColumnDefs } from './util/helpers';
import './Transactions.scss'
import Transaction from './Transaction'
import { isEmpty } from 'lodash';
import { fetchComments, sendComment } from '../api/comments';
import { withCookies } from 'react-cookie';

//const Transactions = ({ transactions }) => { 
class Transactions extends React.Component { 
  /*const [gridApi, setGridApi] = useState({});
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [selectedRowComments, setSelectedRowComments] = useState([]);
  */
  constructor(props) {
    super(props)
    const { cookies } = props;
    this.state = {
      open: false,
      gridApi: {},
      rowId: 0,
      selectedRowData: {},
      //selectedRowComments:[]
      userId: cookies.get('userId') || -1,
    }
  }

  onSelectionChanged = () => {    
    const selectedRow = this.state.gridApi.getSelectedRows();
    if (isEmpty(selectedRow)) return;    
    this.getSelectedRowComments(selectedRow)
    /*this.setState({
      selectedRowData: selectedRow[0],
      rowId: selectedRow[0].transaction_id,
      open: true,
    })*/
  }

  
  getSelectedRowComments = (selectedRow) => {
    fetchComments(selectedRow[0].transaction_id)
    .then(data => {
        this.setState({
          selectedRowComments : data.comments,
          selectedRowData: selectedRow[0],
          rowId: selectedRow[0].transaction_id,
          open: true,
        });
      }
    );
  }

  saveComment = (commentText) => {
    //const { transaction } = this.props
    const { rowId, userId, selectedRowComments } = this.state
    sendComment(commentText, userId, rowId).then(
      data => {
        this.setState({ selectedRowComments: [...selectedRowComments, data.comment]})        
      }
    )
  };

  onClose = () => {
    this.setState({ open: false });
  };
  
  render() {
    const { transactions } = this.props
    const { open, selectedRowData, selectedRowComments } = this.state
    return (
      <div className="Transactions">
        <Container>
          <React.Fragment>
            <Header>Ethereum Transactions</Header>
            <div className="ag-theme-balham" style={{ width: '100%', height: '80vh' }}>
                <AgGridReact
                onGridReady={({ api }) => (this.setState({ gridApi: api })) }
                rowData={transactions}
                columnDefs={getColumnDefs}
                defaultColDef={defaultColDef}
                rowSelection="single"
                paginationAutoPageSize={true}
                pagination={true}
                headerHeight="50"
                rowHeight="40"
                //onRowClick={rowClick}
                onSelectionChanged={this.onSelectionChanged}
                />              
            </div>         
          </React.Fragment>
          <Transaction          
                //onSave={onSaveRouteOptionType}
                open={open}
                onClose={this.onClose}
                transaction={selectedRowData}
                comments={selectedRowComments}
                saveComment={this.saveComment}
              />      
        </Container>
      
      </div>
    ); 
  } 
}

export default withCookies(Transactions);
