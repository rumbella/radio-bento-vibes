# Radio Amblè Backend

This is a simple Express server to provide a persistent storage layer for the Radio Amblè frontend settings.

## Installation

1.  Navigate to the `backend` directory: `cd backend`
2.  Install the dependencies: `npm install`

## Running the Server

To start the backend server, run the following command from within the `backend` directory:

```bash
npm start
```

The server will start on `http://localhost:3001`.

## API

*   **GET /api/settings**: Retrieves the current UI settings from `db.json`.
*   **POST /api/settings**: Updates the UI settings in `db.json`.