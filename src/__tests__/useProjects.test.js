import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProjects } from '../composables/useProjects.js';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('creates a new project', () => {
    const { createProject, allProjects } = useProjects();
    
    const projectData = {
      name: 'Test Project',
      description: 'Test Description',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-01-01',
      tags: [],
      progress: 0
    };

    const project = createProject(projectData);
    
    expect(project).toBeDefined();
    expect(project.name).toBe('Test Project');
    expect(project.id).toBeDefined();
    expect(project.createdAt).toBeDefined();
    expect(project.updatedAt).toBeDefined();
    expect(allProjects.value).toHaveLength(1);
  });

  it('updates an existing project', () => {
    const { createProject, updateProject, getProject } = useProjects();
    
    const projectData = {
      name: 'Test Project',
      description: 'Test Description',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-01-01',
      tags: [],
      progress: 0
    };

    const project = createProject(projectData);
    
    const updatedData = {
      ...projectData,
      name: 'Updated Project',
      progress: 50
    };

    const updatedProject = updateProject(project.id, updatedData);
    
    expect(updatedProject).toBeDefined();
    expect(updatedProject.name).toBe('Updated Project');
    expect(updatedProject.progress).toBe(50);
    expect(getProject(project.id).name).toBe('Updated Project');
  });

  it('deletes a project', () => {
    const { createProject, deleteProject, allProjects } = useProjects();
    
    const projectData = {
      name: 'Test Project',
      description: 'Test Description',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-01-01',
      tags: [],
      progress: 0
    };

    const project = createProject(projectData);
    expect(allProjects.value).toHaveLength(1);
    
    const result = deleteProject(project.id);
    
    expect(result).toBe(true);
    expect(allProjects.value).toHaveLength(0);
  });

  it('filters projects by search term', () => {
    const { createProject, projects, filters } = useProjects();
    
    createProject({
      name: 'Vue Project',
      description: 'A Vue.js application',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-01-01',
      tags: ['vue'],
      progress: 0
    });

    createProject({
      name: 'React Project',
      description: 'A React application',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-01-01',
      tags: ['react'],
      progress: 0
    });

    filters.search = 'Vue';
    expect(projects.value).toHaveLength(1);
    expect(projects.value[0].name).toBe('Vue Project');
  });

  it('calculates project stats correctly', () => {
    const { createProject, projectStats } = useProjects();
    
    createProject({
      name: 'Project 1',
      description: 'Description',
      status: 'completed',
      priority: 'high',
      startDate: '2024-01-01',
      tags: [],
      progress: 100
    });

    createProject({
      name: 'Project 2',
      description: 'Description',
      status: 'in-progress',
      priority: 'medium',
      startDate: '2024-01-01',
      tags: [],
      progress: 50
    });

    expect(projectStats.value.total).toBe(2);
    expect(projectStats.value.completed).toBe(1);
    expect(projectStats.value.inProgress).toBe(1);
    expect(projectStats.value.avgProgress).toBe(75);
    expect(projectStats.value.completionRate).toBe(50);
  });
});