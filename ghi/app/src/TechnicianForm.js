<<<<<<< HEAD
import React from 'react';
import { useState} from 'react';

function TechnicianForm() {
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [employeeId, setId] = useState("");


    const handleFirst = event => {
        setFirst(event.target.value);
    }
    const handleLast = event => {
        setLast(event.target.value);
    }
    const handleId = event => {
        setId(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const postURL = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            },
        };

        const TechResponse = await fetch(postURL, fetchOptions);
        if (TechResponse.ok){
            setFirst('');
            setLast('');
            setId('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={handleFirst} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={handleLast} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeId} onChange={handleId} placeholder="Employee ID" required type="number" name="employeeId" id="employeeId" className="form-control" />
                            <label htmlFor="employeeId">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm;
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function TechnicianForm() {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
  });

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/api/technicians/");

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

	const handleFormChange = ({ target }) => {
		const value = target.value;
		const inputName = target.name;

    setFormData(
      {...formData, [inputName]: value}
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const url = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        first_name: "",
        last_name: "",
        employee_id: "",
      });
      
      navigate('/technicians');
    }

    } catch(e) {
      console.log(e)
    }
  };

  
  return (
    <main>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add Technician</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.first_name}
                  placeholder="First name"
                  required
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="form-control"
                />
                <label htmlFor="first_name">First name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.last_name}
                  placeholder="Last name"
                  required
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="form-control"
                />
                <label htmlFor="last_name">Last name</label>
              </div>
              
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormChange}
                  value={formData.employee_id}
                  placeholder="Employee"
                  required
                  type="text"
                  name="employee_id"
                  id="employee_id"
                  className="form-control"
                />
                <label htmlFor="employee_id">Employee ID</label>
              </div>
              <button className="btn btn-primary">Add technician</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
>>>>>>> refs/remotes/Master/main
