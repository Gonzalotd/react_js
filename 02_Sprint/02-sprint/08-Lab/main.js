import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

// Inicializar la base de datos
const dbName = 'TodoDB';
const storeName = 'todos';
const version = 1;

const initDB = async () => {
    return openDB(dbName, version, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, { 
                    keyPath: 'id', 
                    autoIncrement: true 
                });
                store.createIndex('text', 'text', { unique: false });
            }
        },
    });
};

let db;
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const connectionStatus = document.getElementById('connection-status');
const installBtn = document.getElementById('install-btn');

const addTask = async (text) => {
    if (!text.trim()) return;
    
    const task = {
        text: text.trim(),
        createdAt: new Date().toISOString()
    };
    
    try {
        const id = await db.add(storeName, task);
        renderTask({ id, ...task });
        taskInput.value = '';
    } catch (error) {
        console.error('Error al añadir tarea:', error);
    }
};

const deleteTask = async (id) => {
    try {
        await db.delete(storeName, id);
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.style.animation = 'fadeOut 0.3s';
            setTimeout(() => taskElement.remove(), 300);
        }
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
    }
};

const loadTasks = async () => {
    try {
        const tasks = await db.getAll(storeName);
        taskList.innerHTML = '';
        tasks.forEach(renderTask);
    } catch (error) {
        console.error('Error al cargar tareas:', error);
    }
};

const renderTask = (task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.setAttribute('data-id', task.id);
    
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button class="delete-btn">Eliminar</button>
    `;
    
    li.querySelector('.delete-btn').addEventListener('click', () => {
        deleteTask(task.id);
    });
    
    taskList.appendChild(li);
};

const updateConnectionStatus = () => {
    if (navigator.onLine) {
        connectionStatus.textContent = 'En línea';
        connectionStatus.classList.remove('show');
    } else {
        connectionStatus.textContent = 'Sin conexión';
        connectionStatus.classList.add('show');
    }
};

// Instalación de la PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
    
    installBtn.addEventListener('click', async () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    db = await initDB();
    
    await loadTasks();   
    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    });    
    
    updateConnectionStatus();
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', { 
                type: 'module' 
            });
            console.log('Service Worker registrado con éxito:', registration);
        } catch (error) {
            console.error('Error al registrar el Service Worker:', error);
        }
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);