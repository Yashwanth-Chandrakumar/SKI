import { authService } from "./auth"
import { UserData } from "./api";

const email = authService.getUserEmail();

const getUserData = async () => {
    const res = await UserData(email)
    console.log('ww')
    return res?.data;

}
const getPassword = async () => {
    const res = await getUserData()
    return res?.password;
}


export const User = {getUserData, getPassword };