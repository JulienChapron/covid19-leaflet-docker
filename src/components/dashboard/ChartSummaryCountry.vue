<template>
  <v-container fluid color="primary">
    <div id="chart">
      <h2>{{ getCountry }}</h2>
      <div class="toolbar">
        <v-btn
          class="ml-2"
          id="one_week"
          @click="updateData('one_week')"
          :class="{ active: selection === 'one_week' }"
        >
          1W
        </v-btn>
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
          height="280"
          ref="chart"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
      firstDate: "01/01/1970",
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
        colors: ["#9ede73", "#be0000", "#e48900"],
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
    ...mapGetters(["theme", "getCountry", "getDataChart"]),
  },
  watch: {
    theme() {
      this.updateChartTheme();
    },
    getCountry() {
      if (this.getCountry) {
        this.updateOptionsChart();
      }
    },
    getDataChart() {
      this.dataChart();
    },
  },
  mounted() {
    this.updateOptionsChart();
  },
  methods: {
    ...mapActions(["updateOptionsChart"]),
    dataChart() {
      this.dataCovid19 = this.getDataChart;
      this.confirmed = [];
      this.deaths = [];
      this.recovered = [];
      this.series = [];
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
        ]);
    },
    updateChartTheme() {
      this.chartOptions = {
        theme: {
          mode: this.$vuetify.theme.dark ? "dark" : "light",
        },
        chart: {
          background: this.$vuetify.theme.dark ? "#1c2541" : "#fff",
        },
        colors: this.$vuetify.theme.dark
          ? ["#F44336", "#E91E63", "#9C27B0"]
          : ["#9ede73", "#be0000", "#e48900"],
      };
    },
    updateData: function(timeline) {
      this.selection = timeline;
      var dateObj = new Date();
      switch (timeline) {
        case "one_week":
          var oneWeekAgo = dateObj.setDate(dateObj.getDate() - 7);
          this.$refs.chart.zoomX(
            new Date(oneWeekAgo).getTime(),
            new Date(this.currentDate).getTime()
          );
          break;
        case "one_month":
          var oneMonthAgo = dateObj.setMonth(dateObj.getMonth() - 1);
          this.$refs.chart.zoomX(
            new Date(oneMonthAgo).getTime(),
            new Date(this.currentDate).getTime()
          );
          break;
        case "six_months":
          var sixMonthsAgo = dateObj.setMonth(dateObj.getMonth() - 6);
          this.$refs.chart.zoomX(
            new Date(sixMonthsAgo).getTime(),
            new Date(this.currentDate).getTime()
          );
          break;
        case "one_year":
          var oneYearAgo = dateObj.setMonth(dateObj.getMonth() - 12);
          this.$refs.chart.zoomX(
            new Date(oneYearAgo).getTime(),
            new Date(this.currentDate).getTime()
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
