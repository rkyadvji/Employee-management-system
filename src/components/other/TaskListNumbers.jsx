import React from 'react'

function TaskListNumbers({data}) {
    return (
        <div className='flex mt-10 justify-between gap-5 screen'>
            <div className='bg-blue-400 w-[45%] rounded-xl py-6 px-9'>
                <h2 className='text-3xl font-semibold'>{data?.taskCounts?.newTask || 0}</h2>
                <h3 className='text-xl font-medium'>New Task</h3>
            </div>
            <div className='bg-green-400 w-[45%] rounded-xl py-6 px-9'>
                <h2 className='text-3xl font-semibold'>{data?.taskCounts?.completed || 0}</h2>
                <h3 className='text-xl font-medium'>Completed Task</h3>
            </div>
            <div className='bg-yellow-400 w-[45%] rounded-xl py-6 px-9'>
                <h2 className='text-black  text-3xl font-semibold'>{data?.taskCounts?.active || 0}</h2>
                <h3 className='text-black  text-xl font-medium'>Accepted Task</h3>
            </div>
            <div className='bg-red-400 w-[45%] rounded-xl py-6 px-9'>
                <h2 className='text-3xl font-semibold'>{data?.taskCounts?.failed || 0}</h2>
                <h3 className='text-xl font-medium'>Failed Task</h3>
            </div>
        </div>
    )
}

export default TaskListNumbers
