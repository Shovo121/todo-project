import TaskItem from "./TaskItem"

const TaskList = ({ tasks }) => {
  return (
    <div className="flex flex-col gap-3 bg-gray-900 container mx-auto p-10">
      <TaskItem />
    </div>
  )
}

export default TaskList