const OutputTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {/* Визначення заголовків стовпців на основі властивостей першого об'єкту */}
                    {Object.keys(data[0]).map(key => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* Відображення даних у вигляді рядків та комірок таблиці */}
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default OutputTable;