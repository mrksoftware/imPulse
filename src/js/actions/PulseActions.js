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
                        title: "ArgumentNullException"
                    }
                ]
            },
            responseType: "groupList"
        });
    });
}

export function downloadErrorList(url, groupId) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        state: "Loading..."
    });
    //http://localhost:33333/api/recoverability/groups
    const errorAPI = url + "/api/recoverability/groups/" + groupId + "/errors?sort=time_of_failure&status=unresolved"; 
    axios(errorAPI).then((response) => {
        //console.log("Received: ", response);
       dispatcher.dispatch({
            type: "DOWNLOADED_ERROR_LIST",
            response: response,
            responseType: "messageList",
            selectedGroupId: groupId
        }); 
    }).catch((err) => {
        //TODO
    });
}

//http://localhost:33333/api/messages/7837a55c-0dc5-4a0e-b913-a6d300a7cbbc/body
export function downloadMessageBodyList(url, messageIds) {
    dispatcher.dispatch({
        type: "FETCHING_ERROR_LIST",
        state: "Loading..."
    });
    var messageBodyList = [];
    messageIds.map(function(messageId){
        const errorAPI = url + "/api/messages/" + messageId + "/body"; 
        axios(errorAPI).then((response) => {
            //console.log("Received body List: ", response);
            messageBodyList.push(response.data);
        }).catch((err) => {
            //TODO
        });
    });
    dispatcher.dispatch({
        type: "DOWNLOADED_MESSAGE_BODY_LIST",
        response: messageBodyList,
        responseType: "messageBodyList"
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