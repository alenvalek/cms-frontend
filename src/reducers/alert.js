import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
	msg: "",
	alertType: "",
};
// eslint-disable-next-line
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_ALERT:
			return {
				...state,
				msg: payload.msg,
				alertType: payload.alertType,
			};
		case REMOVE_ALERT:
			return {
				...state,
				alertType: payload.alertType,
				msg: payload.msg,
			};
		default:
			return state;
	}
}
