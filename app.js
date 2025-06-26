// Express App

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const app = express();
const UserModel = require('./models/User');

require("./passport-config")(passport);

mongoose.connect(process.env.MONGODB_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create User function
async function createUser(name, age, gender) {
  try {
    const user = new UserModel({ name, age, gender });
    await user.save();
    console.log("User is saved:", user);
  } catch (error) {
    console.error("Error saving user:", error);
  }
}

// Find User function
async function readUser() {
  try {
    const users = await UserModel.find({ name: "User 1", age: { $gt: 18 } });
    console.log("User found:", users);
  } catch (error) {
    console.error("Error finding user:", error);
  }
}

// Update User function
// async function updateUser(age) {
//   try {
//     const result = await UserModel.updateOne(
//       { name: "User 1" },
//       { $unset: { age: "" } }
//     );
//     console.log("User update result", result);
//   } catch (error) {
//     console.error("Error updating user", error);
//   }
// }

// Delete User function
// async function deleteUser() {
//   try {
//     const result = await UserModel.deleteOne({ name: "User 3" });
//     console.log("Delete result", result);
//   } catch (error) {
//     console.error("Error deleting user", error);
//   }
// }

// Chain sorting and limiting Users age
// async function sortAndLimitUser() {
//   try {
//     const result = await UserModel.find().sort({ age: -1 }).skip(2).limit(3);
//     console.log("Found 3 oldest users", result);
//   } catch (error) {
//     console.log("Error sorting by age", error);
//   }
// }

// Aggregation Pipeline of Users age
// async function aggAndPipe() {
//   try {
//     const result = await UserModel.aggregate([
//       { $group: { _id: null, averageAge: { $avg: "$age" } } },
//     ]);
//     console.log("Aggregation result:", result);
//   } catch (error) {
//     console.log("Aggregation Pipeline error", error);
//   }
// }

// Function Calls
// createUser("User 1", 21, "female");
// createUser("User 2", 45, "male");
// createUser("User 3", 14, "male");
// readUser();
// updateUser(35);
// deleteUser();
// sortAndLimitUser();
// aggAndPipe();

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "someSecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/index"));
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
