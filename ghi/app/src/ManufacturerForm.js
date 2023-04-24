import React, { useState } from "react";

function ManufacturerForm(props) {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.prevenDefault();
        const data = {}

        data.name = name;

        const url = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            const newManufacturer = await response.json();
            props.fetchManufacturers();
            setName('');
        }
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    // const fetchData = async () => {
    //     const url = "http://localhost:8100/api/manufacturers/";
    //     const response = await fetch(url);
    //     if (response.ok) {
    //         const data = await response.json();
    //         setName(data.name);
    //     }
    
}