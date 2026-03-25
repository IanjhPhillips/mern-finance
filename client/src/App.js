import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Transactions from './pages/Transactions';
import TabsRouter from './components/TabsRouter';

function Import() {
  return <h1>Import</h1>;
}

function App() {

  return (
    // <BrowserRouter>
    //   <nav>
    //     <Link to="/transactions">Transactions</Link> |{" "}
    //     <Link to="/import">Import</Link>
    //   </nav>
    //   <Routes>
    //     <Route path="/" element={<Transactions />} />
    //     <Route path="/import" element={<Import />} />
    //   </Routes>
    // </BrowserRouter>
    <TabsRouter/>
  );
}



export default App;
