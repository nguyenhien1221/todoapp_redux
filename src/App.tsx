/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo,
} from "./redux/Reducer/taskSlice";

import "./App.css";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    const [show, setShow] = useState(false);
    const [task, setTask] = useState("");
    const [modifyingTask, setModifyingTask] = useState("");
    const [modifyingTaskId, setModifyingTaskId] = useState<number>(0);

    //get task list
    const taskListResponse = useSelector(
        (state: RootState) => state.todo
    ).flat();

    useEffect(() => {
        dispatch(getTodos());
        console.log("render");
    }, [dispatch]);

    const handleAdd = (e: any) => {
        e.preventDefault();
        if (task === "") {
            alert("Xin mời nhập công việc");
            return;
        }
        dispatch(addTodo(task))
            .unwrap()
            .then(() => dispatch(getTodos()));
        setTask("");
    };

    const handleDelete = (taskId: number) => {
        dispatch(deleteTodo(taskId))
            .then(() => dispatch(getTodos()));

    };

    const handleUpdate = () => {
        if (modifyingTask === "") {
            return;
        }
        dispatch(
            updateTodo({ id: modifyingTaskId, updatedName: modifyingTask })
        )
            .unwrap()
            .then(() => dispatch(getTodos()));
        setShow(!show);
        setModifyingTask("");
    };

    const toggleShow = (taskId: number, taskName: string) => {
        setModifyingTaskId(taskId);
        setModifyingTask(taskName);
        setShow(!show);
    };

    return (
        <>
            <div className={show ? "modify-form" : "deactive"}>
                <i
                    className=" close-btn bx bx-x"
                    onClick={() => setShow(!show)}
                ></i>
                <p className="form-label">Sửa công việc</p>
                <input
                    className="modifi-input"
                    type="text"
                    value={modifyingTask}
                    onChange={(e) => setModifyingTask(e.target.value)}
                ></input>
                <p className="error"></p>
                <button onClick={() => handleUpdate()}>Xác nhận</button>
            </div>

            <div className={show ? "container blur" : "container"}>
                <div className="input-form">
                    <p className="form-label">Nhập công việc</p>
                    <input
                        value={task}
                        type="text"
                        placeholder="Nhập công việc cần làm..."
                        onChange={(e) => setTask(e.target.value)}
                    ></input>
                    <p className="error"></p>
                    <button onClick={(e) => handleAdd(e)}>Thêm</button>
                </div>

                <div className="list-job">
                    <ul>
                        {taskListResponse.map((item) => (
                            <li key={item.id}>
                                <div className="item">
                                    <p>
                                        <i className="arrow bx bxs-right-arrow"></i>
                                        {item.name}
                                    </p>
                                    <div className="item-control">
                                        <i
                                            className="edit-btn bx bxs-edit"
                                            onClick={() =>
                                                toggleShow(item.id, item.name)
                                            }
                                        ></i>
                                        <i
                                            className="delete-btn bx bxs-trash-alt"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        ></i>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default App;
