import axios from "axios";

export const getAllUser = () => axios.get("/user/get-all-user");
