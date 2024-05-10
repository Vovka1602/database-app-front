import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import "bootstrap/dist/css/bootstrap.min.css";
import GetInfoPage from './pages/GetInfoPage/GetInfoPage';
import MathOperationsPage from './pages/MathOperationsPage/MathOperationsPage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <MainPage/> }/>
                <Route path='/getinfo' element={ <GetInfoPage/> }/>
                <Route path='/mathops' element={ <MathOperationsPage/> }/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
