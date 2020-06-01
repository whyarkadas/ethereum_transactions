import React, { useState, useEffect } from 'react';
import Transactions from "./Transactions";
import { fetchAllTransactions } from '../api/transactions';

const Home = () => {
	const transactions= [{from: "Toyota", to: "Celica", value: 35000, blockId:1},
											{from: "Mehmet", to: "Ahmet", value: 36000, blockId:2},
											{from: "Engin", to: "Soner", value: 37000, blockId:3}];

	
	const [allTransactions, setAllTransactions] = useState([]);

	const fetchTransactions = () => {
		fetchAllTransactions().then(allTransactionsData => {
			setAllTransactions(allTransactionsData);        
		});
	};

	useEffect(() => {
		fetchTransactions();
    }, [])

	return(
		<div> 
			<Transactions transactions={allTransactions} />
		</div>
   );
};

export default Home;