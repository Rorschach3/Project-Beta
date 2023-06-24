<<<<<<< HEAD
import { useEffect, useState} from 'react';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className='fs-3'>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr className='fw-normal' key={manufacturer.id}>
                                <td className='fs-3'>{ manufacturer.name }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default ManufacturerList;
=======
import React from "react";

function ManufacturerList(props) {
    
    return (
        <table className="table table-hover table-dark table-striped">
        <thead>
          <tr>
            <th>Manufacturers</th>
          </tr>
        </thead>
        <tbody>
          {props.manufacturers?.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default ManufacturerList;
>>>>>>> refs/remotes/Master/main
