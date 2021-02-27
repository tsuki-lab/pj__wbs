<template>
  <label class="relative inline-block pt-4">
    <span class="absolute top-0 text-xs whitespace-nowrap">
      {{ label }}
    </span>
    <input
      v-model="internalValue"
      class="w-full"
      v-bind="$attrs"
    >
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'InputText',
  props: {
    value: {
      type: [ String, Number ] as PropType<string|number>,
      required: true
    },
    label: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['input'],
  setup(props, ctx){
    return {
      internalValue: computed({
        get() {
          return props.value
        },
        set(newVal) {
          ctx.emit('input', newVal)
        }
      })
    }
  }
});
</script>

<style scoped>
  input {
    border: solid 1px #666;
    padding: .1rem .2rem;
    border-radius: .2rem;
  }
</style>