import React from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';

// TaskItem Component
const TaskItem = ({ id, task, onEdit, onDelete, onStatusChange }) => {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    return (

        <div className="border rounded p-3 mb-3 bg-light shadow-sm" data-testid={`task-item-${id}`}>
            <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                    <h3 className="h5 mb-2">{task.title}</h3>
                    <p className="text-muted mb-2">{task.description}</p>
                    <div className="d-flex align-items-center gap-2">
                        <span className={`badge ${statusColors[task.status]}`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                        <span className="text-muted small">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className="d-flex gap-2">
                    <button
                        onClick={() => onStatusChange(id, task.status === 'completed' ? 'pending' : 'completed')}
                        className="btn btn-light p-1"
                        data-testid={`task-toggle-${id}`}
                    >
                        {task.status === 'completed' ? <X size={16} /> : <Check size={16} />}
                    </button>
                    <button
                        onClick={() => onEdit(task)}
                        className="btn btn-light p-1"
                        data-testid={`task-edit-${id}`}
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="btn btn-light p-1"
                        data-testid={`task-delete-${id}`}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default TaskItem;