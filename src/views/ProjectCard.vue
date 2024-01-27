<script lang="ts" setup>
import { computed } from "vue";

import { Project } from "@/types";

import UpvoteButton from "./UpvoteButton.vue";

const props = defineProps<{
  project: Project;
}>();

const href = computed(() => `/projects/${props.project.projectId}`);
</script>

<template>
  <li class="project">
    <router-link as="li" :to="href" class="flex min-w-0 gap-x-4">
      <img
        v-if="project.logo"
        class="h-12 w-12 flex-none rounded-full bg-gray-50"
        :src="project.logo"
        alt=""
      />

      <div v-else class="h-12 w-12 flex-none" />

      <div class="flex h-full min-w-0 flex-auto flex-col">
        <div>
          <p class="text-md font-semibold leading-6 text-gray-900">
            {{ project.title }}
          </p>

          <p class="text-sm font-normal leading-6 text-gray-900">
            {{ project.description }}
          </p>
        </div>

        <!-- Show tags -->
        <div class="mt-auto flex flex-row gap-1">
          <div
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </router-link>

    <UpvoteButton :project="project" />
  </li>
</template>

<style>
.project {
  @apply relative flex min-h-40 justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8;
}
</style>
