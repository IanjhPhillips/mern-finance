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
import { date, months, years, getMonthLength } from '../utils/DateUtils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Transactions() {

  console.log("rendering transactions");
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(months[date.getMonth()]);
  
  console.log(`======${year} ${month}==========`)

  const handleMonth = (e) => {
    let newMonth = e.target.value;
    console.log(`month filter set to ${newMonth}`);
    setMonth(newMonth);
  }

  const handleYear = (e) => {
    let newYear = e.target.value;
    console.log(`yearFilter set to ${newYear}`);
    setYear(newYear);
  }

  const getTransactions = () => {
    console.log("get transactions called")

    let monthIndex = months.indexOf(month);
    let monthLength = getMonthLength(month, year);
    console.log(`monthLength for ${month} ${year}: ${monthLength}`);
    let startDate = new Date(year, monthIndex, 1, 0,0,0,0);
    let endDate = new Date(year, monthIndex, monthLength, 23, 59, 59, 999);

    axios.get('http://localhost:8081/transaction',
      {
        params: {
          start: startDate,
          end: endDate
        }
      })
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
  }

  useEffect(() => {
    console.log("use effect");
    getTransactions();
  }, [year, month]);

  if (loading) {
    return;
  }

  if (error) {
    return <p>Error: {error.response.data}</p>;
  }

  return (
    <div>
      <TransactionForm yearFilter={year} setYearFilter={setYear} monthFilter={month} setMonthFilter={setMonth} transactions={transactions} setTransactions={setTransactions} refreshTable={getTransactions}></TransactionForm>
      
      <TableContainer component={Paper}>
        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 2 }}>
          <div>
            
          </div>
        </Box> */}
        <div>
        <FormControl sx={{ m: 1, width: '25ch' }}>
          <InputLabel id={"year-label"}>Year Filter</InputLabel>
          <Select
            labelId="year-label"
            id="year"
            value={year}
            label="Year Filter"
            onChange={handleYear}
          >
            {years.map((y) => (
              <MenuItem
                key={y}
                value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }}>
          <InputLabel id={"month-label"}>Month Filter</InputLabel>
          <Select
            labelId="month-label"
            id="month"
            value={month}
            label="Month Filter"
            onChange={handleMonth}
          >
            {months.map((y) => (
              <MenuItem
                key={y}
                value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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
}

export default Transactions;