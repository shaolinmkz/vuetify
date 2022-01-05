<template>
  <v-list subheader two-line flat>
    <task
      v-for="task in $store.state.tasks"
      :key="task.id"
      :task="task"
      @onDeleteTrigger="triggerDeleteTask"
      @onEditTrigger="triggerEditTask"
    />
    <delete-dialog
      v-if="activeTodo && dialogs.delete"
      :task="activeTodo"
      :dialog="dialogs.delete"
      :toggleDialog="toggleDeleteDialog"
      @onDeleteComplete="reset"
    />
    <edit-dialog
      v-if="activeTodo && dialogs.edit"
      :task="activeTodo"
      :dialog="dialogs.edit"
      :toggleDialog="toggleEditDialog"
      @onEditComplete="reset"
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
    "edit-dialog": () => import("@/components/Todo/Dialogs/EditDialog.vue"),
    "delete-dialog": () => import("@/components/Todo/Dialogs/DeleteDialog.vue"),
    task: Task,
  },
  data() {
    return {
      activeTodo: null as ITask | null,
      dialogs: { 
        delete: false,
        edit: false,
      },
    };
  },
  methods: {
    triggerDeleteTask(task: ITask) {
      this.activeTodo = task;
      this.toggleDeleteDialog();
    },
    triggerEditTask(task: ITask) {
      this.activeTodo = task;
      this.toggleEditDialog();
    },
    reset() {
      this.dialogs.delete = false;
      this.dialogs.edit = false;
      this.activeTodo = null;
    },
    toggleEditDialog() {
      this.dialogs.edit = !this.dialogs.edit;
    },
    toggleDeleteDialog() {
      this.dialogs.delete = !this.dialogs.delete;
    },
  },
});
</script>

<style>
</style>