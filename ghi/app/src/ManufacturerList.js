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
