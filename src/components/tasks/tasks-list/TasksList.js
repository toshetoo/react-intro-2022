import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteTask, getAllTasks, getAllTasksForAuthor, saveTask } from "../../../utils/http-utils/task-requests";
import { TaskCard } from "../task-card/TaskCard";

import './TasksList.scss';

export function TasksList() {
    const [tasks, setTasks] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getAllTasksForAuthor(params.id).then(response => {
                setTasks(response.data);
            });
        }
        else {
            getAllTasks().then(response => {
                setTasks(response.data);
            });
        }
        
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteTask(id).then(() => {
            setTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (status, id) => {
        const task = tasks.find(task => task.id === id);
        task.status = status;
        saveTask(task).then(() => {
            setTasks([...tasks]);
        });
    }

    return (
        <div className="tasks-list-wrapper">
            { tasks.map(task => <TaskCard key={task.id} task={task} onTaskDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />) }
        </div>
    );
}