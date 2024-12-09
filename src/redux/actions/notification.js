import axios from "axios";
import { server } from "../../server";

// user notification
export const userNotification = () => async (dispatch) => {
    try {
        dispatch({
            type: "userNotificationRequest",
        })
        const { data } = await axios.get(`${server}/notifications`, {
            withCredentials: true,
        })
        dispatch({
            type: "userNotificationSuccess",
            payload: data.notifications,
        })
    } catch (error) {
        dispatch({
            type: "userNotificationFail",
            payload: error.response.data.message,
        })
    }
}

