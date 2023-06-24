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
