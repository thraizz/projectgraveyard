<script lang="ts" setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

defineProps<{
  images: string[];
}>();
</script>

<template>
  <TabGroup as="div" class="flex flex-col-reverse">
    <!-- Image selector -->
    <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
      <TabList class="grid grid-cols-4 gap-6">
        <Tab
          v-for="(screenshot, index) in $props.images"
          :key="screenshot"
          v-slot="{ selected }"
          class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
        >
          <span class="sr-only">Screenshot {{ index }}</span>

          <span class="absolute inset-0 overflow-hidden rounded-md">
            <img
              :src="screenshot"
              alt=""
              class="h-full w-full object-cover object-center"
            />
          </span>

          <span
            :class="[
              selected ? 'ring-indigo-500' : 'ring-transparent',
              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
            ]"
            aria-hidden="true"
          />
        </Tab>
      </TabList>
    </div>

    <TabPanels class="aspect-h-1 aspect-w-1 w-full">
      <TabPanel v-for="image in $props.images" :key="image">
        <img
          :src="image"
          :alt="`Screenshot {i}`"
          class="h-full w-full object-cover object-center sm:rounded-lg"
        />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
