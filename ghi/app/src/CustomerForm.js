import React, { useState } from "react";

export default function CustomerForm({ getCustomer }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phoneNumber,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch("/api/customers/", fetchConfig);
      if (response.ok) {
        setFirstName("");
        setLastName("");
        setAddress("");
        setPhoneNumber("");
        getCustomer();
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      // Handle the error here and provide appropriate feedback to the user
      console.error(error);
    }
  };

  return (
    <> // Creates the customer form
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">

                <input  // This code renders the last name of the form
                  onChange={handleFirstNameChange}
                  value={firstName}
                  required
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-control"
                />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="form-floating mb-3">

                <input  // This code renders the last name of the form
                  onChange={handleLastNameChange}
                  value={lastName}
                  required
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-control"
                />
                <label htmlFor="lastname">Last Name</label>
								</div>
								<div className="form-floating mb-3">
                
								<input // This code renders the address part of the form
									onChange={handleAddressChange}
									value={address}
									required
									type="text"
									name="address"
									id="address"
									className="form-control"
														/> 
								<label htmlFor="address">Address</label>
								</div>
								<div className="form-floating mb-3">

								<input // This code renders the phone number part of the form
									onChange={handlePhoneNumberChange}
									value={phoneNumber}
									required
									type="text"
									name="phonenumber"
									id="phonenumber"
									className="form-control"
								/>
								<label htmlFor="phonenumber">Phone Number</label>
								</div>
								<button className="btn btn-secondary">Create</button>
							</form>
						</div>
					</div>
				</div>
			</>
)}
;

