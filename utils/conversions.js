export const conversions = {
  weatherDisplay(code) {
    let weatherCondition = "null";
    switch (code) {
      case 100:
        weatherCondition = "Clear";
        break;
      case 200:
        weatherCondition = "Partial Clouds";
        break;
      case 300:
        weatherCondition = "Cloudy";
        break;
      case 400:
        weatherCondition = "Light Showers";
        break;
      case 500:
        weatherCondition = "Heavy Showers";
        break;
      case 600:
        weatherCondition = "Rain";
        break;
      case 700:
        weatherCondition = "Snow";
        break;
      case 800:
        weatherCondition = "Thunder";
        break;
    }
    return weatherCondition;
  },

  //use if statement to tidy this up
  apiCodeConverter(code) {
    let updatedCode = 0;
    if (code > 199 && code < 300) {
      updatedCode = 800;
    }
    else if (code > 299 && code < 400) {
      updatedCode = 400;
    }
    else if (code > 499 && code < 600) {
      updatedCode = 500;
    }
    else if (code > 599 && code < 700) {
      updatedCode = 700;
    }
    else if ((code == 800)) {
      updatedCode = 100;
    }
    else if ((code == 801)) {
      updatedCode = 200;
    }
    else if ((code == 802)) {
      updatedCode = 200;
    }
    else if ((code == 803)) {
      updatedCode = 300;
    }
    else if ((code == 804)) {
      updatedCode = 300;
    }
    return updatedCode;
  },

  timeConversion(date) {
    const time = new Date(date);
    return time.toUTCString();
  },

  /*
  this method takes the same code as above and instead uses it to return
  a string which will double as a font awesome icon to be called
  in the listlatestreadings view
   */
  weatherVisual(code) {
    let weatherIcon = "fa-sun";
    switch (code) {
      default:
        weatherIcon = "fa-sun";
      case 100:
        weatherIcon = "fa-sun";
        break;
      case 200:
        weatherIcon = "fa-cloud-sun";
        break;
      case 300:
        weatherIcon = "fa-cloud";
        break;
      case 400:
        weatherIcon = "fa-cloud-sun-rain";
        break;
      case 500:
        weatherIcon = "fa-cloud-rain";
        break;
      case 600:
        weatherIcon = "fa-cloud-showers-heavy";
        break;
      case 700:
        weatherIcon = "fa-snowflake";
        break;
      case 800:
        weatherIcon = "fa-cloud-bolt";
        break;
    }
    return weatherIcon;
  },

  /*
  this method is similar to the above where a string containing
  a font awesome icon is returned however a series of if statements
  are used to detect temp ranges and return appropriate
  thermometer levels based on temp
   */
  tempVisual(temp) {
    let tempIcon = "fa-solid fa-temperature-empty";
    if (temp <= 10) {
      tempIcon = "fa-solid fa-temperature-empty";
    }
    if (temp >= 11 && temp < 20) {
      tempIcon = "fa-solid fa-temperature-half";
    }
    if (temp >= 20 && temp < 25) {
      tempIcon = "fa-solid fa-temperature-three-quarters";
    }
    if (temp >= 25) {
      tempIcon = "fa-solid fa-temperature-full";
    }
    return tempIcon;
  },

  /*
  method to convert the temp variable from the passed in
  Celsius to Fahrenheit. this method is called in the listreadings view
  to display the alternate temperature
   */
  tempConversion(temp) {
    const fahrenheit = (temp * 9) / 5 + 32;
    return fahrenheit.toFixed(2);
  },

  /*
  method to convert the windSpeed variable to a beaufort scale
  reading. the windSpeed is passed in and ranges are checked
  via if statements before a value is returned
   */
  beaufortConversion(windSpeed) {
    let beaufortScale = 0;
    if (windSpeed == 1) {
      beaufortScale = 0;
    }
    if (windSpeed > 1 && windSpeed < 6) {
      beaufortScale = 1;
    }
    if (windSpeed > 5 && windSpeed < 12) {
      beaufortScale = 2;
    }
    if (windSpeed > 11 && windSpeed < 20) {
      beaufortScale = 3;
    }
    if (windSpeed > 19 && windSpeed < 29) {
      beaufortScale = 4;
    }
    if (windSpeed > 28 && windSpeed < 39) {
      beaufortScale = 5;
    }
    if (windSpeed > 38 && windSpeed < 50) {
      beaufortScale = 6;
    }
    if (windSpeed > 49 && windSpeed < 62) {
      beaufortScale = 7;
    }
    if (windSpeed > 61 && windSpeed < 75) {
      beaufortScale = 8;
    }
    if (windSpeed > 74 && windSpeed < 89) {
      beaufortScale = 9;
    }
    if (windSpeed > 88 && windSpeed < 103) {
      beaufortScale = 10;
    }
    if (windSpeed > 102 && windSpeed < 118) {
      beaufortScale = 11;
    }
    return beaufortScale;
  },

  /*
  method which takes in the beaufortScale variable from the above method
  the method then uses a switch statement in order to return the string
  displaying the beaufort reading
   */
  beaufortLabelConversion(beaufortScale) {
    let label = null;
    switch (beaufortScale) {
      case 0:
        label = "Calm";
        break;
      case 1:
        label = "Light Air";
        break;
      case 2:
        label = "Light Breeze";
        break;
      case 3:
        label = "Gentle Breeze";
        break;
      case 4:
        label = "Moderate Breeze";
        break;
      case 5:
        label = "Fresh Breeze";
        break;
      case 6:
        label = "Strong Breeze";
        break;
      case 7:
        label = "Near Gale";
        break;
      case 8:
        label = "Gale";
        break;
      case 9:
        label = "Severe Gale";
        break;
      case 10:
        label = "Strong Storm";
        break;
      case 11:
        label = "Violent Storm";
        break;
    }
    return label;
  },

  /*
  this method takes in both temp and windSpeed variables then uses
  the below formula to calculate the windchill before returning this double
   */
  windChillCalculation(temp, windSpeed) {
    let windChill = temp;
    if (temp < 10.0 && windSpeed > 4.8) {
      let chill =
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(windSpeed, 0.16) +
        0.3965 * temp * Math.pow(windSpeed, 0.16);
      windChill = Math.round(chill * 10.0) / 10.0;
    }
    return windChill;
  },

  /*
  method to calculate wind direction based on if statements to
  dictate ranges and return a string based on the result
   */
  windDirectionCalculation(windDirection) {
    if (windDirection > 348.75 && windDirection < 11.25) {
      return "North";
    }
    if (windDirection > 11.24 && windDirection < 33.76) {
      return "North North-East";
    }
    if (windDirection > 33.75 && windDirection < 56.26) {
      return "North-East";
    }
    if (windDirection > 56.25 && windDirection < 78.76) {
      return "East North-East";
    }
    if (windDirection > 78.75 && windDirection < 101.26) {
      return "East";
    }
    if (windDirection > 101.25 && windDirection < 123.76) {
      return "East South-East";
    }
    if (windDirection > 123.75 && windDirection < 146.26) {
      return "South-East";
    }
    if (windDirection > 146.25 && windDirection < 168.76) {
      return "South South-East";
    }
    if (windDirection > 168.75 && windDirection < 191.26) {
      return "South";
    }
    if (windDirection > 191.25 && windDirection < 213.76) {
      return "South South-West";
    }
    if (windDirection > 213.75 && windDirection < 236.36) {
      return "South-West";
    }
    if (windDirection > 236.35 && windDirection < 258.76) {
      return "West South-West";
    }
    if (windDirection > 258.75 && windDirection < 281.26) {
      return "West";
    }
    if (windDirection > 281.25 && windDirection < 303.76) {
      return "West North-West";
    }
    if (windDirection > 303.75 && windDirection < 326.26) {
      return "North-West";
    }
    if (windDirection > 326.75 && windDirection < 348.76) {
      return "North North-West";
    } else return " ";
  },
};
