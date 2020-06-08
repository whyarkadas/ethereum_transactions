import React, { useState, useEffect } from 'react';
import Transactions from "./Transactions";
import { fetchAllTransactions } from '../api/transactions';
import { withCookies } from 'react-cookie';
import ActionCable from "action-cable-react-jwt";
import { render } from 'react-dom';

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			allTransactions:[]			
		}
	}
	//const [allTransactions, setAllTransactions] = useState([]);

	componentDidMount(){
		this.fetchTransactions();
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable", localStorage.getItem("token"));
    
    this.sub = cable.subscriptions.create({ channel: 'TransactionsChannel' }, {
      received: this.receiveTransactionData
    });
	}

	receiveTransactionData = (data) => {
		this.setState({ allTransactions: [...allTransactions, data.transaction] })
  };

	fetchTransactions = () => {
		fetchAllTransactions().then(allTransactionsData => {
			 //setAllTransactions(allTransactionsData);        
			 this.setState({ allTransactions: allTransactionsData })
		});
	};

	render() {
		const { allTransactions } = this.state
		return(
			<div> 
				<Transactions transactions={allTransactions.transactions} />
			</div>
		);
	};
};

export default withCookies(Home);