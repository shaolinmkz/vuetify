<template>
  <v-list subheader two-line flat>
    <task
      v-for="task in $store.state.tasks"
      :key="task.id"
      :task="task"
      @onDeleteTrigger="triggerDeleteTask"
    />
    <delete-dialog
      v-if="activeTodo && dialog"
      :task="activeTodo"
      :dialog="dialog"
      :toggleDialog="toggleDialog"
      @onDeleteComplete="reset"
    />
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import Task from "./Task.vue";

interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export default Vue.extend({
  components: {
    "delete-dialog": () => import("@/components/Todo/Dialog/DeleteDialog.vue"),
    task: Task,
  },
  data() {
    return {
      activeTodo: null as ITask | null,
      dialog: false,
    };
  },
  methods: {
    triggerDeleteTask(task: ITask) {
      this.activeTodo = task;
      this.toggleDialog();
    },
    reset() {
      this.dialog = false;
      this.activeTodo = null;
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
});
</script>

<style>
</style>