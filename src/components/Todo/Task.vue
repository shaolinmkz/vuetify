<template>
  <v-list subheader two-line flat>
    <div :class="{ 'blue lighten-5': task.completed }">
      <v-list-item @click="doneTask(task.id)">
        <template v-slot:default>
          <v-list-item-action>
            <v-checkbox
              :input-value="task.completed"
              color="primary"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title
              :class="{ 'text-decoration-line-through': task.completed }"
              >{{ task.title }}</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action v-if="task.dueDate">
            <v-list-item-action-text>
              <v-icon small>mdi-calendar</v-icon>
              {{ task.dueDate | prettyDate }}
              </v-list-item-action-text>
          </v-list-item-action>

          <v-list-item-action>
            <task-menu
              :triggerDeleteTask="triggerDeleteTask"
              :triggerEditTask="triggerEditTask"
              :triggerSetDate="triggerSetDate"
              :task="task"
            />
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-divider></v-divider>
    </div>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import { format } from 'date-fns'


interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export default Vue.extend({
  props: ["task"],
  components: {
    "task-menu": () => import("@/components/Todo/TaskMenu.vue"),
  },
  data() {
    return {
      activeTodo: null,
      dialog: false,
    };
  },
  filters: {
    prettyDate(value: string) {
      return format(new Date(value), 'MMM d')
    }
  },
  methods: {
    doneTask(id: number) {
      this.$store.dispatch("doneTask", id);
    },
    triggerDeleteTask(task: ITask) {
      this.$emit("onDeleteTrigger", task);
    },
    triggerEditTask(task: ITask) {
      this.$emit("onEditTrigger", task);
    },
    triggerSetDate(task: ITask) {
      this.$emit("onDateTrigger", task);
    },
  },
});
</script>

<style>
</style>