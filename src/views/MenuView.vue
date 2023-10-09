<script setup lang="ts"></script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="text-8xl font-bold">TypeOff</h1>
    <ul class="mt-4 flex flex-col items-center justify-center gap-2 text-2xl">
      <RouterLink to="singleplayer" class="cursor-pointer transition-all hover:text-primary-100"
        >Singleplayer</RouterLink
      >
      <RouterLink to="multiplayer" class="cursor-pointer transition-all hover:text-primary-100"
        >Multiplayer</RouterLink
      >
      <RouterLink to="settings" class="cursor-pointer transition-all hover:text-primary-100"
        >Settings</RouterLink
      >
      <RouterLink to="account" class="cursor-pointer transition-all hover:text-primary-100"
        >Account</RouterLink
      >
    </ul>
  </main>
</template>
