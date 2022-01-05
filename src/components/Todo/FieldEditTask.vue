<template>
  <v-text-field
    outlined
    label="Edit task"
    append-icon=""
    class="ma-6"
    hide-details
    @click:append="submit"
    @keyup.enter="submit"
    @input="onChange"
    :value="editedTitle"
  ></v-text-field>
</template>

<script>
export default {
  props: ["task", "editedTitle", "onChange", "editTask"],
  methods: {
    submit() {
      this.editTask({ ...this.task, title: this.editedTitle });
    },
  },
};
</script>

<style>
</style>