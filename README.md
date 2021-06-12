# CoderByte Task

This project was generated with ❤.

## Installation

1. Clone repository - `git clone `

2. Install dependencies - `cd talent`

3. Install dependencies - `npm install`

4. Create a new file `.env` if it doesn't exist and copy the contents of `.env.example` into it to be able to run your server on production environment.

## Setting up db

Make sure you have mysql or postgresql installed, you could use any database of your choice

1. Initialize Prisma - `npx prisma init`

2. Connect to your db by providing the appropriate credentials, check .env.example for a similar example

3. Migrate the Database - `prisma migrate dev --name init`

## Viewing your database

1. Start up prisma studio - Run `npx prisma studio`

## Running the server locally

1. Start up the server - Run `npm start` | `npm run dev`

2. Server should be running on http://localhost:2020/ by default 

## e2e Tests

1. Start up `npm run test`


## Testing the api

1. Via Postman Collection (https://documenter.getpostman.com/view/11039127/TzeTJpNs)

2. Via Swagger, viewing the api locally (http://localhost:3000/api-docs)

## Routes

| Routes                                             | Description                    | Auth roles |
| -------------------------------------------------- | ------------------------------ | ---------- |
| [POST] &nbsp; /api/auth/signup                     | Create a new account           | none       |
| [POST] &nbsp; /api/auth/login                      | User sign in                   | none       |
| [POST] &nbsp; /api/auth/logout                     | Logout a user                  | User       |
| [POST] &nbsp; /api/auth/request-email-verification | Resend verfication email       | none       |
| [POST] &nbsp; /api/auth/verify-email               | Email verification             | none       |
| [POST] &nbsp; /api/auth/request-password-reset     | Sends a request password email | none       |
| [POST] &nbsp; /api/auth/reset-password             | Reset password form handler    | none       |
| [PUT] &nbsp; /api/users                            | Update a user                  | User       |
| [GET] &nbsp; /api/posts/create                     | Create a post                  | User       |
| [GET] &nbsp; /api/posts/publish/:bookId            | Publish a book                 | User       |
| [GET] &nbsp; /api/user                             | Get users details              | User       |
