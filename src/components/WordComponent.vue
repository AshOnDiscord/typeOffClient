<script setup lang="ts">
import { defineProps, computed } from "vue";
const props = defineProps<{
  word: string;
  i: number;
  input: string[];
  current: string;
}>();
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
  <span
    v-if="i < input.length"
    :class="{
      'underline decoration-secondary-100 decoration-2 underline-offset-2': input[i] !== word,
    }"
  >
    <span
      v-for="(letter, index) in word"
      :key="`${letter}-|-${index}`"
      :class="{
        'text-fg-200': input[i].charAt(index) === letter,
        'text-secondary-200': input[i].charAt(index) !== letter && index < input[i].length,
      }"
    >
      {{ letter }}
    </span>
    <span class="text-secondary-100">
      {{ input[i].slice(word.length) }}
    </span>
  </span>
  <span v-else-if="i === input.length">
    <span
      v-for="(letter, index) in word"
      :key="`${letter}-|-${index}`"
      :class="{
        'text-fg-200': current.charAt(index) === letter,
        'text-secondary-200': current.charAt(index) !== letter && index < current.length,
      }"
    >
      {{ letter }}
    </span>
    <span class="text-secondary-100">
      {{ current.slice(word.length) }}
    </span>
  </span>
  <span v-else>
    <span>{{ word }}</span>
  </span>
  {{ " " }}
</template>
