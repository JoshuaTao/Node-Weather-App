const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { forecast } = require("./utils/forecast");
const { geocode } = require("./utils/geocode");

const app = express();

//Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Joshua"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Joshua"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "Glad to help you!",
    title: "Help",
    name: "Joshua"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "You must provide an address."
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      console.log(location);
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      Error: "You must provide a search term."
    });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    msg: "Help article not found!",
    title: "404",
    name: "Joshua"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    msg: "Page not found!",
    title: "404",
    name: "Joshua"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
