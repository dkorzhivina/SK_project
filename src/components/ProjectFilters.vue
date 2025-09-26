<template>
  <div>
    <div class="grid grid-3">
      <div>
        <label class="form-label">Search</label>
        <input v-model.trim="filters.search" type="text" class="input" placeholder="Search by name or tag"/>
      </div>

      <div>
        <label class="form-label">Status</label>
        <select v-model="filters.status" class="select">
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label class="form-label">Priority</label>
        <select v-model="filters.priority" class="select">
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    <div class="grid grid-2" style="margin-top:.9rem;">
      <div>
        <label class="form-label">Sort field</label>
        <select v-model="filters.sortBy" class="select">
          <option value="updatedAt">Updated</option>
          <option value="createdAt">Created</option>
          <option value="priority">Priority</option>
          <option value="progress">Progress</option>
        </select>
      </div>
      <div>
        <label class="form-label">Order</label>
        <select v-model="filters.sortOrder" class="select">
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
    </div>

    <div style="margin-top:1rem; display:flex; gap:.6rem; justify-content:flex-end;">
      <button class="btn" @click="$emit('reset')">Reset</button>
      <button class="btn btn-primary" @click="emitApply">Apply</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ filters: { type: Object, required: true } })
const emit = defineEmits(['apply','reset'])
function emitApply(){ emit('apply', props.filters) }
</script>
