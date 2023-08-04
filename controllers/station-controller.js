import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { conversions } from "../utils/conversions.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { accountsController } from "./accounts-controller.js";
import axios from "axios";

export const stationController = {
  
  async index(request, response) {
    //method to render login page if incorrect pathing results in null errors
    let loggedInUser = await accountsController.getLoggedInUser(request);
    if (loggedInUser === undefined) {
      response.redirect("/login");
      return;
    };
    const station = await stationStore.getStationById(request.params.id);
    const latestReading = await stationStore.getLatestReading(
      request.params.id
    );
    const minTemp = await stationAnalytics.minTemp(station);
    const maxTemp = await stationAnalytics.maxTemp(station);
    const minWind = await stationAnalytics.minWind(station);
    const maxWind = await stationAnalytics.maxWind(station);
    const minPressure = await stationAnalytics.minPressure(station);
    const maxPressure = await stationAnalytics.maxPressure(station);
    const tempTrendText = await stationAnalytics.tempTrend(station);
    const pressureTrendText = await stationAnalytics.pressureTrend(station);
    const windTrendText = await stationAnalytics.windTrend(station);
    const displayReadings = await stationAnalytics.stationReadings(station);
    const viewData = {
      title: "Station",
      station: station,
      latestReading: latestReading,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minWind: minWind,
      maxWind: maxWind,
      minPressure: minPressure,
      maxPressure: maxPressure,
      tempTrendText: tempTrendText,
      pressureTrendText: pressureTrendText,
      windTrendText: windTrendText,
      displayReadings: displayReadings,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    let station = await stationStore.getStationById(request.params.id);
    const newReading = {
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
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    await stationAnalytics.updateStationParameters(request.params.id);
    response.redirect("/station/" + station._id);
  },

  //method below to implement the same passage of params but instead using a weather api

  async addReport(request, response) {
    let station = await stationStore.getStationById(request.params.id);
    console.log("rendering new report");
    let report = {};
    const lat = station.latitude;
    const lon = station.longitude;
    const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=686a99e81a6f4520a8583049a7871179`;
    const result = await axios.get(oneCallRequest);
    if (result.status == 200) {
      const autoReading = result.data.current;
      report.code = conversions.apiCodeConverter(autoReading.weather[0].id);
      report.temp = autoReading.temp;
      report.windSpeed = autoReading.wind_speed;
      report.pressure = autoReading.pressure;
      report.windDirection = autoReading.wind_deg;
      report.date = Date(autoReading.dt);
      report.time = conversions.timeConversion(report.date);
      report.fahrenheit = Number(conversions.tempConversion(autoReading.temp));
      report.weatherCondition = conversions.weatherDisplay(Number(report.code));
      report.weatherIcon = conversions.weatherVisual(Number(report.code));
      report.tempIcon = conversions.tempVisual(report.temp);
      report.beaufortScale = Number(
        conversions.beaufortConversion(report.windSpeed)
      );
      report.label = conversions.beaufortLabelConversion(
        conversions.beaufortConversion(report.windSpeed)
      );
      report.windChill = conversions.windChillCalculation(
        Number(report.temp),
        Number(report.windSpeed)
      );
      report.windDirectionCalculation = conversions.windDirectionCalculation(
        report.windDirection
      );
      report.tempTrend = [];
      report.windTrend = [];
      report.pressureTrend = [];
      report.labels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        report.windTrend.push(trends[i].wind_speed);
        report.pressureTrend.push(trends[i].pressure);
        const date = new Date(trends[i].dt*1000).toLocaleDateString("en-uk");
        report.labels.push(
          `${date}`
        );
      }
      await readingStore.addReading(station._id, report);
    }
    await stationAnalytics.updateStationParameters(request.params.id);
    response.redirect("/station/" + station._id);
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(readingId);
    await stationAnalytics.updateStationParameters(stationId);
    response.redirect("/station/" + stationId);
  },
};
