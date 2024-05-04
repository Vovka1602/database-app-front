import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
    const getData = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/execute-query?query=${encodeURIComponent("SELECT * FROM бд_магазин.products")}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <h1 className="mt-4">Main Page</h1>
            <button className="btn btn-primary btn-lg px-4 mt-5" onClick={getData}>Get products data</button>
        </div>
    );
}

export default MainPage;