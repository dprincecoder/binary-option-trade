import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserIsAdmin } from "../helpers/isAdmin";

//map current user to state
const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const useAdminAuth = () => {
	const { currentUser } = useSelector(mapState);
	const navigate = useNavigate();
	useEffect(() => {
		if (!checkUserIsAdmin(currentUser)) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	return currentUser;
};

export default useAdminAuth;
