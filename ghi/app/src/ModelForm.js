<<<<<<< HEAD
import React from 'react';
import { useEffect, useState} from 'react';

function ModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [manufacturer, setManufacturer] = useState("");

    const handleName = event => {
        setName(event.target.value);
    }
    const handlePicture = event => {
        setPicture(event.target.value);
    }
    const handleManufacturer = event => {
        setManufacturer(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.name = name;
        data.picture_url = picture;
        data.manufacturer_id = manufacturer;

        const postURL = 'http://localhost:8100/api/models/';
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            },
        };

        const modelResponse = await fetch(postURL, fetchOptions);
        if (modelResponse.ok){
            setName('');
            setPicture('');
            setManufacturer('');
        }
    }

    const fetchManufacturers = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const manufacturerResponse = await fetch(url);
        if (manufacturerResponse.ok){
            const manufacturerData = await manufacturerResponse.json();
            setManufacturers(manufacturerData.manufacturers)
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        fetchManufacturers();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={picture} onChange={handlePicture} placeholder="Url" required type="url" name="picture" id="picture" className="form-control" />
                            <label htmlFor="picture">Picture</label>
                        </div>
                        <div className="mb-3">
                            <select value={manufacturer} onChange={handleManufacturer} required name="manufacturer" id="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option value={manufacturer.id} key={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModelForm;
=======
import React, {useState} from "react";

function ModelForm(props) {
    const [name, setName] = useState([]);
    const [manufacturer, setManufacturer] = useState("")
    const [pictureUrl, setPictureUrl] = useState("")

const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        name: name,
        picture_url: pictureUrl,
        manufacturer_id: manufacturer
    }
    const url = 'http://localhost:8100/api/models/'
    const fetchConfig = {
    method: 'post',
    body: JSON.stringify(data),
    header: {
      "Content-Type": "application/json",
    },
  }
  const response = await fetch(url, fetchConfig)
  if(response.ok){
    setName('')
    setPictureUrl('')
    setManufacturer('')
  }
}
const handleName = (event) => {
    const value = event.target.value
    setName(value)
  }
  const handlePictureUrl = (event) => {
    const value = event.target.value
    setPictureUrl(value)
  }
  const handleManufacturer = (event) => {
    const value = event.target.value
    setManufacturer(value)
  }  
return (
<div className="shadow p-4 mt-4">
        <h1> Create A Vehicle</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
                <label htmlFor="name">Name</label>
                <input onChange={handleName} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                </div>
                <div className="form-floating mb-3">
                <label htmlFor="picture_url">Picture Url</label>
                <input onChange={handlePictureUrl} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                </div>
                <div className="form-floating mb-3">
                <label htmlFor="manufacturer">Manufacturer</label>
                <select onChange={handleManufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer_id" className="form-control"/>
                </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
)
}
export default ModelForm

       
>>>>>>> refs/remotes/Master/main
