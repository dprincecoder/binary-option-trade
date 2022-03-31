import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import Nav from "../header/nav/Nav";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  tradingPackages,
  miningPackages,
} from "../../components/investmentPlans/packages";
import InputForm from "../../helpers/forms/input/Input";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { formatAmount } from "../../helpers/currencyFormat";
import { formatDate, formatDate2, formatDate3 } from "../../helpers/formatDate";
import { formatCoin } from "../../helpers/formatCoin";
import { useDispatch, useSelector } from "react-redux";
import ButtonHandler from "../../helpers/forms/button/ButtonHandler";
import { useParams } from "react-router-dom";
import DB from "../../firebase/functions";
import { Alert, AlertTitle } from "@mui/material";
const activityTabs = [
  {
    id: 1,
    title: "dashboard",
  },
  {
    id: 2,
    title: "New Deposit",
  },
  {
    id: 3,
    title: "deposits",
  },
  {
    id: 4,
    title: "widthdraw",
  },
  {
    id: 5,
    title: "all widthdrawals",
  },
];
const coins = [
  {
    id: 1,
    title: "Bitcoin",
    code: "btc",
    address: "bc1q3k8udaecyxugehjk5mh69h8nzw3duknwmuwavd",
    qr: "https://firebasestorage.googleapis.com/v0/b/binaryoptiontrading.appspot.com/o/coinsQr%2Fbtc.jpeg?alt=media&token=7fb8fcff-2246-4ee5-8e33-798cc06f976b",
  },
  {
    id: 2,
    title: "Ethereum",
    code: "eth",
    address: "0x3EDe0154624F1096295f5b26dBc832f95e617952",
    qr: "https://firebasestorage.googleapis.com/v0/b/binaryoptiontrading.appspot.com/o/coinsQr%2Feth.jpeg?alt=media&token=ff9f8d21-feba-4e9d-99dc-f93e7be716b8",
  },
  {
    id: 3,
    title: "Usdt",
    code: "usdt",
    address: "TUmDSrUGQWvUm1Ln9Fc97SaP1ZkUzDjGzD",
    qr: "https://firebasestorage.googleapis.com/v0/b/binaryoptiontrading.appspot.com/o/coinsQr%2Fusdt.jpeg?alt=media&token=4b2c0db4-e276-4688-a637-c146cb80212f",
  },
  {
    id: 4,
    title: "Doge",
    code: "doge",
    address: "D6yDxkrjZF8E72HdHJV5tmrsVyzLfM2mR3",
    qr: "https://firebasestorage.googleapis.com/v0/b/binaryoptiontrading.appspot.com/o/coinsQr%2Fdoge.jpeg?alt=media&token=19147218-6a98-4c22-b203-ab301d4aff39",
  },
  {
    id: 5,
    title: "BNB SmartChain",
    code: "bnb",
    address: "0x3EDe0154624F1096295f5b26dBc832f95e617952",
    qr: "https://firebasestorage.googleapis.com/v0/b/binaryoptiontrading.appspot.com/o/coinsQr%2Fbnb.jpeg?alt=media&token=ac10d3dd-f233-43b5-bfc7-0303e29e9f2a",
  },
  {
    id: 6,
    title: "Tron",
    code: "tron",
    address: "TUmDSrUGQWvUm1Ln9Fc97SaP1ZkUzDjGzD",
    qr: "https://firebasestorage.googleapis.com/v0/b/binaryoptiontrading.appspot.com/o/coinsQr%2Ftron.jpeg?alt=media&token=fedd4151-bcda-4a21-beb8-ca35a83d9fd6",
  },
];
const allDeposits = [
  {
    id: 1,
    amount: 500,
    amountInCoin: 0.0312,
    coin: "btc",
    status: "approved",
    date: new Date(),
  },
  {
    id: 2,
    amount: 5000,
    amountInCoin: 1.0312,
    coin: "eth",
    status: "pending",
    date: new Date(),
  },
  {
    id: 3,
    amount: 100000,
    amountInCoin: 2.1312,
    coin: "usdt",
    status: "declined",
    date: new Date(),
  },
];
const allWithdrawals = [
  {
    id: 1,
    amount: 500,
    amountInCoin: 0.0312,
    coin: "btc",
    status: "approved",
    date: new Date(),
  },
  {
    id: 2,
    amount: 5000,
    amountInCoin: 1.0312,
    coin: "eth",
    status: "pending",
    date: new Date(),
  },
  {
    id: 3,
    amount: 100000,
    amountInCoin: 2.1312,
    coin: "usdt",
    status: "declined",
    date: new Date(),
  },
];

