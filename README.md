# URL Shortener

A simple and fast URL shortening service built with Node.js, Express, and MongoDB.
It allows users to convert long URLs into short, shareable links and track how many times each link is used.

## Live Demo

https://url-shortener-vtz9.onrender.com

## Features

* Shorten long URLs instantly
* Automatic redirection to original URLs
* Track click counts for each shortened link
* Copy shortened links to clipboard
* Delete previously created links
* Clean dashboard interface

## Tech Stack

Backend

* Node.js
* Express.js

Database

* MongoDB Atlas

Frontend

* HTML
* CSS
* Vanilla JavaScript

Deployment

* Render

Version Control

* Git & GitHub

## Project Structure

```
url-shortener
│
├── config
│   └── db.js
│
├── controllers
│   └── urlController.js
│
├── models
│   └── Url.js
│
├── routes
│   └── urlRoutes.js
│
├── public
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## Installation

Clone the repository

```
git clone https://github.com/sahiljo14/url-shortener.git
```

Navigate into the project folder

```
cd url-shortener
```

Install dependencies

```
npm install
```

Create a `.env` file in the root directory

```
MONGO_URI=your_mongodb_connection_string
```

Start the server

```
node server.js
```

The application will run at

```
http://localhost:3000
```

## How It Works

1. User submits a long URL.
2. The server generates a unique short ID.
3. The URL and ID are stored in MongoDB.
4. Visiting the short URL redirects to the original link.
5. Each visit increments a click counter.

## Future Improvements

* Custom short aliases
* QR code generation for links
* Link expiration support
* Analytics dashboard
* React + Tailwind frontend

## License

This project is licensed under the MIT License.
