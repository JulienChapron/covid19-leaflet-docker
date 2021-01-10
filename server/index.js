const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("combined"));
require("dotenv").config();

// INITIALIZATION JOHNS HOPKINS DATA
let jsonRecoveredGlobal = null;
let jsonDeathsGlobal = null;
let jsonConfirmedGlobal = null;
let jsonDailyGlobal = null;
let jsonDeathsUs = null;
let jsonConfirmedUs = null;
//jsonDeathsUs
fs.readFile("./deaths_us/deaths_us.json", (err, data) => {
  if (err) throw err;
  jsonDeathsUs = JSON.parse(data);
});
//jsonConfirmedUs
fs.readFile("./confirmed_us/confirmed_us.json", (err, data) => {
  if (err) throw err;
  jsonConfirmedUs = JSON.parse(data);
});
//jsonDeathsGlobal
fs.readFile("./deaths_global/deaths_global.json", (err, data) => {
  if (err) throw err;
  jsonDeathsGlobal = JSON.parse(data);
});
//jsonRecoveredGlobal
fs.readFile("./recovered_global/recovered_global.json", (err, data) => {
  if (err) throw err;
  jsonRecoveredGlobal = JSON.parse(data);
});
//jsonConfirmedGlobal
fs.readFile("./confirmed_global/confirmed_global.json", (err, data) => {
  if (err) throw err;
  jsonConfirmedGlobal = JSON.parse(data);
});
//jsonDailyGlobal
fs.readFile("./daily_Covid19/daily_Covid19.json", (err, data) => {
  if (err) throw err;
  jsonDailyGlobal = JSON.parse(data);
});

// get news from country from newsApi.org
app.get("/api/news-country/:name_alpha", function (req, res) {
  axios
    .get(
      `http://newsapi.org/v2/top-headlines?country=` +
        req.params.name_alpha +
        `&q=covid&apiKey=` +
        process.env.NEWS_API
    )
    .then((response) => {
      return res.status(200).json(response.data);
    });
});

// get all data countries
app.get("/api/data-countries", function (req, res) {
  let dataCountries = [];
  jsonDeathsGlobal.forEach((country) => {
    dataCountries.push({
      id: Object.keys(country),
      Lat: country.Lat,
      Long: country.Long,
      country: country["Country/Region"],
      province: country["Province/State"],
    });
  });
  jsonDeathsUs.forEach((country) => {
    dataCountries.push({
      id: Object.keys(country),
      Lat: country.Lat,
      Long: country.Long_,
      town: country.Admin2,
      country: country.Country_Region,
      province: country.Admin2,
    });
  });
  return res.status(200).json(dataCountries);
});

