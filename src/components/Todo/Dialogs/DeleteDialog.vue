<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="red--text text--darken-1 text-h5">
          Delete Task
        </v-card-title>
        <v-card-text
          >This will delete the task {{ `"${task.title}"` }}</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="$emit('onDeleteComplete')">
            No
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteTask(task.id)">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ["task", "toggleDialog", "dialog"],
  methods: {
      deleteTask(id: number) {
      this.$store.dispatch("deleteTask", id);
      this.$emit("onDeleteComplete");
    },
  }
});
</script>

<style>
</style>