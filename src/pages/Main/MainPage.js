import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../App.css';

const MainPage = () => {
    return (
        <div className='main-menu'>
            <h1>Main Menu</h1>
            <a href='/products'>
                <button className="btn btn-primary btn-lg px-5 mt-5">View Products table</button>
            </a>
            <a href='/distributors'>
                <button className="btn btn-primary btn-lg px-5 mt-4">View Distributors table</button>
            </a>
            <a href='/import'>
                <button className="btn btn-primary btn-lg px-5 mt-4">View Import table</button>
            </a>
            <a href='/getinfo'>
                <button className="btn btn-primary btn-lg px-5 mt-4">Search products</button>
            </a>
            <a href='/mathops'>
                <button className="btn btn-primary btn-lg px-5 mt-4">Mathematical operations</button>
            </a>
        </div>
    );
}

export default MainPage;