<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header
  }
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  background: #fafafa;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #030113;
}
</style>
