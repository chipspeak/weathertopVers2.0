import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import {stationAnalytics} from "../utils/station-analytics.js";
import axios from "axios";

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
    console.log(loggedInUser.firstName);
    console.log(loggedInUser.lastName);
    console.log(loggedInUser.email);
    console.log(loggedInUser.password);
    response.render("dashboard-view", viewData);
  },
  
 // async addreport(request, response) {
 //    console.log("rendering new report");
 //    let report = {};
 //    const lat = station.latitude;
 //    const lon = station.longitutde;
 //    const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=686a99e81a6f4520a8583049a7871179`
 //    const result = await axios.get(oneCallRequest);
 //    if (result.status == 200) {
 //      const reading = result.data.current;
 //      report.code = reading.weather[0].id;
 //      report.temperature = reading.temp;
 //      report.windSpeed = reading.wind_speed;
 //      report.pressure = reading.pressure;
 //      report.windDirection = reading.wind_deg;
 //    }
 //    console.log(report);
 //    const viewData = {
 //      title: "Weather Report",
 //      reading: report
 //    };
 //    response.render("dashboard-view", viewData);
 //  },

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
