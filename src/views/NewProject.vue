<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { string } from "yup";

import { useUser } from "@/components/user";
import { useProjectStore } from "@/projects";

export type ProjectCreationFormData = {
  title: string;
  description: string;
  content: string;
  links: string;
  tags: string;
};

const { handleSubmit, resetForm } = useForm<ProjectCreationFormData>({
  validationSchema: {
    title: string().required(),
    description: string().required(),
    content: string().required(),
    links: string().required(),
    tags: string().required(),
  },
  initialValues: {
    title: "",
    description: "",
    content: "",
    links: [],
    tags: [],
  },
});

const router = useRouter();
const projectStore = useProjectStore();
const { user } = useUser();
const onSubmit = handleSubmit(
  // Success
  (values: ProjectCreationFormData) => {
    if (!user.value) return;

    // handle form submission here
    projectStore.addProject(values, user.value.uid);
    resetForm();
    router.push("/");
  },
  // Failure
  (errors) => {
    console.log(errors);
  },
);

const { value: title, errorMessage: titleError } = useField("title");
const { value: description, errorMessage: descriptionError } =
  useField<string>("description");
const { value: content, errorMessage: contentError } =
  useField<string>("content");
const { value: links, errorMessage: linksError } = useField<string[]>("links");
const { value: tags, errorMessage: tagsError } = useField<string[]>("tags");
</script>

<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit="onSubmit">
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div>
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            New Project
          </h3>

          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Please fill in the form below to add a new project.
          </p>
        </div>

        <div class="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
          <div
            class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Title
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <input
                id="title"
                v-model="title"
                type="text"
                name="title"
                autocomplete="title"
                placeholder="The title of your project"
                class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:max-w-xs sm:text-sm"
              />

              <div class="mt-2 text-sm text-red-500">{{ titleError }}</div>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Description
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <textarea
                id="description"
                v-model="description"
                name="description"
                rows="3"
                placeholder="A short description of your project"
                class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              ></textarea>

              <p class="error">{{ descriptionError }}</p>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="content"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Content
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <textarea
                id="content"
                v-model="content"
                name="content"
                rows="3"
                placeholder="A longer description of your project"
                class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              ></textarea>

              <p class="error">{{ contentError }}</p>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="links"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Links
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <input
                id="links"
                v-model="links"
                name="links"
                type="text"
                autocomplete="links"
                placeholder="Add a comma-separated list of links"
                class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />

              <p class="error">{{ linksError }}</p>
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="tags"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Tags
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <input
                id="tags"
                v-model="tags"
                name="tags"
                type="text"
                autocomplete="tags"
                placeholder="Add tags separated by commas"
                class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />

              <p class="error">{{ tagsError }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="button secondary min-w-20"
          @click="() => resetForm()"
        >
          Reset
        </button>

        <button type="submit" class="button primary min-w-20">Submit</button>
      </div>
    </div>
  </form>
</template>
