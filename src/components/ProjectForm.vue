<template>
  <form @submit.prevent="onSubmit">
    <!-- Название -->
    <div class="panel" style="margin-bottom:.75rem;">
      <label class="form-label">Название</label>
      <input v-model.trim="form.name" type="text" class="input" placeholder="Введите название проекта"/>
      <p v-if="errors.name" style="color:#e11d48; font-size:.9rem; margin:.35rem 0 0;">{{ errors.name }}</p>
    </div>

    <!-- Описание -->
    <div class="panel" style="margin-bottom:.75rem;">
      <label class="form-label">Описание</label>
      <textarea v-model.trim="form.description" rows="4" class="textarea" placeholder="Краткое описание"></textarea>
      <p v-if="errors.description" style="color:#e11d48; font-size:.9rem; margin:.35rem 0 0;">{{ errors.description }}</p>
    </div>

    <!-- Статус / Приоритет / Прогресс -->
    <div class="grid grid-3" style="margin-bottom:.75rem;">
      <div>
        <label class="form-label">Статус</label>
        <select v-model="form.status" class="select">
          <option value="todo">К выполнению</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>
      </div>
      <div>
        <label class="form-label">Приоритет</label>
        <select v-model="form.priority" class="select">
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>
      <div>
        <label class="form-label">Прогресс (%)</label>
        <input v-model.number="form.progress" type="number" min="0" max="100" class="input"/>
        <p v-if="errors.progress" style="color:#e11d48; font-size:.9rem; margin:.35rem 0 0;">{{ errors.progress }}</p>
      </div>
    </div>

    <!-- Даты -->
    <div class="grid grid-2 panel" style="margin-bottom:.75rem;">
      <div>
        <label class="form-label">Дата начала</label>
        <input v-model="form.startDate" type="date" class="input"/>
        <p v-if="errors.startDate" style="color:#e11d48; font-size:.9rem; margin:.35rem 0 0;">{{ errors.startDate }}</p>
      </div>
      <div>
        <label class="form-label">Дата окончания</label>
        <input v-model="form.endDate" type="date" class="input"/>
        <p v-if="errors.endDate" style="color:#e11d48; font-size:.9rem; margin:.35rem 0 0;">{{ errors.endDate }}</p>
      </div>
    </div>

    <!-- Теги -->
    <div class="panel" style="margin-bottom:.75rem;">
      <label class="form-label">Теги (через запятую)</label>
      <input v-model.trim="tagsInput" type="text" class="input" placeholder="ui, backend, urgent"/>
    </div>

    <!-- Действия -->
    <div style="display:flex; gap:.5rem; justify-content:flex-end;">
      <button type="button" class="btn" @click="$emit('cancel')">Отмена</button>
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { validateProject, hasErrors } from '../utils/validation'

const props = defineProps({ initial: { type: Object, default: null } })
const emit = defineEmits(['submit','cancel'])

const form = reactive({
  name: '', description: '',
  status: 'todo', priority: 'medium',
  progress: 0, startDate: '', endDate: '',
  tags: [], ...(props.initial || {})
})

const errors = reactive({})

const tagsInput = computed({
  get: () => form.tags.join(', '),
  set: (val) => { form.tags = val.split(',').map(t => t.trim()).filter(Boolean) }
})

watch(form, () => {
  const e = validateProject(form)
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, e)
}, { deep: true })

function onSubmit() {
  const e = validateProject(form)
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, e)
  if (!hasErrors(errors)) emit('submit', { ...form, tags: [...form.tags] })
}
</script>
