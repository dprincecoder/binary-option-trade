import userTypes from "./user.types";

const INITIALSTATE = {
	currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
	userError: [],
	userSuccess: [],
	userData: {},
	resetPasswordSuccess: false,
};

const userReducer = (state = INITIALSTATE, action) => {
	switch (action.type) {
		case userTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				userError: [],
			};
		case userTypes.USER_ERROR:
			return {
				...state,
				userError: action.payload,
			};
		case userTypes.USER_SUCCESS:
			return {
				...state,
				userSuccess: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