const coinLink =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const geoApiLink = "https://geolocation-db.com/json/";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const Dashboard = () => {
  const { currentUser } = useSelector(mapState);
  const { fullName, username, email, createdAt } = currentUser;
  const [fetchedCoin, setFetchedCoin] = useState([]);
  const [toggleTabs, setToggleTabs] = useState(2);
  const [tradingMinRate, setTradingMinRate] = useState(0);
  const [tradingMaxRate, setTradingMaxRate] = useState(0);
  const [activeDeposit, setActiveDeposit] = useState(false);

  const [miningMinRate, setMiningMinRate] = useState(200);
  const [selectedCoin, setSelectedCoin] = useState("btc");
  const [amount, setAmount] = useState(0);
  const [planValues, setPlanValues] = useState({});
  const [depositArr, setDepositArr] = useState([]);
  const [addressCopied, setAddressCopied] = useState("");
  const [getUserLocation, setGetUserLocation] = useState({});
  const [userInvestment, setUserInvestment] = useState({});
  const [userInvestmentCoins, setUserInvestmentCoins] = useState([]);
  const [transactionReceivedAnimation, seTtransactionReceivedAnimation] =
    useState(false);
  const addressRef = useRef();
  const { userId } = useParams();

  useEffect(() => {
    DB.collection("usersInvestment")
      .doc(userId)
      .get()
      .then((doc) => {
        setUserInvestment(doc.data());
      });
    DB.collection("usersInvestment")
      .doc(userId)
      .collection("coins")
      .onSnapshot((snapshot) => {
        setUserInvestmentCoins(
          snapshot.docs.map((doc) => ({ coinId: doc.id, ...doc.data() }))
        );
      });
  }, []);

  const getSelectedPlan = (from, to, percentage, id, title) => {
    const obj = { from, to, percentage, id, title };
    setPlanValues(obj);
    const newArr = [{ from, to, percentage, id, title, amount, selectedCoin }];

    setDepositArr(newArr);
    return newArr;
  };

  const handleCoinChange = (e) => {
    setSelectedCoin(e.target.value);
    const { from, to, percentage, id, title } = planValues;
    getSelectedPlan(from, to, percentage, id, title);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    const { from, to, percentage, id, title } = planValues;
    getSelectedPlan(from, to, percentage, id, title);
  };

  // console.log(coinsData);
  const fetchCoin = async () => {
    const allCoins = await axios.get(coinLink);
    setFetchedCoin(allCoins.data);
  };

  const localDB = JSON.parse(localStorage.getItem(username || fullName));
  useEffect(() => {
    fetchCoin();
  }, []);
  //get specific coin by symbol
  const getCoinAmount = (symbol) => {
    return fetchedCoin.filter((coin) => coin.symbol === symbol);
  };

  //get new date in words
  const currentDate = new Date();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(addressRef.current.textContent);
    setAddressCopied(addressRef.current.textContent);
  };

  const getCoinInfoByTheCoinSymbol = (selectedCoin) => {
    return coins.filter((coin) => coin.code === selectedCoin);
  };

  //creating function to load ip address from the API
  const getUserLocationFn = async () => {
    const res = await axios.get(geoApiLink);
    setGetUserLocation(res.data);
  };

  useEffect(() => {
    getUserLocationFn();
  }, []);

  const withdrawEarnings = async () => {
    setActiveDeposit(!activeDeposit);
  };

  //function to check for already exist coin
  const existingCoin = (nextCoin) => {
    return userInvestmentCoins.filter((coin) => coin.coinName === nextCoin);
  };

  const userAmountToCoin = formatCoin(
    getCoinAmount(selectedCoin).map((itm) => itm.current_price),
    depositArr.map((item) => item.amount)
  );

  const userProfit = depositArr.map((itm) => {
    const { amount, percentage } = itm;
    return Number(amount) * Number(percentage);
  });

  //fn to change str to num and add both
  const sum = (str1, str2) => {
    return Number(str1) + Number(str2);
  };

  const existCoin = (nextCoin) => {
    return localDB.filter((coin) => coin.coinName === nextCoin);
  };

  const addUserCoinToLocalDB = (nextCoinItem) => {
    const coinIncrements = localDB.map((i) => i.qty).toString();
    const coinExists = existCoin(selectedCoin);
    if (coinExists) {
      return localDB.map((coinItem) =>
        coinItem.coinName == nextCoinItem.coinName
          ? { ...coinItem, qty: coinItem.qty + coinIncrements }
          : coinItem
      );
    }

    return [...localDB, { ...nextCoinItem, qty: coinIncrements }];
  };

  const nextCoinItem = {
    userName: username || fullName,
    userId,
    coinName: selectedCoin,
    qty: userAmountToCoin,
    activeAmount: depositArr.map((item) => item.amount).toString(),
    activeProfit: userProfit.toString(),
    date: currentDate,
  };

  const transactionObj = () => {
    const coinExists = existingCoin(selectedCoin);

    const coinDataId = coinExists.map((i) => i.coinId);

    DB.collection("usersInvestment")
      .doc(userId)
      .update({
        username: username || fullName,
        userId,
        activeProfit: sum(userInvestment.activeProfit, userProfit.toString()),
        activeAmount: sum(
          userInvestment.activeAmount,
          depositArr.map((item) => item.amount).toString()
        ),
        date: currentDate,
      });

    if (coinExists) {
      coinExists.map((coinItem) => {
        DB.collection("usersInvestment")
          .doc(userId)
          .collection("coins")
          .doc(coinDataId.join(" "))
          .set({
            ...coinItem,
            qty: sum(coinItem.qty, userAmountToCoin),
          });
      });
    }

    DB.collection("usersInvestment")
      .doc(userId)
      .collection("coins")
      .doc()
      .set({
        coinName: selectedCoin,
        qty: Number(userAmountToCoin),
      });

    // return userInvestmentCoins.map((coinItem) =>
    //   coinItem.name == selectedCoin
    //     ? {
    //         ...coinItem,
    //         qty: Number(coinItem.qty) + Number(userAmountToCoin),
    //       }
    //     : coinItem
    // );
    // } else {
    //   return {
    //     // ...userInvestments.coins,
    //     ...nextCoinItem,
    //   };
    // }
  };

  const confirmTransaction = async () => {
    seTtransactionReceivedAnimation(true);
    // transactionObj();
    localStorage.setItem(
      username || fullName,
      JSON.stringify(addUserCoinToLocalDB(nextCoinItem))
    );
    setTimeout(() => {
      window.location.reload();
    }, 10000);
    // console.log(obj);
    // DB.collection("usersInvestment").doc(userId).set(obj);
  };

  return (
    <div
      className={`dashboard ${
        transactionReceivedAnimation ? "animate-in" : "animate-out"
      }`}
    >
      <Nav />
      <div className="dashboard-container">
        <div className="left-dash">
          <div className="left-dash-header">
            <div className="left-dash-header-name box-sh">
              <h1>
                {fullName || username ? fullName || username : "Binary User"}
              </h1>
            </div>
            <div className="left-dash-header-bal box-sh">
              <h4>Active Balance</h4>
              <p>{formatAmount(Number(userInvestment.activeAmount))}</p>
            </div>
            <div className="left-dash-header-bal box-sh">
              <h4>Active Profit</h4>
              <p>{formatAmount(Number(userInvestment.activeProfit))} </p>
            </div>
          </div>
          <div className="left-dash-icons-holder">
            <div className="">
              <div className="left-dash-icon box-sh">
                <CheckCircleIcon />
                <span className="left-dash-icon-span">Email: {email}</span>
              </div>
              <div className="left-dash-icon box-sh">
                <CheckCircleIcon />
                <span className="left-dash-icon-span">
                  Joined: {formatDate3(createdAt)}
                </span>
              </div>
              <div className="left-dash-icon box-sh">
                <CheckCircleIcon />
                <span className="left-dash-icon-span">
                  Registered IP: {getUserLocation.IPv4}
                </span>
              </div>
              <div className="left-dash-icon box-sh">
                <CheckCircleIcon />
                <span className="left-dash-icon-span">Your Upline: NONE</span>
              </div>
            </div>
          </div>
          <div className="left-dash-assets">
            <div className="left-dash-assets-title box-sh">
              <h2>Assets</h2>
            </div>
            {userInvestmentCoins.length > 0 ? (
              <>
                {userInvestmentCoins.map((coin) => {
                  const { coinId, qty, coinName } = coin;
                  return (
                    <div className="left-dash-assets-asset box-sh" key={coinId}>
                      <h2>{coinName}</h2>
                      <p>{qty}</p>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="left-dash-assets-asset box-sh">
                  <h2>No Assets found</h2>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="right-dash">
          <div className="right-dash-wel-title">
            <h3>Welcome Back</h3>
            <p>Active</p>
          </div>
          <div className="right-dash-activity-tab">
            <ul className="right-dash-activity-tab-list">
              {activityTabs.map((itm) => (
                <li
                  onClick={() => {
                    setToggleTabs(itm.id);
                  }}
                  className={`right-dash-activity-tab-item ${
                    toggleTabs === itm.id ? "right-dash-tab-active" : "tab"
                  }`}
                  key={itm.id}
                >
                  {itm.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="right-dash-switchtab ">
            <div
              className={`${
                toggleTabs === 1 ? "active-content" : "content-container"
              }`}
            >
              {!activeDeposit && (
                <>
                  <div className="right-dash-transaction-title">
                    <h4>Transactions</h4>
                    <div className=""></div>
                  </div>
                  <div className="right-dash-switchtab-wraper">
                    <div className="right-dash-transaction-deposit">
                      <div className="right-dash-transaction-deposit-title">
                        Deposits Information
                      </div>
                      <div className="right-dash-transaction-deposit-info-items">
                        <div className="right-dash-transaction-deposit-info-items-list">
                          <p>Total Deposits</p>
                          <small>$00.000</small>
                        </div>
                        <div className="right-dash-transaction-deposit-info-items-list">
                          <p>Active Deposits</p>
                          <small>$00.000</small>
                        </div>
                        <div className="right-dash-transaction-deposit-info-items-list">
                          <p>Last Deposits</p>
                          <small>$00.000</small>
                        </div>
                      </div>
                    </div>
                    <div className="right-dash-transaction-withdrawal">
                      <div className="right-dash-transaction-withdrawal-title">
                        Withdrawals Information
                      </div>
                      <div className="right-dash-transaction-withdrawal-info-items">
                        <div className="right-dash-transaction-withdrawal-info-items-list">
                          <p>Total Withdrawal</p>
                          <small>$00.000</small>
                        </div>
                        <div className="right-dash-transaction-withdrawal-info-items-list">
                          <p>Pending Withdrawal</p>
                          <small>$00.000</small>
                        </div>
                        <div className="right-dash-transaction-withdrawal-info-items-list">
                          <p>Last Withdrawal</p>
                          <small>$00.000</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className={`right-dash-deposit-container ${
                toggleTabs === 2 ? "active-content" : "content-container"
              }`}
            >
              {!activeDeposit && (
                <>
                  <div className="right-dash-deposit-title">
                    <h4>Select Package</h4>
                    <div className=""></div>
                  </div>
                  <p className="right-dash-deposit-sample-txt">Trading Plans</p>
                  <small>
                    Please select one plan and invest one at a time for maximum
                    record
                  </small>
                  <div className="right-dash-deposit-grid">
                    {tradingPackages.map((itm) => {
                      const { id, percentage, percentSymbol, title, rate } =
                        itm;
                      const { from, to } = rate;
                      return (
                        <div className="right-deposit-selection" key={id}>
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={() => {
                              getSelectedPlan(from, to, percentage, id, title);
                            }}
                          />
                          <div className="right-dash-deposit-selection-info-items">
                            <div className="right-dash-deposit-selection-info-items-list">
                              <p>Plan</p>
                              <small>{title}</small>
                            </div>
                            <div className="right-dash-deposit-selection-info-items-list">
                              <p>Amount</p>
                              <small>
                                {formatAmount(from)} - {formatAmount(to)}
                              </small>
                            </div>
                            <div className="right-dash-deposit-selection-info-items-list">
                              <p>Daily profit</p>
                              <small>
                                {percentage}
                                {percentSymbol}
                              </small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="right-dash-deposit-sample-txt">Mining Plans</p>
                  <div className="right-dash-deposit-grid">
                    {miningPackages.map((itm) => {
                      const { id, percentage, percentSymbol, title, rate } =
                        itm;
                      const { from, to } = rate;
                      return (
                        <div className="right-deposit-selection" key={id}>
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            onChange={() =>
                              // setMiningMinRate(
                              // 	parseInt(miningMinRate + rate.from)
                              // )
                              getSelectedPlan(from, to, percentage, id, title)
                            }
                          />
                          <div className="right-dash-deposit-selection-info-items">
                            <div className="right-dash-deposit-selection-info-items-list">
                              <p>Plan</p>
                              <small>{title}</small>
                            </div>
                            <div className="right-dash-deposit-selection-info-items-list">
                              <p>Amount</p>
                              <small>
                                {rate.currency}
                                {rate.from} - {rate.currency}
                                {rate.to}
                              </small>
                            </div>
                            <div className="right-dash-deposit-selection-info-items-list">
                              <p>Daily profit</p>
                              <small>
                                {percentage}
                                {percentSymbol}
                              </small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="right-dash-deposit-inputs">
                    <div className="right-dash-deposit-input-wrapper">
                      <InputForm
                        label="Amount($)"
                        type="number"
                        min={planValues.from}
                        max={planValues.to}
                        handleChange={(e) => handleAmountChange(e)}
                      />
                    </div>
                    <div className="right-dash-deposit-input-wrapper">
                      <select
                        className="right-dash-deposit-select"
                        value={selectedCoin}
                        onChange={
                          (e) => handleCoinChange(e)
                          // setSelectedCoin(e.target.value);
                          // setAmount(e.target.value);
                          // setInputMin(e.target.value);
                        }
                      >
                        {coins.map((e) => (
                          <option key={e.id} value={e.code}>
                            {e.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <ButtonHandler
                    text="Submit"
                    onClick={() => setActiveDeposit(!activeDeposit)}
                  />
                </>
              )}
            </div>

            <div
              className={`${
                toggleTabs === 3 ? "active-content" : "content-container"
              }`}
            >
              {!activeDeposit && (
                <>
                  {" "}
                  <div className="right-dash-transaction-title">
                    <h4>Deposits</h4>
                    <div className=""></div>
                  </div>
                  <div className="right-dash-deposits-grid">
                    {allDeposits.length > 0 ? (
                      <>
                        {allDeposits.map((dep) => (
                          <div
                            className="right-dash-deposits-info-container"
                            key={dep.id}
                          >
                            <div
                              className="right-dash-deposits-info-items"
                              key={dep.id}
                            >
                              <div className="right-dash-deposits-info-items-list">
                                <p>Amount</p>
                                <small>{formatAmount(dep.amount)}</small>
                              </div>
                              <div className="right-dash-deposits-info-items-list">
                                <p>Coin Amount</p>
                                <small>{formatAmount(dep.amountInCoin)}</small>
                              </div>
                              <div className="right-dash-deposits-info-items-list">
                                <p>Status</p>
                                <small
                                  className={`${
                                    dep.status === "approved"
                                      ? "status-approved"
                                      : "status-failed"
                                  }`}
                                >
                                  {dep.status}
                                </small>
                              </div>
                              <div className="right-dash-deposits-info-items-list">
                                <p>Date Initiated</p>
                                <small>{formatDate(dep.date)}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="right-dash-deposits-info-container">
                        <div className="right-dash-deposits-info-items">
                          <p>All Amount deposits will be shown here!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div
              className={`${
                toggleTabs === 4 ? "active-content" : "content-container"
              }`}
            >
              {!activeDeposit && (
                <>
                  <div className="right-dash-transaction-title">
                    <h4>Withdraw Earnings</h4>
                    <div className=""></div>
                  </div>
                  <div className="right-dash-deposits-grid">
                    <div className="right-dash-deposits-info-container">
                      <div className="right-dash-deposits-info-items">
                        <InputForm label="Amount($)" />
                      </div>
                    </div>
                    <div className="right-dash-deposits-info-container">
                      <div className="right-dash-deposits-info-items">
                        <InputForm label="Wallet Address" />
                      </div>
                    </div>
                  </div>
                  <ButtonHandler
                    text="Withdraw"
                    variant="contained"
                    onClick={withdrawEarnings}
                  />
                </>
              )}
            </div>
            <div
              className={`${
                toggleTabs === 5 ? "active-content" : "content-container"
              }`}
            >
              {!activeDeposit && (
                <>
                  <div className="right-dash-transaction-title">
                    <h4>Withdrawals</h4>
                    <div className=""></div>
                  </div>
                  <div className="right-dash-deposits-grid">
                    {allWithdrawals.length > 0 ? (
                      <>
                        {allWithdrawals.map((dep) => (
                          <div
                            className="right-dash-deposits-info-container"
                            key={dep.id}
                          >
                            <div
                              className="right-dash-deposits-info-items"
                              key={dep.id}
                            >
                              <div className="right-dash-deposits-info-items-list">
                                <p>Amount</p>
                                <small>{formatAmount(dep.amount)}</small>
                              </div>
                              <div className="right-dash-deposits-info-items-list">
                                <p>Coin Amount</p>
                                <small>{formatAmount(dep.amountInCoin)}</small>
                              </div>
                              <div className="right-dash-deposits-info-items-list">
                                <p>Status</p>
                                <small
                                  className={`${
                                    dep.status === "approved"
                                      ? "status-approved"
                                      : "status-failed"
                                  }`}
                                >
                                  {dep.status}
                                </small>
                              </div>
                              <div className="right-dash-deposits-info-items-list">
                                <p>Date Initiated</p>
                                <small>{formatDate(dep.date)}</small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="right-dash-deposits-info-container">
                        <div className="right-dash-deposits-info-items">
                          <p>All Withdrawals will be shown here!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div
              className={`${
                activeDeposit ? "active-content" : "content-container"
              }`}
            >
              <div className="right-dash-transaction-title">
                <h4>Confirm Deposit</h4>
                <div className=""></div>
              </div>
              <div className="right-dash-switchtab-wraper">
                <div className="right-dash-transaction-deposit bg-bluish">
                  <div className="right-dash-transaction-deposit-title center">
                    Deposits Information
                  </div>
                  <div className="right-dash-transaction-deposit-info-items ">
                    {depositArr.map((itm) => {
                      const {
                        from,
                        to,
                        percentage,
                        id,
                        title,
                        amount,
                        selectedCoin,
                      } = itm;
                      return (
                        <div key={id}>
                          <div className="right-dash-transaction-deposit-info-items-list">
                            <p>Plan</p>
                            <small>{title}</small>
                          </div>
                          <div className="right-dash-transaction-deposit-info-items-list">
                            <p>Profit</p>
                            <small>
                              {formatAmount(
                                Number(amount) * Number(percentage)
                              )}
                            </small>
                          </div>
                          <div className="right-dash-transaction-deposit-info-items-list">
                            <p>Principal Return</p>
                            <small>YES</small>
                          </div>
                          <div className="right-dash-transaction-deposit-info-items-list">
                            <p>Principal Withdraw</p>
                            <small>YES</small>
                          </div>
                          <div className="right-dash-transaction-deposit-info-items-list">
                            <p>Amount in (cash)</p>
                            <small>{formatAmount(Number(amount))}</small>
                          </div>
                          <div className="right-dash-transaction-deposit-info-items-list">
                            <p>Amount in (coin)</p>
                            <small>
                              {formatCoin(
                                getCoinAmount(selectedCoin).map(
                                  (itm) => itm.current_price
                                ),
                                amount
                              )}
                            </small>
                          </div>
                          <div className="right-dash-transaction-deposit-info-items-list">
                            <p>Date Initiated</p>
                            <small>{formatDate(currentDate)}</small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="right-dash-transaction-withdrawal">
                  {getCoinInfoByTheCoinSymbol(selectedCoin).map((item) => {
                    const { id, title, address, qr } = item;
                    return (
                      <div key={id}>
                        <div className="right-dash-transaction-withdrawal-title center">
                          {title} deposit
                        </div>
                        <div className="right-dash-transaction-withdrawal-info-items">
                          <div className="right-dash-transaction-withdrawal-info-items-list">
                            <p>Please send Exactly</p>
                            <small
                              style={{
                                color: "#037fff",
                                fontSize: "1.5rem",
                                padding: "10px",
                              }}
                            >
                              {formatAmount(
                                depositArr.map((i) => Number(i.amount))
                              )}
                            </small>
                          </div>
                          <div className="right-dash-transaction-withdrawal-info-items-list">
                            <p>To below address to complete the transaction</p>
                            <div className="right-dash-transaction-withdrawal-info-items-list-copy-address">
                              <small ref={addressRef}>{address}</small>
                              <button onClick={copyToClipboard}>
                                <ContentCopyIcon />
                              </button>
                            </div>
                            {addressCopied && (
                              <p style={{ color: "green" }}>Address Copied!!</p>
                            )}
                          </div>
                          <div className="right-dash-transaction-withdrawal-info-items-list">
                            <p>
                              Or scan this QR code to complete the transaction
                            </p>
                            <div className="right-dash-transaction-withdrawal-info-items-list-img-wrapper">
                              <img
                                src={qr}
                                alt="coin qr code address"
                                className="right-dash-transaction-withdrawal-info-items-list-img"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="right-dash-deposit-inputs">
                <ButtonHandler
                  text="Cancel Transaction"
                  themeColor="error"
                  variant="contained"
                  // color="red"
                  onClick={() => window.location.reload()}
                />

                <ButtonHandler
                  text="Confirm Transaction"
                  themeColor="success"
                  variant="contained"
                  onClick={confirmTransaction}
                />
              </div>
              {
                <div className="right-dash-transaction-withdrawal-info-items-list-copy-addrss animate-container">
                  <Alert severity="success" className="animate-div">
                    <AlertTitle>Transaction Received</AlertTitle>
                    We have received your transaction request, we will process
                    it within 7 business days. Mean while your transactions will
                    be displayed in your dashboard while we process it!
                  </Alert>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
