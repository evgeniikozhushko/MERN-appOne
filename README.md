# MERN Express Demo App

## Overview

This is a Node.js/Express application with MongoDB for user management and authentication (local and GitHub OAuth). It demonstrates CRUD operations on users and includes access control for protected routes.

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd appOne
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory with the following:
     ```
     MONGODB_URI=<your-mongodb-uri>
     GITHUB_CLIENT_ID=<your-github-client-id>
     GITHUB_CLIENT_SECRET=<your-github-client-secret>
     ```

4. **Run the app:**
   ```sh
   node app.js
   ```
   The server will run at [http://localhost:3000](http://localhost:3000).

---

## Routes Description

### Authentication Routes (`/routes/auth.js`)
- **GET /register**  
  Render the registration page.
- **POST /register**  
  Register a new user with username and password.
- **GET /login**  
  Render the login page.
- **POST /login**  
  Authenticate user with local strategy.
- **GET /logout**  
  Log out the current user.
- **GET /auth/github**  
  Start GitHub OAuth login/registration.
- **GET /auth/github/callback**  
  GitHub OAuth callback; logs in or registers user.

### Main Routes (`/routes/index.js`)
- **GET /**  
  Render the home page (public).
- **Other CRUD routes**  
  (If implemented, e.g., `/users`, `/users/:id`, etc. for user management.)

### Example CRUD Functions (in `app.js`)
- `createUser(name, age, gender)`  
  Create a new user in the database.
- `readUser()`  
  Find users by criteria.
- `updateUser(age)`  
  Update user data.
- `deleteUser()`  
  Delete a user.
- `sortAndLimitUser()`  
  Sort and limit user results.
- `aggAndPipe()`  
  Aggregate user data.

---

## Access Control

- **Authentication Required:**  
  Protected routes (such as user profile or dashboard) require the user to be logged in. Passport.js manages sessions and authentication state.
- **Local Strategy:**  
  Users can register and log in with a username and password.
- **GitHub OAuth:**  
  Users can register or log in using their GitHub account.
- **Route Protection:**  
  Middleware (not shown here, but typically used) checks `req.isAuthenticated()` before allowing access to protected routes.
- **Flash Messages:**  
  Used to display authentication errors or status messages.

---

## MERN Stack Table Lab (HTML & CSS)

This project also includes a front-end component that demonstrates your ability to work with semantic HTML tables and apply clean CSS styling.

### 🔍 What it Includes:
An interactive table featuring **10 MERN stack interview questions** with:
- 5 structured columns: Question ID, Question, Answer (revealed on hover), Explanation, and Category
- CSS styles including:
  - Borders and padding
  - Striped rows
  - Row highlight on hover
  - Answer reveal on hover for self-assessment
- Fully semantic HTML markup (`<thead>`, `<tbody>`, `<tr>`, `<td>`, etc.)

📍 To access it:
Navigate to the **Web Development** tab under the **Services** section of the site, then scroll to the **MERN Interview Table**. Users can test their knowledge by hovering over the answer cells to reveal the correct answers.

---

## Notes

- Static files should be placed in the `public` directory.
- Views are rendered using Handlebars (`.hbs` files in the `views` folder).
- Make sure MongoDB is running and accessible via the URI in your `.env` file.