<template>
  <v-list subheader two-line flat>
    <task
      v-for="task in $store.getters.filteredSearch"
      :key="task.id"
      :task="task"
      @onDeleteTrigger="triggerDeleteTask"
      @onEditTrigger="triggerEditTask"
      @onDateTrigger="triggerSetDueDate"
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
    <due-date-dialog
      v-if="activeTodo && dialogs.date"
      :dialog="dialogs.date"
      :toggleDateDialog="toggleDateDialog"
      :task="activeTodo"
      @onSetDate="reset"
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
    "due-date-dialog": () => import("@/components/Todo/Dialogs/DueDateDialog.vue"),
    task: Task,
  },
  data() {
    return {
      activeTodo: null as ITask | null,
      dialogs: { 
        delete: false,
        edit: false,
        date: false,
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
    triggerSetDueDate(task: ITask) {
      this.activeTodo = task;
      this.toggleDateDialog();
    },
    reset() {
      this.dialogs.delete = false;
      this.dialogs.edit = false;
      this.dialogs.date = false;
      this.activeTodo = null;
    },
    toggleEditDialog() {
      this.dialogs.edit = !this.dialogs.edit;
    },
    toggleDateDialog() {
      this.dialogs.date = !this.dialogs.date;
    },
    toggleDeleteDialog() {
      this.dialogs.delete = !this.dialogs.delete;
    },
  },
});
</script>

<style>
</style>