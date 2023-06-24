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
        <div>
            <h1>Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className='fs-3'>Manufacturer</th>
                        <th className='fs-3'>Name</th>
                        <th className='fs-3'>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr className='fw-normal' key={model.id}>
                                <td className='fs-3'>{ model.manufacturer.name }</td>
                                <td className='fs-3'>{ model.name }</td>
                                <td><img className="img-thumbnail" height="200px" width="200px" alt='' src={ model.picture_url }/> </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default ModelsList;
