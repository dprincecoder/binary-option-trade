import DB from "../../firebase/functions";

//helper function to fetch useer from db
export const handleFetchUser = (userId) => {
	return new Promise((resolve, reject) => {
		DB.collection("users")
			.doc(userId)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					resolve(snapshot.data());
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};
