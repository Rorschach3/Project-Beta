import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadItems() {
  const response = await fetch('http://localhost:8100/api/manufacturers/');
  const modelResponse = await fetch("http://localhost:8100/api/models/");
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App 
        manufacturers={data.manufacturers}
        />
      </React.StrictMode>
    );
  }
  else if (modelResponse.ok) {
    const data2 = await response.json();
    root.render(
      <React.StrictMode>
        <App 
        models={data2.models}
        />
      </React.StrictMode>
    )
    
  }
}

loadItems();