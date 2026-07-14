import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

function AcceptTask({data}) {
    const [userData, setUserData] = useContext(AuthContext);

    const handleComplete = () => {
        const updatedData = userData.map(emp => {
            const taskIndex = emp.tasks.findIndex(t => t.taskTitle === data.taskTitle && t.taskDate === data.taskDate);
            if (taskIndex !== -1) {
                const newTasks = [...emp.tasks];
                newTasks[taskIndex] = { ...newTasks[taskIndex], active: false, completed: true };
                return {
                    ...emp,
                    tasks: newTasks,
                    taskCounts: {
                        ...emp.taskCounts,
                        active: emp.taskCounts.active - 1,
                        completed: emp.taskCounts.completed + 1
                    }
                };
            }
            return emp;
        });
        setUserData(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedData));
    };

    const handleFailed = () => {
        const updatedData = userData.map(emp => {
            const taskIndex = emp.tasks.findIndex(t => t.taskTitle === data.taskTitle && t.taskDate === data.taskDate);
            if (taskIndex !== -1) {
                const newTasks = [...emp.tasks];
                newTasks[taskIndex] = { ...newTasks[taskIndex], active: false, failed: true };
                return {
                    ...emp,
                    tasks: newTasks,
                    taskCounts: {
                        ...emp.taskCounts,
                        active: emp.taskCounts.active - 1,
                        failed: emp.taskCounts.failed + 1
                    }
                };
            }
            return emp;
        });
        setUserData(updatedData);
        localStorage.setItem('employees', JSON.stringify(updatedData));
    };

    return (
        <div className='flex-shrink-0 h-full w-[360px] p-5 bg-green-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 px-3 py-1 rounded text-sm'>{data.category}</h3>
                <h4 className='text-sm'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>
             <div className='flex justify-between mt-6 '>
                <button onClick={handleComplete} className='bg-green-500 rounded font-medium py-1 px-2 text-xs'>Mark as Completed</button>
                <button onClick={handleFailed} className='bg-red-500 rounded font-medium py-1 px-2 text-xs'>Mark as Failed</button>
            </div>
        </div>
    )
}

export default AcceptTask
