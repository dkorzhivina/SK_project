<template>
  <div
    class="group bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition overflow-hidden"
  >
    <div class="p-5 space-y-3">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-lg font-semibold leading-tight line-clamp-2">{{ project.name }}</h3>

        <div class="flex items-center gap-2">
          <span :class="statusClass" class="px-2 py-1 text-xs rounded-full font-medium capitalize">{{ project.status }}</span>
          <span :class="priorityClass" class="px-2 py-1 text-xs rounded-full font-medium capitalize">{{ project.priority }}</span>
        </div>
      </div>

      <p class="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
        {{ project.description }}
      </p>

      <div v-if="project.tags?.length" class="flex flex-wrap gap-2 pt-1">
        <span
          v-for="t in project.tags"
          :key="t"
          class="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:ring-slate-700"
        >
          #{{ t }}
        </span>
      </div>

      <div class="pt-2" v-if="project.progress != null">
        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Progress</span>
          <span>{{ project.progress }}%</span>
        </div>
        <div class="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-indigo-500 to-emerald-500" :style="{ width: project.progress + '%' }"></div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Updated: {{ formatDate(project.updatedAt) }}</span>
        <div class="flex items-center gap-2">
          <button
            class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            @click="$emit('open')"
          >
            Open
          </button>
          <button
            class="px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-500 transition"
            @click="$emit('delete')"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { STATUS_COLOR, PRIORITY_COLOR } from '../utils/constants'

const props = defineProps({
  project: { type: Object, required: true }
})

const statusClass = computed(() => STATUS_COLOR[props.project.status] || '')
const priorityClass = computed(() => PRIORITY_COLOR[props.project.priority] || '')

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString()
  } catch {
    return '-'
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;
}
</style>
