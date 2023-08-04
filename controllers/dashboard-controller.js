import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import axios from "axios";

export const dashboardController = {
  async index(request, response) {
    /*As dashboard, station etc depend on a logged in user, directly accessing these urls
    results in errors. This method checks if logged in user is undefined and if so, redirects
    to the log in view*/
    const loggedInUser = await accountsController.getLoggedInUser(request);
    if (loggedInUser === undefined) {
      response.redirect("/login");
      return;
    }
    const viewData = {
      //passes the stations by user id into the view data
      title: "Station Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id),
    };
    //method to sort the stations in alphabetical order by their location variables
    for (const station of viewData.stations) {
      viewData.stations.sort((a, b) => (a.location > b.location ? 1 : -1));
    }
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    /*method to add a new station, taking in a logged in user and initilizing 
    the station object via user id before adding it to the database*/
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
    //method to delete station via station id
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
