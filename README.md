# Build-Guild 

(Still in progress)
Current demo: http://buildguild.online/


# Build Guild | A Custom PC Builder Community Platform
<p> About this project: This is platform designed for users to upload their custom pc builds and show them off to the custom pc builder community.</p>

![Screen Shot 2021-11-30 at 7 11 29 PM](https://user-images.githubusercontent.com/20747118/144206211-6961daf7-a572-49ab-917d-4709274787b6.png)


# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server

# Code Overview

## Dependencies Overview

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - Used for object modeling tool and designed to work in an asynchronous environment. Supports both promises   and callbacks
- [express-session](https://github.com/expressjs/session) - Used to create session middleware
- [morgan](https://github.com/expressjs/morgan) - For HTTP requests; a logger middleware for node.js
- [dotenv](https://github.com/motdotla/dotenv) - Module that loads environment variables from a .env file into process.env
- [ejs](https://github.com/auth0/node-jsonwebtoken) - For embedding Javascript templates
- [ejs-mate](https://github.com/JacksonTian/ejs-mate) - Express 4.x layout, partial template functions for the EJS template engine.
- [nodemon](https://github.com/remy/nodemon) - tool that helps develop node.js based applications by automatically restarting the node application
- [connect-flash](https://github.com/jaredhanson/connect-flash) - Used for storing messages stored in session
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [method-override](https://github.com/expressjs/method-override) - For using HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- [Express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize) - A middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection
- [sanitize-html](https://github.com/apostrophecms/sanitize-html) - Sanitize-html provides a simple HTML sanitizer with a clear API
- [path](https://github.com/jinder/path) - Node.js path module
- [joi](https://github.com/sideway/joi) - A powerful schema description language and data validator for JavaScript
- [cloudinary](https://github.com/cloudinary) - For image management via cloud hosting
- [passport](https://github.com/jaredhanson/passport) - For simple unobtrusive authentication compatible middleware for Node.js.
- [passport-local](https://github.com/jaredhanson/passport-local) - Passport strategy for authenticating with a username and password.
- [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose) - Mongoose plugin that simplifies building username and password login with Passport.
- [multer](https://github.com/expressjs/multer) - Used as a node.js middleware for handling multipart/form-data - image upload feature
- [multer-storage-cloudinary](https://github.com/affanshahid/multer-storage-cloudinary) - A multer storage engine for Cloudinary
- [mate](https://github.com/zhanzhenzhen/mate) - On both browser and node.js, Mate brings these features:

- Promise-style HTTP request: GET, POST, or custom methods
- A new way of handling events
- Array extensions: max, min, group, sum, average, ...
- Advanced timers
- Observer: useful for data binding
- Functional functions
- 2D point, complex number, complex math
- Super natural testing


# Application Structure
- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes with controllers and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
-  `views/` - This directory containes our show pages for displaying necessary templates.
-  `seeds/` - Seeds data
-  `public/` - JavaScript and stylesheets
-  `models/` - Contains models/schemas
-  `helpers/` - This directory contains middleware functions
-  `controllers/` - This directory contains our routes controllers 
-  `cloud/` - This directory contains cloudinary configuration

## Check out demo here: <a href="http://buildguild.online/" target="_blank"> buildguild.online </a>
