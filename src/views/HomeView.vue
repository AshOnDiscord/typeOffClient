<script setup lang="ts">
import router from "@/router/router";
import { onMounted, onUnmounted } from "vue";

const start = (e: KeyboardEvent) => {
  // e.preventDefault();

  // Define an array of keys to filter out
  const excludedKeys = JSON.parse(`{ "keys": [
    "Control", "Shift", "Alt", "OS", "Meta", "CapsLock","Tab", "Insert", "Delete", "Home", "PageUp", "PageDown", "Escape", "ContextMenu", "End", "PrintScreen", "ScrollLock","Pause","ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
  ]}`).keys;

  if (excludedKeys.includes(e.key)) return;

  // make sure no modifiers are pressed(prevent triggering when user reloads, switches tab or desktops, etc.)
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  console.log("Key event:", e.key);
  router.push("/menu");
};

const startMouse = (e: MouseEvent) => {
  console.log("Mouse event:", e);
  if (e.button !== 0) return;
  router.push("/menu");
};

onMounted(() => {
  window.addEventListener("keydown", start);
  window.addEventListener("click", startMouse);
});

onUnmounted(() => {
  window.removeEventListener("keydown", start);
  window.removeEventListener("click", startMouse);
});
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="text-9xl font-bold">TypeOff</h1>

    <h2 class="mt-8 text-4xl font-semibold opacity-100">A Basic Typing Game</h2>
    <p class="mt-4 text-xl text-fg-300 opacity-100">Press any key to continue</p>
  </main>
</template>
