import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: "",
    },
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
    toggleSnackbar(state, { show = true, text }) {
      if(state.snackbar.show) {
        window.requestAnimationFrame(() => {
          state.snackbar.show = false;
        })
      }

      window.requestAnimationFrame(() => {
        state.snackbar.show = show;
        state.snackbar.text = text;
      })
    },
  },
  actions: {
    addTask({ commit }, payload) {
      commit('addTask', payload);
      commit('toggleSnackbar', { text: 'Task added!' });
    },
    deleteTask({ commit }, payload) {
      commit('deleteTask', payload);
      commit('toggleSnackbar', { text: 'Task deleted!' });
    },
    doneTask({ commit, state }, payload) {
      commit('doneTask', payload);
      commit('toggleSnackbar', { text: state.tasks.find(({ id }) => id === payload)?.completed ? 'Task done!' : 'Task undone!' });
    },
  },
  getters: {
  },
  modules: {
  }
})
