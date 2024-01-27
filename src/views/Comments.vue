<script setup lang="ts">
import { computed } from "vue";

import { useCommentStore } from "@/comments";

import AddCommentForm from "./AddCommentForm.vue";

const props = defineProps<{
  projectUid: string;
}>();

const commentStore = useCommentStore();

const activity = computed(() =>
  commentStore.getCommentsByProjectUid(props.projectUid),
);
</script>

<template>
  <ul v-if="activity.length > 0" role="list" class="mt-6 space-y-6">
    <li
      v-for="(comment, activityItemIdx) in activity"
      :key="comment._id"
      class="relative flex gap-x-4"
    >
      <div
        :class="[
          activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
          'absolute left-0 top-0 flex w-6 justify-center',
        ]"
      >
        <div class="w-px bg-gray-200" />
      </div>

      <div class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50" />
      <!-- <img
        :src="comment.person.imageUrl"
        alt=""
        class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
      /> -->

      <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
        <div class="flex justify-between gap-x-4">
          <div class="py-0.5 text-xs leading-5 text-gray-500">
            <span class="font-medium text-gray-900">
              <!-- {{ comment.person.name}} -->
              someone
            </span>
            commented
          </div>

          <time
            :datetime="comment.timestamp.toString()"
            class="flex-none py-0.5 text-xs leading-5 text-gray-500"
            >{{ new Date(comment.timestamp).toLocaleString() }}</time
          >
        </div>

        <p class="text-sm leading-6 text-gray-500">
          {{ comment.textContent }}
        </p>
      </div>
    </li>
  </ul>

  <div v-else class="mt-6 text-sm leading-5 text-gray-500">No comments yet</div>

  <AddCommentForm :project-uid="$props.projectUid" />
</template>
