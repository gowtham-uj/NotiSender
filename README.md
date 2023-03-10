# NotiSender
Generic notification system to send buk text email.

## INTRO

This application is majorly a backend system with exposed API's to perform specified tasks.

## Task ideas

we can create email templates and store it in the system, so that emails can use the template and send the required data to backend to fill in that template variable fields.

| Estimated difficulty | Task |
| :------------------- | :--- |
|Easy                  |Send Instant Notifications to a given list of emails.|
|Easy                  |Schedule Notifications to a given list of emails.|
|Easy/Medium           |Create group for a set of emails grouped by category.|
|Medium                |Send Instant Notifications to given email group.|
|Medium                |Schedule email Notifications to a given email group.|
|Hard                  |Create predifined templates and change the placeholder accordingly.|


## API's

| Type | Name | Description | 
| :---- | :-------- | :--------------------------------|
| POST | /send-notification | Sends the Instant Notification ot the given list of emails. |
| POST | /send-group-notification | SENDS THE INSTANT NOTIFICATION TO THE GIVEN EMAIL GROUP. |
| POST | /schedule-notification | SCHEDULE THE  NOTIFICATION TO THE GIVEN LIST OF EMAILS |
| POST | /schedule-group-notification | SCHEDULE THE  NOTIFICATION TO THE GIVEN EMAIL GROUP. |
| POST | /create-template | TAKES THE NAME AND TEMPLATE VARIABLES |
| POST | /create-group | takes the group namke and emails array with list of emails. |
| GET | get-all-templates | GIVES THE DETAILS ABOUT ALL OF THE TEMPLATES. |
| GET | get-all-groups | returns all of the email groups with all emails of that group. |
| POST | create-template-html | TAKES THE HTML FILE AND STORE IT IN THE TEMPLATES DIRECTORY. |

## Credentials

Credentials for fake mail services that traps all the outgoing emails from our system to real emails.

Website : [Click Here to login to the mail](https://ethereal.email/login)
* Username: reyna67@ethereal.email
* Password: 4Bp2xHYWk6t4EX8hxd

- first login to the website and go the messages tab and then try testing the notification system by sending notification and u can see all of the outgoing emails in the messages tab .

## Demo of sending the notification

First go to the [POSTMAN](https://documenter.getpostman.com/view/20316415/2s8Z75SVbi) Docs website and there you can see a bunch of API collections.

### Sending a notification to specified users

<p align="center">
<img src="https://github.com/gowtham-uj/NotiSender/blob/bbd58e345c5c50f9a3a11e1fcd70cbf58c04f712/send-notification.png">
</p>

### Response
If the success message is true, then the email is sent successfully. You can see the response in response tab after sending the request.
<p align="center">
<img src="https://github.com/gowtham-uj/NotiSender/blob/bbd58e345c5c50f9a3a11e1fcd70cbf58c04f712/Response.png">
</p>

### Inbox
Here we can see all the sent messages/Notifications in our Inbox.

<p align="center">
<img src="https://github.com/gowtham-uj/NotiSender/blob/bbd58e345c5c50f9a3a11e1fcd70cbf58c04f712/inbox.png">
</p>

As you can see the sent messages and the bulk Notifications sent to the group in the Inbox.

### Inside the message.

Inside the message is a predefined template, that can be modified or set using the `/create-template` POST Method.

<p align="center">
<img src="https://github.com/gowtham-uj/NotiSender/blob/bbd58e345c5c50f9a3a11e1fcd70cbf58c04f712/message.png">
</p>

So, finally we can see the actual message that we sent to the targeted emails.

## NOTE : For more features, try to explore and test out those other end points [here](https://documenter.getpostman.com/view/20316415/2s8Z75SVbi).

# ThankYou.
