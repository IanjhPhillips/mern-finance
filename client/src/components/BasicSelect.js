import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ transaction }) {

  const transactionCategory = transaction.category ?? "";

  const [category, setCategory] = React.useState(transactionCategory);

  const patch = async (event) => {
    let id = transaction._id;
    let route = `http://localhost:8081/transaction/${id}`;
    axios.put(route, {category: event.target.value})
    .then((response) => {
      console.log(response.data);
      setCategory(response.data.category);
    })
    .catch((error) => {
      console.log(`AXIOS Error: ${error.response.data}`)
    });
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={patch}
        >
           <MenuItem value={"Bills"}>Bills</MenuItem>
           <MenuItem value={"Groceries"}>Groceries</MenuItem>
           <MenuItem value={"Home Supplies"}>Home Supplies</MenuItem>
           <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
           <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}