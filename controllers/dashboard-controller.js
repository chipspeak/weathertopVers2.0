import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import axios from "axios";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Station Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id),
    };
    //method to sort the stations in alphabetical order by their locations
    for (const station of viewData.stations) {
      viewData.stations.sort((a, b) => (a.location > b.location ? 1 : -1));
    }
    console.log("dashboard rendering");
    console.log(loggedInUser.firstName);
    console.log(loggedInUser.lastName);
    console.log(loggedInUser.email);
    console.log(loggedInUser.password);
    //     let viewDataString = JSON.stringify(viewData); // Debug Remove Later
    // let viewDateObject = JSON.parse(viewDataString); // Debug Remove Later
    // console.dir(viewDateObject, { depth: null, colors: true }); // Debug Remove Later
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      location: request.body.location,
      longitude: request.body.longitude,
      latitude: request.body.latitude,
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.location}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
  
    addInitialReading(request, response) {
    const viewData = {
      title: "Add initial reading",
    };
    response.render("addInitialReading", viewData);
  },
};
