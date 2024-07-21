<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center gap-2">
    <h1 class="text-6xl font-semibold">To Be Added</h1>
    <RouterLink
      to="/"
      class="rounded-sm px-2 text-2xl font-semibold text-primary-200 transition duration-200 hover:bg-primary-200/25"
      >Go Back</RouterLink
    >
  </main>
</template>
