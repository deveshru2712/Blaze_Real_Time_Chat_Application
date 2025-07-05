# Blaze Real-Time Chat Application

## Project Overview

This is a real-time chat application that allows users to connect and communicate with each other instantly. It includes features for user authentication, searching for users, sending and receiving messages, and displaying online status.  The application uses a modern tech stack including React, Next.js, Socket.IO, Express, Prisma, and Redis.

## Features and Functionality

*   **User Authentication:** Secure sign-up, sign-in, and log-out functionality.
*   **Real-time Messaging:** Send and receive text messages instantly.
*   **User Search:** Find other users by username.
*   **Online Status:** See which users are currently online.
*   **Typing Indicator:** Real-time indication when a user is typing a message.
*   **Profile Update**: Update profile information like username, email and profile picture.
*   **Theming**: Supports light and dark theme.

## Technology Stack

*   **Frontend:**
    *   React
    *   Next.js
    *   Zustand (state management)
    *   Socket.IO client
    *   Tailwind CSS
    *   Radix UI
    *   Lucide React
    *   Next Themes
    *   Sonner
    *   Axios
    *   React Hook Form
    *   Zod

*   **Backend:**
    *   Node.js
    *   Express
    *   Socket.IO server
    *   Prisma (ORM)
    *   Redis (in-memory data store for online status and socket mappings)
    *   bcryptjs (password hashing)
    *   jsonwebtoken (JWT for authentication)
    *   dotenv
    *   cors
    *   cookie-parser
    *   morgan
    *   envalid
    *   zod

## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (>=18)
*   npm or yarn
*   Redis
*   PostgreSQL

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/deveshru2712/Blaze_Real_Time_Chat_Application.git
    cd Blaze_Real_Time_Chat_Application
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure the backend environment variables:**

    Create a `.env` file in the `backend` directory and populate it with the following:

    ```
    PORT=4000
    NODE_ENV=development
    AUTH_SECRET="your_auth_secret"
    DATABASE_URL="your_postgresql_connection_string"
    JWT_KEY="your_jwt_secret_key"
    REDIS_USERNAME="your_redis_username"
    REDIS_PASSWORD="your_redis_password"
    REDIS_HOST="your_redis_host"
    REDIS_PORT=6379
    CLIENT_URL="http://localhost:3000" #Frontend URL
    ```

    *   Replace `"your_postgresql_connection_string"` with your actual PostgreSQL connection string.
    *   Replace `"your_jwt_secret_key"` with a strong, randomly generated secret key.
    *   Replace `"your_redis_username"` and `"your_redis_password"` with your Redis credentials.
    *   Ensure Redis is running on the specified `REDIS_HOST` and `REDIS_PORT`.

4.  **Setup Prisma:**

    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5.  **Start the backend server:**

    ```bash
    npm run dev
    ```

6.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

7.  **Configure the frontend environment variables:**

    Create a `.env.local` file in the `frontend` directory and populate it with the following:

    ```
    NEXT_PUBLIC_BACKEND_URL="http://localhost:4000" # Backend URL
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"
    ```

    *   Replace `"your_cloudinary_cloud_name"` with your Cloudinary cloud name.
    *   Replace `"your_cloudinary_upload_preset"` with your Cloudinary upload preset.

8.  **Start the frontend development server:**

    ```bash
    npm run dev
    ```

    Open your browser and navigate to `http://localhost:3000`.

## Usage Guide

1.  **Sign Up/Sign In:**  Create a new account or log in with existing credentials.
2.  **Search for Users:**  Use the search bar in the sidebar to find other users by username.
3.  **Start Chatting:** Click on a user to open a chat window and start sending messages.
4.  **Real-time Messaging:** Messages are sent and received instantly.  The typing indicator shows when the other user is typing.
5.  **Settings:** Access settings using the settings icon in the Navbar to update profile.

## API Documentation

The backend provides the following API endpoints:

*   **`POST /api/auth/sign-up`**: Registers a new user.
    *   Request body: `{ username: string, email: string, password: string }`
    *   Uses the `SignUpSchema` (defined in `backend/src/utils/schema/AuthSchema.ts`) for input validation.
*   **`POST /api/auth/sign-in`**: Logs in an existing user.
    *   Request body: `{ email: string, password: string }`
    *   Uses the `SignInSchema` (defined in `backend/src/utils/schema/AuthSchema.ts`) for input validation.
*   **`POST /api/auth/logout`**: Logs out the currently authenticated user.
    *   Requires authentication (using the `ProtectedRoute` middleware).
*   **`GET /api/auth/verify`**: Verifies the authentication token and returns the user object.
    *   Requires authentication (using the `ProtectedRoute` middleware).
*   **`GET /api/user`**: Searches for users by username.
    *   Query parameter: `username` (string)
    *   Requires authentication (using the `ProtectedRoute` middleware).
*   **`POST /api/user/update`**: Updates the user profile.
    *   Query parameter: `userId` (string)
    *   Request body: `{ username?: string, email?: string, password: string, profilePicture?: string }`
    *   Requires authentication (using the `ProtectedRoute` middleware).
    *   Uses the `updateSchema` (defined in `backend/src/utils/schema/updateSchema.ts`) for input validation.
*   **`GET /api/message/:receiverId`**: Retrieves messages for a specific conversation.
    *   Path parameter: `receiverId` (string) - The ID of the user you're chatting with.
    *   Requires authentication (using the `ProtectedRoute` middleware).
*   **`POST /api/message/:receiverId`**: Sends a new message.
    *   Path parameter: `receiverId` (string) - The ID of the message receiver.
    *   Request body: `{ message: string }`
    *   Requires authentication (using the `ProtectedRoute` middleware).
    *   Uses the `messageSchema` (defined in `backend/src/utils/schema/messageSchema.ts`) for input validation.

## Contributing Guidelines

Contributions are welcome!  Here are the steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the `main` branch of the original repository.

Please ensure your code adheres to the existing style and conventions. Also, provide clear documentation and tests for any new functionality.

## License Information

No license was specified in the repository. All rights reserved.

## Contact/Support Information

*   **Repository Owner:** deveshru2712
*   **GitHub Repository:** [https://github.com/deveshru2712/Blaze\_Real\_Time\_Chat\_Application](https://github.com/deveshru2712/Blaze_Real_Time_Chat_Application)

For support or inquiries, please open an issue on the GitHub repository.