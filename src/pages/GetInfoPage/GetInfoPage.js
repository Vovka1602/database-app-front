import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import OutputTable from '../../components/OutputTable';
import "./GetInfoPage.css";

const GetInfoPage = () => {
    const distributorsConnection = {
        "field": "distributors.producer",
        "operator": "=",
        "value": "products.producer"
    }

    const importConnenction = {
        "field": "import.id",
        "operator": "=",
        "value": "products.id"
    }

    const [data, setData] = useState(null);

    const [includeOrderby, setIncludeOrderby] = useState(false);

    const [selectItems, setSelectItems] = useState([]);
    const [fromItems, setFromItems] = useState(["products"]);
    const [whereItems, setWhereItems] = useState([]);
    const [orderbyItem, setOrderbyItem] = useState("products.id");

    const [selectBlock, setSelectBlock] = useState("");
    const [fromBlock, setFromBlock] = useState("");
    const [whereBlock, setWhereBlock] = useState("");

    useEffect(() => {
        const compileSelectBlock = () => {
            if (selectItems.length > 0) {
                let selectElements = [];
                if (selectItems.includes("products.id")) {
                    selectElements.push("products.id");
                }
                if (selectItems.includes("products.name")) {
                    selectElements.push("products.name");
                }
                if (selectItems.includes("products.producer")) {
                    selectElements.push("products.producer");
                }
                if (selectItems.includes("distributors.distributor")) {
                    selectElements.push("distributors.distributor");
                }
                if (selectItems.includes("products.model")) {
                    selectElements.push("products.model");
                }
                if (selectItems.includes("products.color")) {
                    selectElements.push("products.color");
                }
                if (selectItems.includes("products.price")) {
                    selectElements.push("products.price");
                }
                if (selectItems.includes("import.import_tax")) {
                    selectElements.push("import.import_tax");
                }
                setSelectBlock(selectElements.join(', '));
            }
        }

        const compileFromBlock = () => {
            setFromBlock(fromItems.join(', '));
        }

        const compileWhereBlock = () => {
            let whereElements = [];
            whereItems.forEach(elem => {
                let element = elem.field + elem.operator + elem.value;
                whereElements.push(element);
            });
            setWhereBlock(whereElements.join(') and ('));
        }

        compileSelectBlock();
        compileFromBlock();
        compileWhereBlock();
    }, [selectItems, selectBlock, fromItems, whereItems, whereBlock]);

    const getData = (e) => {
        e.preventDefault();
        if (selectItems.length === 0) {
            alert("Please select at least one item in the Select field");
        }
        else {
            let sqlQuery = "SELECT " + selectBlock
                + " FROM " + fromBlock
            if (whereItems.length > 0) {
                sqlQuery += " WHERE (" + whereBlock + ")";
            }
            if (includeOrderby === true) {
                sqlQuery += " ORDER BY " + orderbyItem;
            }
            else {
                sqlQuery += " ORDER BY products.id";
            }
            console.log(sqlQuery);
            fetch(`http://localhost:8000/execute-query?query=${encodeURIComponent(sqlQuery)}`)
                .then(response => response.json())
                .then(data => {
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
            if (e.target.value === "distributors.distributor") {
                setFromItems(fromItems => [...fromItems, "distributors"]);
                setWhereItems(whereItems => [...whereItems, distributorsConnection]);
            }
            if (e.target.value === "import.import_tax") {
                setFromItems(fromItems => [...fromItems, "import"]);
                setWhereItems(whereItems => [...whereItems, importConnenction]);
            }
        } else {
            setSelectItems(selectItems => selectItems.filter(item => item !== e.target.value));
            if (e.target.value === "distributors.distributor") {
                setFromItems(fromItems => fromItems.filter(item => item !== "distributors"));
                setWhereItems(whereItems => whereItems.filter(item => {
                    for (let key in distributorsConnection) {
                        if (item[key] !== distributorsConnection[key]) {
                            return true;
                        }
                    }
                    return false;
                }));
                if (orderbyItem === "distributors.distributor") {
                    setOrderbyItem("products.id");
                }
            }
            if (e.target.value === "import.import_tax") {
                setFromItems(fromItems => fromItems.filter(item => item !== "import"));
                setWhereItems(whereItems => whereItems.filter(item => {
                    for (let key in importConnenction) {
                        if (item[key] !== importConnenction[key]) {
                            return true;
                        }
                    }
                    return false;
                }));
                if (orderbyItem === "import.import_tax") {
                    setOrderbyItem("products.id");
                }
            }
        }
    };

    const includeOrderbyCheckboxChange = (e) => {
        if (e.target.checked) {
            setIncludeOrderby(true);
        } else {
            setIncludeOrderby(false);
        }
    }

    const orderbyRadioChange = (e) => {
        console.log(e.target.value);
        setOrderbyItem(e.target.value);
    }

    return (
        <div>
            <h1 className="mt-4">Search products</h1>
            <div className='control-panel-container'>
                <div className='card mt-4 ms-3 me-3 px-1'>
                    <div className='control-panel-label'>
                        <h2>Select</h2>
                    </div>
                    <div className='control-panel'>
                        <div className='control-panel-elem'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.id" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>id</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.name" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>name</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.producer" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>producer</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.model" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>model</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.color" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>color</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="products.price" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>price</label>
                        </div>
                        <div className='control-panel-elem mt-2'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="distributors.distributor" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>distributor</label>
                        </div>
                        <div className='control-panel-elem mt-2'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="import.import_tax" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>import_tax</label>
                        </div>
                    </div>
                </div>
                <div className='card mt-4 ms-1 me-1 px-1'>
                    <div className='control-panel-label'>
                        <input className='form-check-input px-2 py-2 mt-2 me-2' type='checkbox' onChange={includeOrderbyCheckboxChange}></input>
                        <h2>Order by</h2>
                    </div>
                    <div className='control-panel'>
                        <div className='control-panel-elem'>
                            <input
                                className='form-check-input px-2 py-2 mt-2'
                                type="radio"
                                value="products.id"
                                onChange={orderbyRadioChange}
                                checked={orderbyItem === "products.id"}
                            />
                            <label className='form-check-label px-2 fs-5'>id</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input
                                className='form-check-input px-2 py-2 mt-2'
                                type="radio"
                                value="products.name"
                                onChange={orderbyRadioChange}
                                checked={orderbyItem === "products.name"}
                            />
                            <label className='form-check-label px-2 fs-5'>name</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input
                                className='form-check-input px-2 py-2 mt-2'
                                type="radio"
                                value="products.producer"
                                onChange={orderbyRadioChange}
                                checked={orderbyItem === "products.producer"}
                            />
                            <label className='form-check-label px-2 fs-5'>producer</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input
                                className='form-check-input px-2 py-2 mt-2'
                                type="radio"
                                value="products.model"
                                onChange={orderbyRadioChange}
                                checked={orderbyItem === "products.model"}
                            />
                            <label className='form-check-label px-2 fs-5'>model</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input
                                className='form-check-input px-2 py-2 mt-2'
                                type="radio"
                                value="products.color"
                                onChange={orderbyRadioChange}
                                checked={orderbyItem === "products.color"}
                            />
                            <label className='form-check-label px-2 fs-5'>color</label>
                        </div>
                        <div className='control-panel-elem'>
                            <input
                                className='form-check-input px-2 py-2 mt-2'
                                type="radio"
                                value="products.price"
                                onChange={orderbyRadioChange}
                                checked={orderbyItem === "products.price"}
                            />
                            <label className='form-check-label px-2 fs-5'>price</label>
                        </div>
                        {selectItems.includes("distributors.distributor") ? (
                            <div className='control-panel-elem'>
                                <input
                                    className='form-check-input px-2 py-2 mt-2'
                                    type="radio"
                                    value="distributors.distributor"
                                    onChange={orderbyRadioChange}
                                    checked={orderbyItem === "distributors.distributor"}
                                />
                                <label className='form-check-label px-2 fs-5'>distributor</label>
                            </div>
                        ) : (<></>)}
                        {selectItems.includes("import.import_tax") ? (
                            <div className='control-panel-elem'>
                                <input
                                    className='form-check-input px-2 py-2 mt-2'
                                    type="radio"
                                    value="import.import_tax"
                                    onChange={orderbyRadioChange}
                                    checked={orderbyItem === "import.import_tax"}
                                />
                                <label className='form-check-label px-2 fs-5'>import_tax</label>
                            </div>
                        ) : (<></>)}
                    </div>
                </div>
            </div>
            <button className="btn btn-primary btn-lg px-4 mt-5" onClick={getData}>Get products data</button>
            {data && <OutputTable data={data} />}
        </div>
    );
}

export default GetInfoPage;