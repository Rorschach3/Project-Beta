import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function AppointmentList () {
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments)
        }
    }

    const finishAppointment = async (appointmentId) => {
        const data = {
            "status": "finished"
        };
        const appointmentUrl = `http://localhost:8080/api/appointments/${appointmentId}/finish/`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            }
        }

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            fetchData();
        }
    }

    const cancelAppointment = async (appointmentId) => {
        const data = {
            "status": "cancelled"
        };
        const cancelUrl = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            }
        }

        const response = await fetch(cancelUrl, fetchConfig);
        if (response.ok) {
            fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>VIP Status</th>
                        <th>Technician</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => {
                        const dateTime = new Date(appointment.date_time);
                        const date = dateTime.toLocaleDateString()
                        const time = dateTime.toLocaleTimeString()
                        return (
                            <tr className='fw-bold' key={appointment.id}>
                                <td className='fs-3'>{ appointment.customer }</td>
                                <td className='fs-3'>{ appointment.vin }</td>
                                <td className='fs-3'>{ appointment.reason }</td>
                                <td className='fs-3'>{ appointment.status }</td>
                                <td className='fs-3'>{ time }</td>
                                <td className='fs-3'>{ date }</td>
                                <td className='fs-3'>{ appointment.is_vip ? 'Yes' : 'No' }</td>
                                <td>
                                    <div className='fs-3'></div>
                                    <div>{appointment.technician.first_name}</div>
                                    <div>{appointment.technician.last_name}</div>
                                </td>
                                <td>
                                    <Link to="" className="btn btn-success btn-sm px-4 gap-3" onClick={() => finishAppointment(appointment.id)}>Finish</Link>
                                    <Link to="" className="btn btn-danger btn-sm px-4 gap-3" onClick={() => cancelAppointment(appointment.id)}>Cancel</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default AppointmentList;
