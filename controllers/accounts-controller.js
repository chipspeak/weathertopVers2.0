import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
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
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },
  
  profile(request, response) {
    const viewData = {
      title: "update your profile",
    };
    response.render("profile", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/login");
  },
  
    async profile(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
      const viewData = {
        title: "Edit User Profile",
        user: loggedInUser,
      };
      response.render("profile", viewData);
    },
  
    async profileUpdate(request, response){
  const loggedInUser = await accountsController.getLoggedInUser(request);
    const userId = await userStore.getUserById(loggedInUser._id);
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password
    };
    // console.log(`${JSON.stringify(userId._id)}`);
    await userStore.updateUser(userId._id, newUser);
    response.redirect("/profile");
  },
  
  //   async update(request, response) {
  //   const loggedInUser = await accountsController.getLoggedInUser(request);
  //   const updatedUser = {
  //     firstName: request.body.firstName,
  //     lastName: request.body.lastName,
  //   };
  //   await userStore.updateUser(loggedInUser._id, updatedUser);
  //   response.redirect("/dashboard");
  // },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
};
