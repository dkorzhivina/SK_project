import { computed, reactive } from 'vue';
import { useLocalStorage } from './useLocalStorage';

const defaultFilters = {
  search: '',
  status: 'all',
  priority: 'all',
  sortBy: 'updatedAt',
  sortOrder: 'desc'
};

export function useProjects() {
  const [projects, setProjects] = useLocalStorage('projects', []);
  const filters = reactive({ ...defaultFilters });
  
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  
  const createProject = (formData) => {
    const now = new Date().toISOString();
    const project = {
      id: generateId(),
      ...formData,
      createdAt: now,
      updatedAt: now
    };
    
    setProjects([...projects.value, project]);
    return project;
  };
  
  const updateProject = (id, formData) => {
    const index = projects.value.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updatedProject = {
      ...projects.value[index],
      ...formData,
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = [...projects.value];
    updatedProjects[index] = updatedProject;
    setProjects(updatedProjects);
    
    return updatedProject;
  };
  
  const deleteProject = (id) => {
    const index = projects.value.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    const updatedProjects = projects.value.filter(p => p.id !== id);
    setProjects(updatedProjects);
    return true;
  };
  
  const getProject = (id) => {
    return projects.value.find(p => p.id === id);
  };
  
  const filteredProjects = computed(() => {
    let result = [...projects.value];
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(project =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(project => project.status === filters.status);
    }
    
    // Priority filter
    if (filters.priority !== 'all') {
      result = result.filter(project => project.priority === filters.priority);
    }
    
    // Sort
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'progress':
          aValue = a.progress;
          bValue = b.progress;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'updatedAt':
        default:
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
      }
      
      if (filters.sortOrder === 'desc') {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });
    
    return result;
  });
  
  const projectStats = computed(() => {
    const total = projects.value.length;
    const completed = projects.value.filter(p => p.status === 'completed').length;
    const inProgress = projects.value.filter(p => p.status === 'in-progress').length;
    const onHold = projects.value.filter(p => p.status === 'on-hold').length;
    const planning = projects.value.filter(p => p.status === 'planning').length;
    
    const avgProgress = total > 0 
      ? Math.round(projects.value.reduce((sum, p) => sum + p.progress, 0) / total)
      : 0;
    
    return {
      total,
      completed,
      inProgress,
      onHold,
      planning,
      avgProgress,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  });
  
  const resetFilters = () => {
    Object.assign(filters, defaultFilters);
  };
  
  return {
    projects: filteredProjects,
    allProjects: projects,
    filters,
    projectStats,
    createProject,
    updateProject,
    deleteProject,
    getProject,
    resetFilters
  };
}