import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newTaskTitle: "",
    tasks: [
      {
        id: 1,
        title: 'Learn Vue JS',
        completed: false,
      },
      {
        id: 2,
        title: 'Learn Vuex',
        completed: false,
      },
      {
        id: 3,
        title: 'Learn Vuetify',
        completed: false,
      },
    ]
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push({
        id: state.tasks.length + 1,
        title: payload,
        completed: false,
      });
    },
    doneTask(state, payload) {
      const task = state.tasks.find((task) => task.id === payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, payload) {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
