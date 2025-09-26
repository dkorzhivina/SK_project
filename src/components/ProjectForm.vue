<template>
  <form class="bg-white rounded-lg shadow-md p-6 space-y-4" @submit.prevent="onSubmit">
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input v-model.trim="form.name" type="text" class="mt-1 w-full border rounded-md p-2" placeholder="Project name" />
      <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea v-model.trim="form.description" rows="4" class="mt-1 w-full border rounded-md p-2" placeholder="Short description"></textarea>
      <p v-if="errors.description" class="text-sm text-red-600 mt-1">{{ errors.description }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select v-model="form.status" class="mt-1 w-full border rounded-md p-2">
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Priority</label>
        <select v-model="form.priority" class="mt-1 w-full border rounded-md p-2">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Progress (%)</label>
        <input v-model.number="form.progress" type="number" min="0" max="100" class="mt-1 w-full border rounded-md p-2" />
        <p v-if="errors.progress" class="text-sm text-red-600 mt-1">{{ errors.progress }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Start date</label>
        <input v-model="form.startDate" type="date" class="mt-1 w-full border rounded-md p-2" />
        <p v-if="errors.startDate" class="text-sm text-red-600 mt-1">{{ errors.startDate }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">End date</label>
        <input v-model="form.endDate" type="date" class="mt-1 w-full border rounded-md p-2" />
        <p v-if="errors.endDate" class="text-sm text-red-600 mt-1">{{ errors.endDate }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
      <input v-model.trim="tagsInput" type="text" class="mt-1 w-full border rounded-md p-2" placeholder="ui, backend, urgent" />
    </div>

    <div class="flex gap-3 pt-2">
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
      <button type="button" class="px-4 py-2 bg-gray-200 rounded-md" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { validateProject, hasErrors } from '../utils/validation' // <-- фикс

const props = defineProps({
  initial: { type: Object, default: null }
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  name: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  progress: 0,
  startDate: '',
  endDate: '',
  tags: [],
  ...(props.initial || {})
})

const errors = reactive({})

const tagsInput = computed({
  get: () => form.tags.join(', '),
  set: (val) => {
    form.tags = val.split(',').map(t => t.trim()).filter(Boolean)
  }
})

watch(form, () => {
  const e = validateProject(form) // <-- фикс
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, e)
}, { deep: true })

function onSubmit() {
  const e = validateProject(form) // <-- фикс
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, e)
  if (!hasErrors(errors)) {
    emit('submit', { ...form, tags: [...form.tags] })
  }
}
</script>

<style scoped>
/* optional styles */
</style>
