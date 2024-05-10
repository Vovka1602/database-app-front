import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../App.css';

const MainPage = () => {
    return (
        <div className='main-menu'>
            <h1>Main Menu</h1>
            <a href='/getinfo'>
                <button className="btn btn-primary btn-lg px-4 mt-5">Search products</button>
            </a>
            <a href='/mathops'>
                <button className="btn btn-primary btn-lg px-4 mt-5">Mathematical operations</button>
            </a>
        </div>
    );
}

export default MainPage;