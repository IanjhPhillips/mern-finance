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

function TransactionForm({ transactions, setTransactions }) {

    const emptyTransaction = {
        "category": "",
        "description": "",
        "amount": 0.0
    }

    const [category, setCategory] = useState(emptyTransaction.category);
    const [description, setDescription] = useState(emptyTransaction.description);
    const [amount, setAmount] = useState(emptyTransaction.amount);

    const handleSubmit = async () => {

        // post
        axios.post('http://localhost:8081/transaction', {
            category: category,
            description: description,
            amount: amount,
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log("response:");
                    console.log(response.data);
                    setTransactions([...transactions, response.data]);
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                    <FormControl sx={{ m: 1, width: '25ch' }}>
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
                    sx={{ m: 1, width: '25ch' }}
                    id="description-field"
                    label="Description"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                />
                <FormControl sx={{ m: 1, width: '25ch' }}>
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