// TaskForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';

describe('TaskForm Component', () => {
    test('renders form and submits new task', () => {
        const onSubmit = jest.fn();
        render(<TaskForm onSubmit={onSubmit} />);

        fireEvent.change(screen.getByTestId('task-title-input'), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByTestId('task-description-input'), { target: { value: 'Task description' } });
        fireEvent.click(screen.getByTestId('task-submit-button'));

        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
            title: 'New Task',
            description: 'Task description',
        }));
    });

    test('renders form with initial task for editing', () => {
        const initialTask = { id: 1, title: 'Edit Task', description: 'Description' };
        const onSubmit = jest.fn();
        render(<TaskForm onSubmit={onSubmit} initialTask={initialTask} />);

        expect(screen.getByTestId('task-title-input').value).toBe('Edit Task');
        expect(screen.getByTestId('task-description-input').value).toBe('Description');
    });

    test('cancels editing', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();
        render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} initialTask={{ title: 'Edit Task' }} />);

        fireEvent.click(screen.getByTestId('task-cancel-button'));
        expect(onCancel).toHaveBeenCalled();
    });
});
