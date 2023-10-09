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
      let newWord = words[Math.floor(Math.random() * words.length)];
      while (newWord.length < 2 || newWord.length > 10) {
        newWord = words[Math.floor(Math.random() * words.length)];
      }
      text += newWord.toLowerCase() + " ";
    }
  }
  return text;
};

(async () => {
  const wordsJson = (await fetch("http://192.168.0.25:3000/words")).json();
  words.value = await wordsJson;
})();

watch([words, length], (newValues) => {
  text.value = getText(newValues[0], newValues[1]);
});

let hasStarted = ref<boolean>(false);

watch(text, () => {
  hasStarted.value = false;
});

const input = ref<string[]>([]);
const current = ref<string>("");

const start = ref<Date>(new Date());

const correctChars = () => {
  const split = text.value.split(" ").filter((word) => word !== "");
  let correct = 0;
  for (let i = 0; i < split.length; i++) {
    if (split[i] === input.value[i]) {
      correct += split[i].length;
    }
  }
  return correct + split.length - 1; // add spaces
};

const handleInput = (e: KeyboardEvent) => {
  if (!hasStarted.value) {
    hasStarted.value = true;
    start.value = new Date();
  }

  if (e.key.toLowerCase() === "tab") {
    e.preventDefault();
    reset();
    return;
  }

  if (e.key === " ") {
    e.preventDefault();
    input.value.push(current.value);
    current.value = "";
    if (input.value.length === text.value.split(" ").filter((word) => word !== "").length) {
      const end = new Date();
      const diffMS = end.getTime() - start.value.getTime();
      console.log(`done ${diffMS / 1000} seconds`);
      const wpm = (correctChars() / 5) * (60 / (diffMS / 1000));
      console.log(correctChars(), wpm);
      reset();
    }
    return;
  }
  if (e.key === "Backspace") {
    if (current.value !== "" || input.value.length === 0) {
      return;
    }
    e.preventDefault();
    current.value = input.value[input.value.length - 1];
    input.value.pop();
    return;
  }
};

const reset = () => {
  text.value = getText(words.value, length.value);
  input.value = [];
  current.value = "";
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
      <button class="rounded-md bg-primary-200 px-4 py-2 font-semibold text-bg-100" @click="reset">
        New
      </button>
    </div>
    <p class="mb-4 text-lg font-semibold leading-loose text-fg-300">
      <template v-for="(word, i) in text.split(' ')" :key="`${word}-|-${i}`">
        <WordComponent :word="word" :i="i" :input="input" :current="current" />
      </template>
    </p>
    <input
      class="rounded-md bg-fg-300/25 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
      type="text"
      v-model="current"
      @keydown="handleInput"
    />
  </main>
</template>
