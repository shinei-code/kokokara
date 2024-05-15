<script setup>
const passAuth = ref(false);

const toLocation = (bool) => {
  passAuth.value = bool;
  return navigateTo('location');
}
</script>

<template>
  <v-app  class="bg-gradient">
    <v-main>
      <v-container fluid>
        <Navbar @unAuth="passAuth = false"  v-if="passAuth" />

        <Auth @passAuth="toLocation(true)" v-if="!passAuth"/>
        <!-- <Location v-else /> -->
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style lang="scss" scoped>

</style>