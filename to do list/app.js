// app.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-105';
      li.innerHTML = `
        <span class="flex items-center gap-2 text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}">
          <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5 ${task.completed ? 'text-green-500' : 'text-gray-300'}\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2l4-4\" /></svg>
          ${task.text}
        </span>
        <div class="flex items-center space-x-2">
          <button class="complete-btn bg-green-400 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition" data-idx="${idx}" title="Mark as complete">
            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\" /></svg>
          </button>
          <button class="delete-btn bg-red-400 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition" data-idx="${idx}" title="Delete task">
            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18L18 6M6 6l12 12\" /></svg>
          </button>
        </div>
      `;
      list.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      input.value = '';
      saveTasks();
      renderTasks();
    }
  });

  list.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      const idx = e.target.dataset.idx;
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    } else if (e.target.classList.contains('complete-btn')) {
      const idx = e.target.dataset.idx;
      tasks[idx].completed = !tasks[idx].completed;
      saveTasks();
      renderTasks();
    }
  });

  // Options dropdown logic
  const optionsBtn = document.getElementById('options-btn');
  const optionsMenu = document.getElementById('options-menu');
  const clearBtn = document.getElementById('clear-btn');

  optionsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    optionsMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!optionsBtn.contains(e.target) && !optionsMenu.contains(e.target)) {
      optionsMenu.classList.add('hidden');
    }
  });

  clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (tasks.length > 0 && confirm('Are you sure you want to clear all tasks?')) {
      tasks = [];
      saveTasks();
      renderTasks();
      optionsMenu.classList.add('hidden');
    }
  });

  renderTasks();
});
