import React, { useEffect, useState } from "react";
import "./admin.css";
import ButtonHandler from "../../helpers/forms/button/ButtonHandler";
import Nav from "../header/nav/Nav";
import {
  AdminPanelSettings,
  Group,
  NotAccessibleOutlined,
  TipsAndUpdates,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import DB from "../../firebase/functions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const AdminManagement = () => {
  const { currentUser } = useSelector(mapState);
  const { fullName, username, email, createdAt } = currentUser;
  const [userInvestment, setUserInvestment] = useState({});
  const [userInvestmentCoins, setUserInvestmentCoins] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userUID, setUserUID] = useState("");
  const [deleteUser, setDeleteUser] = useState(false)
  useEffect(() => {
    // if (userUID) {
    //   DB.collection("usersInvestment")
    //     .doc(userUID)
    //     .get()
    //     .then((doc) => {
    //       setUserInvestment(doc.data());
    //     });
    //   DB.collection("usersInvestment")
    //     .doc(userUID)
    //     .collection("coins")
    //     .onSnapshot((snapshot) => {
    //       setUserInvestmentCoins(
    //         snapshot.docs.map((doc) => ({ coinId: doc.id, ...doc.data() }))
    //       );
    //     });
    // }
    DB.collection("users").onSnapshot((snapshot) => {
      setAllUsers(
        snapshot.docs.map((doc) => ({ userId: doc.id, ...doc.data() }))
      );
    });
  }, []);

  const getUserIdFn = (id) => {
    setUserUID(id);
    DB.collection("usersInvestment")
      .doc(id)
      .get()
      .then((doc) => {
        setUserInvestment(doc.data());
      });
    DB.collection("usersInvestment")
      .doc(id)
      .collection("coins")
      .onSnapshot((snapshot) => {
        setUserInvestmentCoins(
          snapshot.docs.map((doc) => ({ coinId: doc.id, ...doc.data() }))
        );
      });
  };
  const clearWarning = () => {
    setDeleteUser(true)
    setTimeout(() => {
      setDeleteUser(false)
    }, 10000);
  }
  return (
    <div className={`admin ${deleteUser ? "delete-active" : ""}`}>
      <Nav />
      <div className="admin-panel">
        <div className="leftbar">
          <h1 className="leftbar-title">Admin Panel</h1>
          <div className="leftbar-wrapper">
            <h3 className="leftbar-wrapper-title">
              User Management Tips <TipsAndUpdates className="tipicon" />
            </h3>
            <ul className="leftbar-list">
              <li className="leftbar-list-item">
                All registered users will be shown here
              </li>
              <li className="leftbar-list-item">Manage users</li>
              <li className="leftbar-list-item">Delete users</li>
              <li className="leftbar-list-item">Block users</li>
              <li className="leftbar-list-item">
                See users investment history
              </li>
            </ul>
          </div>
        </div>
        <div className="rightbar">
          <div className="right-cover">
            <h2 className="rightbar-title">
              Admin Welcome <AdminPanelSettings style={{ color: "green" }} />
            </h2>
            <h3 className="rightbar-title">
              Actions <NotAccessibleOutlined style={{ color: "red" }} />
            </h3>
          </div>
          <div className="rightbar-wrapper">
            <div className="rightbar-wrappercon">
              <h3 className="right-wrapper-title">
                Users <Group style={{ color: "gold" }} />{" "}
              </h3>
              <div className=""></div>
            </div>
            {allUsers.map((itm, id) => {
              const { fullName, username, userId, email, ipAddress, location, password } =
                itm;

              return (
                <div className="rightbar-user-container" key={id}>
                  <div className="user-details-wrapper">
                    <div className="user-image-wrapper">
                      <img
                        src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_1280.png"
                        alt="user avatar"
                        className="userimg"
                      />
                    </div>
                    <div className="username-wrapper">
                      <h3 className='username'>Username: {username || fullName}</h3>
                      <p>IP: {ipAddress}</p>
                      <p>Location: {location}</p>
                      <p>Email: {email}</p>
                      <p>UserId: {userId}</p>
                      <p>Password: {password}</p>

                    </div>
                  </div>
                  {/* <div className="usermore-action-btn">
                    <div className="user-investment-details">
                      <div className="user-investment-details-amount">
                        <h4>Amount invested up to date</h4>
                        <h3>$50,000</h3>
                      </div>
                      <div className="user-investment-details-coins">
                        <ButtonHandler
                          text="show coins"
                          variant="contained"
                          themeColor="success"
                          onClick={() => getUserIdFn(userId)}
                        />
                        <h4>All Coins </h4>
                        <div className="coins-wrapper">
                          {userInvestmentCoins.length > 0 ? (
                            userInvestmentCoins.map((item) => (
                              <>
                                <p>{item.coinName}</p>
                                <p>{item.qty}</p>
                              </>
                            ))
                          ) : (
                            <>
                              {" "}
                              <p>No Coins</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="delete-warn">
                    <p>
                      Sorry! You can't directly delete this user here, first
                      login in with this user details then you can delete this
                      user, and all it's Data.
                    </p>
                  </div>
                  <div className="usermore-action-delete-btn">
                    <ButtonHandler
                      text="Delete User"
                      variant="contained"
							  themeColor="error"
							  onClick={() => setDeleteUser(() => clearWarning())}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
