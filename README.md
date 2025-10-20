# Air-BNB

A simplified AirBnB-style web application built with the **MVC pattern**.

This is a server-rendered app using EJS templates, a Node.js/Express backend, MongoDB (Atlas), Cloudinary for image hosting, and MapTiler for maps. It includes authentication/authorization, sessions & cookies, middleware-based validation.

---

## ✨ Features

-   User registration & login (with server-side + client-side validation)
-   Session-based authentication with cookies
-   Role-based authorization
-   CRUD for properties (listings)
-   Image upload functionality with Cloudinary
-   Location display using Maps with MapTiler
-   Clear MVC folder structure (controllers, models, routes, views)
-   Middlewares for authentication, validation, and error handling
-   Uses MongoDB Atlas for a production-ready database
-   File uploads handled with a dedicated Cloudinary config (`cloudConfig.js`)
-   Simple, clean UI built with HTML, CSS, JavaScript, and EJS

---

## 🛠️ Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (with Atlas)
-   **Templating Engine**: EJS (Embedded JavaScript)
-   **Frontend**: HTML5, CSS3, JavaScript
-   **Image Hosting**: Cloudinary
-   **Maps & Geocoding**: MapTiler
-   **Authentication**: Express Session & Cookies
-   **Architecture**: MVC (Model-View-Controller)

---

## 📂 Repo Structure (High Level)

```
Air-BNB/
├─ controllers/
├─ models/
├─ routes/
├─ views/          # EJS templates
├─ public/         # CSS, JS
├─ utils/
├─ middleware.js
├─ cloudConfig.js
├─ app.js
├─ package.json
└─ .gitignore
```

---

##📋 Prerequisites

-   Node.js (v14+ recommended)
-   npm (v6+)
-   A MongoDB Atlas cluster (connection string)
-   A Cloudinary account (API credentials)
-   A MapTiler account (API token)
-   (Optional) `nodemon` for development

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following variables:

```dotenv
# MongoDB Atlas connection string
ATLASDB_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"

# Cloudinary Credentials
CLOUD_NAME="your-cloud-name"
CLOUD_API_KEY="your-cloudinary-api-key"
CLOUD_API_SECRET="your-cloudinary-api-secret"

# MapTiler Token (for maps)
MAP_TOKEN="your-maptiler-token"

# Session Secret
SESSION_SECRET="a_long_random_string_here"

# App Port (optional, defaults to 3000)
PORT=3000
```

**Important Notes:**
-   Never commit your `.env` file or other secrets to source control.
-   Ensure your `ATLASDB_URL` includes valid credentials.
-   `MAP_TOKEN` is required for map rendering on property pages.

---

## 🚀 Installation & Run

1.  Open your terminal in the repository's root directory.
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the application:
    ```bash
    node app.js
    ```

For development with auto-reload, you can use `nodemon`:
```bash
# Install nodemon globally (if you haven't already)
npm install -g nodemon

# Start the app with nodemon
nodemon app.js
```

## Usage

1.  Visit `http://localhost:port` in your browser.
2.  Register a new account and log in.
3.  Create new listings and upload images (which are stored on Cloudinary).
4.  View properties;
5.  Maps will be displayed using MapTiler.
6.  Sessions persist your login state, and logging out clears the session cookie.

---

## 🔐 Authentication & Authorization

The app uses session-based authentication via `express-session`.

-   **Cookies** are used to maintain the session token on the client.
-   **Middleware** functions (in `middleware.js`) enforce security:
    -   `isLoggedIn`: Requires an authenticated user to access certain routes.
    -   Validation middleware sanitizes and validates input before it reaches the controller logic.

Both **server-side** (for security) and **client-side** (for better UX) validation are implemented.

---

## ☁️ Cloudinary (Image Uploads)

-   Configure `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET` in your `.env` file.
-   The setup is located in `cloudConfig.js`.
-   When a user uploads an image for a listing, the server sends it to Cloudinary and saves the returned URL and metadata to the MongoDB database.

---

## 🗺️ MapTiler (Maps & Geolocation)

-   Configure your `MAP_TOKEN` in the `.env` file.
-   MapTiler is used to render property maps in the front-end EJS templates.
-   Ensure your token has the proper permissions and is within its usage quota.

---

## 🔧 Common Troubleshooting

-   **Cannot connect to MongoDB**: Verify your `ATLASDB_URL`, check the Atlas IP whitelist, and ensure your credentials are correct.
-   **Cloudinary errors**: Double-check that your `CLOUD_*` variables are correct and that your account is active.
-   **Map not rendering**: Verify your `MAP_TOKEN` and check the browser console for any JavaScript errors or failing network requests.
-   **Sessions not persisting**: Ensure `SESSION_SECRET` is set and that cookies are enabled in your browser.

---


## 🤝 Contributing

Contributions are welcome! If you want to add features or fix bugs:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/my-new-feature`).
3.  Commit your changes and push the branch.
4.  Open a Pull Request with a clear description of your changes.

---

If you need help integrating new features or need a walkthrough to deploy, please open an issue or contact me through GitHub.
