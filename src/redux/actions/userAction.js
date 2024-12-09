import axios from "axios";
import { server } from "../../server";

// load user

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        })
        const { data } = await axios.get(`${server}/user/me`, {
            withCredentials: true,
        })
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response.data.message,
        })
    }
}

// get all user

export const getAllUser = () => async (dispatch) =>{
    try {
        dispatch({
            type: "getAllUsersRequest",
        })
        const {data} = await axios.get(`${server}/user/getUsers`)
        dispatch({
            type: "getAllUsersSuccess",
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: "getAllUsersFail",
            payload: error.response.data.message,
        })
    }
}