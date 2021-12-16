import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<PrivateRoute redirectTo='/login' />}>
					<Route path='/' element={<Home />} />
				</Route>
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
