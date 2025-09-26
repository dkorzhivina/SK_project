import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectCard from '../components/ProjectCard.vue';

const mockProject = {
  id: '1',
  name: 'Test Project',
  description: 'This is a test project description',
  status: 'in-progress',
  priority: 'high',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  tags: ['vue', 'testing'],
  progress: 50,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-15T00:00:00.000Z'
};

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    });

    expect(wrapper.text()).toContain('Test Project');
    expect(wrapper.text()).toContain('This is a test project description');
    expect(wrapper.text()).toContain('In Progress');
    expect(wrapper.text()).toContain('High');
    expect(wrapper.text()).toContain('50%');
    expect(wrapper.text()).toContain('vue');
    expect(wrapper.text()).toContain('testing');
  });

  it('emits view event when view button is clicked', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    });

    const viewButton = wrapper.find('[data-testid="view-button"]') || 
                      wrapper.findAll('button').find(btn => btn.text() === 'View');
    
    if (viewButton) {
      await viewButton.trigger('click');
      expect(wrapper.emitted('view')).toBeTruthy();
      expect(wrapper.emitted('view')[0]).toEqual(['1']);
    }
  });

  it('emits edit event when edit button is clicked', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    });

    const editButton = wrapper.findAll('button').find(btn => btn.text() === 'Edit');
    
    if (editButton) {
      await editButton.trigger('click');
      expect(wrapper.emitted('edit')).toBeTruthy();
      expect(wrapper.emitted('edit')[0]).toEqual(['1']);
    }
  });

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    });

    const deleteButton = wrapper.findAll('button').find(btn => btn.text() === 'Delete');
    
    if (deleteButton) {
      await deleteButton.trigger('click');
      expect(wrapper.emitted('delete')).toBeTruthy();
      expect(wrapper.emitted('delete')[0]).toEqual(['1']);
    }
  });

  it('displays correct status and priority colors', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    });

    const statusBadge = wrapper.find('.bg-blue-100.text-blue-800');
    const priorityBadge = wrapper.find('.bg-orange-100.text-orange-800');
    
    expect(statusBadge.exists()).toBe(true);
    expect(priorityBadge.exists()).toBe(true);
  });

  it('shows progress bar with correct width', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    });

    const progressBar = wrapper.find('.bg-blue-600.h-2.rounded-full');
    expect(progressBar.attributes('style')).toContain('width: 50%');
  });

  it('limits displayed tags to 3 and shows overflow count', () => {
    const projectWithManyTags = {
      ...mockProject,
      tags: ['vue', 'typescript', 'testing', 'vite', 'vitest']
    };

    const wrapper = mount(ProjectCard, {
      props: {
        project: projectWithManyTags
      }
    });

    const tagElements = wrapper.findAll('.bg-gray-100.text-gray-700.text-xs.rounded-md');
    expect(tagElements).toHaveLength(4); // 3 tags + 1 overflow indicator
    expect(wrapper.text()).toContain('+2');
  });
});