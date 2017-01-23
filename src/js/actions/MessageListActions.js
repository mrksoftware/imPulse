import dispatcher from "../dispatcher";
import axios from "axios";

export function downloadMessageListAsync(url, groupId){
    //http://localhost:33333/api/recoverability/groups
    const errorAPI = url + "/api/recoverability/groups/" + groupId + "/errors?sort=time_of_failure&status=unresolved"; 
    axios(errorAPI).then((response) => {
        //console.log("Received: ", response);
       dispatcher.dispatch({
            type: "DOWNLOADED_MESSAGE_LIST",
            response: response,
            responseType: "messageList",
            selectedGroupId: groupId
        }); 
    }).catch((err) => {
        dispatcher.dispatch({
            type: "DOWNLOADED_MESSAGE_LIST",
            response: {
                data: [
                    {
                        message_id: "1",
                        exception: {
							message: "Un valore era nullo"
						},
                        message_type: "InvalidOperationException"
                    },
                    {
                        message_id: "2",
                        exception: {
							message: "Un secondo valore era nullo"
						},
                        message_type: "InvalidOperationException"
                    }
                ]
            },
            responseType: "messageList",
			selectedGroupId: groupId
        });
    });
}

export function downloadMessageBodyAsync(url, messageId) {
	var uri = url + "/api/messages/" + messageId + "/body"; 
	axios(uri).then((response) => {
            //console.log("Received body (id, response): ", messageId, response);
            dispatcher.dispatch({
                type: "DOWNLOAD_MESSAGE_BODY_ASYNC",
                messageId: messageId,
                messageBody: response
	    }); 
	}).catch((err) => {
	    dispatcher.dispatch({
	        type: "DOWNLOAD_MESSAGE_BODY_ASYNC",
	        messageId: messageId,
	        messageBody: {
				data: {
					id: messageId,
					idArticle: 3
				}	
			}
	    }); 
	});
}
