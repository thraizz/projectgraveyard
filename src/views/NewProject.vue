<script setup lang="ts">
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { string } from "yup";

import { useUser } from "@/components/user";
import { useProjectStore } from "@/projects";

export type ProjectCreationFormData = {
  title: string;
  file: File;
  description: string;
  content: string;
  links: string;
  tags: string;
};

const storage = getStorage();

const { handleSubmit, resetForm } = useForm<ProjectCreationFormData>({
  validationSchema: {
    title: string().required("The title is required."),
    description: string().required("The description is required."),
    content: string().required("The content is required."),
    links: string().test(
      "links",
      "The links must be a comma-separated list of links.",
      (value) => {
        if (!value) return true;

        const links = value.split(",").map((link) => link.trim());

        return links.every((link) => {
          try {
            new URL(link);

            return true;
          } catch {
            return false;
          }
        });
      },
    ),
    tags: string().required("Some tags are required."),
  },
  initialValues: {
    title: "",
    description: "",
    content: "",
    links: "",
    tags: "",
  },
});

const logo = ref<File | null>(null);
const screenshots = ref<File[] | null>(null);

const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files) return;

  logo.value = files[0];
};
const uploadLogo = async (uuid: string) => {
  if (!logo.value) return;

  const uploadRef = storageRef(storage, `projects/${uuid}/logo.png`);
  await uploadBytes(uploadRef, logo.value);
};

const handleScreenshotUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files) return;

  screenshots.value = Array.from(files);
};

const uploadScreenshots = async () => {
  if (!screenshots.value) return;

  await Promise.all(
    screenshots.value.map(async (screenshot, index) => {
      const uploadRef = storageRef(
        storage,
        `projects/8uFvujhBpyl7ef7bi8I2/screenshots/${index}.png`,
      );
      await uploadBytes(uploadRef, screenshot);
    }),
  );
};

const router = useRouter();
const projectStore = useProjectStore();
const { user } = useUser();

const onSubmit = handleSubmit(
  // Success
  async (values: ProjectCreationFormData) => {
    if (!user.value) return;

    // handle form submission here
    projectStore.addProject(values, user.value.uid).then(async (uid) => {
      await uploadLogo(uid);
      await uploadScreenshots();

      resetForm();
      router.push("/");
    });
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
            Describe your Project
          </h3>

          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Describe your project. What made it great? What did you learn?
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
              Short Description
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <textarea
                id="description"
                v-model="description"
                name="description"
                rows="3"
                placeholder="Short summary of your project"
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
                placeholder="A longer description. Add struggles, successes, and lessons learned here, we're excited to hear about it!"
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
              Links <span class="text-xs text-gray-400">(optional)</span>
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

          <!-- Single logo upload -->
          <div
            class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="logo"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Logo <span class="text-xs text-gray-400">(recommended)</span>
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <input
                class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                type="file"
                @change="handleLogoUpload"
              />
            </div>
          </div>

          <!-- Screenshot upload section using firebase storage -->
          <div
            class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="screenshots"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Screenshots <span class="text-xs text-gray-400">(optional)</span>
            </label>

            <div class="mt-1 sm:col-span-2 sm:mt-0">
              <input
                id="screenshots"
                multiple
                name="screensthots"
                type="file"
                class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                @change="handleScreenshotUpload"
              />
            </div>

            <p class="mt-2 text-sm text-gray-500">PNG, JPG, WEBP up to 10MB</p>

            <p class="mt-2 text-sm text-gray-500">
              We'll automatically resize it to 300x300 pixels.
            </p>
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
