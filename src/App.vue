<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Project Tracker</h1>
            <span v-if="currentView !== 'list'" class="ml-4 text-gray-500">
              / {{ currentView === 'create' ? 'Create Project' : currentView === 'edit' ? 'Edit Project' : 'Project Details' }}
            </span>
          </div>
          
          <button
            v-if="currentView === 'list'"
            @click="showCreateForm"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            New Project
          </button>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- List View -->
      <div v-if="currentView === 'list'">
        <!-- Stats -->
        <ProjectStats :stats="projectStats" />
        
        <!-- Filters -->
        <ProjectFilters 
          :filters="filters" 
          @reset="resetFilters" 
        />
        
        <!-- Projects Grid -->
        <div v-if="projects.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
            @view="viewProject"
            @edit="editProject"
            @delete="confirmDeleteProject"
          />
        </div>
        
        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📋</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p class="text-gray-500 mb-4">
            {{ hasFilters ? 'No projects match your current filters.' : 'Get started by creating your first project.' }}
          </p>
          <button
            v-if="!hasFilters"
            @click="showCreateForm"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Your First Project
          </button>
          <button
            v-else
            @click="resetFilters"
            class="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      <!-- Create/Edit Form -->
      <div v-else-if="currentView === 'create' || currentView === 'edit'">
        <ProjectForm
          :project="selectedProject"
          :is-submitting="isSubmitting"
          @submit="handleFormSubmit"
          @cancel="showList"
        />
      </div>
      
      <!-- Detail View -->
      <div v-else-if="currentView === 'detail' && selectedProject">
        <ProjectDetail
          :project="selectedProject"
          @edit="editProject(selectedProject.id)"
          @back="showList"
        />
      </div>
    </main>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Project</h3>
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete "{{ projectToDelete?.name }}"? This action cannot be undone.
        </p>
        <div class="flex gap-3 justify-end">
          <button
            @click="cancelDelete"
            class="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProjects } from './composables/useProjects.js';

// Components
import ProjectStats from './components/ProjectStats.vue';
import ProjectFilters from './components/ProjectFilters.vue';
import ProjectCard from './components/ProjectCard.vue';
import ProjectForm from './components/ProjectForm.vue';
import ProjectDetail from './components/ProjectDetail.vue';

// Composables
const {
  projects,
  filters,
  projectStats,
  createProject,
  updateProject,
  deleteProject,
  getProject,
  resetFilters
} = useProjects();

// State
const currentView = ref('list');
const selectedProjectId = ref(null);
const isSubmitting = ref(false);
const showDeleteModal = ref(false);
const projectToDelete = ref(null);

// Computed
const selectedProject = computed(() => {
  return selectedProjectId.value ? getProject(selectedProjectId.value) : undefined;
});

const hasFilters = computed(() => {
  return filters.search || 
         filters.status !== 'all' || 
         filters.priority !== 'all' ||
         filters.sortBy !== 'updatedAt' ||
         filters.sortOrder !== 'desc';
});

// Methods
const showList = () => {
  currentView.value = 'list';
  selectedProjectId.value = null;
};

const showCreateForm = () => {
  currentView.value = 'create';
  selectedProjectId.value = null;
};

const viewProject = (id) => {
  selectedProjectId.value = id;
  currentView.value = 'detail';
};

const editProject = (id) => {
  selectedProjectId.value = id;
  currentView.value = 'edit';
};

const confirmDeleteProject = (id) => {
  const project = getProject(id);
  if (project) {
    projectToDelete.value = project;
    showDeleteModal.value = true;
  }
};

const confirmDelete = () => {
  if (projectToDelete.value) {
    deleteProject(projectToDelete.value.id);
    cancelDelete();
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  projectToDelete.value = null;
};

const handleFormSubmit = async (formData) => {
  isSubmitting.value = true;
  
  try {
    if (currentView.value === 'create') {
      createProject(formData);
    } else if (currentView.value === 'edit' && selectedProjectId.value) {
      updateProject(selectedProjectId.value, formData);
    }
    
    showList();
  } catch (error) {
    console.error('Error saving project:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>