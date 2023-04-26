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
            <h1>Create Vehicle Model</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
                <input onChange={handleName} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                <label htmlFor="name">Name</label>
                <input onChange={handlePictureUrl} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Picture Url</label>
                <input onChange={handleManufacturer} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Picture Url</label>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
)
}
export default ModelForm