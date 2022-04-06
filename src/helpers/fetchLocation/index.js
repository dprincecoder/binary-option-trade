import axios from "axios";

const geoApiLink = "https://geolocation-db.com/json/";


//creating function to load ip address from the API
export const getUserLocationFn = async () => {
  const res = await axios.get(geoApiLink);
  console.log(res.data);  
  return res.data;
};