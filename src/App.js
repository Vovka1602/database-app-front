import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import "bootstrap/dist/css/bootstrap.min.css";
import GetInfoPage from './pages/GetInfoPage/GetInfoPage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <MainPage/> }/>
                <Route path='/getinfo' element={ <GetInfoPage/> }/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
