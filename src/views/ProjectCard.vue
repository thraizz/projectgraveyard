<script lang="ts" setup>
import { HeartIcon } from "@heroicons/vue/20/solid";
import { computed } from "vue";

import { Project } from "@/types";

const props = defineProps<{
  project: Project;
}>();

const firstImage = computed(() => {
  const images = props.project.images;

  return images[0];
});

const href = computed(() => `/projects/${props.project.projectId}`);

const upvoteProject = () => {
  console.log("Upvoted project!");
};
</script>

<template>
  <router-link as="li" :to="href" class="project">
    <div class="flex min-w-0 gap-x-4">
      <img
        v-if="firstImage"
        class="h-12 w-12 flex-none rounded-full bg-gray-50"
        :src="firstImage"
        alt=""
      />

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
            class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="flex h-8 w-16 flex-row items-center justify-between self-center rounded-lg bg-indigo-100 px-2.5 py-0.5"
      @click="upvoteProject"
    >
      <HeartIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />

      <span class="text-xs font-medium text-indigo-800">
        {{ project.upvotesCount }}
      </span>
    </button>
  </router-link>
</template>

<style>
.project {
  @apply relative flex min-h-40 justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8;
}
</style>
