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

function Statistics() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(months[date.getMonth()]);
    const [stats, setStats] = useState([]);

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


    const getStatistics = () => {
        console.log("get statistics called")

        let monthIndex = months.indexOf(month);
        let monthLength = getMonthLength(month, year);
        console.log(`monthLength for ${month} ${year}: ${monthLength}`);
        let startDate = new Date(year, monthIndex, 1, 0, 0, 0, 0);
        let endDate = new Date(year, monthIndex, monthLength, 23, 59, 59, 999);

        axios.get('http://localhost:8081/statistics',
            {
                params: {
                    start: startDate,
                    end: endDate
                }
            })
            .then((response) => {
                setStats(response.data);
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
        getStatistics();
    }, [year, month]);
    
    if (error) {
        return <p>Error: {error.response.data}</p>;
    }


    return (
        <div>

            <TableContainer component={Paper} sx={{ minWidth: 150, maxWidth: 500 }} >
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
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stats.map((item) => (
                            <TableRow
                                key={item._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {(item._id) ? (item._id) : "Uncategorized"}
                                </TableCell>
                                <TableCell align="right">{item.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Statistics;