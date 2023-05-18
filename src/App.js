import Login from './Pages/Login';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import UsersList from './Pages/UsersList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route path='/users' element={<UsersList/>}/>
        <Route element={<ProtectedRoutes/>}>{/* qui dentro ci vanno le routes che io voglio proteggere da autenticazione*/}
          {/* quindi se nel localStorage non ci sarà la chiave true, verremo redirectati alla login page */}
          <Route path='/homepage' element={<Homepage/>}/> 
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
