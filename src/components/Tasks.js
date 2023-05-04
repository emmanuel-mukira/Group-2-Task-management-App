import React, { useState, useEffect } from 'react';
import TaskDisplay from './TaskDisplay';

function Task({ userId , onTaskCreated,username }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
 

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'low',
    completed: false,
    assigned_to: username,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/tasks?user_id=${userId}`)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, [userId]);

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
  };
  
  const handleDeleteClick = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const handleTaskInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handlePriorityChange = (event) => {
    setNewTask({
      ...newTask,
      priority: event.target.value,
    });
  };
  
  const handleCompletedChange = (event) => {
    setNewTask({
      ...newTask,
      completed: event.target.checked,
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTask({
          title: "",
          description: "",
          due_date: "",
          priority: "low",
          completed: false,
          assigned_to: username,
        });
        setTasks([...tasks, data]); // call setTasks to update the state variable
        if (onTaskCreated) {
          onTaskCreated(data);
        }
      });
  };
  
  const handleEditSubmit = (event, id) => {
    event.preventDefault();
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingTask),
    })
    .then((response) => response.json())
    .then((data) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === data.id) {
            return data;
          } else {
            return task;
          }
        })
      );
      setEditingTask(null);
    });
  };

  const handleCancelClick = () => {
    setEditingTask(null);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={editingTask ? (event) => handleEditSubmit(event, editingTask.id) : handleSubmit}>
        <input
          type="text"
          name="title"
          value={editingTask ? editingTask.title : newTask.title}
          onChange={handleTaskInputChange}
          placeholder="Task Title"
          required
        />
        <br />
        <textarea
          name="description"
          value={editingTask ? editingTask.description : newTask.description}
          onChange={handleTaskInputChange}
          placeholder="Task Description"
          required
          />
          <br />
          <label>
            Due Date:
            <input
              type="date"
              name="due_date"
              value={editingTask ? editingTask.due_date : newTask.due_date}
              onChange={handleTaskInputChange}
              required
            />
          </label>
          <br />
          <label>
            Priority:
            <select
              name="priority"
              value={editingTask ? editingTask.priority : newTask.priority}
              onChange={handlePriorityChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <br />
          <label>
            Completed:
            <input
              type="checkbox"
              name="completed"
              checked={editingTask ? editingTask.completed : newTask.completed}
              onChange={handleCompletedChange}
            />
          </label>
          <br />
          <br />
          <button type="submit">
            {editingTask ? "Update" : "Create"}
          </button>
          {editingTask && (
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          )}
        </form>
        <br />
{<TaskDisplay handleDeleteClick={handleDeleteClick} tasks={tasks} handleEditClick={handleEditClick}/>}
          
      </div>
);
}

export default Task;