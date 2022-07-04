import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";
import { connect, useDispatch } from "react-redux";

import Drawer from "./components/Drawer";
import CampDetail from "./pages/CampDetail";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import ObjectDetails from "./pages/ObjectDetails";

function App({ isAuth, loading, user }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const notLoggedView = (
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

	const loggedInView = (
		<>
			<Navbar />
			<Drawer>
				<Routes>
					<Route exact path='/' element={<PrivateRoute redirectTo='/login' />}>
						<Route exact path='/' element={<Home />} />
						<Route exact path='/hoteli' element={<Hotels />} />
						<Route path='/hoteli/:hotelID' element={<HotelDetail />} />
						<Route path='/hoteli/:hotelID/:kampID' element={<CampDetail />} />
						<Route
							path='/hoteli/:hotelID/:kampID/:objektID'
							element={<ObjectDetails />}
						/>
					</Route>
					<Route path='/login' element={<Login />} />
				</Routes>
			</Drawer>
		</>
	);

	return <>{!isAuth && !loading ? notLoggedView : loggedInView}</>;
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUser })(App);
