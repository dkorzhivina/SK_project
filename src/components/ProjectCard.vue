<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-gray-900 truncate flex-1 mr-3">
          {{ project.name }}
        </h3>
        <div class="flex gap-2">
          <span :class="statusClass" class="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap">
            {{ statusLabel }}
          </span>
          <span :class="priorityClass" class="px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap">
            {{ priorityLabel }}
          </span>
        </div>
      </div>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ project.description }}
      </p>
      
      <!-- Progress -->
      <div class="mb-4">
        <div class="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{{ project.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            :style="{ width: `${project.progress}%` }"
          ></div>
        </div>
      </div>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-4" v-if="project.tags.length > 0">
        <span 
          v-for="tag in project.tags.slice(0, 3)" 
          :key="tag"
          class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
        >
          {{ tag }}
        </span>
        <span v-if="project.tags.length > 3" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
          +{{ project.tags.length - 3 }}
        </span>
      </div>
      
      <!-- Dates -->
      <div class="text-xs text-gray-500 mb-4">
        <div>Started: {{ formatDate(project.startDate) }}</div>
        <div v-if="project.endDate">Ends: {{ formatDate(project.endDate) }}</div>
        <div>Updated: {{ formatDate(project.updatedAt) }}</div>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-2">
        <button
          @click="$emit('view', project.id)"
          class="flex-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          View
        </button>
        <button
          @click="$emit('edit', project.id)"
          class="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
        >
          Edit
        </button>
        <button
          @click="$emit('delete', project.id)"
          class="px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { PROJECT_STATUSES, PROJECT_PRIORITIES } from '../utils/constants.js';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

defineEmits(['view', 'edit', 'delete']);

const statusOption = computed(() => 
  PROJECT_STATUSES.find(s => s.value === props.project.status)
);

const priorityOption = computed(() => 
  PROJECT_PRIORITIES.find(p => p.value === props.project.priority)
);

const statusLabel = computed(() => statusOption.value.label);
const statusClass = computed(() => statusOption.value.color);

const priorityLabel = computed(() => priorityOption.value.label);
const priorityClass = computed(() => priorityOption.value.color);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>