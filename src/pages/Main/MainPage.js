import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../App.css';

const MainPage = () => {
    return (
        <div className='container'>
            <h1>Main Menu</h1>
            <a href='/getinfo'>
                <button className="btn btn-primary btn-lg px-4 mt-5">Search products</button>
            </a>
        </div>
    );
}

export default MainPage;