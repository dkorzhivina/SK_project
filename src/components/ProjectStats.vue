<template>
  <div>
    <h3 class="section-title">Project Overview</h3>
    <div class="grid grid-3">
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Total Projects</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.total }}</div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Completed</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.completed }}</div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">In Progress</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.inProgress }}</div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Avg Progress</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.avgProgress }}%</div>
        <div class="progress" style="margin-top:.6rem"><span :style="{ width: stats.avgProgress + '%' }"></span></div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Overall Completion</div>
        <div style="font-size:1.6rem;font-weight:800;margin-top:.2rem">{{ stats.overallCompletion }}%</div>
        <div class="progress" style="margin-top:.6rem"><span :style="{ width: stats.overallCompletion + '%' }"></span></div>
      </div>
      <div class="card">
        <div style="font-size:.85rem;color:var(--muted);">Active vs Done</div>
        <div style="display:flex; gap:.5rem; margin-top:.5rem;">
          <span class="badge status-in_progress">active: {{ stats.inProgress }}</span>
          <span class="badge status-done">done: {{ stats.completed }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ stats: { type: Object, required: true } })
</script>
