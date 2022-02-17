import Axios from "axios";

export default Axios.create({
  baseURL: "http://localhost:8181",
  headers: {
    "Content-type": "application/json",
  },
});
