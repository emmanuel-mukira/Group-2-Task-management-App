import React, { useState, useEffect } from "react";
import Task from "./Tasks";
import TaskDisplay from "./TaskDisplay";

function Home({ currentUser }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        const filteredTasks = data.filter((task) => {
          return (
            task.assigned_to &&
            task.assigned_to.username === currentUser?.username
          );
        });
        setTasks(filteredTasks);
      });
  }, [currentUser]);

  const handleTaskCreated = (newTask) => {
    if (!currentUser) {
      alert("You need to be logged in to add a task.");
      return;
    }
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      
      <Task
        userId={currentUser?.id}
        username={currentUser?.username}
        onTaskCreated={handleTaskCreated}
        setTasks={setTasks} // pass down setTasks function as a prop
      />
      <TaskDisplay/>
    </div>
  );
}

export default Home;
