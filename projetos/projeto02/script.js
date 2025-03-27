// Seleção de elementos
const themeToggle = document.getElementById('theme-toggle');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');
const tasksCount = document.getElementById('tasks-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');

// Estado inicial
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Configuração inicial do tema
function initTheme() {
    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Se existir um tema salvo, usa ele
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggle(savedTheme);
    } 
    // Se não existir, verifica as preferências do sistema
    else {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeToggle('dark');
        }
    }
}

// Atualiza o ícone do botão de tema
function updateThemeToggle(theme) {
    if (theme === 'dark') {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Alternar para tema claro');
    } else {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Alternar para tema escuro');
    }
}

// Alterna o tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

// Renderiza as tarefas com base no filtro atual
function renderTasks() {
    todoList.innerHTML = '';
    
    let filteredTasks = tasks;
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="todo-text">${task.text}</span>
            <div class="todo-actions">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
    
    updateTasksCount();
}

// Adiciona uma nova tarefa
function addTask() {
    const text = taskInput.value.trim();
    
    if (text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

// Atualiza o contador de tarefas
function updateTasksCount() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    tasksCount.textContent = `${remainingTasks} tarefa${remainingTasks !== 1 ? 's' : ''} restante${remainingTasks !== 1 ? 's' : ''}`;
}

// Salva as tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

todoList.addEventListener('click', (e) => {
    const target = e.target;
    const todoItem = target.closest('.todo-item');
    
    if (!todoItem) return;
    
    const taskId = parseInt(todoItem.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (target.classList.contains('todo-checkbox')) {
        tasks[taskIndex].completed = target.checked;
        todoItem.classList.toggle('completed', target.checked);
        saveTasks();
        updateTasksCount();
    } 
    else if (target.classList.contains('delete-btn')) {
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
    } 
    else if (target.classList.contains('edit-btn')) {
        const todoText = todoItem.querySelector('.todo-text');
        const currentText = todoText.textContent;
        const newText = prompt('Editar tarefa:', currentText);
        
        if (newText !== null && newText.trim() !== '') {
            tasks[taskIndex].text = newText.trim();
            todoText.textContent = newText.trim();
            saveTasks();
        }
    }
});

clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

// Inicialização
initTheme();
renderTasks();
