# :rocket: Node TypeScript MongoDB API Quickstart with Account Management, bcrypt & Jest Unit Testing

This is a comprehensive quickstart project for creating a RESTful API using Node.js, Express, and TypeScript, with MongoDB as the database. It incorporates a complete management system for user accounts, offering a full CRUD (Create, Read, Update, Delete) interface. In order to ensure quality and reliability, unit tests have been established for every part of the account management system. This well-structured, easy-to-adapt project is an excellent starting point for developing robust, high-quality APIs. :sparkles:

## Project Structure :file_folder:

```
/
├── src/
│ ├── config/
│ │ ├── database.ts     	# MongoDB connection setup
│ ├── controllers/      	# Route controllers (controller layer)
│ ├── interfaces/       	# Interface definitions for models
│ ├── models/           	# Database models
│ ├── routes/           	# Routes definitions
│ ├── services/         	# Business logic (service layer)
│ ├── utils/            	# Utility functions/classes
│ │ ├── __tests__/      	# Unit tests
│ │ │ ├── controllers/  	# Unit tests for controllers
│ └── index.ts          	# Express app
├── .env                	# Environment variables
├── .gitignore          	# Specifies intentionally untracked files to ignore
├── package.json        	# Defines scripts, dependencies and project metadata
├── tsconfig.json       	# TypeScript configuration
└── README.md           	# Project description and setup guide
```

## Prerequisites :clipboard:

- Node.js >=14.x
- MongoDB
- A package manager (npm)

## Getting Started :rocket:

1. Clone this repository. :arrows_counterclockwise:

   git clone [https://github.com/Esteban-Mo/repository.git](https://github.com/Esteban-Mo/NodeTS-MongoDB-Quickstart.git)

2. Install the dependencies. :gear:

    ```
    npm install
    ```

3. Copy this to .env and replace the variables with your own values. :gear:

	```graphql
	# The port your server will run on
	PORT=3001

	# The URI for your MongoDB database. Replace with your own URI.
	MONGODB_URI=URL
	```

4. Start the server. :gear:
   
    ```
    npm run start
    ```

The server runs on port 3001 by default. You can change this by setting the PORT variable in your .env file.

## Features :sparkles:

    - MVC architecture
    - Database connection with MongoDB using Mongoose
    - Environment variables with dotenv
    - TypeScript support
    - Error handling
    - Bcrypt
    - Testing setup with Jest

## Scripts :scroll:

    - npm run start - Start the server
    - npm run dev - Start the server in development mode with hot-reloading
    - npm run build - Compile TypeScript to JavaScript
    - npm test - Run tests

## API Endpoints :satellite:

This quickstart comes with a set of predefined routes. You can modify, remove, or add to these as needed.

    GET / - Returns a welcome message

## Testing :syringe:
You can add your test files to the `src/utils/__tests__/` directory. To run the tests, use the npm test command.

## Contributing :handshake:
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License :page_facing_up:
This project is licensed under the MIT License.

## Contact :envelope:
If you have any questions or feedback, feel free to open a new issue. [here](https://github.com/Esteban-Mo/NodeTS-MongoDB-Quickstart/issues)

## Acknowledgements :pray:

    - Node.js
    - Express.js
    - TypeScript
    - MongoDB
    - Jest
    - Bcrypt
