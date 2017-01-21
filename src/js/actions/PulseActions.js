import dispatcher from "../dispatcher";
import axios from "axios";

export function updatePulseAddress(url) {
    dispatcher.dispatch({
        type: "UPDATE_PULSE_ADDRESS",
        url: url
    });
}

export function downloadErrorGroupsList(url, grouByMessageType) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        state: "Loading..."
    });
    //http://localhost:33333/api/recoverability/groups
    var errorAPI = url + "/api/recoverability/groups"; 
    if(grouByMessageType==="messagetype")
        errorAPI = errorAPI + "/Message%20Type";
    axios(errorAPI).then((response) => {
        //console.log("Received: ", errorAPI, response);
       dispatcher.dispatch({
            type: "DOWNLOADED_ERROR_LIST",
            response: response,
            responseType: "groupList"
        }); 
    }).catch((err) => {
        dispatcher.dispatch({
            type: "DOWNLOADED_ERROR_LIST",
            response: {
                data: [
                    {
                        id: "123-456",
                        count: 50,
                        title: "InvalidOperationException"
                    },
                    {
                        id: "123-789",
                        count: 24,
                        title: errorAPI
                    }
                ]
            },
            responseType: "groupList"
        });
    });
}