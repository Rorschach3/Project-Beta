import React from "react";

function ManufacturerList(props) {
    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer Name</th>
          </tr>
        </thead>
        <tbody>
          {props.manufacturer.map(manufacturer => {
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
