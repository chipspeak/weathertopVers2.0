import { stationStore } from "../models/station-store.js";

export const stationAnalytics = {
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
    let displayReadings = false;
    if(station.readings.length > 0) {
      displayReadings = true;
    }
    return displayReadings;
  },
  
  async updateStationParameters(id) {
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
  }
}
  

