# People Browser

Obligatory student task - simple web CRUD application created in Angular and ASP .NET Core.

Version sent to GitHub doesn't have master password, to run server you need to add following line inside `appsettings.json` file:
```json
"AppSettings": {
	"Token": "Enter your token here"
},
```
Then you can run app, however you can't use existing test user accounts.

## Tech:

 - **Frontend:** Angular 9, Angular Material UI, angular-jwt
 - **Backend:** ASP .NET Core 3.1, Entity Framework Core, Swagger

## Features:

 - Creating, displaying, editing and deleting data
 - Roles - Casual and Admin, only admin can create, edit and delete entries
 - Passwords encrypted with HMAC
 - JWT authorization
 - Routing with guarding based on roles
 - Login page
 - Pagination, filtering and sorting implemented in API
 - Exporting data to CSV
 - Multiple views (list and grid)
