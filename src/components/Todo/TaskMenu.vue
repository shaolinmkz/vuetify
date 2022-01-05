<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark icon v-bind="attrs" v-on="on">
        <v-icon color="primary">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(menu, i) in menus" :key="i">
        <v-list-item-title @click.stop="menu.trigger(task)">
          <v-icon
            :color="`${
              menu.icon === 'mdi-delete' ? 'red' : 'secondary'
            } lighten-1`"
            class="mr-2"
            >{{ menu.icon }}</v-icon
          >
          {{ menu.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: ["triggerDeleteTask", "triggerEditTask", "task"],
  data() {
    return {
      menus: [
        { title: "Edit", icon: "mdi-pencil", trigger: this.triggerEditTask },
        {
          title: "Due Date",
          icon: "mdi-calendar-range",
          trigger: () => {},
        },
        {
          title: "Delete",
          icon: "mdi-delete",
          trigger: this.triggerDeleteTask,
        },
      ],
    };
  },
});
</script>
