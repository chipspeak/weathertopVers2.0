import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import {conversions } from "../utils/conversions.js";
import {stationAnalytics} from "../utils/station-analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);   
    const latestReading = await stationAnalytics.getLatestReading(station);
    const minTemp = await stationAnalytics.minTemp(station);
    const maxTemp = await stationAnalytics.maxTemp(station)
    const minWind = await stationAnalytics.minWind(station);
    const maxWind = await stationAnalytics.maxWind(station);
    const minPressure = await stationAnalytics.minPressure(station);
    const maxPressure = await stationAnalytics.maxPressure(station);
    const tempTrendText = await stationAnalytics.tempTrend(station);
    const pressureTrendText = await stationAnalytics.pressureTrend(station);
    const windTrendText = await stationAnalytics.windTrend(station);
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
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      date: request.body.date,
      fahrenheit: Number(conversions.tempConversion(request.body.temp)),
      weatherCondition: conversions.weatherDisplay(Number(request.body.code)),
      weatherIcon: conversions.weatherVisual(Number(request.body.code)),
      tempIcon: conversions.tempVisual(request.body.temp),
      beaufortScale: Number(conversions.beaufortConversion(request.body.windSpeed)),
      label: conversions.beaufortLabelConversion(conversions.beaufortConversion(request.body.windSpeed)),
      windChill: conversions.windChillCalculation(Number(request.body.temp), Number(request.body.windSpeed)),
      windDirectionCalculation: conversions.windDirectionCalculation(request.body.windDirection),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(request.params.readingId);
    response.redirect("/station/" + stationId);
  },
  
};
