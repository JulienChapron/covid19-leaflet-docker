<template>
  <v-container fluid color="primary" class="overflow-y-auto">
    <div id="chart">
      <div class="toolbar">
        <v-btn
          class="ml-2"
          id="one_month"
          @click="updateData('one_month')"
          :class="{ active: selection === 'one_month' }"
        >
          1M
        </v-btn>

        <v-btn
          class="ml-2"
          id="six_months"
          @click="updateData('six_months')"
          :class="{ active: selection === 'six_months' }"
        >
          6M
        </v-btn>

        <v-btn
          class="ml-2"
          id="one_year"
          @click="updateData('one_year')"
          :class="{ active: selection === 'one_year' }"
        >
          1Y
        </v-btn>

        <v-btn
          class="ml-2"
          id="ytd"
          @click="updateData('ytd')"
          :class="{ active: selection === 'ytd' }"
        >
          YTD
        </v-btn>

        <v-btn
          class="ml-2"
          id="all"
          @click="updateData('all')"
          :class="{ active: selection === 'all' }"
        >
          ALL
        </v-btn>
      </div>

      <div style="padding:10px;" id="chart-timeline">
        <apexchart
          type="area"
          height="300"
          ref="chart"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";
export default {
  name: "ChartSummaryCountry",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      confirmed: [],
      deaths: [],
      recovered: [],
      dataCovid19: [],
      currentDate: new Date(),
      firstDate: '01/01/1970',
      series: [],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 300,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: new Date("01 Jan 2020").getTime(),
          tickAmount: 6,
        },
        tooltip: {
          style: {
            fontSize: "12px",
          },
          x: {
            format: "dd MMM yyyy",
          },
        },
      },
      selection: "one_year",
    };
  },
  computed: {
    ...mapGetters(["theme"]),
  },
  watch: {
    theme() {
      this.updateChartTheme();
    },
  },
  created() {
    axios
      .get(
        `https://api.covid19api.com/total/country/france?from=2020-03-01T00:00:00Z&to=` +
          this.currentDate.toJSON()
      )
      .then(
        (response) => (
          (this.dataCovid19 = response.data),
          this.dataCovid19.map((item) => {
            var date = new Date(item.Date);
            this.confirmed.push([date.getTime(), item.Confirmed]);
            this.deaths.push([date.getTime(), item.Deaths]);
            this.recovered.push([date.getTime(), item.Recovered]);
          }),
          (this.series = [
            {
              name: "confirmed",
              data: this.confirmed,
            },
            {
              name: "deaths",
              data: this.deaths,
            },
            {
              name: "recovered",
              data: this.recovered,
            },
          ]),
          (this.chartOptions = {
            xaxis: {
              type: "datetime",
              min: new Date(this.confirmed[0]).getTime(),
              tickAmount: 6,
            },
          })
        )
      );
  },
  methods: {
    updateChartTheme() {
      this.chartOptions = {
        theme: {
          mode: this.$vuetify.theme.dark ? "dark" : "light",
          palette: "palette2",
          monochrome: {
            enabled: false,
            color: "#255aee",
            shadeTo: "light",
            shadeIntensity: 0.65,
          },
        },
      };
    },
    updateData: function(timeline) {
      this.selection = timeline;

      switch (timeline) {
        case "one_month":
          this.$refs.chart.zoomX(
            new Date("28 Jan 2013").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "six_months":
          this.$refs.chart.zoomX(
            new Date("27 Sep 2012").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "one_year":
          this.$refs.chart.zoomX(
            new Date("27 Feb 2012").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "ytd":
          this.$refs.chart.zoomX(
            new Date("01 Jan 2013").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        case "all":
          this.$refs.chart.zoomX(
            new Date(this.confirmed[0][0]).getTime(),
            new Date(this.currentDate).getTime()
          );
          break;
        default:
      }
    },
  },
};
</script>
