import { DeleteUserByID, getAllUsers } from "./api"



const getAllUsersData = async () => {
    const res = await getAllUsers()
    return res?.data;

}
const deleteUser = async (uid) => {
    console.log(uid)
    const res = await DeleteUserByID(uid);
    return res?.data;
}

export const Admin = { getAllUsersData, deleteUser }