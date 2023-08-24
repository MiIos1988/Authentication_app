import axios from "axios";

export const getAllUser = () => axios.get("/user/get-all-user");

export const changeUserActive = (body) => axios.put("/user/change-user-active", body);

export const changeUserRole = (body) => axios.put("/user/change-user-role", body);
