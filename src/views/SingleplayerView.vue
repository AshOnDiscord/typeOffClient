<script setup lang="ts">
import WordComponent from "@/components/WordComponent.vue";
import { ref, watch } from "vue";
const words = ref<string[]>([]);
const length = ref<number>(10);
const text = ref<string>("");

const getText = (words: string[], length: number) => {
  let text = "";
  if (words.length !== 0) {
    for (let i = 0; i < length; i++) {
      text += words[Math.floor(Math.random() * words.length)] + " ";
    }
  }
  return text;
};

(async () => {
  const wordsJson = (await fetch("http://localhost:3000/words")).json();
  words.value = await wordsJson;
})();

watch([words, length], (newValues) => {
  text.value = getText(newValues[0], newValues[1]);
});

const input = ref<string[]>([]);
const current = ref<string>("");

const handleInput = (e: KeyboardEvent) => {
  if (e.key === " ") {
    e.preventDefault();
    input.value.push(current.value);
    current.value = "";
    return;
  }
  if (e.key === "Backspace") {
    if (current.value !== "") {
      return;
    }
    e.preventDefault();
    current.value = input.value[input.value.length - 1];
    input.value.pop();
    return;
  }
};
</script>

<template>
  <main class="px-8 py-6">
    <div class="mb-4 flex gap-4">
      <input
        type="range"
        min="10"
        max="50"
        value="10"
        step="5"
        @input="(e) => (length = +(e.currentTarget as HTMLInputElement).value)"
      />
      <button
        class="rounded-md bg-primary-200 px-4 py-2 font-semibold text-bg-100"
        @click="() => (text = getText(words, length))"
      >
        New
      </button>
    </div>
    <!-- <p>{{ text }}</p> -->
    <p class="text-lg font-semibold text-fg-300">
      <template v-for="(word, i) in text.split(' ')" :key="`${word}-|-${i}`">
        <WordComponent :word="word" :i="i" :input="input" :current="current" />
      </template>
    </p>
    <p class="my-4">{{ input.join("|") }}</p>
    <input
      class="rounded-md bg-fg-300/25 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
      type="text"
      v-model="current"
      @keydown="handleInput"
    />
  </main>
</template>
