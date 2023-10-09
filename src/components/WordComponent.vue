<script setup lang="ts">
import { defineProps, computed } from "vue";
const props = defineProps<{
  word: string;
  i: number;
  input: string[];
  current: string;
}>();

const subStringIndex = (str1: string, str2: string) => {
  for (let i = 0; i < str1.length; i++) {
    if (str1.charAt(i) !== str2.charAt(i)) {
      return i;
    }
  }
  return str1.length;
};

const snippets = computed(() => {
  const index = subStringIndex(props.word, props.current);
  return [
    props.word.substring(0, index),
    props.current.substring(index, props.current.length),
    props.word.substring(index, props.word.length),
  ];
});
</script>

<template>
  <!-- <span v-if="i < input.length && input[i] === word" :class="'text-primary-200'">{{
    word + " "
  }}</span>
  <span v-else-if="i == input.length">
    <span
      v-for="(letter, j) in word.split('')"
      :key="`${letter}-|-${j}`"
      :class="{
        'text-primary-100 underline decoration-primary-100':
          j < current.length && current.charAt(j) === letter,
        'text-secondary-100 underline decoration-secondary-100':
          j < current.length && current.charAt(j) !== letter,
      }"
    >
      {{ letter }}
    </span>
    {{ " " }}
  </span>
  <span v-else>{{ word + " " }}</span> -->
  <span v-if="i < input.length">
    <span class="text-primary-200">{{ word }}</span>
  </span>
  <span v-else-if="i === input.length">
    <span class="text-primary-200">
      {{ snippets[0] }}
    </span>
    <span class="text-secondary-200">
      {{ snippets[1] }}
    </span>
    <span>
      {{ snippets[2] }}
    </span>
  </span>
  <span v-else>
    <span>{{ word }}</span>
  </span>
  {{ " " }}
</template>
