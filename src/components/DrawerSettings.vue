<script>
  import { ref } from 'vue'
  import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { XIcon } from '@heroicons/vue/outline'
  import { SearchIcon } from '@heroicons/vue/solid'

  import { mapState } from "vuex";

  export default {
    components: {
      Dialog,
      DialogOverlay,
      DialogTitle,
      TransitionChild,
      TransitionRoot,
      XIcon,
      SearchIcon
    },
    setup() {
      const open = ref(false)

      return {
        open,
      }
    },
    computed: {
      ...mapState("board", ["board"])
    },
    methods: {
      submit() {
        let name = this.$refs.name.value
        this.$store.commit('board/updateName', name)
      }
    }
  }
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed inset-0 overflow-hidden" @close="open = false" :open="open">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-300 sm:duration-300" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300 sm:duration-300" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="relative w-screen max-w-sm">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                  <button class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" @click="open = false">
                    <span class="sr-only">Close panel</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                <div class="px-4 sm:px-6">
                  <DialogTitle class="text-lg font-medium text-gray-900">
                    Board Settings
                  </DialogTitle>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6 space-y-6">
                  <!-- Replace with your content -->
                  <div>
                    <label class="block text-xs text-gray-500 uppercase font-medium tracking-wide mb-1">Name</label>
                    <input type="text" ref="name" class="block w-full rounded border border-gray-200 shadow-xs focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" :value="board.name" :placeholder="board.name || 'Give your board a name'" @keyup.enter="closeModal(); submit();"/>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 uppercase font-medium tracking-wide mb-1">Background Image</label>
                    <div v-if="board.image" class="flex items-center space-x-2">
                      <img :src="board.image" class="w-24 h-16 rounded-md shadow-sm object-fit"/>
                      <button class="flex flex-col items-center justify-center w-24 h-16 rounded-md border-2 border-dashed text-gray-400 hover:text-gray-500 hover:border-gray-300 transition duration-100">
                        <SearchIcon class="h-4 w-4"/>
                        <div class="text-xs font-medium">
                          Update
                        </div>
                      </button>
                    </div>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>