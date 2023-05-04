import React from "react";
import "./TaskDisplay.css";
export default function TaskDisplay({tasks,handleDeleteClick,handleEditClick}) {
  if (!tasks) {
    return <div></div>
  }

  return (
    <div>
      <h3 className="task-display">Task List</h3>
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Completed</th>
              <th>Assigned to</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>{task.priority}</td>
                <td>{task.completed ? 'Yes' : 'No'}</td>
                <td>{task.assigned_to}</td>
                <td>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
