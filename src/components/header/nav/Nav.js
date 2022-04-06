import React, { useState } from "react";
import "./nav.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../../redux/user/user.actions";
import DB, { auth } from "../../../firebase/functions";
import ButtonHandler from "../../../helpers/forms/button/ButtonHandler";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const Nav = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector(mapState);
  const { email } = currentUser || {};
  const [startDel, setStartDel] = useState(false);

  const logoutUser = () => {
    dispatch(signOutUserStart());
  };

  const startDeleteUser = () => {
    setStartDel(true);
  }

  const deleteUser = () => {
    let batch = DB.batch();
    DB.collection("usersInvestment")
      .doc(currentUser.id)
      .collection("coins")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          const ids = doc.id;
          console.log(ids);
          return batch.delete(ids);
        });
      });
    batch.commit();
    DB.collection("users")
      .doc(currentUser.id)
      .delete()
      .then(() => {
        DB.collection("usersInvestment").doc(currentUser.id).delete();
      })
      .then(() => {
        DB.collection("deletedUsers").doc(currentUser.id).set({
          email: email,
          id: currentUser.id,
        });
      })
      .then(() => {
        auth.currentUser.delete().then(() => {
          dispatch(signOutUserStart());
        });
      });
    // batch.commit();
  };
  return (
    <div className={`nav ${toggle ? "active" : ""}`}>
      {currentUser?.userRoles?.includes("admin") && (
        <div className="my-admin-nav">
          <Link to="/admin/manage-users">my admin</Link>
        </div>
      )}
      <div className={`nav-items ${startDel ? 'show-del' : ''}`}>
        <Link to="/" className="nav-logo">
          <h1>Binary</h1>
          <div>
            <h2 className="sml-txt">Options trade</h2>
          </div>
        </Link>
        <ul className="nav-ul">
          <Link to="/" className="nav-list active">
            Home
          </Link>
          <Link to="/contact" className="nav-list active">
            Contact us
          </Link>
          {!currentUser && (
            <Link to="/login" className="nav-list active login">
              Login
            </Link>
          )}
          {currentUser ? (
            <>
              <div
                className="register"
                onClick={logoutUser}
                style={{ marginRight: "5px", marginBottom: "5px" }}
              >
                <li className="nav-lis ">Logout</li>
              </div>

              <div className="register" onClick={startDeleteUser}>
                <li className="nav-lis ">Delete Account</li>
              </div>
            </>
          ) : (
            <Link to="/signup" className="register">
              <li className="nav-lis ">Get Started</li>
            </Link>
          )}
        </ul>
        <div className="bar" onClick={() => setToggle(!toggle)}>
          <MenuIcon />
        </div>
        <div className="delete-user-warn">
          <p className="l">
            Are you sure you want to delete your account? This cannot be undone
            and account creation from this address will denied.
          </p>
          <div className="delete-user-btn">
            <ButtonHandler
              text="confirm" onClick={deleteUser}
              variant="contained"
              themeColor="error"
              style={{ margin: "5px" }}
            />
            <ButtonHandler
              text="cancel" onClick={() => window.location.reload()}
              variant="contained"
              themeColor="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
