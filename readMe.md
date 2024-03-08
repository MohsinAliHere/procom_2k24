# Procom-24

Procom-24 is a project utilizing a mono-repo setup with a MERN stack (MongoDB, Express.js, React.js, Node.js). This repository contains both the client-side and server-side code organized into separate packages within the mono-repo.

## Getting Started

To get started with the project, follow these instructions:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `yarn install`.
4. Start the server and client applications by running `yarn start:all`.

## Project Structure

The project is organized into separate packages within the `packages` directory:

- `@procom-24-tracker/server`: Contains the server-side code built with Node.js and Express.js, responsible for handling API requests and interacting with the MongoDB database.
- `@procom-24-tracker/client`: Contains the client-side code built with React.js, responsible for the user interface and interactions with the server.

## Scripts

- `server:start`: Starts the server application.
- `client:dev`: Starts the client application in development mode.
- `client:build`: Builds the client application for production.
- `reset`: Cleans up the project by removing generated files and dependencies. Use this when resetting the project.

