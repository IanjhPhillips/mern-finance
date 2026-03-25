import axios from 'axios';
import { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import range from '../utils/Range';
import { date, years, months, getMonthLength} from '../utils/DateUtils';

function TransactionForm({ yearFilter, setYearFilter, monthFilter, setMonthFilter, refreshTable }) {

    

    const emptyTransaction = {
        "category": "",
        "description": "",
        "amount": 0.0
    }


    const [category, setCategory] = useState(emptyTransaction.category);
    const [description, setDescription] = useState(emptyTransaction.description);
    const [amount, setAmount] = useState(emptyTransaction.amount);
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(months[date.getMonth()]);
    const [day, setDay] = useState(date.getDay());
    const [days, setDays] = useState(range(1, getMonthLength(month, year)));

    function validateMonth (m, y) {
        let monthLength = getMonthLength(m, y);

        if (day > monthLength) {
            setDay(1);
        }

        setDays(range(1, monthLength));
    }

    const handleMonth = (e) => {
        console.log(`Month: ${e.target.value}`);
        let newMonth = e.target.value;
        setMonth(newMonth);
        validateMonth(newMonth, year);
    }

    const handleYear = (e) => {
        console.log(`Year: ${e.target.value}`);
        setYear(e.target.value);
        validateMonth(month, e.target.value);
    }

    const handleDay = (e) => {
        console.log(`Day: ${e.target.value}`);
        setDay(e.target.value);
    }

    const handleSubmit = async () => {

        let date = new Date(year, months.indexOf(month), day, 0, 0, 0, 0);
        console.log(date);
        // post
        axios.post('http://localhost:8081/transaction', {
            category: category,
            description: description,
            amount: amount,
            date: date
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log("response:");
                    console.log(response.data);

                    let stateChanged = false;

                    if (year != yearFilter) {
                        setYearFilter(year);
                        stateChanged = true;
                    }

                    if (month != monthFilter) {
                        setMonthFilter(month);
                        stateChanged = true;
                    }

                    if (!stateChanged) {
                        console.log("Form calling refresh table callback!");
                        refreshTable();
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            });


        // cleanup
        setCategory(emptyTransaction.category);
        setAmount(emptyTransaction.amount);
        setDescription(emptyTransaction.description);
    }

    return (
        <form>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 2 }}>
                <div>
                    <FormControl sx={{ m: 1, width: '30ch' }}>
                        <InputLabel id={"category-label"}>Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={(event) => {
                                setCategory(event.target.value);
                            }}
                        >
                            <MenuItem value={"Bills"}>Bills</MenuItem>
                            <MenuItem value={"Groceries"}>Groceries</MenuItem>
                            <MenuItem value={"Home Supplies"}>Home Supplies</MenuItem>
                            <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ m: 1, width: '30ch' }}
                        id="description-field"
                        label="Description"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                    <FormControl sx={{ m: 1, width: '30ch' }}>
                        <InputLabel htmlFor="amount-field">Amount</InputLabel>
                        <OutlinedInput
                            id="amount-field"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                            value={amount}
                            onChange={(event) => {
                                setAmount(event.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id={"year-label"}>Year</InputLabel>
                        <Select
                            labelId="year-label"
                            id="year"
                            value={year}
                            label="Year"
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
                        <InputLabel id={"month-label"}>Month</InputLabel>
                        <Select
                            labelId="month-label"
                            id="month"
                            value={month}
                            label="Month"
                            onChange={handleMonth}
                        >
                            {months.map((y) => (
                                <MenuItem
                                    key={y}
                                    value={y}>{y}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
                        <InputLabel id={"day-label"}>Day</InputLabel>
                        <Select
                            labelId="day-label"
                            id="day"
                            value={day}
                            label="Day"
                            onChange={handleDay}
                        >
                            {days.map((y) => (
                                <MenuItem
                                    key={y}
                                    value={y}>{y}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        sx={{ m: 1, width: '25ch', height: '7ch' }}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </Box>
        </form >
    );
}

export default TransactionForm;