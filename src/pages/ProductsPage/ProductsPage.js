import { useEffect, useState } from "react";
import OutputTable from '../../components/OutputTable';

const ProductsPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/execute-query?query=${encodeURIComponent("SELECT * from products")}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Products</h1>
            {data && <OutputTable data={data} />}
        </div>
    );
}

export default ProductsPage;