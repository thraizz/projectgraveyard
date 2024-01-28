<script setup lang="ts">
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref as storageRef,
} from "firebase/storage";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import Screenshots from "@/components/Screenshots.vue";
import { useProjectStore } from "@/projects";

import Comments from "./Comments.vue";
import UpvoteButton from "./UpvoteButton.vue";

const store = useProjectStore();
const route = useRoute();

const project = computed(() =>
  store.projects.find((project) => project._id === route.params.id),
);

const storage = getStorage();

const images = ref<string[]>([]);

onMounted(() => {
  console.log("path", `projects/${project.value?._id}/screenshots`);
  // Create a reference under which you want to list
  const listRef = storageRef(
    storage,
    `projects/${project.value?._id}/screenshots`,
  );
  console.log(listRef);

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        console.log("itemRef", itemRef);
        getDownloadURL(itemRef).then((url) => {
          console.log("url", url);
          images.value.push(url);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div class="px-4 py-5 sm:px-6">
    <div class="flex flex-row items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        {{ project?.title }}
      </h1>

      <UpvoteButton v-if="project" :project="project" />
    </div>

    <Screenshots :images="images" />

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
              <a :href="link" class="text-indigo-600 hover:text-indigo-500">{{
                link
              }}</a>
            </li>
          </ul>
        </dd>
      </div>

      <div v-else class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium leading-6 text-gray-900">Links</dt>

        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          Never made it to production it seems! <span class="ml-1">📉</span>
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
