# reel-talk-backend

#### This project is a Node.js backend that provides user authentication, movie retrieval from TMDb, and a database to store user likes using Firebase Firestore.

## 🚀 Getting Started

## Table of Contents

- [Setup](#setup)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Running the Project](#running-the-project)


### Setup

#### Make sure you have the following installed on your local system:

- installed and configured Git.
- Node.js
- NPM (Node Packet Manager)


## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Megha30501/reel-talk-backend
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Only if not installed during in second step:**
     ```bash
    npm install nodemon
    ```
   ## Environment Variables

You need to set up some environment variables to configure Firebase and TMDb API.

1. **Create a `.env` file in the root of your project:**

    ```bash
    .env
    ```

2. **Add the following variables to your `.env` file:**

    ```env
    TMDB_API_KEY=your_tmdb_api_key
    ```

3.  **Add Firebase configuration files:**
    - Create two files: `serviceAccountKey.json` and `firebase-config.json`.
    - Place them in the root directory of your project.

   ## Firebase Setup

1. **Create a Firebase Project:**

    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new project or use an existing one.

2. **Enable Firebase Authentication:**
    - In the Firebase Console, navigate to **Authentication**.
    - Enable the **Email/Password** sign-in method.

3. **Set Up Firestore Database:**
    - Go to **Firestore Database** in your Firebase Console.
    - Create a Firestore database in production mode (or test mode if you're just experimenting).
    - - Update the **Rules** to allow read and write operations without restrictions.

4. **Generate Firebase Admin SDK Key:**
    - In Firebase Console, go to **Project Settings > Service Accounts**.
    - Click **Generate New Private Key** and save the JSON file as `serviceKeyAccount.json` of the root this project.

## Running the Project

1. **Start the Express server:**

    ```bash
   npm start
    ```

2. The server should now be running at `http://localhost:3000`.



## API Endpoints

### Authentication

- **Register:** `POST /auth/register`
    - **Body:** `{ "email": "user@example.com", "password": "your_password" }`

- **Login:** `POST /auth/login`
    - **Body:** `{ "email": "user@example.com", "password": "your_password" }`

- **Reset Password:** `POST /auth/updatepassword`
    - **Body:** `{ "email": "user@example.com", "oldPassword":"your_oldPassword", "newPassword":"your_newPassword" }`

### User Likes

 **Headers:** `{ "Authorization": "<your_token>" }`
- **Like Post or Content:** `POST /likes/add-like`
  - **Body:**   `{}`   
- **Get Post or Content:** `GET /likes/get-like`
    

### Movies

- **Get Movies:** `GET /movies`

    Retrieves a list of 100 popular movies from TMDb.
