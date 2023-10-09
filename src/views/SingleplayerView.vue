<script setup lang="ts">
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
const currentType = ref<string>("");

const handleInput = (e: KeyboardEvent) => {
  if (e.key === " ") {
    e.preventDefault();
    input.value.push(currentType.value);
    currentType.value = "";
    return;
  }
  if (e.key === "Backspace") {
    if (currentType.value !== "") {
      return;
    }
    e.preventDefault();
    currentType.value = input.value[input.value.length - 1];
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
    <p>
      <template v-for="(word, i) in text.split(' ')" :key="`${word}-|-${i}`">
        <span v-if="i < input.length && input[i] === word" :class="'text-primary-200'">{{
          word + " "
        }}</span>
        <span v-else-if="i == input.length">
          <span
            v-for="(letter, j) in word.split('')"
            :key="`${letter}-|-${j}`"
            :class="{
              'text-primary-100 underline decoration-primary-100':
                j < currentType.length && currentType.charAt(j) === letter,
              'text-secondary-100 underline decoration-secondary-100':
                j < currentType.length && currentType.charAt(j) !== letter,
            }"
          >
            {{ letter }}
          </span>
          {{ " " }}
        </span>
        <span v-else>{{ word + " " }}</span>
      </template>
    </p>
    <p class="my-4">{{ input.join("|") }}</p>
    <input
      class="rounded-md bg-bg-200 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
      type="text"
      v-model="currentType"
      @keydown="handleInput"
    />
  </main>
</template>
