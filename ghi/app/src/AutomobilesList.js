import { useEffect, useState} from 'react';

function AutosList () {
    const [autos, setAutos] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Vin</th>
                    <th>Model</th>
                </tr>
            </thead>
            <tbody>
                {autos.map(auto => {
                    return (
                        <tr className='fw-bold' key={auto.id}>
                            <td className='fs-3'>{ auto.color }</td>
                            <td className='fs-3'>{ auto.year }</td>
                            <td className='fs-3'>{ auto.vin }</td>
                            <td className='fs-3'>{ auto.model.name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )

}

export default AutosList;
