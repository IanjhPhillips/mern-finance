import axios from 'axios';
import { useState } from 'react';


function App() {

  const [transactions, setTransactions] = useState([]);

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
  
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={get}>GET</button>
        <button onClick={post}>POST</button>
        <button onClick={patch}>PUT</button>
        <button onClick={del}>DELETE</button>

      </header>
    </div>
  );
}
  

export default App;
