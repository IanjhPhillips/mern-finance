import axios from 'axios';
import { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DBTransactionCategorySelect from './DBTransactionCategorySelect';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TransactionRow({item, setTransactions}) {

    const [transaction, setTransaction] = useState(item);

    const handleDelete = async () => {
        let id = transaction._id;
        let route = `http://localhost:8081/transaction/${id}`;
        await axios.delete(route)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                setTransactions((prevRows) => prevRows.filter((row) => row._id !== id));
            }
        })
        .catch((err) => {
            console.log(err.response.data)
        });

    }    

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <DBTransactionCategorySelect transaction={transaction}></DBTransactionCategorySelect>
            </TableCell>
            <TableCell align="right">{transaction.description}</TableCell>
            <TableCell align="right">{transaction.date}</TableCell>
            <TableCell align="right">{transaction.amount}</TableCell>
            <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => handleDelete(transaction._id)} // Pass the row's unique ID to the handler
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
        </TableRow>
    );
}