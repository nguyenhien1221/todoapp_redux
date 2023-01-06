import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { addItem, deleteItem, updateItem } from "./redux/Reducer/taskSlice";
import { getTodos } from "./redux/Reducer/taskSlice";

import "./App.css";

function App() {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [task, setTask] = useState("");
    const [modifyingTask, setModifyingTask] = useState("");
    const [modifyingTaskId, setModifyingTaskId] = useState(0)

    //get task list
    const list = useSelector((state: RootState) => state.todo);
    const todo = useSelector((state: RootState) => state.todo)
    console.log(todo)

    const handleAdd = (e: any) => {
        e.preventDefault();
        if (task === "") {
            alert('Xin mời nhập công việc')
            return;
        }
        dispatch(addItem({ title: task, id: 0 }));
        setTask("");
    };

    const handleDelete = (taskId: number) => {
        dispatch(deleteItem({ id: taskId, title: "" }));
    };

    const handleUpdate = () => {
        if (modifyingTask === ''){
            return;
        }
        setShow(!show);
        dispatch(updateItem({ id: modifyingTaskId, title: modifyingTask }));
        setModifyingTask('')
    };
    
    const toggleShow = (taskId: number, taskTitle: string) => {
        setModifyingTaskId(taskId)
        setModifyingTask(taskTitle);
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
                <b className="modifying-job">{task}</b>
                <input
                    className="modifi-input"
                    type="text"
                    value={modifyingTask}
                    onChange={(e) => setModifyingTask(e.target.value)}
                ></input>
                <p className="error"></p>
                <button onClick={handleUpdate}>Xác nhận</button>
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
                    <button onClick={handleAdd}>Thêm</button>
                </div>

                <div className="list-job">
                    <ul>
                        {list.map((item) => (
                            <li key={item.id}>
                                <div className="item">
                                    <p>
                                        <i className="arrow bx bxs-right-arrow"></i>
                                        {item.title}
                                    </p>
                                    <div className="item-control">
                                        <i
                                            className="edit-btn bx bxs-edit"
                                            onClick={() =>
                                                toggleShow(
                                                    item.id,
                                                    item.title
                                                )
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
