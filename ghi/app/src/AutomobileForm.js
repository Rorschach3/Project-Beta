import React from 'react';
import { useEffect, useState} from 'react';

function AutoForm() {
    const [models, setModels] = useState([]);
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
    const [model, setModel] = useState("");

    const handleColor = event => {
        setColor(event.target.value);
    }
    const handleYear = event => {
        setYear(event.target.value);
    }
    const handleVin = event => {
        setVin(event.target.value);
    }
    const handleModel = event => {
        setModel(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        const postURL = 'http://localhost:8100/api/automobiles/';
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            },
        };

        const autoResponse = await fetch(postURL, fetchOptions);
        if (autoResponse.ok){
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }

    const fetchModels = async () => {
        const url = 'http://localhost:8100/api/models/';
        const modelResponse = await fetch(url);
        if (modelResponse.ok){
            const modelData = await modelResponse.json();
            setModels(modelData.models)
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Automobile</h1>
                    <form onSubmit={handleSubmit} id="create-auto-form">
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColor} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={year} onChange={handleYear} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVin} placeholder="Vin" required type="number" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="mb-3">
                            <select value={model} onChange={handleModel} required name="model" id="model" className="form-select">
                                <option value="">Choose a Model</option>
                                {models.map(model => {
                                    return (
                                        <option value={model.id} key={model.id}>
                                            {model.name}
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

export default AutoForm;
