import { userStore } from "../models/user-store.js";

export const accountsController = {
  //renders our index(landing page)
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    //renders the login view
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    //renders the signup view
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  profile(request, response) {
    //renders the profile view
    const viewData = {
      title: "update your profile",
    };
    response.render("profile", viewData);
  },

  async register(request, response) {
    //passes the new user to the stationStore method, addUser
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/login");
  },

  async profile(request, response) {
    //renders the profile edit page by retrieving the logged in user and displaying the profile view
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Edit User Profile",
      user: loggedInUser,
    };
    response.render("profile", viewData);
  },

  async profileUpdate(request, response) {
    /*updates the user information by retrieving logged in user, getting the user id, passing this into a new user object
    and then initialising another user object with updated variables before passing that user into our updateUser method from
    the userStore*/
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const userId = await userStore.getUserById(loggedInUser._id);
    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password,
    };
    await userStore.updateUser(userId._id, updatedUser);
    response.redirect("/profile");
  },

  async profileDelete(request, response) {
    //gets logged in user, gets the user's id then passes this id to the deleteUserById method to remove user from db.
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const userId = await userStore.getUserById(loggedInUser._id);
    await userStore.deleteUserById(userId);
    response.redirect("/signup");
  },

  async authenticate(request, response) {
    /*gets user by email before initializing password as the password entered into
    the body. Method then checks if the password is a match to the stored password
    for that user before redirecting to either dashboard of login based on result*/
    const user = await userStore.getUserByEmail(request.body.email);
    const password = request.body.password;
    if (user && password === user.password) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    /*gets logged in user by initializing an email variable via cookies before 
    passing this to the userStore method to retrieve user by email*/
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
};
