import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("get")
    axios.get('http://localhost:8081/transaction')
    .then((response) => {
      setTransactions(response.data);
      setLoading(false);
      console.log(response);
    })
    .catch((error) => {
      setError(error);
      setLoading(false);
      console.log(`AXIOS Error: ${error.response.data}`)
    })
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.response.data}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(item => (
          <tr key={item._id}>
            <td>{item.description}</td>
            <td>{item.date}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  //data will be the string we send from our server
  const get = () => {
    console.log("get")
    axios.get('http://localhost:8081/transaction')
    .then((response) => {
      setTransactions(response.data);
      console.log(response)
    })
    .catch((error) => {
      console.log(`AXIOS Error: ${error.response.data}`)
    })
  }
  
  const post = () => {
    console.log("post")
    axios.post('http://localhost:8081/transaction', {
      description: "Test transaction POST",
      amount: 420
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(`AXIOS Error: ${error.response.data}`)
    });
  }

  const patch = async () => {
    console.log("put")
    if (!transactions?.length) {
      console.log("no transactions!");
      return;
    }
    else {
      console.log(transactions)
    }
    let id = transactions[0]._id;
    console.log(`patching transaction with id: ${id}`);
    let route = `http://localhost:8081/transaction/${id}`;
    console.log(route);
    //axios.patch(route, 
    await fetch(route, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        description: "New desc",
        amount: 69
      })
    })
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      console.log(`AXIOS Error: ${error.response.data}`)
    });
  }
  
  const del = async () => {

    console.log("del")
    if (!transactions?.length) {
      console.log("no transactions!");
      return;
    }
    else {
      console.log(transactions);
    }
    let id = transactions[0]._id;
    console.log(`deleting transaction with id: ${id}`);
    let route = `http://localhost:8081/transaction/${id}`;
    console.log(route);
    //axios.delete(route)
    await fetch(route, {
      method: "DELETE"
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(`Fetch Error: ${error.response.data}`)
    })
  }

  return <div className="App">
    <header className="App-header">
      <button onClick={get}>GET</button>
      <button onClick={post}>POST</button>
      <button onClick={patch}>PUT</button>
      <button onClick={del}>DELETE</button>
    </header>
  </div>;
}

function Import() {
  return <h1>Import</h1>;
}

function App() {
  
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Transactions</Link> |{" "}
        <Link to="/import">Import</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Transactions/>}/>
        <Route path="/import" element={<Import/>}/>
      </Routes>
    </BrowserRouter>
  );
}

  

export default App;
