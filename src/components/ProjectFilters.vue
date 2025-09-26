<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex flex-wrap gap-4">
      <!-- Search -->
      <div class="flex-1 min-w-64">
        <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search projects..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>
      
      <!-- Status Filter -->
      <div class="min-w-40">
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          v-model="filters.status"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="all">All Statuses</option>
          <option v-for="status in statusOptions" :key="status.value" :value="status.value">
            {{ status.label }}
          </option>
        </select>
      </div>
      
      <!-- Priority Filter -->
      <div class="min-w-40">
        <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
        <select
          v-model="filters.priority"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="all">All Priorities</option>
          <option v-for="priority in priorityOptions" :key="priority.value" :value="priority.value">
            {{ priority.label }}
          </option>
        </select>
      </div>
      
      <!-- Sort -->
      <div class="min-w-40">
        <label class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
        <div class="flex gap-2">
          <select
            v-model="filters.sortBy"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <button
            @click="toggleSortOrder"
            class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :title="filters.sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'"
          >
            <svg class="w-4 h-4" :class="{ 'rotate-180': filters.sortOrder === 'desc' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Reset Button -->
      <div class="flex items-end">
        <button
          @click="$emit('reset')"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PROJECT_STATUSES, PROJECT_PRIORITIES, SORT_OPTIONS } from '../utils/constants.js';

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
});

defineEmits(['reset']);

const statusOptions = PROJECT_STATUSES;
const priorityOptions = PROJECT_PRIORITIES;
const sortOptions = SORT_OPTIONS;

const toggleSortOrder = () => {
  props.filters.sortOrder = props.filters.sortOrder === 'asc' ? 'desc' : 'asc';
};
</script>