<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/vue/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";

import { signOut, userNavigation, useUser } from "./user";
import UserMenu from "./UserMenu.vue";

const { user } = useUser();
</script>

<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
      <div
        class="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25"
      >
        <router-link to="/" class="flex items-center gap-2 px-2 lg:px-0">
          <div class="flex-shrink-0">
            <img class="block h-8 w-8" src="/icon.svg" alt="Your Company" />
          </div>

          <span class="font-sans text-xl font-bold text-white">
            Project Graveyard
          </span>
        </router-link>

        <div class="flex flex-row items-center gap-4">
          <div class="flex w-full max-w-52 flex-1 justify-start px-2 lg:ml-6">
            <label for="search" class="sr-only">Search</label>

            <div class="relative text-gray-400 focus-within:text-gray-600">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
              </div>

              <input
                id="search"
                class="search-input"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </div>

          <UserMenu />

          <div class="flex lg:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              <span class="absolute -inset-0.5" />

              <span class="sr-only">Open main menu</span>

              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />

              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden">
      <div class="border-t border-indigo-700 pb-3 pt-4">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              v-if="user?.photoURL && user.photoURL !== ''"
              class="h-8 w-8 rounded-full"
              :src="user.photoURL"
              alt=""
            />

            <UserCircleIcon
              v-else
              class="h-8 w-8 rounded-full"
              aria-hidden="true"
            />
          </div>

          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ user?.displayName }}
            </div>

            <div class="text-sm font-medium text-indigo-300">
              {{ user?.email }}
            </div>
          </div>

          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            <span class="absolute -inset-1.5" />

            <span class="sr-only">View notifications</span>

            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="navigation-item"
            >{{ item.name }}</DisclosureButton
          >

          <DisclosureButton
            class="navigation-item min-w-full text-left"
            @click="signOut"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style>
.navigation-item {
  @apply block rounded-md px-3 py-2 text-base font-light text-white hover:bg-indigo-500 hover:bg-opacity-75;
}
.search-input {
  @apply block h-fit w-0 rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:w-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6 lg:w-full;

  transition-property: width, padding;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
</style>
