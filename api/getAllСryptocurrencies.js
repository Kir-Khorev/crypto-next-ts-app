import axios from "axios";
import { api } from "./apikey";

export default function getAllСryptocurrencies() {
    // return dispatch => {
    return axios.get(api)
            .then(res =>
                res
                // console.log(res)

                // dispatch({
                //     type: "FETCH_CRYPTO_DATA",
                //     data: res.data
                // })
            )
            .then(res => res.data)
    // }
}