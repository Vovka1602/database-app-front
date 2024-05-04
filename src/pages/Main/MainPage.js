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
            <h2>Main Page</h2>
            <button onClick={getData}>Get products data</button>
        </div>
    );
}

export default MainPage;