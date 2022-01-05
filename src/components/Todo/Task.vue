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

          <v-list-item-action>
            <v-btn icon @click.stop="triggerDeleteTask(task)">
              <v-icon color="primary lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-divider></v-divider>
    </div>

  </v-list>
</template>

<script lang="ts">
import Vue from "vue";

interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export default Vue.extend({
  props: ["task",],

  data() {
    return {
      activeTodo: null,
      dialog: false,
    };
  },
  methods: {
    doneTask(id: number) {
      this.$store.dispatch("doneTask", id);
    },
    triggerDeleteTask(task: ITask) {
      this.$emit("onDeleteTrigger", task);
    },
  },
});
</script>

<style>
</style>