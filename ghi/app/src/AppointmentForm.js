import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function ServiceAppointmentForm() {
    const navigate = useNavigate();
    const [appointments, setAppointment] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [formData, setFormData] = useState({
      vin: "",
      customer: "",
      date_time: "",
      technician: "",
      reason: "",
      status: "",
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
        const url = "http://localhost:8080/api/appointments/";
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
            vin: "",
            customer: "",
            date_time: "",
            technician: "",
            reason: "",
            status: "",
          });

          navigate('/appointments');
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
              <h1>Create Service Appointment</h1>
              <form onSubmit={handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={handleFormChange}
                    value={formData.vin}
                    placeholder="Automobile VIN"
                    required
                    type="text"
                    name="vin"
                    id="vin"
                    className="form-control"
                  />
                  <label htmlFor="vin">Automobile VIN</label>
                </div>
  
                <div className="form-floating mb-3">
                  <input
                    onChange={handleFormChange}
                    value={formData.customer}
                    placeholder="Customer"
                    required
                    type="text"
                    name="customer"
                    id="customer"
                    className="form-control"
                  />
                  <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleFormChange}
                    value={formData.date_time}
                    placeholder="Date"
                    required
                    type="datetime-local"
                    name="date_time"
                    id="date_time"
                    min="2023-04-26T00:00"
                    max="2023-06-30T18:00"
                    step="900"
                    className="form-control"
                  />
                  <label htmlFor="date_time">Date</label>
                  <small>Service hours are 9am to 6pm.</small>
                </div>

                <div className="form-floating mb-3">
                  <select
                    onChange={handleFormChange}
                    value={formData.technician}
                    placeholder="Technician"
                    required
                    type="dropdown"
                    name="technician"
                    id="technician"
                    className="form-control"
                  >
                    <option value="">Choose a technician</option>
                      {technicians.map(technician => {
                        return (
                          <option
                            key={technician.id}
                            value={technician.id}
                          >
                            {technician.first_name + " " + technician.last_name}
                          </option>
                        )
                      })}
                    
                  </select>
                  <label htmlFor="time">Technician</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    onChange={handleFormChange}
                    value={formData.reason}
                    placeholder="Reason"
                    required
                    type="text"
                    name="reason"
                    id="reason"
                    className="form-control"
                  />
                  <label htmlFor="reason">Reason</label>
                </div>

                <button className="btn btn-primary">Create appointment</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
export default ServiceAppointmentForm