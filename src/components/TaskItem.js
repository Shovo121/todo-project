import { BiEdit, BiTrash } from "react-icons/bi";
const TaskItem = () => {
  return (
    <div className="task-item flex justify-between items-center bg-gray-800 p-5 rounded hover:bg-gradient-to-r hover:from-teal-800 hover:to-gray-800 group">
      <div className="task-item-left flex gap-3">
        <span>
          <input type="checkbox"  className="accent-teal-400"/>
        </span>
        <p className="group-hover:text-teal-400">learn react</p>
      </div>
      <div className="task-item-right flex gap-3">
         <span className="text-gray-500 hover:text-teal-500 cursor-pointer duration-300">
          <BiEdit />
         </span>
         <span className="text-gray-500 hover:text-red-500 cursor-pointer duration-300">
          <BiTrash />
         </span>
      </div>
    </div>
  )
}

export default TaskItem