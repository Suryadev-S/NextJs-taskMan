import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import AppContext from "@/context/appContext";

const TaskDialog = ({ activeBoardId }) => {
    const {tasks, setTasks} = useContext(AppContext);
    const [form, setForm] = useState({
        title: '',
        description: '',
        subTasks: [],
        subTasksCount: 0,
        subTasksDone: 0,
        status: "todo",
        isDone: false,
    })
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubChange = (e, i) => {
        const clone = form.subTasks.slice();
        clone[i].subTask = e.target.value;
        setForm({ ...form, subTasks: clone });
    }
    const handleAddSub = (e) => {
        e.preventDefault();
        const newSub = { subTask: '', isDone: false };
        setForm({ ...form, subTasks: [...form.subTasks, newSub] });
    }
    const handleDeleteSub = (e, i) => {
        e.preventDefault();
        const clone = form.subTasks.slice();
        clone.splice(i, 1);
        setForm({ ...form, subTasks: clone });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title && !form.description) {
            alert("please give either a title or description");
            return;
        }
        const newTask = {
            ...form,
            subTasksCount: form.subTasks.length,
            taskId: Date.now().toString(),
            boardId: activeBoardId,
        }
        const updatedTasks = [...tasks, newTask];
        //updateUI
        setTasks(updatedTasks);
        //updateStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setForm({
            title: '',
            description: '',
            subTasks: [],
            subTasksCount: 0,
            subTasksDone: 0,
            status: "todo",
            isDone: false,
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Fill in to make your task
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div>
                        <Input type="text" value={form.title} onChange={handleChange} placeholder={"title"} name={"title"} />
                    </div>
                    <div>
                        <Input type="text" value={form.description} onChange={handleChange} placeholder={"description"} name={"description"} />
                    </div>
                    <div>
                        <DialogDescription>SubTasks</DialogDescription>
                        <ul>
                            {form.subTasks?.map((sub, i) => {
                                return (
                                    <li key={i} className="flex justify-between">
                                        <span className="w-3/4">
                                            <Input
                                                type="text"
                                                value={sub.subTask}
                                                onChange={(e) => handleSubChange(e, i)} />
                                        </span>
                                        <Button size={"sm"} onClick={(e) => handleDeleteSub(e, i)}>C</Button>
                                    </li>
                                )
                            })}
                        </ul>
                        <Button size={"sm"} onClick={handleAddSub}>Add subs</Button>
                    </div>
                    <div>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDialog;