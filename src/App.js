import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import "bootstrap/dist/css/bootstrap.min.css";
import GetInfoPage from './pages/GetInfoPage/GetInfoPage';
import MathOperationsPage from './pages/MathOperationsPage/MathOperationsPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import DistributorsPage from './pages/DistributorsPage/DistributorsPage';
import ImportPage from './pages/ImportPage/ImportPage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <MainPage/> }/>
                <Route path='/getinfo' element={ <GetInfoPage/> }/>
                <Route path='/mathops' element={ <MathOperationsPage/> }/>
                <Route path='/products' element={ <ProductsPage/> }/>
                <Route path='/distributors' element={ <DistributorsPage/> }/>
                <Route path='/import' element={ <ImportPage/> }/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
