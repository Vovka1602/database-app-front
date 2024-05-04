import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import OutputTable from '../../components/OutputTable';
import "./GetInfoPage.css";

const GetInfoPage = () => {
    const [data, setData] = useState(null);
    const [selectBlock, setSelectBlock] = useState("");
    const [selectItems, setSelectItems] = useState([]);

    useEffect(() => {
        if (selectItems.length > 0) {
            setSelectBlock(selectItems.join(', '));
            console.log(selectBlock);
        }
    }, [selectItems, selectBlock]);

    const getData = (e) => {
        e.preventDefault();
        if (selectItems.length === 0) {
            alert("Please select at least one item in the Select field");
        }
        else {
            let sqlQuery = "SELECT " + selectBlock
                + " FROM products";
            console.log(sqlQuery);
            fetch(`http://localhost:8000/execute-query?query=${encodeURIComponent(sqlQuery)}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const selectItemCheckboxChange = (e) => {
        if (e.target.checked) {
            setSelectItems(selectItems => [...selectItems, e.target.value]);
        } else {
            setSelectItems(selectItems => selectItems.filter(item => item !== e.target.value));
        }
    };

    return (
        <div>
            <h1 className="mt-4">Search products</h1>
            <div className='card mt-4 ms-5 me-5'>
                <div className='checkbox-panel-label'>
                    <h2>Select</h2>
                </div>
                <div className='checkbox-panel'>
                    <div className='checkbox-panel-elem'>
                        <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.id" onChange={selectItemCheckboxChange} />
                        <label className='form-check-label px-2 fs-5'>id</label>
                    </div>
                    <div className='checkbox-panel-elem'>
                        <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.name" onChange={selectItemCheckboxChange} />
                        <label className='form-check-label px-2 fs-5'>name</label>
                    </div>
                    <div className='checkbox-panel-elem'>
                        <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.producer" onChange={selectItemCheckboxChange} />
                        <label className='form-check-label px-2 fs-5'>producer</label>
                    </div>
                    <div className='checkbox-panel-elem'>
                        <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.model" onChange={selectItemCheckboxChange} />
                        <label className='form-check-label px-2 fs-5'>model</label>
                    </div>
                    <div className='checkbox-panel-elem'>
                        <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.color" onChange={selectItemCheckboxChange} />
                        <label className='form-check-label px-2 fs-5'>color</label>
                    </div>
                    <div className='checkbox-panel-elem'>
                        <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.price" onChange={selectItemCheckboxChange} />
                        <label className='form-check-label px-2 fs-5'>price</label>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary btn-lg px-4 mt-5" onClick={getData}>Get products data</button>
            {data && <OutputTable data={data} />}
        </div>
    );
}

export default GetInfoPage;