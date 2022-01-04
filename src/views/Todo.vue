<template>
  <div class="pa-6">
    <div class="mb-3">
      <v-text-field
        outlined
        label="Add task"
        append-icon="mdi-plus"
        hide-details
        clearable
        @click:append="addTask"
        @keyup.enter="addTask"
        v-model="newTaskTitle"
      ></v-text-field>
    </div>
    <v-list subheader two-line flat v-if="tasks.length">
      <div
        v-for="task in tasks"
        :key="task.id"
        :class="{ 'blue lighten-5': task.completed }"
      >
        <v-list-item @click="handleCompleted(task.id)">
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

            <v-list-item-action>
              <v-btn icon @click.stop="handleDelete(task.id)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <v-alert
      v-else
      type="info"
      icon="mdi-check-all"
      value="true"
      >No Task</v-alert
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

interface IData {
  tasks: ITask[];
  newTaskTitle: string;
}

export default Vue.extend({
  name: "Home",

  methods: {
    handleCompleted(id: number) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    handleDelete(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    addTask() {
      this.tasks.push({
        id: this.tasks.length + 1,
        title: this.newTaskTitle,
        completed: false,
      });
      this.newTaskTitle = "";
    },
  },

  data(): IData {
    return {
      newTaskTitle: "",
      tasks: [],
    };
  },
});
</script>
