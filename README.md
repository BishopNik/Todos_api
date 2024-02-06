routes auth

/api/auth/register
/api/auth/login
/api/auth/logout
/api/auth/current

routes users

/api/users/avatar  change avatar
/api/auth/name  change name
/api/auth/email  change email
/api/auth/password  change password

routes need help

/api/help

routes boards

(get)/api/boards/ - get boards all 
(get)/api/boards/:boardId - get boards by id 
(post)/api/boards/ - add boards
(put)/api/boards/:boardId - update boards by id
(delete)/api/boards/:boardId - delete boards by id

routes column

(get)/api/column/ - get all column
(get)/api/column/:boardId' - get column by boardId
(post)/api/column/ - add column
(put)/api/column/:columnId - update colump by id
(delete)/api/column/:columnId - delete column by id

routes card

(get)/api/card/ - get all card
(get)/api/card/:columnId' - get card by columnId
(post)/api/card/ - add card
(put)/api/card/:cardId - update card by id
(delete)/api/card/:cardId - delete card by id


