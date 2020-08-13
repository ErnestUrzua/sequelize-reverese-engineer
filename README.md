# sequelize-reverese-engineer
reverse engineer code with tutorial

## Overview of application
This application uses passport.js and session.js to login the user and authenticate their access to the website. If the user has no account then they can signup, if they have an account then they can login to the members page.


## high level overview of files
`package.json` is where all the dependencies and project information is stored

`server.js` initializes the database, express, session, passport, and the port.
we also require our api routes and html routes and sync our server.

### models
`user.js` is where the user model for the database is 
`index.js` is where we add users models to the database

### config 
`passport.js` is where the authentication logic is

### middleware
`isAuthenticated.js` is where the routes are restricted or granted based off the users authentication

### routes
`api-routes` is where the endpoints to the database go to.
`html-routes` are the routes to the html pages

### public
all the html files that define our webpages
`login.html` 
`members.html`
`signup.html`

all the javascript logic for the webpages
`login.js`
`members.js`
`signup.js`


***
Copyright &copy; Ernesturzua 2020
 [LinkedIn](https://www.linkedin.com/in/ernesturzua/)


