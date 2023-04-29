import { useState, useEffect } from 'react';

function ServiceList() {
  const [appointments, setAppointment] = useState([])
  const [filterTerm, setFilterTerm] = useState("")

  const getData = async() => {
    const response = await fetch ("http://localhost:8080/api/appointments/");
    const responseVIP = await fetch ("http://localhost:8100/api/automobiles/");
    
    if (response.ok && responseVIP.ok) {
      const data = await response.json();
      const vipData = await responseVIP.json();

      const vinArr = vipData.autos.filter(auto => auto.sold === true).map(auto => auto.vin);

      const appointmentData = data.appointments.filter(auto => auto.status !== "Started").map((appointment) => {
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
        
      });
     
      setAppointment(appointmentData);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleFilterChange = async ({ target }) => {
    setFilterTerm(target.value.toLowerCase())
  }

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

    getData()
  }

  const handleUpdate = async ({ target }) => {
    let str = String(target.innerText)
    const url = `http://localhost:8080/api/appointments/${target.id}/{targetInnerText}`;

    const fetchConfig = {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"status": str + "ed"})
    }
    let response = await fetch(url, fetchConfig);

    
    if (response.ok) {
      getData()
    }
  }
  

  return (
    <main className="container">
      <h1 className="h1-padded">Service Appointments</h1>
      <div className="form-outline">
        <input onChange={handleFilterChange} placeholder="Type in VIN" />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Vin</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Customer</th>
            <th>VIP</th>
            <th>Reason</th>
            <th>Update status</th>
          </tr>
        </thead>
        <tbody>
        {appointments
            .filter((appointment) => appointment.status === "Created")
            .filter((appointment) => appointment.vin.toLowerCase().includes(filterTerm))
            .map((appointment) => {
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.technician}</td>
                  <td>{appointment.customer}</td>
                  <td>{appointment.isVip > -1 ? <>Yes</> : <>No</>}</td>
                  <td>{appointment.reason}</td>
                  <td>{appointment.status}</td>
                  
                  <td>
                    <button
                      onClick={handleUpdate}
                      id={appointment.id}
                      className="btn btn-warning"
                    >
                      CANCEL
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={handleUpdate}
                      id={appointment.id}
                      className="btn btn-success"
                    >
                      FINISH
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={handleDelete}
                      id={appointment.id}
                      className="btn btn-danger"
                    >
                      DELETED
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  )
}
export default ServiceList