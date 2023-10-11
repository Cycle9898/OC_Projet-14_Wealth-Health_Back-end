# Project #14 - Back-end - Wealth Health HRnet API

This codebase contains the code needed to run the backend for Wealth Health HRnet.

With it, you can create HR users, authenticate them and also store, modify or delete employees in a mongoDB database.

## Getting Started

### Prerequisites

Wealth Health API uses the following tech stack:

- [Node.js](https://nodejs.org/en)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the latest versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongod --version
```

### Instructions

1. Fork this repo
2. Clone the repo onto your computer
3. Open a terminal window in the cloned project
4. Run the following commands:

```bash
# Install dependencies
yarn

# Start local dev server with automatic restart on changes and TS compilation
yarn dev

# OR start static local dev server
yarn start

# Then populate the database with a HR user
yarn populate-db
```

Your server should now be running at http://locahost:3001 (default URL and port) and you will now have a HR user in your MongoDB database!

## Populate the MongoDB database with a HR user

Once you run the `populate-db` script, you should have a HR user in your database:

### HR user

- First Name: `John`
- Last Name: `Smith`
- Email: `hr@wealth-health.com`
- Password: `password123`

## API Documentation

To access to the API endpoints documentation, once you have started your local environment, you can visit: http://localhost:3001/api-docs (default URL and port).

A Swagger YAML file can also be found in the project's swagger folder.

## Environment variables

It is possible to modify some back-end app settings with environment variables.

Create or modify the .env file in the project root folder and add in it environment variables.

Here is the used ones :

### NODE_ENV

Specify the node.js environnement.

If NODE_ENV is set to "production", the API endpoints documentation won't be accessible on the "/api-docs" endpoint.

### PORT

Modify the server listening port.

Otherwise, the default port is "3001".

### API_URL

Modify the API base URL.

Otherwise, the default base URL is "http://localhost".

### DATABASE_URL

Modify the database server URL.

Otherwise, the default URL is "mongodb://localhost/wealthHealthHRnetDB".

### SECRET_KEY

This back-end app use JWT tokens to authenticate HR users requests.

It is possible to store your own secret key, in the SECRET_KEY environment variable, that will be used to generate these tokens.

Otherwise, the default secret key is "Default_Secret_Key".