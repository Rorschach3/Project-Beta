import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import ServiceAppointmentForm from './AppointmentForm';
import ServiceList from "./ServiceList";import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'
import SalesPersonForm from './SalesPersonForm'
import SalesPersonHistory from './SalespersonHistory'
import SaleForm from './SalesForm'
import SaleList from './SalesList'

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
            </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList automobiles={props.automobiles} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="models">
         <Route path="" element={<ModelList models={props.models} />} />
         <Route path="new" element={<ModelForm />} />
         </Route>
         <Route path="technicians">
						<Route path="" element={<TechnicianList />} />
						<Route path="new" element={<TechnicianForm />} />
					</Route>
          <Route path="appointments">
          <Route path="" element={<ServiceList />} />
          {/* <Route path="history" element={<ServiceHistoryList />} /> */}
						<Route path="new" element={<ServiceAppointmentForm />} />
					</Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
