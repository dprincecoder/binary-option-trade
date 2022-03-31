import DB from "../firebase/functions";

// Fetch user from firebase
export const fetchUser = async (userId) => {
	const user = await DB.collection("users").doc(userId).get();
	return user.data();
};
