import { useEffect, useState} from 'react';

function ModelsList () {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Name</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr className='fw-bold' key={model.id}>
                            <td className='fs-3'>{ model.manufacturer.name }</td>
                            <td className='fs-3'>{ model.name }</td>
                            <td><img className="img-thumbnail" height="200px" width="200px" src={ model.picture_url }/> </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )

}

export default ModelsList;
