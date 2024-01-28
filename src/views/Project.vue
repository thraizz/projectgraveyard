<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useProjectStore } from "@/projects";

import Comments from "./Comments.vue";
import UpvoteButton from "./UpvoteButton.vue";

const store = useProjectStore();
const route = useRoute();

const project = computed(() =>
  store.projects.find((project) => project._id === route.params.id),
);
</script>

<template>
  <div class="px-4 py-5 sm:px-6">
    <div class="flex flex-row items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        {{ project?.title }}
      </h1>

      <UpvoteButton v-if="project" :project="project" />
    </div>

    <p class="mt-1 text-sm text-gray-500">
      {{ project?.description }}
    </p>
  </div>

  <div class="border-b border-gray-100">
    <dl class="divide-y divide-gray-100">
      <!-- About Section -->
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">About</dt>

        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          {{ project?.textContent }}
        </dd>
      </div>

      <!-- Links Section -->
      <div
        v-if="project?.links && project.links.length > 0"
        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
      >
        <dt class="text-sm font-medium leading-6 text-gray-900">Links</dt>

        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <ul
            role="list"
            class="divide-y divide-gray-100 rounded-md border border-gray-200"
          >
            <li
              v-for="link in project?.links"
              :key="link"
              class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
            >
              {{ link }}
            </li>
          </ul>
        </dd>
      </div>

      <!-- Tags Section -->
      <div
        v-if="project?.tags && project.tags.length > 0"
        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
      >
        <dt class="text-sm font-medium leading-6 text-gray-900">Tags</dt>

        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <ul role="list" class="flex space-x-2">
            <li
              v-for="tag in project?.tags"
              :key="tag"
              class="rounded-md bg-blue-200 px-2 py-1 text-sm leading-6 text-blue-800"
            >
              {{ tag }}
            </li>
          </ul>
        </dd>
      </div>

      <!-- Upvotes Section -->
      <div
        v-if="project?.upvotes && project.upvotes.length > 0"
        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
      >
        <dt class="text-sm font-medium leading-6 text-gray-900">Upvotes</dt>

        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          {{ project?.upvotes.length }} people upvoted this project.
        </dd>
      </div>

      <!-- Any Other Sections You Want to Add -->
    </dl>
  </div>

  <div class="mt-10 px-4 py-6 sm:px-6">
    <h2 class="text-xl font-semibold leading-6 text-gray-900">Comments</h2>

    <Comments v-if="project?._id" :project-uid="project._id" />
  </div>
</template>
