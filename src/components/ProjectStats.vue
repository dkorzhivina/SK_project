<template>
  <div>
    <h3 class="section-title">Обзор проектов</h3>
    <div class="grid grid-3">
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Всего проектов</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.total }}</div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Завершено</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.completed }}</div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">В работе</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.inProgress }}</div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Средний прогресс</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.avgProgress }}%</div>
        <div class="progress" style="margin-top:.6rem"><span :style="{ width: stats.avgProgress + '%' }"></span></div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Общая завершённость</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.overallCompletion }}%</div>
        <div class="progress" style="margin-top:.6rem"><span :style="{ width: stats.overallCompletion + '%' }"></span></div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Активные / Готовые</div>
        <div style="display:flex; gap:.5rem; margin-top:.5rem;">
          <span class="badge status-in_progress">активные: {{ stats.inProgress }}</span>
          <span class="badge status-done">готовые: {{ stats.completed }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ stats: { type: Object, required: true } })
</script>
