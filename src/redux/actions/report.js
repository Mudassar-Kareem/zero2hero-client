import axios from "axios";
import { server } from "../../server";

export const allReport = () => async (dispatch) => {
    try {
        dispatch({
            type: "getReportsRequest",
        })
        const { data } = await axios.get(`${server}/report/getReports`)
        dispatch({
            type: "getReportsSuccess",
            payload: data.reports
        })    
    } catch (error) {
        dispatch({
            type: "getReportsFail",
            payload: error.response.data.message,
        })
    }
}