import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import OutputTable from '../../components/OutputTable';
import "./GetInfoPage.css";
import ConfirmationModal from '../../components/ConfirmationModal';

const GetInfoPage = () => {
    const distributorsConnection = {
        "field": "distributors.producer",
        "operator": "=",
        "value": ['products.producer']
    }

    const importConnenction = {
        "field": "import.id",
        "operator": "=",
        "value": ['products.id']
    }

    const [data, setData] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [includeOrderby, setIncludeOrderby] = useState(false);

    const [selectItems, setSelectItems] = useState([]);
    const [fromItems, setFromItems] = useState(["products"]);
    const [whereItems, setWhereItems] = useState([{ "field": "products.color", "operator": "=", "value": ["'чорний'", "'білий'"] }]);
    const [orderbyItem, setOrderbyItem] = useState("products.id");
    const [orderDesc, setOrderDesc] = useState(false);

    const [selectBlock, setSelectBlock] = useState("");
    const [fromBlock, setFromBlock] = useState("");
    const [whereBlock, setWhereBlock] = useState("");
    const [orderbyBlock, setOrderbyBlock] = useState("products.id");

    const [sqlQuery, setSqlQuery] = useState("");

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
                let element = elem.field + elem.operator;
                let values = elem.value.join(` or ${elem.field}=`);
                element += values;
                whereElements.push(element);
            });
            setWhereBlock(whereElements.join(') and ('));
        }

        const compileOrderbyBlock = () => {
            if (orderDesc === true) {
                setOrderbyBlock(orderbyItem + " desc");
            } else {
                setOrderbyBlock(orderbyItem);
            }
        }

        compileSelectBlock();
        compileFromBlock();
        compileWhereBlock();
        compileOrderbyBlock();
    }, [selectItems, selectBlock, fromItems, whereItems, whereBlock, orderDesc, orderbyItem, orderbyBlock]);

    useEffect(() => {
        let sql = "SELECT " + selectBlock
            + " FROM " + fromBlock
        if (whereItems.length > 0) {
            sql += " WHERE (" + whereBlock + ")";
        }
        if (includeOrderby === true) {
            sql += " ORDER BY " + orderbyBlock;
        }
        else {
            sql += " ORDER BY products.id";
        }
        setSqlQuery(sql);
    }, [fromBlock, includeOrderby, orderbyBlock, selectBlock, whereItems, whereBlock]);

    const getData = (query) => {
        console.log(query);
        fetch(`http://localhost:8000/execute-query?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
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
        setOrderbyItem(e.target.value);
    }

    const orderbyDescCheckboxChange = (e) => {
        if (e.target.checked) {
            setOrderDesc(true);
        } else {
            setOrderDesc(false);
        }
    }

    const handleShowModal = () => {
        if (selectItems.length === 0) {
            alert("Please select at least one item in the Select field");
        }
        else {
            setShowModal(true);
        }
    };

    const handleUpdateData = (updatedData) => {
        console.log(updatedData);
        setShowModal(false);
        getData(updatedData);
    };

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div className='container' data-bs-theme="dark">
            <h1>Search products</h1>
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
                        <div className='control-panel-elem mt-4'>
                            <input className='form-check-input px-2 py-2 mt-2' type='checkbox' value="distributors.distributor" onChange={selectItemCheckboxChange} />
                            <label className='form-check-label px-2 fs-5'>distributor</label>
                        </div>
                        <div className='control-panel-elem mt-4'>
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
                        <div className='control-panel-item mt-3'>
                            <div className='control-panel-elem form-switch'>
                                <input className='form-check-input px-2 py-2' type='checkbox' onChange={orderbyDescCheckboxChange} />
                                <h4 className='px-2 fs-5'>desc</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='button-green mt-3' onClick={handleShowModal}>
                <div className='button-content'>
                    <div className='button-icon'>
                        <img src='./images/tick_green.png'></img>
                        <img className='img-hover' src='./images/tick_black.png'></img>
                    </div>
                    <div className='button-label'>
                        Generate SQL
                    </div>
                </div>
            </button>
            {data && <OutputTable data={data} />}
            <ConfirmationModal show={showModal} data={sqlQuery} onUpdateData={handleUpdateData} onClose={handleClose} />
        </div>
    );
}

export default GetInfoPage;