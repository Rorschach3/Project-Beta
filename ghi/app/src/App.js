import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import VehicleList from './VehicleList';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route path="" element={<ManufacturerList manufacturers={props.manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
            <Route path="" element={<AutomobileList automobiles={props.automobiles} />} />
            <Route path="new" element={<AutomobileForm />} />
            <Route path="" element={<VehicleList vehicles={props.vehicles} />} />
        </Route>
        <Route path="vehicles"></Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
