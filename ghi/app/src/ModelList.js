import React from "react";

function ModelList(props) {
    
    return (
        <table className="table table-hover table-dark table-striped">
        <thead>
          <tr>
            <th>Vehicle Models</th>
          </tr>
        </thead>
        <tbody>
          {props.models?.map((model) => {
            return (
              <tr key={model.href}>
                <td>{ model.name }</td>
                <td>{ model.manufacturer }</td>
                <td><img src={model.picture_url} className="img-thumbnail" width="200" height="200"></img> </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default ModelList;