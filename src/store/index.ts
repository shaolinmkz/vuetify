import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const initTask = [
  {
    id: 1,
    title: 'Learn Vue JS',
    completed: false,
    dueDate: '2021-10-16'
  },
  {
    id: 2,
    title: 'Learn Vuex',
    completed: false,
    dueDate: '2021-10-17'
  },
  {
    id: 3,
    title: 'Learn Vuetify',
    completed: false,
    dueDate: null,
  },
];

export default new Vuex.Store({
  state: {
    searchTerm: "",
    snackbar: {
      show: false,
      text: "",
    },
    newTaskTitle: "",
    tasks: initTask,
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push({
        id: state.tasks.length + 1,
        title: payload,
        completed: false,
        dueDate: null,
      });
    },
    editTask(state, payload) {
      state.tasks = state.tasks.map((task) => payload.id === task.id ? payload : task);
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
      if (state.snackbar.show) {
        window.requestAnimationFrame(() => {
          state.snackbar.show = false;
        })
      }

      window.requestAnimationFrame(() => {
        state.snackbar.show = show;
        state.snackbar.text = text;
      })
    },
    searchTask(state, payload) {
      state.searchTerm = payload;
      // @ts-ignore
      const searchResult = state.tasks.filter(({ title }) => title.toLowerCase().includes(`${payload}`.toLowerCase()));
      state.tasks = payload ? searchResult : initTask;
    },
  },
  actions: {
    addTask({ commit }, payload) {
      commit('addTask', payload);
      commit('toggleSnackbar', { text: 'Task added!' });
    },
    editTask({ commit }, payload) {
      commit('editTask', payload);
      commit('toggleSnackbar', { text: 'Task updated!' });
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
