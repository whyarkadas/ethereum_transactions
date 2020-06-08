import React, { useState, useEffect, useForceUpdate} from 'react';
import { Label } from 'semantic-ui-react';
import { Header, Container } from 'semantic-ui-react';
import { Button, Modal, Form } from 'semantic-ui-react';
import './Transaction.scss'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Comments from './Comments'
import { fetchComments, sendComment } from '../api/comments';


class Transaction extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      commentList: [],
    }
  }
  //const [commentList, setCommentList] = useState();
/*
  componentDidMount() {
    this.setState({ commentList: this.props.comments });
    //this.getSelectedRowComments(this.props.transaction.transaction_id);
  } */

  render () {
    const {open, onClose, transaction, comments, saveComment } = this.props
    //const { commentList } = this.state

    return(
      <div className="Transaction">
        <Modal open={open} centered={true} size={"small"}>        
          <Modal.Header>
            Transaction Details {transaction.transaction_id}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Label>
                Block Id: {transaction.block_id}           
              </Label>
              <Label>
                From : {transaction.from}           
              </Label>
              <Label>
                To : {transaction.to}           
              </Label>
              <Label>
                Value : {transaction.value}           
              </Label>
              <Label>
                Date : {transaction.date}           
              </Label>
            </Modal.Description>
          </Modal.Content>
          <Modal.Content>         
            <Comments comments={comments} saveComment={saveComment} />      
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onClick={onClose}
              content="Close"
            />          
          </Modal.Actions>        
        </Modal>                
      </div>
    );
  }
}

export default Transaction
