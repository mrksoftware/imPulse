import dispatcher from "../dispatcher";
import axios from "axios";

//http://localhost:33333/api/messages/7837a55c-0dc5-4a0e-b913-a6d300a7cbbc/body
export function downloadMessageBodyAsync(url, messageId) {
	var uri = url + "/api/messages/" + messageId + "/body"; 
	axios(uri).then((response) => {
	    console.log("Received body (id, response): ", messageId, response);
	   dispatcher.dispatch({
	        type: "DOWNLOAD_MESSAGE_BODY_ASYNC",
	        messageId: messageId,
	        messageBody: response
	    }); 
	}).catch((err) => {
	    //TODO
	});
}