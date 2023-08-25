import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { conversions } from "../utils/conversions.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { accountsController } from "./accounts-controller.js";
import axios from "axios";

export const readingController = {
  //once again the method to prevent url-related errors
  async index(request, response) {
    let loggedInUser = await accountsController.getLoggedInUser(request);
    if (loggedInUser === undefined) {
      response.redirect("/login");
      return;
    }
    //initializing the station and reading ids
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Editing Reading ${readingId} from Station ${stationId}`);
    //passing the station and reading to view data
    const viewData = {
      title: "Edit Reading",
      station: await stationStore.getStationById(stationId),
      reading: await readingStore.getReadingById(readingId),
    };
    response.render("reading-view", viewData);
  },

  async update(request, response) {
    //method to update a reading. Udating all variables via the fields entered on the update page.
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    const updatedReading = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      time: conversions.timeConversion(new Date()),
      fahrenheit: Number(conversions.tempConversion(request.body.temp)),
      weatherCondition: conversions.weatherDisplay(Number(request.body.code)),
      weatherIcon: conversions.weatherVisual(Number(request.body.code)),
      tempIcon: conversions.tempVisual(request.body.temp),
      beaufortScale: Number(
        conversions.beaufortConversion(request.body.windSpeed)
      ),
      label: conversions.beaufortLabelConversion(
        conversions.beaufortConversion(request.body.windSpeed)
      ),
      windChill: conversions.windChillCalculation(
        Number(request.body.temp),
        Number(request.body.windSpeed)
      ),
      windDirectionCalculation: conversions.windDirectionCalculation(
        request.body.windDirection
      ),
    };
    console.log(`Updating Reading ${readingId} from Station ${stationId}`);
    //passes this reading to the updateReading method from readingStore
    await readingStore.updateReading(readingId, updatedReading);
    response.redirect("/station/" + stationId);
  },
};
