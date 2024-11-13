import React, { useEffect, useState } from 'react';

import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

import Notification from './Notification';

// TaskManager Component
const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
        showNotification('Task added successfully');
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        setEditingTask(null);
        showNotification('Task updated successfully');
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        showNotification('Task deleted successfully');
    };

    const handleStatusChange = (taskId, newStatus) => {
        setTasks(tasks.map((task, index) =>
            (index + 1) === taskId ? { ...task, status: newStatus } : task
        ));
        showNotification(`Task marked as ${newStatus}`);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    //     useEffect(() => {
    // set
    //     }, [editingTask]);

    return (
        <div className="container my-5 p-4 bg-white rounded shadow">
            <h1 className="text-center display-4 mb-4">Task Manager</h1>

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}

            {editingTask ? (
                <TaskForm
                    onSubmit={handleUpdateTask}
                    initialTask={editingTask}
                    onCancel={() => setEditingTask(null)}
                />
            ) : (
                <TaskForm onSubmit={handleAddTask} />
            )}

            <div className="mb-4">
                <div className="btn-group d-flex" role="group">
                    {['all', 'pending', 'completed', 'cancelled'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`btn ${filter === status ? 'btn-primary' : 'btn-outline-secondary'} flex-fill`}
                            data-testid={`filter-${status}`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="task-list">
                {filteredTasks.length === 0 ? (
                    <p className="text-muted text-center py-4">No tasks found.</p>
                ) : (
                    filteredTasks.map((task, index) => (
                        <>
                            <TaskItem
                                key={index}
                                id={index + 1}
                                task={task}
                                onEdit={setEditingTask}
                                onDelete={handleDeleteTask}
                                onStatusChange={handleStatusChange}
                            />
                        </>
                    ))
                )}
            </div>
        </div>


    );
};

export default TaskManager;