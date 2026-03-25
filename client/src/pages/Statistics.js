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

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>Error: {error.response.data}</p>;
    }


    return (
        <h1>Statistics</h1>
    )
}

export default Statistics;