// get specific data country
app.get("/api/data-country/:country/:province/:town", function (req, res) {
  let deathsDataSortByDate = [];
  let recoveredDataSortByDate = [];
  let confirmedDataSortByDate = [];
  let refactorDate = "";
  let newDate = "";
  let arrayDataCountry = [];
  let deathsIndexUS = 0;
  let deathsIndex = 0;
  let recoveredIndex = 0;
  let confirmedIndex = 0;
  // index confirmed
  if (req.params.country !== "US")
    for (let y = 0; y < Object.values(jsonConfirmedGlobal).length; y++) {
      if (
        req.params.province === "NC" &&
        Object.values(jsonConfirmedGlobal)[y]["Country/Region"] ===
          req.params.country &&
        Object.values(jsonConfirmedGlobal)[y]["Province/State"] === ""
      ) {
        confirmedIndex = y;
      } else if (
        req.params.province !== "NC" &&
        Object.values(jsonConfirmedGlobal)[y]["Province/State"] ===
          req.params.province
      ) {
        confirmedIndex = y;
      }
    }
  else {
    for (let y = 0; y < Object.values(jsonConfirmedUs).length; y++) {
      if (
        Object.values(jsonConfirmedUs)[y]["Admin2"] === req.params.town
      ) {
        confirmedIndexUS = y;
        console.log("passage OK", y);
      }
    }
  }
  // index deaths
  if (req.params.country !== "US")
    for (let y = 0; y < Object.values(jsonDeathsGlobal).length; y++) {
      if (
        req.params.province === "NC" &&
        Object.values(jsonDeathsGlobal)[y]["Country/Region"] ===
          req.params.country &&
        Object.values(jsonDeathsGlobal)[y]["Province/State"] === ""
      ) {
        deathsIndex = y;
      } else if (
        req.params.province !== "NC" &&
        Object.values(jsonDeathsGlobal)[y]["Province/State"] ===
          req.params.province
      ) {
        deathsIndex = y;
      }
    }
  else {
    for (let y = 0; y < Object.values(jsonDeathsUs).length; y++) {
      if (Object.values(jsonDeathsUs)[y]["Admin2"] === req.params.town) {
        deathsIndexUS = y;
        console.log("passage OK", y);
      }
    }
  }
  // index recovered
  for (let y = 0; y < Object.values(jsonRecoveredGlobal).length; y++) {
    if (
      req.params.province === "NC" &&
      Object.values(jsonRecoveredGlobal)[y]["Country/Region"] ===
        req.params.country &&
      Object.values(jsonRecoveredGlobal)[y]["Province/State"] === ""
    ) {
      recoveredIndex = y;
    } else if (
      req.params.province !== "NC" &&
      Object.values(jsonRecoveredGlobal)[y]["Province/State"] ===
        req.params.province
    ) {
      recoveredIndex = y;
    }
  }
  // deathsDataCountry
  let deathsDataCountry = [];
  if (req.params.country !== "US") {
    deathsDataCountry = Object.values(jsonDeathsGlobal)[deathsIndex];
  } else {
    deathsDataCountry = Object.values(jsonDeathsUs)[deathsIndexUS];
  }

  let recoveredDataCountry = Object.values(jsonRecoveredGlobal)[recoveredIndex];
  let confirmedDataCountry = []
  if (req.params.country !== "US") {
  confirmedDataCountry = Object.values(jsonConfirmedGlobal)[confirmedIndex];
  } else {
    confirmedDataCountry = Object.values(jsonConfirmedUs)[confirmedIndexUS];
  }
  // refactor date with format YYYYMMDD for 'deaths_global' data
  for (let i = 0; i < Object.keys(deathsDataCountry).length; i++) {
    if (/\/.*\//.test(Object.keys(deathsDataCountry)[i])) {
      switch (Object.keys(deathsDataCountry)[i].length) {
        case 7:
          refactorDate = Object.keys(deathsDataCountry)[i].split("/");
          newDate =
            "20" + refactorDate[2] + "0" + refactorDate[0] + refactorDate[1];
          break;
        case 6:
          refactorDate = Object.keys(deathsDataCountry)[i].split("/");
          newDate =
            "20" +
            refactorDate[2] +
            "0" +
            refactorDate[0] +
            "0" +
            refactorDate[1];
          break;
      }
      deathsDataSortByDate.push({
        date: newDate,
        data: Object.values(deathsDataCountry)[i],
      });
    }
  }
  deathsDataSortByDate.sort(function (a, b) {
    return a.date - b.date;
  });
  // refactor date with format YYYYMMDD for 'recovered_global' data
  for (let i = 0; i < Object.keys(recoveredDataCountry).length; i++) {
    if (/\/.*\//.test(Object.keys(recoveredDataCountry)[i])) {
      switch (Object.keys(recoveredDataCountry)[i].length) {
        case 7:
          refactorDate = Object.keys(recoveredDataCountry)[i].split("/");
          newDate =
            "20" + refactorDate[2] + "0" + refactorDate[0] + refactorDate[1];
          break;
        case 6:
          refactorDate = Object.keys(recoveredDataCountry)[i].split("/");
          newDate =
            "20" +
            refactorDate[2] +
            "0" +
            refactorDate[0] +
            "0" +
            refactorDate[1];
          break;
      }
      recoveredDataSortByDate.push({
        date: newDate,
        data: Object.values(recoveredDataCountry)[i],
      });
    }
  }
  recoveredDataSortByDate.sort(function (a, b) {
    return a.date - b.date;
  });

  // refactor date with format YYYYMMDD for 'confirmed_global' data
  for (let i = 0; i < Object.keys(confirmedDataCountry).length; i++) {
    if (/\/.*\//.test(Object.keys(confirmedDataCountry)[i])) {
      switch (Object.keys(confirmedDataCountry)[i].length) {
        case 7:
          refactorDate = Object.keys(confirmedDataCountry)[i].split("/");
          newDate =
            "20" + refactorDate[2] + "0" + refactorDate[0] + refactorDate[1];
          break;
        case 6:
          refactorDate = Object.keys(confirmedDataCountry)[i].split("/");
          newDate =
            "20" +
            refactorDate[2] +
            "0" +
            refactorDate[0] +
            "0" +
            refactorDate[1];
          break;
      }
      confirmedDataSortByDate.push({
        date: newDate,
        data: Object.values(confirmedDataCountry)[i],
      });
    }
  }
  confirmedDataSortByDate.sort(function (a, b) {
    return a.date - b.date;
  });
  let country = null;
  let province = null;
  let town = null;
  let dataDailyCountry = null;
  if (req.params.country !== "US") {
    country = Object.values(jsonDeathsGlobal)[deathsIndex]["Country/Region"];
    province = Object.values(jsonDeathsGlobal)[deathsIndex]["Province/State"];
    dataDailyCountry = jsonDailyGlobal.filter((x) => {
      if (x.Province_State !== "") {
        return x.Province_State === province;
      } else {
        return x.Country_Region === country;
      }
    });
  } else {
    country = "usa";
    province = Object.values(jsonDeathsUs)[deathsIndexUS]["Province_State"];
    town = req.params.town;
    /* dataDailyCountry = jsonDailyGlobal.filter((x) => {
      if (x.Province_State !== "") {
        return x.Province_State === province;
      } else {
        return x.Country_Region === country;
      }
    }); */
  }
  arrayDataCountry.unshift({
    country,
    province,
    town,
    dataDailyCountry,
    deathsAllDataSortByDate: deathsDataSortByDate,
    recoveredAllDataSortByDate: recoveredDataSortByDate,
    confirmedAllDataSortByDate: confirmedDataSortByDate,
  });
  console.log(
    deathsDataSortByDate[deathsDataSortByDate.length - 1],
    recoveredDataSortByDate[recoveredDataSortByDate.length - 1],
    confirmedDataSortByDate[confirmedDataSortByDate.length - 1]
  );
  return res.status(201).json(arrayDataCountry);
});

//
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`server listening on port ${port}`));
