import { useEffect, useState} from 'react';

function ServiceHistory () {
    const [search, setSearch] = useState("");
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    const handleSearch = event => {
        fetchData();
        setSearch(event.target.value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setFilteredAppointments(data.appointments);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const results = filteredAppointments.filter((appointment) => {
            if (search === "") {
                return fetchData();
            } else {
                return appointment.vin === search
            }
        });
        setFilteredAppointments(results);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Service History</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type="search" className="form-control" name="searchInput" placeholder="Search By Vin..." aria-label="Search By Vin..." aria-describedby="submit-button" value={search} onChange={handleSearch}></input>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit" id="submit-button">Search</button>
                    </div>
                </div>
            </form>
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
                    {filteredAppointments.map((appointment) => {
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default ServiceHistory;
