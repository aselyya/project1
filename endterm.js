const taskInput = document.getElementById('taskInput');
const taskDeadline = document.getElementById('taskDeadline');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const deadlineValue = taskDeadline.value;

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const deadline = deadlineValue ? new Date(deadlineValue) : null;
  const taskItem = createTaskItem(taskText, deadline);

  taskList.appendChild(taskItem);
  taskInput.value = '';
  taskDeadline.value = '';
}

function createTaskItem(taskText, deadline) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-item';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const deadlineSpan = document.createElement('span');
  deadlineSpan.textContent = deadline
    ? `Deadline: ${deadline.toLocaleString()}`
    : 'No deadline';

  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = '✎';
  editBtn.onclick = () => editTask(taskItem, taskSpan, deadlineSpan);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '×';
  deleteBtn.onclick = () => taskList.removeChild(taskItem);

  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.textContent = '✔';
  completeBtn.onclick = () => toggleCompleteTask(taskItem);

  taskItem.appendChild(taskSpan);
  taskItem.appendChild(deadlineSpan);
  taskItem.appendChild(completeBtn);
  taskItem.appendChild(editBtn);
  taskItem.appendChild(deleteBtn);

  if (deadline) checkDeadline(taskItem, deadline);

  taskSpan.addEventListener('click', () => editTaskInline(taskSpan));

  return taskItem;
}

function editTask(taskItem, taskSpan, deadlineSpan) {
  const newTaskText = prompt('Edit your task:', taskSpan.textContent);
  if (newTaskText) {
    taskSpan.textContent = newTaskText;
  }

  const newDeadline = prompt(
    'Edit your deadline (YYYY-MM-DDTHH:MM):',
    deadlineSpan.textContent.includes('Deadline')
      ? deadlineSpan.textContent.replace('Deadline: ', '').trim()
      : ''
  );

  if (newDeadline) {
    const newDeadlineDate = new Date(newDeadline);
    deadlineSpan.textContent = `Deadline: ${newDeadlineDate.toLocaleString()}`;
    checkDeadline(taskItem, newDeadlineDate);
  } else {
    deadlineSpan.textContent = 'No deadline';
    taskItem.classList.remove('overdue');
  }
}

function editTaskInline(taskSpan) {
  const newText = prompt('Edit your task:', taskSpan.textContent);
  if (newText) {
    taskSpan.textContent = newText;
  }
}

function checkDeadline(taskItem, deadline) {
  const interval = setInterval(() => {
    const now = new Date();
    if (now >= deadline) {
      taskItem.classList.add('overdue');
      alert(`Task "${taskItem.firstChild.textContent}" is overdue!`);
      clearInterval(interval);
    }
  }, 1000);
}

function toggleCompleteTask(taskItem) {
  if (taskItem.classList.contains('completed')) {
    taskItem.classList.remove('completed');
    taskList.appendChild(taskItem);  
  } else {
    taskItem.classList.add('completed');
    taskList.appendChild(taskItem); 
  }
}
