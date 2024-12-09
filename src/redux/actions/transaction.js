import axios from "axios";
import { server } from "../../server";

export const allTransaction = () => async (dispatch) => {
    try {
        dispatch({
            type: "getTransactionsRequest",
        })
        const { data } = await axios.get(`${server}/transactions`,{withCredentials:true});
        dispatch({
            type: "getTransactionsSuccess",
            payload: data.transactions
        })    
    } catch (error) {
        dispatch({
            type: "getTransactionsFail",
            payload: error.response.data.message,
        })
    }
}