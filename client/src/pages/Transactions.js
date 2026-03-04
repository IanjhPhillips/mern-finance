import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TransactionRow from '../components/TransactionRow';
import TransactionForm from '../components/TransactionForm';
// import Box from '@mui/material/Box';
// import { date, years, months } from '../utils/DateUtils';

function Transactions() {

  const [transactions, setTransactions] = useState([]);
  // const [yearFilter, setYearFilter] = useState(date.getFullYear());
  // const [monthFilter, setMonthFilter] = useState(date.getMonth());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("get")
    axios.get('http://localhost:8081/transaction')
    .then((response) => {
      setTransactions(response.data);
      setLoading(false);
      console.log(response);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
      console.log(`AXIOS Error: ${error.response.data}`)
    })
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.response.data}</p>;
  }

  return (
  <div>
    <TransactionForm transactions={transactions} setTransactions={setTransactions}></TransactionForm>

    <TableContainer component={Paper}>
        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 2 }}>
          <div>
            
          </div>
        </Box> */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions.map((item) => (
                  <TransactionRow 
                  key={item._id} 
                  item={item} 
                  setTransactions={setTransactions}></TransactionRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  </div>
  );

  //data will be the string we send from our server
  const get = () => {
    console.log("get")
    axios.get('http://localhost:8081/transaction')
    .then((response) => {
      setTransactions(response.data);
      console.log(response)
    })
    .catch((error) => {
      console.log(`AXIOS Error: ${error.response.data}`)
    })
  }
  


  const patch = async () => {
    console.log("put")
    if (!transactions?.length) {
      console.log("no transactions!");
      return;
    }
    else {
      console.log(transactions)
    }
    let id = transactions[0]._id;
    console.log(`patching transaction with id: ${id}`);
    let route = `http://localhost:8081/transaction/${id}`;
    console.log(route);
    //axios.patch(route, 
    await fetch(route, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        description: "New desc",
        amount: 69
      })
    })
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      console.log(`AXIOS Error: ${error.response.data}`)
    });
  }
  
  const del = async () => {

    console.log("del")
    if (!transactions?.length) {
      console.log("no transactions!");
      return;
    }
    else {
      console.log(transactions);
    }
    let id = transactions[0]._id;
    console.log(`deleting transaction with id: ${id}`);
    let route = `http://localhost:8081/transaction/${id}`;
    console.log(route);
    //axios.delete(route)
    await fetch(route, {
      method: "DELETE"
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(`Fetch Error: ${error.response.data}`)
    })
  }

  return 
}

export default Transactions;