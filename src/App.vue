<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition
      :name="route.meta.transition || 'fade'"
      @before-enter="() => console.log('before-enter')"
      @enter="() => console.log('enter')"
      @after-enter="() => console.log('after-enter')"
      @before-leave="() => console.log('before-leave')"
      @leave="() => console.log('leave')"
      @after-leave="() => console.log('after-leave')"
    >
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<style lang="postcss">
.menu_home-leave-active,
.menu_home-leave-active * {
  @apply transition-all duration-500;
}

.menu_home-enter-from,
.menu_home-leave-to {
  @apply translate-y-[calc(4.25rem/2)];
}

.menu_home-enter-from h2,
.menu_home-leave-to h2 {
  @apply mt-2 text-2xl opacity-0;
}

.menu_home-enter-from p,
.menu_home-leave-to p {
  @apply mt-0 text-xl opacity-0;
}

.menu_home-enter-from h1,
.menu_home-leave-to h1 {
  @apply text-8xl;
}

.menu_home-enter-from h1 {
  transform: translateY(calc(10.5rem + 0px));
}

.menu_home-enter-active h1 {
  transition: all 1s ease-in-out;
}

.menu_home-enter-from ul {
  opacity: 0;
}

.menu_home-enter-active ul {
  overflow: hidden;
  transition: all 1s ease-in-out;
  transition-delay: 0.75s;
}
</style>
