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

      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">
          {{ project.title }}
        </p>

        <p>
          {{ project.description }}
        </p>
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
  @apply relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8;
}
</style>
