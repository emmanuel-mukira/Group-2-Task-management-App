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
              return task.assigned_to && task.assigned_to.username === currentUser.username;
            });
            setTasks(filteredTasks);
          });
      }, [currentUser]);
      
    const handleTaskCreated = (newTask) => {
      setTasks([...tasks, newTask]);
    };
  
    return (
      <div>
        {currentUser && <h2>Welcome {currentUser.username}</h2>}
        <Task
            currentUser={currentUser}
          userId={currentUser?.id}
          onTaskCreated={handleTaskCreated}
          setTasks={setTasks} // pass down setTasks function as a prop
        />
        <TaskDisplay tasks={tasks} currentUser={currentUser} />
      </div>
    );
  }
  

export default Home;
