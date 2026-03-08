// Core data structures and DOM references for ColorfulTodo

// Task class definition
class Task {
  /**
   * Create a new Task instance.
   * @param {string|number} id - Unique identifier for the task.
   * @param {string} title - Title of the task.
   * @param {string} description - Optional description of the task.
   * @param {boolean} [completed=false] - Completion state.
   */
  constructor(id, title, description, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  /**
   * Toggle the completed state of the task.
   */
  toggleComplete() {
    this.completed = !this.completed;
  }

  /**
   * Convert the task instance to a plain JSON‑compatible object.
   * Useful for persistence (e.g., localStorage) and rendering.
   * @returns {{id: (string|number), title: string, description: string, completed: boolean}}
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
    };
  }
}

// Global task collection
let tasks = [];

// Cache frequently accessed DOM elements for performance and readability
const newTaskTitleInput = document.getElementById('new-task-title');
const newTaskDescInput = document.getElementById('new-task-desc');
const addTaskBtn = document.getElementById('add-task-btn');
const taskListEl = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');

/**
 * Persist the current `tasks` array to localStorage.
 * The tasks are first converted to plain objects via `Task#toJSON` to avoid
 * storing class instances directly.
 */
function saveTasksToStorage() {
  try {
    const serialized = JSON.stringify(tasks.map(t => t.toJSON()));
    localStorage.setItem('colorfulTodoTasks', serialized);
  } catch (e) {
    console.error('Failed to save tasks to localStorage', e);
  }
}

/**
 * Load tasks from localStorage, reconstructing `Task` instances and
 * populating the global `tasks` array.
 */
function loadTasksFromStorage() {
  const stored = localStorage.getItem('colorfulTodoTasks');
  if (!stored) return;
  try {
    const parsed = JSON.parse(stored);
    // Ensure we get an array before mapping
    if (Array.isArray(parsed)) {
      tasks = parsed.map(obj => new Task(obj.id, obj.title, obj.description, obj.completed));
      // Keep the window reference in sync for debugging / external access
      window.tasks = tasks;
    }
  } catch (e) {
    console.error('Failed to load tasks from localStorage', e);
  }
}

// Load any persisted tasks as soon as the script runs.
loadTasksFromStorage();

// Export for debugging / external access (attached to the global window object)
window.Task = Task;
window.tasks = tasks;
window.saveTasksToStorage = saveTasksToStorage;
window.loadTasksFromStorage = loadTasksFromStorage;

// Also expose cached elements for debugging convenience (optional)
window._domCache = {
  newTaskTitleInput,
  newTaskDescInput,
  addTaskBtn,
  taskListEl,
  filterButtons,
  clearCompletedBtn,
};
