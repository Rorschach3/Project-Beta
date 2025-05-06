import React, { useState } from "react";

const ManufacturerForm = () => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name }),
    };

    try {
      const response = await fetch(url, fetchConfig);

      if (!response.ok) {
        // Read the body **once** as text
        const text = await response.text();

        // Try to parse JSON from that text
        let err;
        try {
          err = JSON.parse(text);
        } catch {
          err = text;
        }

        console.error("Server returned error:", err);
        return;
      }

      // success!
      setName("");
    } catch (networkErr) {
      console.error("Network or CORS error:", networkErr);
    }
  };

  return (
    <div className="shadow p-4 mt-4">
      <h1 className="text-xl font-semibold mb-4">Create a Manufacturer</h1>
      <form onSubmit={handleSubmit} id="create-manufacturer-form">
        <div className="form-floating mb-3">
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Name"
            required
            value={name}
            onChange={handleNameChange}
          />
          <label htmlFor="name">Name</label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!name.trim()}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default ManufacturerForm;
