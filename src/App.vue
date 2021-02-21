<template>
  <nav>
    <router-link :to="{ name: 'Home' }">
      Home
    </router-link>|
    <router-link :to="{ name: 'Settings' }">
      Settings
    </router-link>
  </nav>
  <router-view />
</template>