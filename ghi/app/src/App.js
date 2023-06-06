import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutoForm from './AutomobileForm';
import AutosList from './AutomobilesList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
import ModelsList from './ModelsList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory/automobiles" element={<AutosList />} />
          <Route path="inventory/automobiles/new" element={<AutoForm />} />
          <Route path="inventory/manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
          <Route path="inventory/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="inventory/models" element={<ModelsList />} />
          <Route path="inventory/models/new" element={<ModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

  export default App;
