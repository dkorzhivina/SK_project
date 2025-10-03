<template>
  <div>
    <div class="grid grid-3">
      <div>
        <label class="form-label">Поиск</label>
        <input v-model.trim="filters.search" type="text" class="input" placeholder="Поиск по названию или тегу"/>
      </div>

      <div>
        <label class="form-label">Статус</label>
        <UiSelect
          v-model="filters.status"
          :options="statusOptions"
          placeholder="Все"
          :searchable="true"
          search-placeholder="Поиск статуса…"
        />
      </div>

      <div>
        <label class="form-label">Приоритет</label>
        <UiSelect
          v-model="filters.priority"
          :options="priorityOptions"
          placeholder="Все"
          :searchable="true"
          search-placeholder="Поиск приоритета…"
        />
      </div>
    </div>

    <div class="grid grid-2" style="margin-top:.9rem;">
      <div>
        <label class="form-label">Поле сортировки</label>
        <UiSelect
          v-model="filters.sortBy"
          :options="sortByOptions"
          :searchable="false"
        />
      </div>
      <div>
        <label class="form-label">Порядок</label>
        <UiSelect
          v-model="filters.sortOrder"
          :options="orderOptions"
          :searchable="false"
        />
      </div>
    </div>

    <div style="margin-top:1rem; display:flex; gap:.6rem; justify-content:flex-end;">
      <button class="btn" @click="$emit('reset')">Сбросить</button>
      <button class="btn btn-primary" @click="emitApply">Применить</button>
    </div>
  </div>
</template>

<script setup>
import UiSelect from './ui/UiSelect.vue'

const props = defineProps({ filters: { type: Object, required: true } })
const emit = defineEmits(['apply','reset'])
function emitApply(){ emit('apply', props.filters) }

const statusOptions = [
  { value: 'all', label: 'Все' },
  { value: 'todo', label: 'К выполнению' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'done', label: 'Готово' }
]
const priorityOptions = [
  { value: 'all', label: 'Все' },
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' }
]
const sortByOptions = [
  { value: 'updatedAt', label: 'Обновление' },
  { value: 'createdAt', label: 'Создание' },
  { value: 'priority', label: 'Приоритет' },
  { value: 'progress', label: 'Прогресс' }
]
const orderOptions = [
  { value: 'desc', label: 'По убыванию' },
  { value: 'asc', label: 'По возрастанию' }
]
</script>
