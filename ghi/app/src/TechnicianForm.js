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
