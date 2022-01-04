<template>
  <div class="pa-6">
    <div class="mb-3">
      <field-add-task />
    </div>
    <v-list subheader two-line flat v-if="$store.state.tasks.length">
      <div
        v-for="task in $store.state.tasks"
        :key="task.id"
        :class="{ 'blue lighten-5': task.completed }"
      >
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
              <v-btn icon @click.stop="deleteTask(task.id)">
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
import FieldAddTask from "../components/Todo/FieldAddTask.vue";

export default Vue.extend({
  name: "Home",

  methods: {
    doneTask(id: number) {
      this.$store.commit("doneTask", id);
    },
    deleteTask(id: number) {
      this.$store.commit("deleteTask", id);
    },
  },
  components: {
    'field-add-task' : FieldAddTask,
  },
});
</script>
