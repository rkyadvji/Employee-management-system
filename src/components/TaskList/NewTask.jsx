import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({data}) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleAccept = () => {
    const updatedData = userData.employees.map(emp => {
      const taskIndex = emp.tasks.findIndex(t => t.taskTitle === data.taskTitle && t.taskDate === data.taskDate);
      if (taskIndex !== -1) {
        const newTasks = [...emp.tasks];
        newTasks[taskIndex] = { ...newTasks[taskIndex], newTask: false, active: true };
        return {
          ...emp,
          tasks: newTasks,
          taskCounts: {
            ...emp.taskCounts,
            newTask: emp.taskCounts.newTask - 1,
            active: emp.taskCounts.active + 1
          }
        };
      }
      return emp;
    });
    setUserData({ ...userData, employees: updatedData });
    localStorage.setItem('employees', JSON.stringify(updatedData));
  };

  return (
    <div className='flex-shrink-0 h-full w-[360px] p-5 bg-red-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 px-3 py-1 rounded text-sm'>{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
      <p className='text-sm mt-2'>
        {data.taskDescription}
      </p>
      <div className='mt-6'>
        <button onClick={handleAccept} className='bg-blue-500 rounded font-medium py-1 px-2 text-xs'>Accept Task</button>
      </div>
    </div>
  )
}

export default NewTask
