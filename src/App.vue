<template>
  <div>
    <router-view />
    <Toast />
  </div>
</template>

<script>
import Toast from './components/Toast.vue'

export default {
  name: 'App',
  components: {
    Toast
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #f8fafc;
}
</style>
