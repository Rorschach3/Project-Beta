import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function AppointmentList () {
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
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
            <h1>Service Appointments</h1>
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
                        <th className='fs-3'>Status</th>
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
                                <td className='fs-4'>{ date }</td>
                                <td className='fs-4'>{ time }</td>
                                <td className='fs-4'>{ appointment.is_vip ? 'Yes' : 'No' }</td>
                                <td>
                                    <div className='fs-4'></div>
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
