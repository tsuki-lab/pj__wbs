<template>
  <div class="home">
    {{message}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    return {
      message: 'Hello'
    }
  }
});
</script>
