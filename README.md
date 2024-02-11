routes auth

(post)/api/auth/register - registeration
(post)/register/google - registration
(post)/api/auth/login - login
(post)/api/auth/logout - logout
(get)/api/auth/current - get current

routes users

(patch)/api/users/update-user - change avatar,change name,change email,change password
(patch)/api/users/thema - change thema 

routes need help

(post)/api/help - send mail with comment and email for reply

routes boards

example request
{
"name": "string",
"icon": "0-7",
"background": "0-14"
}

(get)/api/boards/ - get boards all
(get)/api/boards/:boardId - get boards by id
(post)/api/boards/ - add boards
(put)/api/boards/:boardId - update boards by id
(delete)/api/boards/:boardId - delete boards by id

routes column

example request
{
"name": "string",
// father board id
"boarderId": "id"
}

(get)/api/column/ - get all column
(get)/api/column/:boardId' - get column by boardId
(post)/api/column/ - add column
(put)/api/column/:columnId - update colump by id
(delete)/api/column/:columnId - delete column by id

routes card

example request
{
name: "string",
text: "string",
deadline: "date",
priority: "without/low/medium/high",
// father column id
columnId: "\_id"
}

(get)/api/card/ - get all card
(get)/api/card/:columnId' - get card by columnId
(post)/api/card/ - add card
(put)/api/card/:cardId - update card by id
(delete)/api/card/:cardId - delete card by id
