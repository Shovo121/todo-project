import { useContext, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { deleteHandleContext, editedHandleContext } from "../App";
const TaskItem = ({ task, editedText, setEditedText, handleEditedSubmit }) => {
  const handledelete = useContext(deleteHandleContext)
  const handleEditer = useContext(editedHandleContext)
  const [isChecked, setIsChecked] = useState(false)
  
  return (
    <div className="task-item flex justify-between items-center bg-gray-800 p-5 rounded hover:bg-gradient-to-r hover:from-teal-800 hover:to-gray-800 group">
      <div className="task-item-left flex gap-3">
        <span>
          <input type="checkbox" checked={isChecked} onChange={()=> setIsChecked(!isChecked)} className="accent-teal-400"/>
        </span>
        {task.isEditable  && (
            <form onSubmit={(e)=>handleEditedSubmit(e, task.id)}>
              <input className="bg-transparent outline-none border-b-2 border-gray-500 pd-b-1 focus:border-teal-500" type="text" required value={editedText} onChange={(e)=> setEditedText(e.target.value)}/>
            </form>
          )}
        {!task.isEditable && (<p className={`group-hover:text-teal-400 ${isChecked ? `line-through text-gray-500 group-hover:text-teal-600`: null}`}>{task.text}</p>)}              
      </div>
      <div className="task-item-right flex gap-3">
         <button onClick={()=>handleEditer(task.id)}>
          <BiEdit className="text-gray-500 hover:text-teal-500 cursor-pointer duration-300"/>
         </button>
         <button onClick={() =>handledelete(task.id)}>
          <BiTrash className="text-gray-500 hover:text-red-500 cursor-pointer duration-300" />
         </button>
      </div>
    </div>
  )
}

export default TaskItem