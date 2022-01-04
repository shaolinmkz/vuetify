<template>
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
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: "",
    };
  },
  methods: {
    addTask() {
      if (this.newTaskTitle) {
        this.$store.commit("addTask", this.newTaskTitle);
        this.newTaskTitle = "";
      }
    },
  },
};
</script>

<style>
</style>