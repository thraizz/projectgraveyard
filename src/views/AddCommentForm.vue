<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { string } from "yup";

import { useCommentStore } from "@/comments";
import { useUser } from "@/components/user";

const commentStore = useCommentStore();

const props = defineProps<{
  projectUid: string;
}>();

const { user } = useUser();
type FormData = {
  comment: string;
};
const { handleSubmit } = useForm<FormData>({
  validationSchema: {
    comment: string().required("Please enter a comment."),
  },
  initialValues: {
    comment: "",
  },
});
const onSubmit = handleSubmit(
  // Success
  (values: FormData) => {
    if (!user.value) return;
    // handle form submission here
    commentStore.addCommentToProject(
      values.comment,
      props.projectUid,
      user.value.uid,
    );
  },
  // Failure
  (errors) => {
    console.log(errors);
  },
);

const { value: comment, errorMessage: commentError } =
  useField<string>("comment");
</script>

<template>
  <div class="mt-6 flex gap-x-3">
    <img
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt=""
      class="h-6 w-6 flex-none rounded-full bg-gray-50"
    />

    <div class="w-full">
      <form class="relative flex-auto" @submit="onSubmit">
        <div
          class="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
        >
          <label for="comment" class="sr-only">Add your comment</label>

          <textarea
            id="comment"
            v-model="comment"
            rows="2"
            name="comment"
            class="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
          />
        </div>

        <div
          class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2"
        >
          <button
            type="submit"
            class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Comment
          </button>
        </div>
      </form>

      <p v-if="commentError" class="error">{{ commentError }}</p>
    </div>
  </div>
</template>
