import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import OutputTable from '../../components/OutputTable';

const MainPage = () => {
    const [data, setData] = useState(null);

    const getData = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/execute-query?query=${encodeURIComponent("SELECT * FROM бд_магазин.products")}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <h1 className="mt-4">Main Page</h1>
            <button className="btn btn-primary btn-lg px-4 mt-5" onClick={getData}>Get products data</button>
            {data && <OutputTable data={ data } />}
        </div>
    );
}

export default MainPage;