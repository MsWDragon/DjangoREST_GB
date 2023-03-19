import React from "react";

const TodoItem = ({task}) => {
    return (
        <tr>
            <td>{task.project}</td>
            <td>{task.author}</td>
            <td>{task.createdAt}</td>
            <td>{task.updatedAt}</td>
        </tr>
    );
};

const TodoList = ({tasks, projects, users}) => {
    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Проект</th>
                    <th>Автор</th>
                    <th>Время создания</th>
                    <th>Последнее обновление</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => <TodoItem task={task}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
