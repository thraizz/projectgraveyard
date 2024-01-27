<script setup lang="ts">
import { useProjectStore } from "@/projects";

import ProjectCard from "./ProjectCard.vue";

const store = useProjectStore();
</script>

<template>
  <ul role="list" class="w-full divide-y divide-gray-100">
    <ProjectCard
      v-for="project in store.projects"
      :key="project._id"
      :project="project"
    />
  </ul>
</template>
