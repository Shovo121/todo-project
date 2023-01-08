import { createContext, useEffect, useState } from "react"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import Header from "./components/Header"
import TaskList from "./components/TaskList"

export const deleteHandleContext = createContext()
export const editedHandleContext = createContext()

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedText, setEditedText] = useState("");
  const [toggleEditMode, setToggleEditMode] = useState(true);
  useEffect(()=>{
    fetcingData()
  }, [])

  const fetcingData = async () => {
    try {
      const res = await fetch("https://rhetorical-guiltless-apogee.glitch.me/tasks");
    if(!res.ok) throw new Error("Something went wrong!");
    const data = await res.json();
    setTasks(data)
    setLoading(false);
    } catch (error){
      setError(error.message);
    }
  };

//delete even
  const handledelete = (id)=> {
    //delete task
      deleteData(id);
    //delete updating task
    setTasks(tasks.filter((task)=> id !== task.id))
  };

  const deleteData = async (id) => {
    await fetch(`https://rhetorical-guiltless-apogee.glitch.me/tasks/${id}`, {
      method: "DELETE",
      headers:{
        "Content-type" : "application/json",
      },
    });
  }
//Editer event
const handleEditer = (id) =>{
  const [editableTarget] = tasks.filter(task => task.id === id);
  editableTarget.isEditable = true;
  setEditedText(editableTarget.text)

  setTasks([...tasks])
  setToggleEditMode(false)

  tasks.filter(task => task.id !== id).map(targetEl => targetEl.isEditable = false)
}
//From editsubmit task
  const handleEditedSubmit = (e, id) =>{
    e.preventDefault();

    setToggleEditMode(!toggleEditMode);
    //persist data
    const editPersisten = {
      text: editedText,
      id: id,
    }
    //puting requst
    puttingRequst(id, editPersisten)
    //real time update
    const [editableTarget] = tasks.filter(task => task.id === id);
    editableTarget.isEditable = false;
    editableTarget.text = editPersisten.text
    setTasks([...tasks])

  }

  const puttingRequst = async (id, newData)=>{
    fetch(`https://rhetorical-guiltless-apogee.glitch.me/tasks/${id}`,{
      method:"PUT",
      headers:{
        "Content-type": "application/json"
      },
      body:JSON.stringify(newData)
    })
  }
  return (
    <div className="wrapper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <deleteHandleContext.Provider value={handledelete}>
        <editedHandleContext.Provider value={handleEditer}>
        <Header />
        <AddTask tasks={tasks} setTasks={setTasks}/>
        <TaskList tasks={tasks} loading={loading} error={error} editedText={editedText} setEditedText={setEditedText} handleEditedSubmit={handleEditedSubmit}/>
        <Footer />
        </editedHandleContext.Provider>
      </deleteHandleContext.Provider>   
    </div>
  )
}

export default App