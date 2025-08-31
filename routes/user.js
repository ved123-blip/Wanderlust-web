const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

// SIGNUP (GET form + POST submit)
router
    .route("/signup")
    .get((req, res) => {
        res.render("users/signup.ejs");
    })
    .post(userController.signUp);

// LOGIN (GET form + POST submit)
router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(userController.handleLogin);

// LOGOUT
router.get("/logout", userController.handleLogOut);

module.exports = router;
