import { styled } from '@mui/material/styles';
import { useState } from 'react';
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

    const [jsonTransactions, setJsonTransactions] = useState(null);
    const [jsonString, setJsonString] = useState("");
    const [userHeaders, setUserHeaders] = useState([]);
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
            //setJsonTransactions(jsonResult);

            setJsonString(JSON.stringify(jsonResult, null, 2))
        };
        reader.readAsText(file);
    }

    return (
        <div>
            <Button
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description key</TableCell>
                            <TableCell align="right">Date key</TableCell>
                            <TableCell align="right">Amount setDateKey</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <ImportHeaderKeySelect setKey={setDescKey} headers={userHeaders}></ImportHeaderKeySelect>
                            </TableCell>
                            <TableCell align="right">Date key</TableCell>
                            <TableCell align="right">Amount setDateKey</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}