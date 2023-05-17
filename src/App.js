import Login from './Pages/Login';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
