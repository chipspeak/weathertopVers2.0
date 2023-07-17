export const stationAnalytics = {
  getLatestReading(station) {
    let latestReading = null;
    let latestReadingPosition = station.readings.length - 1;
    if (station.readings.length > 0) {
      latestReading = station.readings[latestReadingPosition];
    }
    return latestReading;
  },

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
};
