<template>
  <div class="pa-6">
    <div class="mb-3">
      <field-add-task />
    </div>

    <list-tasks v-if="!!$store.state.tasks.length" />

    <v-alert
      v-else
      type="info"
      icon="mdi-check-all"
      >No Task</v-alert
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FieldAddTask from "../components/Todo/FieldAddTask.vue";
import ListTasks from "@/components/ListTasks.vue";

export default Vue.extend({
  name: "Home",
  components: {
    'field-add-task' : FieldAddTask,
    'list-tasks' : ListTasks,
    ListTasks,
  },
});
</script>
