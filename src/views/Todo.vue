<template>
  <div class="pa-6">
    <div class="mb-3">
      <field-add-task />
    </div>

    <list-tasks v-if="!!$store.state.tasks.length" />

    <no-task v-else />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FieldAddTask from "../components/Todo/FieldAddTask.vue";
import ListTasks from "@/components/Todo/ListTasks.vue";

export default Vue.extend({
  name: "Home",
  components: {
    "field-add-task": FieldAddTask,
    "list-tasks": ListTasks,
    'no-task': () => import("@/components/Todo/NoTask.vue"),
  },
});
</script>
