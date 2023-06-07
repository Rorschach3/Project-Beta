import { useEffect, useState} from 'react';

function TechnicianList () {
    const [technicians, setTechnicians] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Technicians</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee Id</th>
                        <th>Technician Id</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map(technician => {
                        return (
                            <tr className='fw-bold' key={technician.id}>
                                <td className='fs-3'>{ technician.first_name }</td>
                                <td className='fs-3'>{ technician.last_name }</td>
                                <td className='fs-3'>{ technician.employee_id }</td>
                                <td className='fs-3'>{ technician.id }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default TechnicianList;
