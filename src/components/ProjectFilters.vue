<template>
  <div>
    <div class="grid grid-3">
      <div>
        <label class="form-label">Поиск</label>
        <input v-model.trim="filters.search" type="text" class="input" placeholder="Поиск по названию или тегу"/>
      </div>

      <div>
        <label class="form-label">Статус</label>
        <select v-model="filters.status" class="select">
          <option value="all">Все</option>
          <option value="todo">К выполнению</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>
      </div>

      <div>
        <label class="form-label">Приоритет</label>
        <select v-model="filters.priority" class="select">
          <option value="all">Все</option>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>
    </div>

    <div class="grid grid-2" style="margin-top:.9rem;">
      <div>
        <label class="form-label">Поле сортировки</label>
        <select v-model="filters.sortBy" class="select">
          <option value="updatedAt">Обновление</option>
          <option value="createdAt">Создание</option>
          <option value="priority">Приоритет</option>
          <option value="progress">Прогресс</option>
        </select>
      </div>
      <div>
        <label class="form-label">Порядок</label>
        <select v-model="filters.sortOrder" class="select">
          <option value="desc">По убыванию</option>
          <option value="asc">По возрастанию</option>
        </select>
      </div>
    </div>

    <div style="margin-top:1rem; display:flex; gap:.6rem; justify-content:flex-end;">
      <button class="btn" @click="$emit('reset')">Сбросить</button>
      <button class="btn btn-primary" @click="emitApply">Применить</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ filters: { type: Object, required: true } })
const emit = defineEmits(['apply','reset'])
function emitApply(){ emit('apply', props.filters) }
</script>
