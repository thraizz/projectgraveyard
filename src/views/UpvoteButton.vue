<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/20/solid";

import { useUser } from "@/components/user";
import { useProjectStore } from "@/projects";
import { Project } from "@/types";

defineProps<{
  project: Project;
}>();
const userStore = useUser();
const store = useProjectStore();
</script>

<template>
  <button
    type="button"
    class="z-20 flex h-8 w-16 flex-row items-center justify-between self-center rounded-lg px-2.5 py-0.5 transition-colors transition-shadow"
    :class="[
      userStore.user && project.upvotes.includes(userStore.user.uid)
        ? 'bg-indigo-200'
        : 'bg-indigo-100',
      userStore.isLoggedIn && !userStore.user?.isAnonymous
        ? 'hover:shadow-lg'
        : '',
    ]"
    :disabled="!userStore.user || userStore.user.isAnonymous"
    @click="store.upvoteProject(project._id, userStore.user?.uid)"
  >
    <HeartIcon
      class="size-5"
      aria-hidden="true"
      :class="[
        userStore.user && project.upvotes.includes(userStore.user.uid)
          ? 'text-red-500'
          : 'text-gray-500',
      ]"
    />

    <span
      class="text-xs text-indigo-800 transition"
      :class="[
        userStore.user && project.upvotes.includes(userStore.user.uid)
          ? 'font-semibold'
          : 'font-medium',
      ]"
    >
      {{ project.upvotes.length }}
    </span>
  </button>
</template>
