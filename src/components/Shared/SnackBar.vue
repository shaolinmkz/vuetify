<template>
  <v-snackbar v-model="$store.state.snackbar.show">
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="#fff"
        text
        v-bind="attrs"
        @click="$store.commit('toggleSnackbar', { show: false, text: '' })"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
