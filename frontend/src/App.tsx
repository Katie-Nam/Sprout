import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/login/Login';
import SignUp from "./pages/login/SignUp";
import Home from "./pages/home/Home";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/home" element={<Home userName="Celine"/>} />
			</Routes>
		</Router>
	);
}

export default App;
