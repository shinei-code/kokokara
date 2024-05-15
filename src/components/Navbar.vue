<script setup>
import { mdiAccount } from '@mdi/js'
import { useAuthenticator } from "@aws-amplify/ui-vue";
const { signOut } = toRefs(useAuthenticator());
const { initUser } = useSharedUser()

const logOut = (signOut) => {
  signOut();
  initUser();
  return navigateTo('/');
}
</script>

<template>
  <v-app-bar class="bg-gradient">

    <v-app-bar-nav-icon>
      <img
      alt="kokokokara"
      src="@/assets/images/favicon.png"
      width="33"
      />
    </v-app-bar-nav-icon>

    <v-app-bar-title class="app-name watermelon ml-1">
      ココカラ
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <button @click="logOut(signOut)" class="mr-3 text-blue-darken-4">ログアウト</button>
  </v-app-bar>
</template>

<style lang="scss" scoped>
  .app-name {
    font-family: Murecho;
    font-size: 1.8em;
    font-weight: bold;
  }
  .username {
    font-size: 1.1em;
  }
  .bg-gradient {
    background-image: linear-gradient(135deg, rgba(251, 213, 251, 0.15), rgba(149, 233, 243, 0.15));
  }
</style>