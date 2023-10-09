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
  <span
    v-if="i < input.length"
    :class="{
      'underline decoration-secondary-100 decoration-2 underline-offset-2': input[i] !== word,
    }"
  >
    <span
      v-for="(letter, index) in word"
      :key="`${letter}-|-${index}`"
      class="relative"
      :class="{
        'text-fg-200': input[i].charAt(index) === letter,
        'text-secondary-200': input[i].charAt(index) !== letter && index < input[i].length,
      }"
    >
      {{ letter
      }}<span
        v-if="input[i].charAt(index) !== letter && index < input[i].length"
        class="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/4 text-lg leading-none text-fg-200/75"
        >{{ input[i].charAt(index) }}</span
      >
    </span>
    <span v-if="input[i].slice(word.length).length > 0" class="text-secondary-100">
      {{ input[i].slice(word.length) }}
    </span>
  </span>
  <template v-else-if="i === input.length">
    <span
      v-for="(letter, index) in word"
      :key="`${letter}-|-${index}`"
      class="relative"
      :class="{
        'text-fg-200': current.charAt(index) === letter,
        'text-secondary-200': current.charAt(index) !== letter && index < current.length,
      }"
    >
      {{ letter
      }}<span
        v-if="current.charAt(index) !== letter && index < current.length"
        class="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/4 text-lg leading-none text-fg-200/75"
        >{{ current.charAt(index) }}</span
      >
    </span>
    <span class="text-secondary-100" v-if="current.slice(word.length).length > 0">
      {{ current.slice(word.length) }}
    </span>
  </template>
  <template v-else>
    {{ word }}
  </template>
  {{ " " }}
</template>
