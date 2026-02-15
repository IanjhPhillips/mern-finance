import axios from 'axios';

let result = "No result"

//data will be the string we send from our server
const get = () => {
  console.log("fetching from express")
  axios.get('http://localhost:8081/transaction').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

const post = () => {
  console.log("fetching from express")
  axios.post('http://localhost:8081/transaction', {
    date: Date(),
    description: "Test transaction POST",
    amount: 420
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}

const put = () => {
  console.log("fetching from express")
  axios.put('http://localhost:8081/transaction/1', {
    date: Date(),
    description: "New desc",
    amount: 69
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}

const del = () => {
  console.log("fetching from express")
  axios.delete('http://localhost:8081/transaction/2').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={get}>GET</button>
        <button onClick={post}>POST</button>
        <button onClick={put}>PUT</button>
        <button onClick={del}>DELETE</button>

      </header>
    </div>
  );
}

export default App;
