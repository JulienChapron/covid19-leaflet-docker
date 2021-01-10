<template>
  <div>
    <div v-if="loadingNewsCountry" style="position:absolute;margin-top:45%; margin-left:40%;">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <transition name="fade">
      <div v-if="!loadingNewsCountry && newsCountry.articles.length" style="margin-bottom:30px;">
        <div v-for="article in newsCountry.articles" :key="article.id">
          <div style="margin-bottom:10px; background:grey; padding:10px; border-radius:5px;">
            <img style="width:100%;" :src="article.urlToImage" alt="img" />
            <p style="margin:0">Date: {{article.publishedAt}}</p>
            <p style="margin:0">Source: {{article.source.name}}</p>
            <h3>{{article.title}}</h3>
            <p style="margin:0px;">{{article.description}}...</p>
            <a
              style="margin:0px; font-size:.9em; color:black"
              :href="article.url"
              rel="stylesheet"
            >{{article.url}}</a>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="!loadingNewsCountry && !newsCountry.articles.length"
      ><p style="color:white; margin-top:5%; text-align:center">No news for this country ...</p> </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NewsDataCountry",
  computed: {
    ...mapGetters(["newsCountry", "loadingNewsCountry", "allDataCountry"])
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>