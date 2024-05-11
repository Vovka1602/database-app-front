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

    const [includeModelFilter, setIncludeModelFilter] = useState(false);
    const [modelFilterValue, setModelFilterValue] = useState([]);
    const [modelFilter, setModelFilter] = useState(null);

    const [includeColorFilter, setIncludeColorFilter] = useState(false);
    const [colorFilterOpt, setColorFilterOpt] = useState("selectvalues");
    const [colorFilterValue, setColorFilterValue] = useState([]);
    const [colorFilterOp, setColorFilterOp] = useState("=");
    const [colorFilter, setColorFilter] = useState(null);

    const [includePriceFilter, setIncludePriceFilter] = useState(false);
    const [priceFilterOpt, setPriceFilterOpt] = useState("minmax");
    const [priceFilterMinValue, setPriceFilterMinValue] = useState([]);
    const [priceFilterMaxValue, setPriceFilterMaxValue] = useState([]);
    const [priceFilterExpressionValue, setPriceFilterExpressionValue] = useState([]);
    const [priceFilterMin, setPriceFilterMin] = useState(null);
    const [priceFilterMax, setPriceFilterMax] = useState(null);
    const [priceFilterExpression, SetPriceFilterExpression] = useState(null);

    const [includeImporttaxFilter, setIncludeImporttaxFilter] = useState(false);
    const [importtaxFilterOpt, setImporttaxFilterOpt] = useState("minmax");
    const [importtaxFilterMinValue, setImporttaxFilterMinValue] = useState([]);
    const [importtaxFilterMaxValue, setImporttaxFilterMaxValue] = useState([]);
    const [importtaxFilterExpressionValue, setImporttaxFilterExpressionValue] = useState([]);
    const [importtaxFilterMin, setImporttaxFilterMin] = useState(null);
    const [importtaxFilterMax, setImporttaxFilterMax] = useState(null);
    const [importtaxFilterExpression, SetImporttaxFilterExpression] = useState(null);

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
    }, [colorFilterOp, colorFilterValue, includeColorFilter]);

    useEffect(() => { // Збірка фільтру MODEL
        setModelFilter({
            "field": "products.model",
            "operator": " ",
            "value": modelFilterValue
        });
    }, [modelFilterValue]);

    useEffect(() => { // Збірка фільтру PRICE_MIN
        setPriceFilterMin({
            "field": "products.price",
            "operator": ">=",
            "value": priceFilterMinValue
        });
    }, [priceFilterMinValue]);

    useEffect(() => { // Збірка фільтру PRICE_MAX
        setPriceFilterMax({
            "field": "products.price",
            "operator": "<=",
            "value": priceFilterMaxValue
        });
    }, [priceFilterMaxValue]);

    useEffect(() => { // Збірка фільтру PRICE_EXPRESSION
        SetPriceFilterExpression({
            "field": "products.price",
            "operator": " ",
            "value": priceFilterExpressionValue
        });
    }, [priceFilterExpressionValue]);

    useEffect(() => { // Збірка фільтру IMPORTTAX_MIN
        setImporttaxFilterMin({
            "field": "import.import_tax",
            "operator": ">=",
            "value": importtaxFilterMinValue
        });
    }, [importtaxFilterMinValue]);

    useEffect(() => { // Збірка фільтру IMPORTTAX_MAX
        setImporttaxFilterMax({
            "field": "import.import_tax",
            "operator": "<=",
            "value": importtaxFilterMaxValue
        });
    }, [importtaxFilterMaxValue]);

    useEffect(() => { // Збірка фільтру IMPORTTAX_EXPRESSION
        SetImporttaxFilterExpression({
            "field": "import.import_tax",
            "operator": " ",
            "value": importtaxFilterExpressionValue
        });
    }, [importtaxFilterExpressionValue]);

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
            if ((includeColorFilter === true) && (colorFilterValue.length > 0)) {
                whereElements.push(colorFilter);
            }
            if (includeModelFilter === true && modelFilterValue.length > 0) {
                whereElements.push(modelFilter);
            }
            if (includePriceFilter === true) {
                if (priceFilterMinValue.length > 0) {
                    whereElements.push(priceFilterMin);
                }
                if (priceFilterMaxValue.length > 0) {
                    whereElements.push(priceFilterMax);
                }
                if (priceFilterExpressionValue.length > 0) {
                    whereElements.push(priceFilterExpression);
                }
            }
            if (includeImporttaxFilter === true) {
                if (importtaxFilterMinValue.length > 0) {
                    whereElements.push(importtaxFilterMin);
                }
                if (importtaxFilterMaxValue.length > 0) {
                    whereElements.push(importtaxFilterMax);
                }
                if (importtaxFilterExpressionValue.length > 0) {
                    whereElements.push(importtaxFilterExpression);
                }
            }
            let whereOptions = [];
            whereElements.forEach(elem => {
                let element = elem.field + elem.operator;
                let values = elem.value.join(` or ${elem.field}=`);
                element += values;
                whereOptions.push(element);
            });
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
        includeProducerFilter, producerFilter, producerFilterValue.length,
        includeColorFilter, colorFilter, colorFilterValue.length,
        includeModelFilter, modelFilter, modelFilterValue.length,
        includePriceFilter, priceFilterExpression, priceFilterExpressionValue.length,
        priceFilterMax, priceFilterMaxValue.length, priceFilterMin, priceFilterMinValue,
        includeImporttaxFilter, importtaxFilterExpression, importtaxFilterExpressionValue.length,
        importtaxFilterMax, importtaxFilterMaxValue.length, importtaxFilterMin, importtaxFilterMinValue.length]);

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
                setIncludeImporttaxFilter(false);
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
        setNameFilterValue([]);
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

    const includeProducerFilterSwitchChange = (e) => {
        setProducerFilterValue([]);
        if (e.target.checked) {
            setIncludeProducerFilter(true);
        } else {
            setIncludeProducerFilter(false);
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

    const includeColorFilterSwitchChange = (e) => {
        setColorFilterValue([]);
        if (e.target.checked) {
            setIncludeColorFilter(true);
        } else {
            setIncludeColorFilter(false);
        }
    }
    const colorFilterOptSelectChange = (e) => {
        setColorFilterOpt(e.target.value);
        setColorFilterValue([]);
        if (e.target.value === "isnotnull") {
            setColorFilterOp(" IS NOT ");
            setColorFilterValue(["NULL"]);
        }
        else if (e.target.value === "isnull") {
            setColorFilterOp(" IS ");
            setColorFilterValue(["NULL"]);
        }
        else if (e.target.value === "selectvalues") {
            setColorFilterOp("=");
        }
        else {
            setColorFilterOp(" ");
        }
    }
    const colorFilterValueCheckboxChange = (e) => {
        if (e.target.checked) {
            setColorFilterValue(colorFilterValue => [...colorFilterValue, e.target.value]);
        } else {
            setColorFilterValue(colorFilterValue => colorFilterValue.filter(item => item !== e.target.value));
        }
    }
    const colorFilterExpressionTextareaChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setColorFilterValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setColorFilterValue(value);
        }
    }

    const includeModelFilterSwitchChange = (e) => {
        setModelFilterValue([]);
        if (e.target.checked) {
            setIncludeModelFilter(true);
        } else {
            setIncludeModelFilter(false);
        }
    }
    const modelFilterValueTextareaChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setModelFilterValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setModelFilterValue(value);
        }
    }

    const includePriceFilterSwitchChange = (e) => {
        setPriceFilterMinValue([]);
        setPriceFilterMaxValue([]);
        setPriceFilterExpressionValue([]);
        if (e.target.checked) {
            setIncludePriceFilter(true);
        } else {
            setIncludePriceFilter(false);
        }
    }
    const priceFilterOptSelectChange = (e) => {
        setPriceFilterOpt(e.target.value);
        setPriceFilterMinValue([]);
        setPriceFilterMaxValue([]);
        setPriceFilterExpressionValue([]);
    }
    const priceFilterMinValueInputChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setPriceFilterMinValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setPriceFilterMinValue(value);
        }
    }
    const priceFilterMaxValueInputChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setPriceFilterMaxValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setPriceFilterMaxValue(value);
        }
    }
    const priceFilterExpressionValueTextareaChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setPriceFilterExpressionValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setPriceFilterExpressionValue(value);
        }
    }

    const includeImporttaxFilterSwitchChange = (e) => {
        setImporttaxFilterMinValue([]);
        setImporttaxFilterMaxValue([]);
        setImporttaxFilterExpressionValue([]);
        if (e.target.checked) {
            setIncludeImporttaxFilter(true);
        } else {
            setIncludeImporttaxFilter(false);
        }
    }
    const importtaxFilterOptSelectChange = (e) => {
        setImporttaxFilterOpt(e.target.value);
        setImporttaxFilterMinValue([]);
        setImporttaxFilterMaxValue([]);
        setImporttaxFilterExpressionValue([]);
    }
    const importtaxFilterMinValueInputChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setImporttaxFilterMinValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setImporttaxFilterMinValue(value);
        }
    }
    const importtaxFilterMaxValueInputChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setImporttaxFilterMaxValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setImporttaxFilterMaxValue(value);
        }
    }
    const importtaxFilterExpressionValueTextareaChange = (e) => {
        if (e.target.value === null || e.target.value === "") {
            setImporttaxFilterExpressionValue([]);
        } else {
            let value = [];
            value.push(e.target.value);
            setImporttaxFilterExpressionValue(value);
        }
    }

    return (
        <div className='container' data-bs-theme="dark">
            <h1>Search products</h1>
            <div className='control-panel-container'>
                <div className='card select-card mt-4 px-1'>
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
                <div className='card orderby-card mt-4 ms-2 px-1'>
                    <div className='control-panel-label'>
                        <input className='form-check-input px-2 py-2 mt-2 me-2' type='checkbox' onChange={includeOrderbyCheckboxChange}></input>
                        <h2>Order by</h2>
                    </div>
                    {includeOrderby ? (
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
                    ) : (<></>)}
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
                                    rows="3"
                                    placeholder='Enter expression'
                                    onChange={producerFilterValueTextareaChange}
                                />
                            ) : (<></>)}
                        </div>
                        <div className='control-panel'>
                            <div className='control-panel-elem form-switch'>
                                <input className='form-check-input px-2 py-2' type='checkbox' onChange={includeColorFilterSwitchChange} />
                                <h4 className='px-2 fs-5'>color</h4>
                            </div>
                            {includeColorFilter ? (
                                <div className='control-panel-col'>
                                    <div className='control-panel-elem'>
                                        <select className='form-select' value={colorFilterOpt} onChange={colorFilterOptSelectChange}>
                                            <option value="isnull">IS NULL</option>
                                            <option value="isnotnull">IS NOT NULL</option>
                                            <option value="selectvalues">Select values</option>
                                            <option value="expression">Expression</option>
                                        </select>
                                    </div>
                                    {(colorFilterOpt === "selectvalues") ? (
                                        <div>
                                            <div className='control-panel-elem mt-2 ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'білий'" onChange={colorFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>білий</label>
                                            </div>
                                            <div className='control-panel-elem ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'чорний'" onChange={colorFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>чорний</label>
                                            </div>
                                            <div className='control-panel-elem ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'синій'" onChange={colorFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>синій</label>
                                            </div>
                                            <div className='control-panel-elem ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'зелений'" onChange={colorFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>зелений</label>
                                            </div>
                                            <div className='control-panel-elem ms-2 me-2'>
                                                <input className='form-check-input mt-1' type='checkbox' value="'сірий'" onChange={colorFilterValueCheckboxChange} />
                                                <label className='form-check-label px-2'>сірий</label>
                                            </div>
                                        </div>
                                    ) : (<></>)}
                                    {(colorFilterOpt === "expression") ? (
                                        <textarea
                                            className='form-control mt-2 mb-2'
                                            rows="3"
                                            placeholder='Enter expression'
                                            onChange={colorFilterExpressionTextareaChange}
                                        />
                                    ) : (<></>)}
                                </div>
                            ) : (<></>)}
                            <div className='control-panel-elem form-switch mt-2'>
                                <input className='form-check-input px-2 py-2' type='checkbox' onChange={includeModelFilterSwitchChange} />
                                <h4 className='px-2 fs-5'>model</h4>
                            </div>
                            {includeModelFilter ? (
                                <textarea
                                    className='form-control mt-1 mb-2'
                                    rows="3"
                                    placeholder='Enter expression'
                                    onChange={modelFilterValueTextareaChange}
                                />
                            ) : (<></>)}
                        </div>
                        <div className='control-panel'>
                            <div className='control-panel-elem form-switch'>
                                <input className='form-check-input px-2 py-2' type='checkbox' onChange={includePriceFilterSwitchChange} />
                                <h4 className='px-2 fs-5'>price</h4>
                            </div>
                            {includePriceFilter ? (
                                <div className='control-panel-col'>
                                    <div className='control-panel-elem'>
                                        <select className='form-select' value={priceFilterOpt} onChange={priceFilterOptSelectChange}>
                                            <option value="minmax">Min/Max</option>
                                            <option value="expression">Expression</option>
                                        </select>
                                    </div>
                                    {(priceFilterOpt === "minmax") ? (
                                        <div className='control-panel-col mt-2'>
                                            <div className='control-panel-elem mt-1'>
                                                <label className='form-check-label mt-1 fs-5'>Min:</label>
                                                <input className='form-control ms-3' onChange={priceFilterMinValueInputChange} />
                                            </div>
                                            <div className='control-panel-elem mt-1 mb-3'>
                                                <label className='form-check-label mt-1 fs-5'>Max:</label>
                                                <input className='form-control ms-3' onChange={priceFilterMaxValueInputChange} />
                                            </div>
                                        </div>
                                    ) : (
                                        <textarea
                                            className='form-control mt-2 mb-3'
                                            rows="3"
                                            placeholder='Enter expression'
                                            onChange={priceFilterExpressionValueTextareaChange}
                                        />
                                    )}
                                </div>
                            ) : (<></>)}
                            {(selectItems.includes("import.import_tax")) ? (
                                <div className='control-panel-col'>
                                    <div className='control-panel-elem form-switch mt-2'>
                                        <input className='form-check-input px-2 py-2' type='checkbox' onChange={includeImporttaxFilterSwitchChange} />
                                        <h4 className='px-2 fs-5'>import_tax</h4>
                                    </div>
                                    {includeImporttaxFilter ? (
                                        <div className='control-panel-col'>
                                            <div className='control-panel-elem'>
                                                <select className='form-select' value={importtaxFilterOpt} onChange={importtaxFilterOptSelectChange}>
                                                    <option value="minmax">Min/Max</option>
                                                    <option value="expression">Expression</option>
                                                </select>
                                            </div>
                                            {(importtaxFilterOpt === "minmax") ? (
                                                <div className='control-panel-col mt-2'>
                                                    <div className='control-panel-elem mt-1'>
                                                        <label className='form-check-label mt-1 fs-5'>Min:</label>
                                                        <input className='form-control ms-3' onChange={importtaxFilterMinValueInputChange} />
                                                    </div>
                                                    <div className='control-panel-elem mt-1 mb-3'>
                                                        <label className='form-check-label mt-1 fs-5'>Max:</label>
                                                        <input className='form-control ms-3' onChange={importtaxFilterMaxValueInputChange} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <textarea
                                                    className='form-control mt-2 mb-2'
                                                    rows="3"
                                                    placeholder='Enter expression'
                                                    onChange={importtaxFilterExpressionValueTextareaChange}
                                                />
                                            )}
                                        </div>
                                    ) : (<></>)}
                                </div>
                            ) : (<></>)}
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
                        Generate SQL query
                    </div>
                </div>
            </button>
            {data && <OutputTable data={data} />}
            <ConfirmationModal show={showModal} data={sqlQuery} onUpdateData={handleUpdateData} onClose={handleClose} />
        </div>
    );
}

export default GetInfoPage;