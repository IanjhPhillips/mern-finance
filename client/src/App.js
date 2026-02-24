import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Transactions from './pages/Transactions';

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
