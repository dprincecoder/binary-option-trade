import { all, call } from "redux-saga/effects";
import userSagas from "./user/user.sagas";

//call the saga to watch for actions
export default function* rootSaga() {
	yield all([call(userSagas)]);
}
