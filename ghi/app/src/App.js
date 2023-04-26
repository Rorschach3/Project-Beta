import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import ModelList from './ModelList';


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
          </Route>

      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
