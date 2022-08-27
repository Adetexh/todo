import { useState } from "react";
import AddTaskForm from "./comp/AddTaskForm";
import ToDo from "./comp/ToDo";
import UpdateForm from "./comp/UpdateForm";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [toDo, setToDo] = useState("");

  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      setToDo([...toDo, { id: num, title: newTask, status: false }]);
      setNewTask("");
    }
  };

  // Delete task
  const deleteTask = (id) => {
    setToDo(toDo.filter((task) => task.id !== id));
  };

  const markDone = (id) => {
    setToDo(
      toDo.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for update
  const changeHolder = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);
    setUpdateData("");
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>My Todo</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="container Main">
        <br />
        <br />
        <h2>My List</h2>
        <br />
        <br />

        {updateData && updateData ? (
          <UpdateForm
            updateData={updateData}
            changeHolder={changeHolder}
            updateTask={updateTask}
            cancelUpdate={cancelUpdate}
          />
        ) : (
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
          />
        )}

        {toDo && toDo.length ? "" : "No Tasks..."}

        <ToDo
          toDo={toDo}
          markDone={markDone}
          setUpdateData={setUpdateData}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Main;
