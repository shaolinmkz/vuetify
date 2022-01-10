<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Vuetify</v-list-item-title>
          <v-list-item-subtitle> Task Manager </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      height="170"
      dark
      shrink-on-scroll
      src="mountain.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container>
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>

          <search-field
            :searchTerm="$store.state.searchTerm"
            :onSearch="handleChange"
          ></search-field>
        </v-row>

        <v-row class="ml-0">
          <v-app-bar-title>Task Manager</v-app-bar-title>
        </v-row>
        <v-row class="ml-0">
          <span class="text-subtitle-1">{{ dateValue | formatDate }}</span>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <snack-bar />
  </v-app>
</template>

<script>
import Vue from "vue";
import { format } from "date-fns";

let searchTimerRef = null;
let getDateRef = null;

export default Vue.extend({
  components: {
    "snack-bar": () => import("./components/Shared/SnackBar.vue"),
    "search-field": () => import("./components/Shared/SearchField.vue"),
  },
  data: () => ({
    drawer: false,
    items: [
      { title: "Task Manager", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-circle-outline", to: "/about" },
    ],
    right: null,
    dateValue: new Date(),
  }),
  methods: {
    handleChange(value) {
      clearTimeout(searchTimerRef);
      searchTimerRef = setTimeout(() => {
        this.$store.commit("searchTask", value);
      }, 500);
    },
    getDate() {
      getDateRef = setInterval(() => {
        this.dateValue = new Date();
      }, 1000);
    },
  },
  filters: {
    formatDate(value) {
      return format(new Date(value), "MMMM d, H:mm:ss");
    },
  },
  mounted() {
    this.getDate();
  },
  unmounted() {
    clearInterval(getDateRef);
  },
});
</script>

<style lang="scss">
.v-app-bar-title__placeholder,
.v-app-bar-title__content {
  overflow: initial !important;
  text-overflow: initial !important;
}
</style>