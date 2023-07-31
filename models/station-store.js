import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { readingStore } from "./reading-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.readings = await readingStore.getReadingsByStationId(list._id);
    return list;
  },
  
  async getLatestReading(id) {
    // let displayReadings = true;
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.readings = await readingStore.getReadingsByStationId(list._id);
    console.log(list.readings.length);
    if (list.readings.length > 0) {
      return list.readings[list.readings.length-1];
    }
    else {
      return null;}
  },
  
  async updateStation(station, updatedStation) {
    station.title = updatedStation.title;
    station.longitude = updatedStation.longitude;
    station.latitude = updatedStation.latitude;
    station.userid = updatedStation.userid;
    station.maxTemp = updatedStation.maxTemp;
    station.minTemp = updatedStation.minTemp;
    station.tempTrendText = updatedStation.tempTrendText;
    station.maxWind = updatedStation.maxWind;
    station.minWind = updatedStation.minWind;
    station.windTrendText = updatedStation.windTrendText;
    station.maxPressure = updatedStation.maxPressure;
    station.minPressure = updatedStation.minPressure;
    station.pressureTrendText = updatedStation.pressureTrendText;
    station.latestTemp = updatedStation.latestTemp;
    station.latestWindSpeed = updatedStation.latestWindSpeed;
    station.latestWindDirection = updatedStation.latestWindDirection;
    station.latestPressure = updatedStation.latestPressure;
    station.latestFahrenheit = updatedStation.latestFahrenheit;
    station.latestWeatherCondition = updatedStation.latestWeatherCondition;
    station.latestWeatherIcon = updatedStation.latestWeatherIcon;
    station.latestTempIcon = updatedStation.latestTempIcon;
    station.latestBeaufortScale = updatedStation.latestBeaufortScale;
    station.latestLabel = updatedStation.latestLabel;
    station.latestWindChill = updatedStation.latestWindChill;
    station.windDirectionCalculation = updatedStation.latestWindDirectionCalculation;
      
    await db.write();
  },

  async getStationsByUserId(userid) {
    await db.read();
    return db.data.stations.filter((station) => station.userid === userid);
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
};
