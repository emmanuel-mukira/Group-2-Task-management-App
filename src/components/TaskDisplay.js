import React from "react";

function TaskDisplay({ tasks, currentUser }) {
  const filteredTasks = tasks.filter(
    (task) => task.assigned_to.username === currentUser.username
  );

  return (
    <div>
      <h3>Your Tasks:</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th><br/>
            <th>Description</th><br/>
            <th>Priority</th><br/>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskDisplay;
