import { useEffect, useState} from 'react';

function ServiceHistory () {
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Service History</h1>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search By Vin..." aria-label="Search By Vin..." aria-describedby="basic-addon2"></input>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className='fs-3'>Customer</th>
                        <th className='fs-3'>Vehicle Vin #</th>
                        <th className='fs-3'>Reason</th>
                        <th className='fs-3'>Status</th>
                        <th className='fs-3'>Date</th>
                        <th className='fs-3'>Time</th>
                        <th className='fs-3'>VIP</th>
                        <th className='fs-3'>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => {
                        const dateTime = new Date(appointment.date_time);
                        const date = dateTime.toLocaleDateString()
                        const time = dateTime.toLocaleTimeString()
                        return (
                            <tr className='fw-normal' key={appointment.id}>
                                <td className='fs-4'>{ appointment.customer }</td>
                                <td className='fs-4'>{ appointment.vin }</td>
                                <td className='fs-4'>{ appointment.reason }</td>
                                <td className='fs-4'>{ appointment.status }</td>
                                <td className='fs-4'>{ time }</td>
                                <td className='fs-4'>{ date }</td>
                                <td className='fs-4'>{ appointment.is_vip ? 'Yes' : 'No' }</td>
                                <td>
                                    <div className='fs-4'></div>
                                    <div>{appointment.technician.first_name}</div>
                                    <div>{appointment.technician.last_name}</div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default ServiceHistory;
