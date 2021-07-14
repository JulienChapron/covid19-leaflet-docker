import storeConfig from "../../store/index.js";

const actions = [
  "countries",
  "country",
  "summaryGlobal",
  "summaryCountry",
  "countryLongitudeLatitude",
  "updateOptionsChart",
  "updateTheme",
];
const getters = [
  "getSummaryGlobal",
  "getDateSummaryGlobal",
  "getSummaryCountry",
  "getCountry",
  "getCountries",
  "getCountryLatLng",
  "getDataChart",
  "getErrorData",
  "getLoadingSummary",
  "getLoadingMap",
  "getLoadingChart",
  "getLoadingSummaryWorld",
  "theme",
];
const mutations = [
  "SET_COUNTRY",
  "SET_COUNTRY_LAT_LNG",
  "SET_COUNTRIES",
  "SET_SUMMARY_GLOBAL",
  "SET_DATE_SUMMARY_GLOBAL",
  "SET_DATA_CHART",
  "SET_ERROR_DATA",
  "SET_LOADING_SUMMARY",
  "SET_LOADING_MAP",
  "SET_LOADING_SUMMARY_WORLD",
  "SET_LOADING_CHART",
  "SET_SUMMARY_COUNTRY",
  "theme",
];
const debug = process.env.NODE_ENV !== "production";

describe("index.js", () => {
  let store = storeConfig;
  it("1. mount modules Dashboard and Navigation with actions", () => {
    let testActions = Object.keys(store._actions);
    expect(testActions).toStrictEqual(actions);
  });
  it("2. mount modules Dashboard and Navigation with getters", () => {
    let testGetters = Object.keys(store.getters);
    expect(testGetters).toStrictEqual(getters);
  });
  it("3. mount modules Dashboard and Navigation with getters", () => {
    let testMutations = Object.keys(store._mutations);
    expect(testMutations).toStrictEqual(mutations);
  });
  it("4. test .env", () => {
    if (process.env.NODE_ENV !== "production") {
      expect(debug).toBeTruthy();
    } else if (process.env.NODE_ENV === "production") {
      expect(debug).toBeNull();
    }
  });
});
