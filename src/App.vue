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

    <v-app-bar app color="primary" dark shrink-on-scroll src="mountain.jpg">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Task</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-text-field
        class="search-input mt-2"
        :class="{ collapse }"
        placeholder="Search"
        outlined
        dense
        ref="searchRef"
        :value="$store.state.searchTerm"
        prepend-inner-icon="mdi-magnify"
        @click:prepend-inner="
          collapse = !collapse;
          $refs.searchRef.focus();
        "
        @focus="collapse = false"
        @blur="collapse = !$store.state.searchTerm"
        @input="handleChange"
      ></v-text-field>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <snack-bar />
  </v-app>
</template>

<script>
let searchTimerRef = null;
export default {
  components: {
    "snack-bar": () => import("./components/Shared/SnackBar.vue"),
  },
  data: () => ({
    drawer: false,
    items: [
      { title: "Task Manager", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-circle-outline", to: "/about" },
    ],
    right: null,
    collapse: true,
  }),
  methods: {
    handleChange(value) {
      clearTimeout(searchTimerRef);
      searchTimerRef = setTimeout(() => {
        this.$store.commit("searchTask", value);
      }, 500);
    },
  },
};
</script>

<style scoped lang="scss">
.search-input {
  transition: max-width 0.3s linear;

  .v-input__control {
    cursor: pointer !important;
  }

  &.collapse {
    max-width: 50px !important;
  }
}
</style>