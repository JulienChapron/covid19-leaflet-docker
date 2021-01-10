<template>
  <div v-if="windowWidth !== 0" class="small">
    <VueApexCharts
      :width="windowWidth"
      height="160px"
      type="line"
      :options="options"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    VueApexCharts,
  },
  props: {
    dataUsaCanada: {
      type: Boolean,
      required: true,
    },
    deathsDataChart: {
      type: Array,
      required: true,
    },
    recoveredDataChart: {
      type: Array,
      required: true,
    },
    confirmedDataChart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      windowWidth: 0,
      events: [],
      series: [],
      options: {
        toolbar: {
          show: true,
        },
        xaxis: {
          type: "datetime",
          min: new Date("01/01/2020").getTime(),
        },
        markers: {
          colors: ["#008ffb", "#feb019", "#00e396"],
          strokeColors: "black",
        },
        stroke: {
          show: true,
          curve: "smooth",
          colors: ["#008ffb", "#feb019", "#00e396"],
          width: 3,
        },
        tooltip: {
          x: {
            show: true,
            format: "dd MMM yyyy",
          },
          marker: {
            show: false,
          },
          theme: "dark",
          style: {
            fontSize: "12px",
          },
        },
      },
    };
  },
  beforeCreate() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      // Init
      this.getWindowWidth();
    });
  },
  created() {
    this.fillData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth =
        document.documentElement.clientWidth < 480
          ? document.documentElement.clientWidth - 40
          : 440;
      this.events.push(event);
    },
    fillData() {
      const date = [];
      const deathsData = [];
      const recoveredData = [];
      const confirmedData = [];
      // date
      for (let i = 0; i < this.deathsDataChart.length; i++) {
        date.push(
          `${this.deathsDataChart[i].date.substring(
            4,
            6
          )}/${this.deathsDataChart[i].date.substring(
            6,
            8
          )}/${this.deathsDataChart[i].date.substring(0, 4)}`
        );
      }

      // deaths
      for (let i = 0; i < this.deathsDataChart.length; i++) {
        deathsData.push(this.deathsDataChart[i].data);
      }
      // recovered
      for (let i = 0; i < this.recoveredDataChart.length; i++) {
        recoveredData.push(this.recoveredDataChart[i].data);
      }
      // confirmed
      for (let i = 0; i < this.confirmedDataChart.length; i++) {
        confirmedData.push(this.confirmedDataChart[i].data);
      }
      (this.options = {
        chart: {
          id: "vuechart",
          toolbar: {
            show: false,
          },
        },

        legend: {
          show: false,
        },
        xaxis: {
          categories: date,
          type: "datetime",
          min: new Date(date[0]).getTime(),
          tickAmount: 6,
        },
        markers: {
          colors: ["#008ffb", "#feb019", "#00e396"],
          strokeColors: "black",
        },
        stroke: {
          show: true,
          curve: "smooth",
          colors:
            this.dataUsaCanada === false
              ? ["#008ffb", "#feb019", "#00e396"]
              : ["#008ffb", "#00e396"],
          width: 3,
        },
        tooltip: {
          x: {
            show: true,
            format: "dd MMM yyyy",
          },
          marker: {
            show: true,
          },
          theme: "dark",
          style: {
            fontSize: "12px",
          },
        },
      }),
        this.dataUsaCanada === false
          ? (this.series = [
              {
                name: "Deaths",
                data: deathsData,
              },
              {
                name: "Recovered",
                data: recoveredData,
              },
              {
                name: "Confirmed",
                data: confirmedData,
              },
            ])
          : (this.series = [
              {
                name: "Deaths",
                data: deathsData,
              },
              {
                name: "Confirmed",
                data: confirmedData,
              },
            ]);
    },
  },
};
</script>
<style>
.apexcharts-zoom-icon svg,
.apexcharts-canvas .apexcharts-zoom-icon.apexcharts-selected svg,
.apexcharts-zoomout-icon,
.apexcharts-zoomin-icon svg,
.apexcharts-reset-zoom-icon.apexcharts-selected svg,
.apexcharts-zoomout-icon,
.apexcharts-zoomout-icon svg,
.apexcharts-reset-icon svg,
.apexcharts-menu-icon svg {
  fill: #fff;
}
</style>
