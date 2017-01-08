import dispatcher from "../dispatcher";
import axios from "axios";

export function updatePulseAddress(url) {
    dispatcher.dispatch({
        type: "UPDATE_PULSE_ADDRESS",
        url: url
    });
}

export function downloadErrorGroupsList(url) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        state: "Loading..."
    });
    //http://localhost:33333/api/recoverability/groups
    const errorAPI = url + "/api/recoverability/groups"; 
    axios(errorAPI).then((response) => {
        console.log("Received: ", response);
       dispatcher.dispatch({
            type: "DOWNLOADED_ERROR_LIST",
            response: response,
            responseType: "groupList"
        }); 
    }).catch((err) => {
        //TODO
    });
}

export function downloadErrorList(url, groupId) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        state: "Loading..."
    });
    //http://localhost:33333/api/recoverability/groups
    const errorAPI = url + "/api/recoverability/groups/" + groupId; 
    axios(errorAPI).then((response) => {
        console.log("Received: ", response);
       dispatcher.dispatch({
            type: "DOWNLOADED_ERROR_LIST",
            response: response,
            responseType: "messageList"
        }); 
    }).catch((err) => {
        //TODO
    });
}

export function fakeDownloadErrorList(url) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        state: "Loading..."
    });
    setTimeout(()=>{
        dispatcher.dispatch({
            type: "DOWNLOADED_ERROR_LIST",
            response: [
                {errorMessage: "ArgumentNullException: idArticle"},
                {errorMessage: "ArgumentNullException: idOrder"},
                {errorMessage: "ArgumentException: idArticle is wrong"},
                {errorMessage: "GenericException: idOrder"}
            ],
            status: "Loaded"
        });
    }, 5000);
}