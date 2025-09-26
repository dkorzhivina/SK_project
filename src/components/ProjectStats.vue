<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Project Overview</h2>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
        <div class="text-sm text-gray-500">Total Projects</div>
      </div>
      
      <div class="text-center">
        <div class="text-2xl font-bold text-green-600">{{ stats.completed }}</div>
        <div class="text-sm text-gray-500">Completed</div>
      </div>
      
      <div class="text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ stats.inProgress }}</div>
        <div class="text-sm text-gray-500">In Progress</div>
      </div>
      
      <div class="text-center">
        <div class="text-2xl font-bold text-purple-600">{{ stats.avgProgress }}%</div>
        <div class="text-sm text-gray-500">Avg Progress</div>
      </div>
    </div>
    
    <div class="mt-4">
      <div class="flex justify-between text-sm text-gray-600 mb-1">
        <span>Overall Completion</span>
        <span>{{ stats.completionRate }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          :style="{ width: `${stats.completionRate}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
});
</script>