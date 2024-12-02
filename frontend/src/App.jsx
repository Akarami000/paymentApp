import React from "react"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignIn from "./Components/SignIn";
import DashBoard from "./Components/DashBoard";
import SendMoney from "./Components/SendMoney";
import SignUp from "./Components/SignUp";


function App() {
  return (
    <Router>
       <Routes>
        <Route path='/'element={<SignIn/>} />
        <Route path='/sign-up'element={<SignUp/>} />
        <Route path='/dashboard'element={<DashBoard/>} />
        <Route path='/transfer'element={<SendMoney/>} />
       </Routes>
    </Router>
  )
}

export default App
