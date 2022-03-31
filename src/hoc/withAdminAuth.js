import { useAdminAuth } from "../customhooks/index";

const WithAdminAuth = (props) => useAdminAuth(props) && props.children;

export default WithAdminAuth;
