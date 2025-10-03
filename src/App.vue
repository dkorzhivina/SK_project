<template>
  <div class="page">
    <div class="container">
      <h1 class="h-title">Система Контроля</h1>

      <div class="header">
        <div style="flex:1"></div>
        <div class="header-actions">
          <button class="btn btn-primary" @click="openCreate = true">+ Новый проект</button>
          <button class="btn btn-ghost btn-icon" @click="toggleTheme" :title="isDark ? 'Светлая тема' : 'Тёмная тема'">
            <span v-if="!isDark">🌙</span><span v-else>☀️</span>
          </button>
        </div>
      </div>

      <div class="panel" style="margin-bottom:1rem;">
        <ProjectFilters :filters="filters" @reset="resetFilters" />
      </div>

      <div class="panel" style="margin-bottom:1rem;">
        <ProjectStats :stats="projectStats" />
      </div>

      <div v-if="projects.length" class="grid grid-3" style="margin-top:1rem;">
        <ProjectCard
          v-for="p in projects"
          :key="p.id"
          :project="p"
          @open="opened = p.id"
          @delete="deleteProject(p.id)"
        />
      </div>

      <div v-else class="empty" style="margin-top:1rem;">
        <p>Проектов пока нет. Создайте первый!</p>
        <button class="btn btn-primary" style="margin-top:.75rem" @click="openCreate = true">Создать проект</button>
      </div>
    </div>

    <!-- Дровер -->
    <div v-if="openCreate || opened">
      <div class="overlay" @click="closeAll"></div>
      <div class="drawer">
        <div class="drawer-head">
          <h2 style="margin:0;font-size:1.1rem;font-weight:700">
            {{ opened ? 'Редактирование проекта' : 'Новый проект' }}
          </h2>
          <button class="btn btn-ghost btn-icon" @click="closeAll">✕</button>
        </div>
        <div class="drawer-body">
          <ProjectForm
            :initial="opened ? getProject(opened) : null"
            @submit="onSubmit"
            @cancel="closeAll"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProjects } from './composables/useProjects'
import ProjectCard from './components/ProjectCard.vue'
import ProjectFilters from './components/ProjectFilters.vue'
import ProjectStats from './components/ProjectStats.vue'
import ProjectForm from './components/ProjectForm.vue'

const { projects, filters, projectStats, createProject, updateProject, deleteProject, getProject, resetFilters } = useProjects()

const openCreate = ref(false)
const opened = ref(null)

const isDark = ref(false)
onMounted(() => {
  const saved = localStorage.getItem('theme') || 'light'
  isDark.value = saved === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
function closeAll() { openCreate.value = false; opened.value = null }
function onSubmit(data) {
  if (opened.value) updateProject(opened.value, data)
  else createProject(data)
  closeAll()
}
</script>
