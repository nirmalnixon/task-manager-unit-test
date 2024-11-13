// TaskItem.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../TaskItem';

describe('TaskItem Component', () => {
    const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test description',
        status: 'pending',
        createdAt: new Date().toISOString(),
    };

    test('renders task item', () => {
        render(<TaskItem id={task.id} task={task} onEdit={() => {}} onDelete={() => {}} onStatusChange={() => {}} />);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    test('calls onEdit when edit button is clicked', () => {
        const onEdit = jest.fn();
        render(<TaskItem id={task.id} task={task} onEdit={onEdit} onDelete={() => {}} onStatusChange={() => {}} />);

        fireEvent.click(screen.getByTestId('task-edit-1'));
        expect(onEdit).toHaveBeenCalledWith(task);
    });

    test('calls onDelete when delete button is clicked', () => {
        const onDelete = jest.fn();
        render(<TaskItem id={task.id} task={task} onEdit={() => {}} onDelete={onDelete} onStatusChange={() => {}} />);

        fireEvent.click(screen.getByTestId('task-delete-1'));
        expect(onDelete).toHaveBeenCalledWith(task.id);
    });

    test('calls onStatusChange when toggle button is clicked', () => {
        const onStatusChange = jest.fn();
        render(<TaskItem id={task.id} task={task} onEdit={() => {}} onDelete={() => {}} onStatusChange={onStatusChange} />);

        fireEvent.click(screen.getByTestId('task-toggle-1'));
        expect(onStatusChange).toHaveBeenCalledWith(task.id, 'completed');
    });
});
