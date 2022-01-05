<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="red--text text--darken-1 text-h5">
          Edit Task
        </v-card-title>
        <field-edit-task
          :onChange="handleChange"
          :editedTitle="editedTitle"
          :task="task"
          :editTask="editTask"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="$emit('onEditComplete')">
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            :disabled="!isNotEmpty"
            @click="editTask(task)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  components: {
    "field-edit-task": () => import("@/components/Todo/FieldEditTask.vue"),
  },
  props: ["task", "dialog"],
  data() {
    return {
      editedTitle: this?.task?.title || "",
    };
  },
  methods: {
    editTask(task) {
      if (
        /[a-z]/gim.test(`${this.editedTitle}`) ||
        /[0-9]/gim.test(`${this.editedTitle}`)
      ) {
        this.$store.dispatch("editTask", { ...task, title: this.editedTitle });
        this.$emit("onEditComplete");
      }
    },
    handleChange(value) {
      this.editedTitle = value;
    },
  },
  computed: {
    isNotEmpty() {
      return (
        /[a-z]/gim.test(`${this.editedTitle}`) ||
        /[0-9]/gim.test(`${this.editedTitle}`)
      );
    },
  },
});
</script>

<style>
</style>