<script lang="ts" setup>
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from "firebase/storage";
import { computed, onMounted, ref } from "vue";

import { Project } from "@/types";

import UpvoteButton from "./UpvoteButton.vue";

const props = defineProps<{
  project: Project;
}>();

const href = computed(() => `/projects/${props.project._id}`);

const imgSrc = ref<string | undefined>(undefined);

onMounted(async () => {
  const storage = getStorage();
  const pathReference = storageRef(
    storage,
    `/projects/${props.project._id}/logo.png`,
  );
  getDownloadURL(pathReference)
    .then((url) => {
      imgSrc.value = url;
    })
    .catch(() => {
      imgSrc.value = undefined;
    });
});
</script>

<template>
  <div class="flex flex-col p-4 md:flex-row">
    <router-link as="li" :to="href" class="project flex w-full min-w-0 gap-x-4">
      <img
        v-if="imgSrc"
        class="h-12 w-12 flex-none rounded-full bg-gray-50"
        :src="imgSrc"
        alt=""
      />

      <div v-else class="h-12 w-12 flex-none" />

      <div class="flex h-full min-w-0 flex-auto flex-col">
        <div class="flex w-full flex-row items-center justify-between">
          <p class="text-md font-semibold leading-6 text-gray-900">
            {{ project.title }}
          </p>
        </div>

        <p class="text-sm font-normal leading-6 text-gray-900">
          {{ project.description }}
        </p>

        <!-- Show tags -->
        <div class="mt-auto flex flex-row flex-wrap gap-1">
          <div
            v-for="tag in project.tags"
            :key="tag"
            class="whitespace-nowrap rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </router-link>

    <div class="flex gap-2 self-end md:self-center">
      <UpvoteButton :project="project" />

      <RouterLink :to="href" class="button primary md:hidden">
        View
      </RouterLink>
    </div>
  </div>
</template>

<style>
.project {
  @apply relative flex min-h-40 justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8;
}
</style>
