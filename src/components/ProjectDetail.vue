<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ project.name }}</h1>
        <div class="flex gap-3">
          <span :class="statusClass" class="px-3 py-1 text-sm font-medium rounded-full">
            {{ statusLabel }}
          </span>
          <span :class="priorityClass" class="px-3 py-1 text-sm font-medium rounded-full">
            {{ priorityLabel }}
          </span>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button
          @click="$emit('edit')"
          class="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          Edit Project
        </button>
        <button
          @click="$emit('back')"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
        >
          Back to List
        </button>
      </div>
    </div>
    
    <!-- Description -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Description</h3>
      <p class="text-gray-700 leading-relaxed">{{ project.description }}</p>
    </div>
    
    <!-- Progress -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
      <div class="flex justify-between text-sm text-gray-600 mb-2">
        <span>Completion Status</span>
        <span>{{ project.progress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div 
          class="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
          :style="{ width: `${project.progress}%` }"
        ></div>
      </div>
    </div>
    
    <!-- Tags -->
    <div class="mb-6" v-if="project.tags.length > 0">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in project.tags" 
          :key="tag"
          class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    
    <!-- Project Timeline -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Start Date:</span>
            <span class="font-medium">{{ formatDate(project.startDate) }}</span>
          </div>
          <div class="flex justify-between" v-if="project.endDate">
            <span class="text-gray-600">End Date:</span>
            <span class="font-medium">{{ formatDate(project.endDate) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Created:</span>
            <span class="font-medium">{{ formatDateTime(project.createdAt) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Last Updated:</span>
            <span class="font-medium">{{ formatDateTime(project.updatedAt) }}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Details</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Status:</span>
            <span :class="statusClass" class="px-2 py-1 text-xs font-medium rounded-full">
              {{ statusLabel }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Priority:</span>
            <span :class="priorityClass" class="px-2 py-1 text-xs font-medium rounded-full">
              {{ priorityLabel }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Progress:</span>
            <span class="font-medium">{{ project.progress }}%</span>
          </div>
          <div class="flex justify-between" v-if="project.endDate">
            <span class="text-gray-600">Days Remaining:</span>
            <span class="font-medium" :class="{ 'text-red-600': daysRemaining < 0, 'text-green-600': daysRemaining > 7 }">
              {{ daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue' }}
            </span>
          </div>
        </div>
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

defineEmits(['edit', 'back']);

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

const daysRemaining = computed(() => {
  if (!props.project.endDate) return 0;
  
  const endDate = new Date(props.project.endDate);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString();
};
</script>