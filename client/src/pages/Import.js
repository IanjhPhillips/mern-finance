import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TransactionRow from '../components/TransactionRow';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImportHeaderKeySelect from '../components/ImportHeaderKeySelect';
import { date } from '../utils/DateUtils';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload() {

    const navigate = useNavigate();

    const [jsonTransactions, setJsonTransactions] = useState(null);
    const [jsonString, setJsonString] = useState("");
    const [userHeaders, setUserHeaders] = useState([""]);
    const [descKey, setDescKey] = useState("");
    const [dateKey, setDateKey] = useState("");
    const [amountKey, setAmountKey] = useState("")

    function csvToJson(csvContent) {
        const rows = csvContent.trim().split(/\r?\n/);
        const headers = rows[0].split(',').map(header => header.trim());
        const result = rows.slice(1).map(row => {
            const values = row.split(',').map(value => value.trim());
            // Create object: { header1: value1, header2: value2, ... }
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index] || ''; // Handle missing values
                return obj;
            }, {});
        });

        return [headers, result];
    }

    let handleUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvContent = e.target.result;
            const [headers, jsonResult] = csvToJson(csvContent);

            console.log(`user headers: ${headers}`);
            console.log(`json result:\n${JSON.stringify(jsonResult)}`);

            setUserHeaders(headers);
            setJsonTransactions(jsonResult);

            setJsonString(JSON.stringify(jsonResult, null, 2))
        };
        reader.readAsText(file);
    }

    let handleClear = () => {
        setAmountKey("");
        setDateKey("");
        setDescKey("");
        setUserHeaders([""]);
        setJsonString("");
    }

    let handleSubmit = () => {
        const results = jsonTransactions.map(t => {
            return {
                "description": t[descKey],
                "date": new Date(t[dateKey]),
                "amount": t[amountKey]
            };
        });

        console.log("import submit!");
        console.log(results);
        navigate("/transactions");

        // axios.post('http://localhost:8081/transaction', {
        //     category: category,
        //     description: description,
        //     amount: parseAmount,
        //     date: date
        // })
    }

    let canSubmit = () => {
        const allAssigned = amountKey != "" && dateKey != "" && descKey != "";
        let validDate = false;
        if (!!jsonTransactions) {
            validDate = !isNaN(Date.parse(jsonTransactions[0][dateKey]))
        }
        return allAssigned && validDate;
    }

    let noKeysSelected = () => {
        return amountKey == "" && dateKey == "" && descKey == ""; 
    }

    console.log("rendering import page...");

    return (
        <div>
            <Button
                sx={{ m: 1 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    accept=".csv"
                    onChange={handleUpload}
                    multiple
                />
            </Button>
            <Button
                sx={{ m: 1 }}
                variant="outlined"
                onClick={handleClear}>Clear</Button>
            <Button
                sx={{ m: 1 }}
                variant="contained"
                color="success"
                onClick={handleSubmit}
                disabled={!canSubmit()}>
                Submit
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <ImportHeaderKeySelect setKey={setDescKey} headers={userHeaders} value={descKey}></ImportHeaderKeySelect>
                            </TableCell>
                            <TableCell>
                                <ImportHeaderKeySelect setKey={setDateKey} headers={userHeaders} value={dateKey}></ImportHeaderKeySelect>
                            </TableCell>
                            <TableCell>
                                <ImportHeaderKeySelect setKey={setAmountKey} headers={userHeaders} value={amountKey}></ImportHeaderKeySelect>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!jsonTransactions || noKeysSelected() ? (<TableRow />) : jsonTransactions.map((transaction, i) => (
                            <TableRow key={i}>
                                <TableCell>{transaction[descKey]}</TableCell>
                                <TableCell>{transaction[dateKey]}</TableCell>
                                <TableCell>{transaction[amountKey]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}