import React, { useEffect, useState } from 'react';
import { Edit2, Plus } from 'lucide-react';

// TaskForm Component
const TaskForm = ({ onSubmit, initialTask = null, onCancel = null }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            status: initialTask?.status || 'pending',
            createdAt: initialTask?.createdAt || new Date().toISOString()
        });

        setTitle('');
        setDescription('');
    };

    useEffect(() => {
        if (initialTask?.title) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
        }
    }, [initialTask]);

    return (
        <form onSubmit={handleSubmit} className="mb-5 p-4 bg-light rounded shadow-sm">
            <div className="mb-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    className="form-control"
                    data-testid="task-title-input"
                />
            </div>
            <div className="mb-3">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Task Description"
                    className="form-control"
                    rows="3"
                    data-testid="task-description-input"
                />
            </div>
            <div className="d-flex gap-2">
                <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center gap-2"
                    data-testid="task-submit-button"
                >
                    {initialTask ? (
                        <>
                            <Edit2 size={16} /> Update Task
                        </>
                    ) : (
                        <>
                            <Plus size={16} /> Add Task
                        </>
                    )}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-secondary"
                        data-testid="task-cancel-button"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>

    );
};

export default TaskForm;