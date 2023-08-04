import { stationStore } from "../models/station-store.js";

export const stationAnalytics = {
  //methods that carry out calculations based on multiple station readings

  /*below methods take in station objects, check if the array contains readings
  and then uses a for each loop to compare each readings values to the first reading 
  in the array. Method iterates through a loop checking each reading for greater
  or less values and returns the desired reading.variable*/
  minTemp(station) {
    let minTemp = null;
    if (station.readings.length != 0) {
      let minTemp = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.temp < minTemp.temp) {
          minTemp = reading;
        }
      });
      return minTemp.temp;
    } else return 0;
  },

  maxTemp(station) {
    let maxTemp = null;
    if (station.readings.length != 0) {
      let maxTemp = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.temp > maxTemp.temp) {
          maxTemp = reading;
        }
      });
      return maxTemp.temp;
    } else return 0;
  },

  minWind(station) {
    let minWind = null;
    if (station.readings.length != 0) {
      let minWind = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.windSpeed < minWind.windSpeed) {
          minWind = reading;
        }
      });
      return minWind.windSpeed;
    } else return 0;
  },

  maxWind(station) {
    let maxWind = null;
    if (station.readings.length != 0) {
      let maxWind = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.windSpeed > maxWind.windSpeed) {
          maxWind = reading;
        }
      });
      return maxWind.windSpeed;
    } else return 0;
  },

  minPressure(station) {
    let minWind = null;
    if (station.readings.length != 0) {
      let minPressure = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.pressure < minPressure.pressure) {
          minPressure = reading;
        }
      });
      return minPressure.pressure;
    } else return 0;
  },

  maxPressure(station) {
    let maxPressure = null;
    if (station.readings.length != 0) {
      let maxPressure = station.readings[0];
      station.readings.forEach((reading) => {
        if (reading.pressure > maxPressure.pressure) {
          maxPressure = reading;
        }
      });
      return maxPressure.pressure;
    } else return 0;
  },

  tempTrend(station) {
    let tempTrendText = "fas fa-2x fa-arrows-h";
    if (station.readings.length != 0 && station.readings.length > 2) {
      let pos1 = station.readings.length - 1;
      let pos2 = station.readings.length - 2;
      let pos3 = station.readings.length - 3;
      let tempTrend1 = station.readings[pos1];
      let tempTrend2 = station.readings[pos2];
      let tempTrend3 = station.readings[pos3];
      if (
        tempTrend1.temp > tempTrend2.temp &&
        tempTrend2.temp > tempTrend3.temp
      ) {
        tempTrendText = "fas fa-2x fa-arrow-trend-up fa-beat";
      }
      if (
        tempTrend1.temp < tempTrend2.temp &&
        tempTrend2.temp < tempTrend3.temp
      ) {
        tempTrendText = "fas fa-2x fa-arrow-trend-down fa-beat";
      }
    } else {
      tempTrendText = "fas fa-2x fa-arrows-h";
    }
    return tempTrendText;
  },

  /*the below series of methods are used to illustrate trends based on the
  last 3 readings in the station. New reading objects are initialised at
  the 3 most recent points in the array list and then these readings' selected
  values are compared via an if statement. The outcome then returns a font
  awesome icon based on trending up, down, or remaining steady*/
  pressureTrend(station) {
    let pressureTrendText = "fas fa-2x fa-arrows-h";
    if (station.readings.length != 0 && station.readings.length > 2) {
      let pos1 = station.readings.length - 1;
      let pos2 = station.readings.length - 2;
      let pos3 = station.readings.length - 3;
      let pressureTrend1 = station.readings[pos1];
      let pressureTrend2 = station.readings[pos2];
      let pressureTrend3 = station.readings[pos3];
      if (
        pressureTrend1.pressure > pressureTrend2.pressure &&
        pressureTrend2.pressure > pressureTrend3.pressure
      ) {
        pressureTrendText = "fas fa-2x fa-arrow-trend-up fa-beat";
      }
      if (
        pressureTrend1.pressure < pressureTrend2.pressure &&
        pressureTrend2.pressure < pressureTrend3.pressure
      ) {
        pressureTrendText = "fas fa-2x fa-arrow-trend-down fa-beat";
      }
    } else {
      pressureTrendText = "fas fa-2x fa-arrows-h";
    }
    return pressureTrendText;
  },

  windTrend(station) {
    let windTrendText = "fas fa-2x fa-arrows-h";
    if (station.readings.length != 0 && station.readings.length > 2) {
      let pos1 = station.readings.length - 1;
      let pos2 = station.readings.length - 2;
      let pos3 = station.readings.length - 3;
      let windTrend1 = station.readings[pos1];
      let windTrend2 = station.readings[pos2];
      let windTrend3 = station.readings[pos3];
      if (
        windTrend1.windSpeed > windTrend2.windSpeed &&
        windTrend2.windSpeed > windTrend3.windSpeed
      ) {
        windTrendText = "fas fa-2x fa-arrow-trend-up fa-beat";
      }
      if (
        windTrend1.windSpeed < windTrend2.windSpeed &&
        windTrend2.windSpeed < windTrend3.windSpeed
      ) {
        windTrendText = "fas fa-2x fa-arrow-trend-down fa-beat";
      }
    } else {
      windTrendText = "fas fa-2x fa-arrows-h";
    }
    return windTrendText;
  },

  stationReadings(station) {
    /*method that we will call and constantly update to reflect
    content of readings array. If there are no readings
    it returns as false. This will be used in the listlatestreadings views
    to render different version of the page depending on the content of the array*/
    let displayReadings = false;
    if (station.readings.length > 0) {
      displayReadings = true;
    }
    return displayReadings;
  },

  async updateStationContent(id) {
    /*method which takes in station id and updates the station object to reflect
    the latest reading. This updated station object is then passed to the station
    store where it is written to the db.*/
    const latestReading = await stationStore.getLatestReading(id);
    const station = await stationStore.getStationById(id);
    const maxTemp = await stationAnalytics.maxTemp(station);
    const minTemp = await stationAnalytics.minTemp(station);
    const tempTrendText = await stationAnalytics.tempTrend(station);
    const maxWind = await stationAnalytics.maxWind(station);
    const minWind = await stationAnalytics.minWind(station);
    const windTrendText = await stationAnalytics.windTrend(station);
    const maxPressure = await stationAnalytics.maxPressure(station);
    const minPressure = await stationAnalytics.minPressure(station);
    const pressureTrendText = await stationAnalytics.pressureTrend(station);
    const displayReadings = await stationAnalytics.stationReadings(station);
    if (station.readings.length != 0) {
      //if statement to account for potential null errors.Checks if station contains readings.
      const latestCode = await latestReading.code;
      const latestTemp = await latestReading.temp;
      const latestWindSpeed = await latestReading.windSpeed;
      const latestWindDirection = await latestReading.windDirection;
      const latestPressure = await latestReading.pressure;
      const latestFahrenheit = await latestReading.fahrenheit;
      const latestWeatherCondition = await latestReading.weatherCondition;
      const latestWeatherIcon = await latestReading.weatherIcon;
      const latestTempIcon = await latestReading.tempIcon;
      const latestBeaufortScale = await latestReading.beaufortScale;
      const latestLabel = await latestReading.label;
      const latestWindChill = await latestReading.windChill;
      const latestWindDirectionCalculation =
        await latestReading.windDirectionCalculation;

      const updatedStation = {
        location: station.location,
        longitude: station.longitude,
        latitude: station.latitude,
        userid: station.userid,
        maxTemp: maxTemp,
        minTemp: minTemp,
        tempTrendText: tempTrendText,
        maxWind: maxWind,
        minWind: minWind,
        windTrendText: windTrendText,
        maxPressure: maxPressure,
        minPressure: minPressure,
        pressureTrendText: pressureTrendText,
        displayReadings: displayReadings,
        latestTemp: latestTemp,
        latestCode: latestCode,
        latestWindSpeed: latestWindSpeed,
        latestWindDirection: latestWindDirection,
        latestPressure: latestPressure,
        latestFahrenheit: latestFahrenheit,
        latestWeatherCondition: latestWeatherCondition,
        latestWeatherIcon: latestWeatherIcon,
        latestTempIcon: latestTempIcon,
        latestBeaufortScale: latestBeaufortScale,
        latestLabel: latestLabel,
        latestWindChill: latestWindChill,
        latestWindDirectionCalculation: latestWindDirectionCalculation,
      };
      await stationStore.updateStation(station, updatedStation);
    } else {
      const updatedStation = {
        location: station.location,
        longitude: station.longitude,
        latitude: station.latitude,
        userid: station.userid,
        maxTemp: maxTemp,
        minTemp: minTemp,
        tempTrendText: tempTrendText,
        maxWind: maxWind,
        minWind: minWind,
        windTrendText: windTrendText,
        maxPressure: maxPressure,
        minPressure: minPressure,
        pressureTrendText: pressureTrendText,
        displayReadings: displayReadings,
      };
      await stationStore.updateStation(station, updatedStation);
    }
  },
};
