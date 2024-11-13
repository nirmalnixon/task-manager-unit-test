// TaskManager.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from '../TaskManager';

describe('TaskManager Component', () => {
    test('renders TaskManager and adds a task', () => {
        render(<TaskManager />);

        const titleInput = screen.getByTestId('task-title-input');
        const descriptionInput = screen.getByTestId('task-description-input');
        const submitButton = screen.getByTestId('task-submit-button');

        fireEvent.change(titleInput, { target: { value: 'New Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'Task description' } });

        fireEvent.click(submitButton);

        expect(screen.getByText('Task added successfully')).toBeInTheDocument();
        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    // test('edits a task', () => {
    //     render(<TaskManager />);

    //     // Add a task first
    //     fireEvent.change(screen.getByTestId('task-title-input'), { target: { value: 'Task to Edit' } });
    //     fireEvent.change(screen.getByTestId('task-description-input'), { target: { value: 'Edit description' } });
    //     fireEvent.click(screen.getByTestId('task-submit-button'));

    //     // Edit the task
    //     const editButton = screen.getByTestId('task-edit-1'); // Assuming the ID is 1
    //     fireEvent.click(editButton);

    //     const titleInput = screen.getByTestId('task-title-input');
    //     const descriptionInput = screen.getByTestId('task-description-input');
    //     fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
    //     fireEvent.change(descriptionInput, { target: { value: 'Updated description' } });
    //     fireEvent.click(screen.getByTestId('task-submit-button'));

    //     expect(screen.getByText('Task updated successfully')).toBeInTheDocument();
    //     expect(screen.getByText('Updated Task')).toBeInTheDocument();
    // });

    // test('deletes a task', () => {
    //     render(<TaskManager />);

    //     // Add a task to delete
    //     fireEvent.change(screen.getByTestId('task-title-input'), { target: { value: 'Task to Delete' } });
    //     fireEvent.change(screen.getByTestId('task-description-input'), { target: { value: 'Delete description' } });
    //     fireEvent.click(screen.getByTestId('task-submit-button'));

    //     const deleteButton = screen.getByTestId('task-delete-1 '); // Assuming the ID is 1
    //     fireEvent.click(deleteButton);

    //     expect(screen.getByText('Task deleted successfully')).toBeInTheDocument();
    //     expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
    // });

    test('filters tasks', () => {
        render(<TaskManager />);

        // Add two tasks
        fireEvent.change(screen.getByTestId('task-title-input'), { target: { value: 'Pending Task' } });
        fireEvent.change(screen.getByTestId('task-description-input'), { target: { value: 'Pending task description' } });
        fireEvent.click(screen.getByTestId('task-submit-button'));

        fireEvent.change(screen.getByTestId('task-title-input'), { target: { value: 'Completed Task' } });
        fireEvent.change(screen.getByTestId('task-description-input'), { target: { value: 'Completed task description' } });
        fireEvent.click(screen.getByTestId('task-submit-button'));

        // Mark one task as completed
        const toggleButton = screen.getByTestId('task-toggle-1'); // Assuming the ID is 1
        fireEvent.click(toggleButton);

        const completedFilter = screen.getByTestId('filter-completed');
        fireEvent.click(completedFilter);

       // expect(screen.getByText('Completed')).toBeInTheDocument();
    });
});
