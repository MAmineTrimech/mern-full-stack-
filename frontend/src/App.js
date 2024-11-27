import './App.css';
import Allstud from './component/Allstud';
import Allform from './component/allform';
import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import View from './component/View';
import Addstud from './component/Addstud';
import Addform from './component/addform';
import Edit from './component/Edit';
import Home from './component/Home';
import Viewf from './component/viewf';
import Editf from './component/editf';
function App() {
  return (
  <BrowserRouter>
      <Navbar />
      <Routes >
      <Route  path='/' element={<Home />} />
          <Route  path='/allstud' element={<Allstud />} />
          <Route  path='/addstud' element={<Addstud />} />
          <Route  path="/view/:id" element={<View />} />
          <Route  path="/edit/:id" element={<Edit />} />
          <Route  path='/addform' element={<Addform />} />
          <Route  path='/getform' element={<Allform />} />
          <Route  path="/viewf/:id" element={<Viewf />} />
          <Route  path="/editf/:id" element={<Editf />} />
      </Routes>
   
  </BrowserRouter>
  );
}

export default App;
