# User Management App (MVC)

A simple Node.js + Express application demonstrating CRUD operations using the MVC (Model-View-Controller) architecture.

---

##  Features

- Create a new user
- View all users
- Update existing users
- Delete users
- Form validation using express-validator
- Server-side rendering using EJS

---

##  Tech Stack

- Node.js
- Express.js
- EJS (Templating Engine)
- Express Validator

---

##  Project Structure

├── controllers/
│   └── usersController.js  
├── routes/
│   └── usersRouter.js  
├── storages/
│   └── usersStorage.js  
├── views/
│   ├── partials/
│   │   └── errors.ejs  
│   ├── index.ejs  
│   ├── createUser.ejs  
│   └── updateUser.ejs  
├── app.js  
├── package.json  
└── README.md  

---

##  Installation

1. Clone the repository

git clone <your-repo-url>  
cd <project-folder>  

2. Install dependencies

npm install  

3. Run the app

node app.js  

or (recommended)

npx nodemon app.js  

---

##  Usage

- Visit: http://localhost:3000  
- Create, update, and delete users from the UI  

---

##  Concepts Used

- MVC architecture separation  
- Routing with Express Router  
- Middleware handling  
- Form validation & error handling  
- Server-side rendering with EJS  

---

## Note

- This project uses in-memory storage (data will reset on server restart)  
- Not connected to a database (for learning/demo purposes)  

---

##  Author

Harsh Kumar