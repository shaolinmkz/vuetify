<template>
  <v-overlay v-model="menu" class="justify-center align-center">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      min-width="auto"
    >
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="submitDueDate"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </v-overlay>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: ["dialog", "toggleDateDialog", "task"],
  data() {
    return {
      menu: true,
      date:
        this.task.dueDate ||
        new Date()
          .toLocaleString()
          .split(",")[0]
          .replaceAll("/", "-")
          .split("-")
          .reverse()
          .join("-"),
    };
  },
  methods: {
    submitDueDate() {
      this.$refs.menu.save(this.date);
      this.$store.dispatch("editTask", { ...this.task, dueDate: this.date });
      this.menu = false;
      this.$emit("onSetDate");
    },
  },
});
</script>

<style>
</style>