import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

    function csvToJson(csvContent) {
        const rows = csvContent.trim().split(/\r?\n/);
        const headers = rows[0].split(',').map(header => header.trim());
        return rows.slice(1).map(row => {
            const values = row.split(',').map(value => value.trim());
            // Create object: { header1: value1, header2: value2, ... }
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index] || ''; // Handle missing values
                return obj;
            }, {});
        });
    }

    let handleUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvContent = e.target.result;
            const jsonResult = csvToJson(csvContent);
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
            <pre>{jsonString}</pre>
        </div>
    );
}