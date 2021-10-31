<script>
  import { mapActions } from "vuex";
  import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
  import { ChevronDownIcon, DownloadIcon, CogIcon, TrashIcon } from "@heroicons/vue/solid";

  export default {
    components: {
      Menu,
      MenuButton,
      MenuItems,
      MenuItem,
      ChevronDownIcon,
      DownloadIcon,
      CogIcon,
      TrashIcon,
    },
    methods: {
      ...mapActions("list", ["exportList"]),
    }
  };
</script>

<template>
  <div class="w-56 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
        class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 leading-4 bg-gray-100 hover:bg-gray-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
        Options
        <ChevronDownIcon
        class="w-4 h-4 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
        aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
    >
    <MenuItems
    class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
    >
    <div class="px-1 py-1">
      <MenuItem v-slot="{ active }">
        <router-link
        to="/settings/info"
        :class="[
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-600',
        'group flex rounded items-center w-full px-2 py-2 text-sm',
        ]"
        >
        <CogIcon
        :active="active"
        class="w-4 h-4 mr-2 text-violet-400"
        aria-hidden="true"
        />
        Board Settings
      </router-link>
    </MenuItem>
</div>
<div class="px-1 py-1">
  <MenuItem v-slot="{ active }">
    <button
    :class="[
    active ? 'bg-gray-100 text-gray-900' : 'text-gray-600',
    'group flex rounded items-center w-full px-2 py-2 text-sm',
    ]"
    @click="exportList()"
    >
    <DownloadIcon
    :active="active"
    class="w-4 h-4 mr-2 text-violet-400"
    aria-hidden="true"
    />
    Export as JSON
  </button>
</MenuItem>
</div>

<div class="px-1 py-1">
  <MenuItem v-slot="{ active }">
    <button
    :class="[
    active ? 'bg-gray-100 text-red-700' : 'text-red-600',
    'group flex rounded items-center w-full px-2 py-2 text-sm',
    ]"
    >
    <TrashIcon
    :active="active"
    class="w-4 h-4 mr-2 text-violet-400"
    aria-hidden="true"
    />
    Erase Board
  </button>
</MenuItem>
</div>
</MenuItems>
</transition>
</Menu>
</div>
</template>