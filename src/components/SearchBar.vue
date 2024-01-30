<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <div class="flex w-full max-w-52 flex-1 justify-start px-2 lg:ml-6">
    <label for="search" class="sr-only">Search</label>

    <div class="relative text-gray-400 focus-within:text-gray-600">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
      </div>

      <input
        id="search"
        class="search-input"
        placeholder="Search"
        type="search"
        name="search"
      />
    </div>
  </div>
</template>
