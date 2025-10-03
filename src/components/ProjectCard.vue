<template>
  <div class="card">
    <div style="display:flex; justify-content:space-between; gap:.8rem; align-items:flex-start;">
      <h3 style="margin:.2rem 0; font-size:1.05rem; font-weight:800; flex:1;">{{ project.name }}</h3>
      <div class="badges">
        <span class="badge" :class="`status-${project.status}`">{{ statusLabel(project.status) }}</span>
        <span class="badge" :class="`priority-${project.priority}`">{{ priorityLabel(project.priority) }}</span>
      </div>
    </div>

    <p style="opacity:.92; margin:.45rem 0 .35rem; line-height:1.45;">
      {{ project.description }}
    </p>

    <div v-if="project.tags?.length" class="badges" style="margin:.2rem 0 .6rem;">
      <span v-for="t in project.tags" :key="t" class="badge">#{{ t }}</span>
    </div>

    <div v-if="project.progress != null" style="margin-top:.4rem;">
      <div style="display:flex; justify-content:space-between; font-size:.84rem; opacity:.75; margin-bottom:.25rem;">
        <span>Прогресс</span><span>{{ project.progress }}%</span>
      </div>
      <div class="progress"><span :style="{ width: project.progress + '%' }"></span></div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:.85rem; font-size:.9rem; opacity:.75;">
      <span>Обновлено: {{ formatDate(project.updatedAt) }}</span>
      <div style="display:flex; gap:.5rem;">
        <button class="btn" @click="$emit('open')">Открыть</button>
        <button class="btn btn-danger" @click="$emit('delete')">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ project: { type: Object, required: true } })

function formatDate(iso) { try { return new Date(iso).toLocaleDateString('ru-RU') } catch { return '-' } }
function statusLabel(v) {
  if (v === 'todo') return 'К выполнению'
  if (v === 'in_progress') return 'В работе'
  if (v === 'done') return 'Готово'
  return v
}
function priorityLabel(v) {
  if (v === 'low') return 'Низкий'
  if (v === 'medium') return 'Средний'
  if (v === 'high') return 'Высокий'
  return v
}
</script>
