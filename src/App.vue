<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<template>
  <div id="app" class="flex flex-col h-screen bg-gray-50">
    <Navbar/>
    <router-view/>
  </div>
</template>

<style>
body {
  overflow: hidden;
}
</style>