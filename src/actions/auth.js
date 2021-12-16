import {
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("/api/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// login

export const loginUser = (email, password) => async (dispatch) => {
	const config = {
		header: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post("/api/auth", { email, password }, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (error) {
		if (error) {
			dispatch(setAlert(error.msg, "danger", 5000));
		}
		dispatch({ type: LOGIN_FAIL });
	}
};

// logout

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
