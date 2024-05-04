import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
    return (
        <div>
            <h1 className="mt-4">Main Menu</h1>
            <a href='/getinfo'>
                <button className="btn btn-primary btn-lg px-4 mt-5">Search products</button>
            </a>
        </div>
    );
}

export default MainPage;