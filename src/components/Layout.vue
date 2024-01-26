<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";

import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <div class="min-h-full">
    <div class="bg-indigo-600 pb-32">
      <TopBar />

      <header class="py-10">
        <div class="mx-auto h-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">
            {{ $route.meta.title }}
          </h1>

          <router-link
            v-if="$route.meta.showBack"
            to=".."
            class="flex items-center gap-1 text-indigo-200 hover:text-indigo-100"
          >
            <ArrowLeftIcon class="size-4" /> Back
          </router-link>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>
