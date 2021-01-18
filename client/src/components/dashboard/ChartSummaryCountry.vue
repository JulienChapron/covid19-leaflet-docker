<template>
  <div id="chart">
    <div class="toolbar">
      <v-btn
        id="one_month"
        @click="updateData('one_month')"
        :class="{ active: selection === 'one_month' }"
      >
        1M
      </v-btn>

      <v-btn
        id="six_months"
        @click="updateData('six_months')"
        :class="{ active: selection === 'six_months' }"
      >
        6M
      </v-btn>

      <v-btn
        id="one_year"
        @click="updateData('one_year')"
        :class="{ active: selection === 'one_year' }"
      >
        1Y
      </v-btn>

      <v-btn
        id="ytd"
        @click="updateData('ytd')"
        :class="{ active: selection === 'ytd' }"
      >
        YTD
      </v-btn>

      <v-btn
        id="all"
        class="btn"
        @click="updateData('all')"
        :class="{ active: selection === 'all' }"
      >
        ALL
      </v-btn>
    </div>

    <div style="padding:10px;" id="chart-timeline">
      <apexchart
        type="line"
        height="300"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
export default {
  name: "ChartSummaryCountry",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      confirmed: [],
      confirmed_temp: [],
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
          x: {
            format: "dd MMM yyyy",
          },
        },
      },
      selection: "one_year",
    };
  },
  created() {
    axios
      .get(
        "https://api.covid19api.com/country/france/status/confirmed?from=2020-03-01T00:00:00Z&to=2021-01-01T00:00:00Z"
      )
      .then(
        (response) => (
          (this.confirmed_temp = response.data),
          this.confirmed_temp.map((item) => {
            var date = new Date(item.Date);
            this.confirmed.push([date.getTime(), item.Cases]);
          }),
          console.log(this.confirmed),
          (this.series = [
            {
              name: "confirmed",
              data: this.confirmed,
            },
          ]),
          (this.chartOptions = {
            xaxis: {
              type: "datetime",
              min: new Date(this.confirmed[0]).getTime(),
              tickAmount: 6,
            },
            fill: {
              type: "gradient",
              gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
              },
            },
          })
        )
      );
  },
  methods: {
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
            new Date("23 Jan 2012").getTime(),
            new Date("27 Feb 2013").getTime()
          );
          break;
        default:
      }
    },
  },
};
</script>
