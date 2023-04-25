import React from "react";

function VehicleList(props) {
    
    return (
        <table className="table table-hover table-dark table-striped">
        <thead>
          <tr>
            <th>Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {props.vehicles?.map((vehicle) => {
            return (
              <tr key={vehicle.id}>
                <td>{ vehicle.name }</td>
                <td>{ vehicle.manufacturer }</td>
                <td>{ vehicle.picture_url }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default VehicleList;