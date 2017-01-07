import dispatcher from "../dispatcher";
import axios from "axios";

export function updatePulseAddress(url) {
    dispatcher.dispatch({
        type: "UPDATE_PULSE_ADDRESS",
        url: url
    });
}

export function downloadErrorList(url) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        url: url
    });
    const errorAPI = url + "/api/errors"; 
    axios(errorAPI).then((response) => {
       dispatcher.dispatch({
            type: "DOWNLOADED_ERROR_LIST",
            response: response
        }); 
    });
}

export function fakeDownloadErrorList(url) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        url: "Loading..."
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