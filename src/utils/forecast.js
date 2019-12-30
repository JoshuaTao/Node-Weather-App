const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/3cf4c67e6e24591f42e9657a4797876b/${latitude},${longitude}/?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to services!", undefined);
    } else if (body.error) {
      callback("The given location is invalid", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} The highest/lowest temperature is ${body.daily.data[0].temperatureMax}/${body.daily.data[0].temperatureMin} degrees.It is currently ${body.currently.temperature} degrees out.There is a ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = {
  forecast
};
