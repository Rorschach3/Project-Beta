import React, { useState, useEffect} from "react";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);
    const getData = async() => {
        const response = await fetch ("http://localhost:8080/api/technicians/");
         if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);
        }
    }
    useEffect(() => {
        getData()
      }, [])
      const handleDelete = async(id) => {
          console.log(id);
          const url = `http://localhost:8080/api/technicians/${id}`
          const fetchConfig = {
            "method": "delete",
            "headers": {
              "Content-Type": "application/json"
            }
          }
      
          try {
            let response = await fetch(url, fetchConfig);
      
            response = await fetch("http://localhost:8080/api/technicians");
      
            if (response.ok) {
              const data = await response.json()
              setTechnicians(data.technicians);
            }
          } catch (e) {
            console.log(e)
          }
      }
    
    
    return (
        <main className="container">
        <h1 className="h1-padded">Technicians</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => {
                return (
                  <tr key={technician.employee_id}>
                    <td>{ technician.employee_id }</td>
                    <td>{ technician.first_name }</td>
                    <td>{ technician.last_name }</td>
                    <td>{ technician.id }</td>
                    <td>
                      <button type="button" className="btn btn-danger" onClick={() => {
                        handleDelete(technician.id)
                      } }>Delete</button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </main>
    )
  }
  
export default TechnicianList;

