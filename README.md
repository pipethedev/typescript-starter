# CoderByte Task

This project was generated with ❤.

## Installation

1. Clone repository - `git clone `

2. Install dependencies - `cd talent`

3. Install dependencies - `npm install`

4. Create a new file `.env` if it doesn't exist and copy the contents of `env.dev` into it to be able to run your server on production environment.

5. Then you need to provide values for the configuration env files at the `src/configs/env directory`.

## Setting up db
Make sure you have mysql or postgresql installed, you could use any database of your choice

1. Initialize Prisma - `npx prisma init`

2. Connect to your db by providing the appropriate credentials, check .env.dev for a similar example

3. Migrate Database - `prisma migrate dev --name init`

## Running the server locally

1. Start up the server - Run `npm start` | `npm run dev`

2. Server should be running on http://localhost:2020/ by default


## Routes

| Routes                                                           | Description
| [POST] &nbsp; /api/auth/signup                                   | Create a new account
| [POST] &nbsp; /api/auth/login                                    | User sign in
| [POST] &nbsp; /api/auth/request-email-verification               | Resend verfication email
| [POST] &nbsp; /api/auth/verify-email                             | Email verification
| [POST] &nbsp; /api/auth/request-password-reset                   | Sends a request password email
| [POST] &nbsp; /api/auth/reset-password                           | Reset password form handler
| [POST] &nbsp; /api/users                                         | Create a user
| [GET] &nbsp; /api/users                                          | Get all users
| [GET] &nbsp; /api/users/:userId                                  | Get a user
| [UPDATE] &nbsp; /api/users/::userId                              | Update a user
| [DELETE] &nbsp; /api/users/:userId                               | Creat a post
