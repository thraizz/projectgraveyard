<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/20/solid";
import { doc, setDoc } from "firebase/firestore";

import { useUser } from "@/components/user";
import { db } from "@/firebase";
import { Project } from "@/types";

const props = defineProps<{
  project: Project;
}>();
const { user } = useUser();
const upvoteProject = () => {
  setDoc(doc(db, `projects/${props.project.projectId}`), {
    ...props.project,
    upvotes: user.value
      ? [...props.project.upvotes, user.value.uid]
      : props.project.upvotes,
  })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};
</script>

<template>
  <button
    type="button"
    class="z-20 flex h-8 w-16 flex-row items-center justify-between self-center rounded-lg px-2.5 py-0.5 transition-colors transition-shadow hover:shadow-lg"
    :class="[
      user && project.upvotes.includes(user.uid)
        ? 'bg-indigo-200'
        : 'bg-indigo-100',
    ]"
    @click="upvoteProject"
  >
    <HeartIcon
      class="size-5"
      aria-hidden="true"
      :class="[
        user && project.upvotes.includes(user.uid)
          ? 'text-red-500'
          : 'text-gray-500',
      ]"
    />

    <span
      class="text-xs text-indigo-800 transition"
      :class="[
        user && project.upvotes.includes(user.uid)
          ? 'font-semibold'
          : 'font-medium',
      ]"
    >
      {{ project.upvotes.length }}
    </span>
  </button>
</template>
