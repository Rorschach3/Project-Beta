<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';

export default function ServiceHistoryList() {
    const [appointments, setAppointment] = useState([])
  
    const getData = async() => {
      const response = await fetch ("http://localhost:8080/api/appointments/");
      const responseVIP = await fetch ("http://localhost:8100/api/automobiles/");
      
      if (response.ok && responseVIP.ok) {
        const data = await response.json();
        const vipData = await responseVIP.json();

        const vinArr = vipData.autos.filter(auto => auto.sold === true).map(auto => auto.vin);
  
        const appointmentData = data.appointments.map(appointment => {
          return {
            id: appointment.id,
            vin: appointment.vin,
            customer: appointment.customer,
            date: new Date(appointment.date_time).toLocaleString().substring(0, 9),
            time: new Date(appointment.date_time).toLocaleString().substring(11),
            technician: appointment.technician.first_name,
            reason: appointment.reason,
            isCompleted: appointment.is_completed,
            isVip: vinArr.indexOf(appointment.vin),
            status: appointment.status,
          };
          console.log(appointment.status)
        });
  
        setAppointment(appointmentData);
        console.log(appointmentData);
      }
    }
  
    useEffect(() => {
      getData()
    }, [])
  
  
    const handleDelete = async ({ target }) => {
      const url = `http://localhost:8080/api/appointments/${target.id}`;
  
      const fetchConfig = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const response = await fetch(url, fetchConfig);
      const data = await response.json();
  
      setAppointment(
        appointments.filter(appointment => String(appointment.vin) !== target.id)
      )
    }
  
    const handleUpdate = async ({ target }) => {
      let str = String(target.innerText)
      const url = `http://localhost:8080/api/appointments/${target.id}/`;
  
      const fetchConfig = {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"status": str + "ed"})
      }
  
      const response = await fetch(url, fetchConfig);
      const data = await response.json();
  
      appointments.filter((appointment) => String(appointment.vin) !== target.id)
    }
    
  
    return (
      <main className="container">
        <h1 className="h1-padded">Service History</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Vin</th>
              <th>Is VIP?</th>
              <th>Customer</th>
              <th >Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {appointments.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>{appointment.isVip > -1 ? <>Yes</> : <>No</>}</td>
                    <td>{appointment.customer}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.technician}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    )
  }
>>>>>>> refs/remotes/Master/main
