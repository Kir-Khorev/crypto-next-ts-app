import axios from "axios";

export default function getATHData() {
    // return dispatch => {
    return axios.get('https://tstapi.cryptorank.io/v0/coins/bitcoin')
        .then(res =>
            // console.log(res)
            res
            // dispatch({
            //     type: "FETCH_ATH_DATA",
            //     data: res.data
            // })
        )
        .then(res => {
            res.data
        })
}
// }