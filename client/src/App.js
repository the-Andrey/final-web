import logo from './logo.svg';
import './App.css';
import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'primereact/resources/themes/saga-blue/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import MainPage from './pages/Main/MainPage';
import AddContact from './pages/OperationsMain/AddContact';
import UpdateContact from './pages/OperationsMain/UpdateContact';

function App() {
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/main" element={<MainPage/>}/>
          <Route path="/addcontact" element={<AddContact/>}/>
          <Route path="/updatecontact" element={<UpdateContact/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
