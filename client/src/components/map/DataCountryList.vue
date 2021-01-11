<template>
  <div class="white--text">
    <div>
      <p v-if="dataCountry[0].town">
        <span style="font-size:22px">{{ dataCountry[0].town }}</span>
      </p>
      <p>
        Country:
        <span style="font-size:18px">{{ dataCountry[0].country }}</span>
        {{ " " }}
        <span>
          <img
            v-if="allDataCountry[0].alpha2Code !== undefined"
            style="max-height:20px"
            :src="allDataCountry[0].flag"
          />
        </span>
      </p>
      <p v-if="dataCountry[0].province !== ''">
        Province: {{ dataCountry[0].province }}
      </p>
      <p>Timezones: {{ allDataCountry[0].timezones[0] }}</p>
      <p>Subregion: {{ allDataCountry[0].subregion }}</p>
      <p>Region: {{ allDataCountry[0].region }}</p>
      <p v-if="dataCountry[0].country !== 'usa'">
        Infected population: {{ percentsInfectedPopulation.toFixed(2) }}%
      </p>
      <p>Area: {{ allDataCountry[0].area }}</p>
      <p>
        Borders:
        {{
          allDataCountry[0].borders.length
            ? allDataCountry[0].borders
            : "No borders"
        }}
      </p>
      <p>Subregion: {{ allDataCountry[0].subregion }}</p>
    </div>
    <div class="block">
      <p class="mt-1">
        <v-icon style="width:15px; margin-right:5px">mdi-arrow-right</v-icon
        >Last update:
        <span>
          {{
            dataCountry[0].confirmedAllDataSortByDate[
              dataCountry[0].confirmedAllDataSortByDate.length - 1
            ].date.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")
          }}
        </span>
      </p>
      <p class="confirmed">
        Total confirmed:
        <span style="font-size:18px">
          {{
            dataCountry[0].confirmedAllDataSortByDate[
              dataCountry[0].confirmedAllDataSortByDate.length - 1
            ].data
          }}
        </span>
      </p>

      <p
        v-if="
          dataCountry[0].country !== 'usa' &&
            dataCountry[0].country !== 'Canada'
        "
        class="recovered"
      >
        Total recovered:
        <span style="font-size:18px">
          {{
            dataCountry[0].recoveredAllDataSortByDate[
              dataCountry[0].recoveredAllDataSortByDate.length - 1
            ].data
          }}
        </span>
      </p>
      <p class="deaths">
        Total deaths:
        <span style="font-size:18px">
          {{
            dataCountry[0].deathsAllDataSortByDate[
              dataCountry[0].deathsAllDataSortByDate.length - 1
            ].data
          }}
        </span>
      </p>
      <AllDataChart
        :dataUsaCanada="
          dataCountry[0].country === 'usa' ||
          dataCountry[0].country === 'Canada'
            ? true
            : false
        "
        :confirmedDataChart="dataCountry[0].confirmedAllDataSortByDate"
        :recoveredDataChart="dataCountry[0].recoveredAllDataSortByDate"
        :deathsDataChart="dataCountry[0].deathsAllDataSortByDate"
      />
    </div>
    $
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AllDataChart from "./chart/AllDataChart";

export default {
  name: "DataCountryList",
  components: {
    AllDataChart,
  },
  data() {
    return {
      percentsInfectedPopulation: 0,
    };
  },
  computed: {
    ...mapGetters(["allDataCountry", "dataCountry"]),
  },
  watch: {
    loadingDataCountry: {
      handler: function() {
        if (
          this.allDataCountry[0].population !== undefined &&
          this.allDataCountry &&
          this.dataCountry
        ) {
          this.percentsInfectedPopulation =
            (this.dataCountry[0].confirmedAllDataSortByDate[
              this.dataCountry[0].confirmedAllDataSortByDate.length - 1
            ].data /
              this.allDataCountry[0].population) *
            100;
        }
      },
    },
  },
  mounted() {
    if (
      this.allDataCountry[0].population !== undefined &&
      this.allDataCountry &&
      this.dataCountry
    ) {
      this.percentsInfectedPopulation =
        (this.dataCountry[0].confirmedAllDataSortByDate[
          this.dataCountry[0].confirmedAllDataSortByDate.length - 1
        ].data /
          this.allDataCountry[0].population) *
        100;
    }
  },
  methods: {
    ...mapActions(["getDataCountry"]),
  },
};
</script>

<style scoped>
p {
  margin-bottom: 3px;
}
/* confirmed */
.confirmed:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 1rem;
  height: 3px;
  background: #00e396;
}
.confirmed:before {
  margin-right: 0.2rem;
}
/* recovered */
.recovered:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 1rem;
  height: 3px;
  background: #feb019;
}
.recovered:before {
  margin-right: 0.2rem;
}
/* deaths */
.deaths:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 1rem;
  height: 3px;
  background: #008ffb;
}
.deaths:before {
  margin-right: 0.2rem;
}
</style>
