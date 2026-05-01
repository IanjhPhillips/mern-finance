import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import categories from '../utils/Categories';

//transaction: object with ._id
export default function ImportHeaderKeySelect({ setKey, headers, value }) {


    let handleChange = (event) => {
        setKey(event.target.value);
    }

    console.log("rendering hydrated key select");
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id={"key-label"}>Key</InputLabel>
                <Select
                    labelId="key-label"
                    id="key"
                    value={value}
                    label="Key"
                    onChange={handleChange}
                >
                    {headers.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box >
    );


    console.log("rendering dry key select");
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id={"key-label"}>Key</InputLabel>
                <Select
                    labelId="key-label"
                    id="key"
                    value={value}
                    label="Key"
                    disabled
                    onChange={handleChange}
                >
                </Select>
            </FormControl>
        </Box >
    );
}