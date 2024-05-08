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

    const [includeNameFilter, setIncludeNameFilter] = useState(false);
    const [nameFilterOpt, setNameFilterOpt] = useState("selectvalues");
    const [nameFilterValue, setNameFilterValue] = useState([]);
    const [nameFilterOp, setnameFilterOp] = useState("=");
    const [nameFilter, setNameFilter] = useState(null);

    const [includeProducerFilter, setIncludeProducerFilter] = useState(false);
    const [producerFilterValue, setProducerFilterValue] = useState([]);
    const [producerFilter, setProducerFilter] = useState(null);

    const [includeColorFilter, setIncludeColorFilter] = useState(false);
    const [colorFilterOpt, setColorFilterOpt] = useState("IS ");
    const [colorFilterValue, setColorFilterValue] = useState([]);
    const [colorFilterOp, setColorFilterOp] = useState("=");
    const [colorFilter, setColorFilter] = useState(null);

    const [selectBlock, setSelectBlock] = useState("");
    const [fromBlock, setFromBlock] = useState("");
    const [whereBlock, setWhereBlock] = useState("");
    const [orderbyBlock, setOrderbyBlock] = useState("products.id");

    const [sqlQuery, setSqlQuery] = useState("");

    useEffect(() => { // Збірка фільтру NAME
        setNameFilter({
            "field": "products.name",
            "operator": nameFilterOp,
            "value": nameFilterValue
        });
    }, [nameFilterValue, nameFilterOp]);

    useEffect(() => { // Збірка фільтру PRODUCER
        setProducerFilter({
            "field": "products.producer",
            "operator": " ",
            "value": producerFilterValue
        });
    }, [producerFilterValue]);

    useEffect(() => { // Збірка фільтру COLOR
        setColorFilter({
            "field": "products.color",
            "operator": colorFilterOp,
            "value": colorFilterValue
        });
    }, [colorFilterOp, colorFilterValue])

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
            if (selectItems.includes("distributors.distributor")) {
                whereElements.push(distributorsConnection);
            }
            if (selectItems.includes("import.import_tax")) {
                whereElements.push(importConnenction);
            }
            if ((includeNameFilter === true) && (nameFilterValue.length > 0)) {
                whereElements.push(nameFilter);
            }
            if ((includeProducerFilter === true) && (producerFilterValue.length > 0)) {
                whereElements.push(producerFilter);
            }
            let whereOptions = [];
            whereElements.forEach(elem => {
                let element = elem.field + elem.operator;
                let values = elem.value.join(` or ${elem.field}=`);
                element += values;
                whereOptions.push(element);
            });
            console.log(whereOptions);
            setWhereBlock(whereOptions.join(') and ('));
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
    }, [selectItems, selectBlock, fromItems, whereItems, whereBlock, orderDesc, orderbyItem, orderbyBlock,
        distributorsConnection, importConnenction, includeNameFilter, nameFilter, nameFilterValue.length,
        includeProducerFilter, producerFilter, producerFilterValue.length]);

    useEffect(() => {
        let sql = "SELECT " + selectBlock
            + " FROM " + fromBlock
        if (whereBlock.length > 0) {
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
    };

    const includeNameFilterSwitchChange = (e) => {
        if (e.target.checked) {
            setIncludeNameFilter(true);
        } else {
            setIncludeNameFilter(false);
        }
    }
    const nameFilterOptSelectChange = (e) => {
        setNameFilterOpt(e.target.value);
        setNameFilterValue([]);
        if (e.target.value === "selectvalues") {
            setnameFilterOp("=");
        } else {
            setnameFilterOp(" ");
        }
    }
    const nameFilterValueCheckboxChange = (e) => {
        if (e.target.checked) {
            setNameFilterValue(nameFilterValue => [...nameFilterValue, e.target.value]);
        } else {
            setNameFilterValue(nameFilterValue => nameFilterValue.filter(item => item !== e.target.value));
        }
        console.log(nameFilterValue);
    }
    const nameFilterExpressionTextareaChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setNameFilterValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setNameFilterValue(value);
        }
    }
    
    const producerFilterValueTextareaChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setProducerFilterValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setProducerFilterValue(value);
        }
    }

    const includeProducerFilterSwitchChange = (e) => {
        if (e.target.checked) {
            setIncludeProducerFilter(true);
        } else {
            setIncludeProducerFilter(false);
        }
    }

    return (
        <div className='container' data-bs-theme="dark">
            <h1>Search products</h1>
            <div className='control-panel-container'>
                <div className='card mt-4 px-1'>
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
                <div className='card mt-4 ms-2 px-1'>
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
                        <div className='mt-3'>
                            <div className='control-panel-elem form-switch'>
                                <input className='form-check-input px-2 py-2' type='checkbox' onChange={orderbyDescCheckboxChange} />
                                <h4 className='px-2 fs-5'>desc</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card filter-card mt-4 ms-2 px-1'>
                    <div className='control-panel-label'>
                        <h2>Filters</h2>
                    </div>
                    <div className='control-panel-row'>
                        <div className='control-panel'>
                            <div className='control-panel-elem form-switch'>
                                <input className='form-check-input px-2 py-2' type='checkbox' onChange={includeNameFilterSwitchChange} />
                                <h4 className='px-2 fs-5'>name</h4>
                            </div>
                            {includeNameFilter ? (
                                <div className='control-panel-col'>
                                    <div className='control-panel-elem'>
                                        <select className='form-select' value={nameFilterOpt} onChange={nameFilterOptSelectChange}>
                                            <option value="selectvalues">Select values</option>
                                            <option value="expression">Expression</option>
                                        </select>
                                    </div>
                                    {(nameFilterOpt === "selectvalues") ? (
                                        <div>
                                            <div className='control-panel-elem mt-2 ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'Мобільний телефон'" onChange={nameFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>Мобільний телефон</label>
                                            </div>
                                            <div className='control-panel-elem ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'Відеокарта'" onChange={nameFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>Відеокарта</label>
                                            </div>
                                            <div className='control-panel-elem ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'Процесор'" onChange={nameFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>Процесор</label>
                                            </div>
                                            <div className='control-panel-elem ms-2 me-2 mb-3'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'Навушники бездротові'" onChange={nameFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>Навушники бездротові</label>
                                            </div>
                                        </div>
                                    ) : (
                                        <textarea
                                            className='form-control mt-2 mb-3'
                                            rows="3"
                                            placeholder='Enter expression'
                                            onChange={nameFilterExpressionTextareaChange}
                                        />
                                    )}
                                </div>
                            ) : (<></>)}
                            <div className='control-panel-elem form-switch mt-2'>
                                <input className='form-check-input px-2 py-2' type='checkbox' onChange={includeProducerFilterSwitchChange} />
                                <h4 className='px-2 fs-5'>producer</h4>
                            </div>
                            {includeProducerFilter ? (
                                <textarea
                                    className='form-control mt-1 mb-2'
                                    rows="2"
                                    placeholder='Enter expression'
                                    onChange={producerFilterValueTextareaChange}
                                />
                            ) : (<></>)}
                        </div>
                        <div className='control-panel'>
                            <div className='control-panel-elem form-switch'>
                                <input className='form-check-input px-2 py-2' type='checkbox' />
                                <h4 className='px-2 fs-5'>color</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='button-green mt-3' onClick={handleShowModal}>
                <div className='button-content'>
                    <div className='button-icon'>
                        <img src='./images/tick_green.png' alt=''></img>
                        <img className='img-hover' src='./images/tick_black.png' alt=''></img>
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