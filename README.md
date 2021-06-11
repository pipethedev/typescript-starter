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

## Running the server locally

1. Start up the server - Run `npm start` | `npm run dev`

2. Server should be running on http://localhost:2020/ by default

## Routes

| Routes                                             | Description                    | Auth roles |
| -------------------------------------------------- | ------------------------------ | ---------- |
| [POST] &nbsp; /api/auth/signup                     | Create a new account           | none       |
| [POST] &nbsp; /api/auth/login                      | User sign in                   | none       |
| [POST] &nbsp; /api/auth/logout                     | Logout a user                  | none       |
| [POST] &nbsp; /api/auth/request-email-verification | Resend verfication email       | none       |
| [POST] &nbsp; /api/auth/verify-email               | Email verification             | none       |
| [POST] &nbsp; /api/auth/request-password-reset     | Sends a request password email | none       |
| [POST] &nbsp; /api/auth/reset-password             | Reset password form handler    | none       |
| [POST] &nbsp; /api/users                           | Create a user                  | User       |
| [GET] &nbsp; /api/users                            | Get all users                  | Admin      |
| [GET] &nbsp; /api/users/:userId                    | Get a user                     | User       |
| [UPDATE] &nbsp; /api/users/::userId                | Update a user                  | User       |
| [DELETE] &nbsp; /api/users/:userId                 | Delete a user                  | Admin      |
