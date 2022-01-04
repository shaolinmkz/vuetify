<template>
  <v-list subheader two-line flat>
    <task v-for="task in $store.state.tasks" :key="task.id" :task="task" />
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Task from "./Task.vue";

export default Vue.extend({
  components: {
    'task': Task,
  },
});
</script>

<style>
</style>