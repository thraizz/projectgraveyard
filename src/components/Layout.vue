<script setup lang="ts">
import MobileUserMenu from "@/components/MobileUserMenu.vue";

import { useUser } from "./user";
const { user } = useUser();
</script>

<template>
  <div class="min-h-full">
    <div class="bg-indigo-600 pb-32">
      <MobileUserMenu v-if="user" :user="user" />

      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
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
