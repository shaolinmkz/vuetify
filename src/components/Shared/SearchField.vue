<template>
  <v-text-field
    class="search-input mt-2"
    :class="{ collapse }"
    placeholder="Search"
    outlined
    dense
    ref="searchRef"
    :value="searchTerm"
    prepend-inner-icon="mdi-magnify"
    @click:prepend-inner="
      collapse = !collapse;
      $refs.searchRef.focus();
    "
    @focus="collapse = false"
    @blur="collapse = !searchTerm"
    @input="onSearch"
  ></v-text-field>
</template>

<script>
export default {
  props: ["searchTerm", "onSearch"],
  data() {
    return {
      collapse: true,
    }
  }
};
</script>

<style lang="scss">
.search-input {
  transition: max-width 0.3s linear;

  .v-input__control {
    cursor: pointer !important;
  }

  &.collapse {
    max-width: 50px !important;
  }
}
</style>