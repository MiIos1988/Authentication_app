import axios from "axios";

type UserActiveProps = {
    isActive: boolean,
    email: string
}
type UserRoleProps = {
    role: string,
    email: string
}

export const getAllUser = () => axios.get("/user/get-all-user");

export const changeUserActive = (body: UserActiveProps) => axios.put("/user/change-user-active", body);

export const changeUserRole = (body: UserRoleProps) => axios.put("/user/change-user-role", body);
