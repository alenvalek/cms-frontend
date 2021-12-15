import {
	REGISTER_FAIL,
	REGISTER_SUCESS,
	AUTH_ERROR,
	USER_LOADED,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const loadUser = () => async (disptach) => {
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
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post("/");
	} catch (error) {}
};
