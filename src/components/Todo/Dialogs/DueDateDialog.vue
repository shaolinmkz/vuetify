<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="red--text text--darken-1 text-h5">
          Set Due Date
        </v-card-title>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="ma-6"
              v-model="date"
              label="Select Due date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="toggleDateDialog">
            Cancel
          </v-btn>
          <v-btn color="red darken-1" text @click="submitDueDate"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["dialog", "toggleDateDialog", "task"],
  data() {
    return {
      menu: false,
      date: this.task.dueDate || new Date()
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
      this.$store.dispatch("editTask", { ...this.task, dueDate: this.date });
      this.$emit("onSetDate");
    },
  },
});
</script>

<style>
</style>