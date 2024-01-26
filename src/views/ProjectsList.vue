<script setup lang="ts">
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";

import { db } from "@/firebase";
import { Project } from "@/types";

import ProjectCard from "./ProjectCard.vue";

const projects = ref<any[]>([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  projects.value = querySnapshot.docs.map(
    (doc) =>
      ({
        _id: doc.id,
        ...doc.data(),
      }) as Project,
  );
});
</script>

<template>
  <ul role="list" class="w-full divide-y divide-gray-100">
    <ProjectCard
      v-for="project in projects"
      :key="project"
      :project="project"
    />
  </ul>
</template>
