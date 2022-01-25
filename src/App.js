import './App.css';
import "./components/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Signup_Signin from './components/Signup_Signin'
import Details from './components/Details';
import Error from './components/Error';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Signup_Signin />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Error />} />
      </Routes>

    </>

  );
}

export default App;
