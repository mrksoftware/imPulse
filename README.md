# imPulse 
### built on top of the ServiceControl API by Particular

[![Stories in Ready](https://badge.waffle.io/mrksoftware/impulse.png?label=ready&title=Stories in Ready)](https://waffle.io/mrksoftware/impulse)

## Functionalities
* Get error groups
* Get unresolved messages by error group/message type including message body 
  * It is possibile to copy and paste the output into excel 

  
## Getting started
* Download code
* Open a cmd instance in the project folder
* run -> `npm install` (you need node.js to be installed on your machine)
* run -> `webpack` (before deploying the website)


## Service Control API

```javascript
{  
   "description":"The management backend for the Particular Service Platform",
   "endpoints_error_url":"http://localhost:33333/api/endpoints/{name}/errors/{?page,per_page,direction,sort}",
   "endpoints_message_search_url":"http://localhost:33333/api/endpoints/{name}/messages/search/{keyword}/{?page,per_page,direction,sort}",
   "endpoints_messages_url":"http://localhost:33333/api/endpoints/{name}/messages/{?page,per_page,direction,sort}",
   "endpoints_url":"http://localhost:33333/api/endpoints",
   "errors_url":"http://localhost:33333/api/errors/{?page,per_page,direction,sort}",
   "configuration":"http://localhost:33333/api/configuration",
   "message_search_url":"http://localhost:33333/api/messages/search/{keyword}/{?page,per_page,direction,sort}",
   "license_status":"valid",
   "license_details":"http://localhost:33333/api/license",
   "name":"ServiceControl",
   "sagas_url":"http://localhost:33333/api/sagas"
}
```