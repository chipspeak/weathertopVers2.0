import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import {stationAnalytics} from "../utils/station-analytics.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Station Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id),
    };
    for (const station of viewData.stations) {
      viewData.stations.sort((a, b) => (a.location > b.location ?  1 : -1 ));
    }
    console.log("dashboard rendering");
    console.log(loggedInUser.firstname);
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
};
