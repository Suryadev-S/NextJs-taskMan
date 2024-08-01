import AppContext from "@/context/appContext";
import { useContext } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react";
import { Button } from "./ui/button";

const TaskList = ({ activeBoardId }) => {
    const { tasks, setTasks } = useContext(AppContext);
    const activeBoardTasks = tasks.filter(({ boardId }) => boardId == activeBoardId);
    const handleUpdateWholeTask = (taskId, isComplete) => {
        const updatedTasks = tasks.map((task) => {
            if (task.taskId == taskId) {
                task.status = isComplete ? "done" : "todo";
                task.isDone = isComplete;
                return task;
            }
            return task;
        })
        //update UI
        setTasks(updatedTasks);
        //update storage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return;
    }

    const handleSubTaskUpdate = (taskId, subIndex, isDone) => {
        const updatedTasks = tasks.map((task) => {
            if (task.taskId == taskId) {
                const updatedSubs = task.subTasks.map((sub, i) => {
                    if (i == subIndex) {
                        sub.isDone = isDone;
                        return sub;
                    }
                    return sub;
                });

                const allSubsDone = updatedSubs.every((sub) => sub.isDone);
                const someSubsDone = updatedSubs.some((sub) => sub.isDone);
                const subsDoneCount = updatedSubs.reduce((acc, cur) => cur.isDone ? acc + 1 : acc, 0);
                return {
                    ...task, subTasks: updatedSubs,
                    subTasksDone: subsDoneCount,
                    isDone: allSubsDone ? true : false,
                    status: allSubsDone ? "done" : someSubsDone ? "doing" : "todo"
                };
            }
            return task;
        });

        //update UI
        setTasks(updatedTasks);
        //update storge
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.taskId != taskId);
        //update UI
        setTasks(updatedTasks);
        //update storage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return;
    }
    return (
        <div>
            <ul>
                {
                    activeBoardTasks.map((task, i) => {
                        return (
                            <li key={i}>
                                <Card id="card">
                                    <CardHeader>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <CardTitle id="cardTitle">{task.title}</CardTitle>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-sm" id="dialog">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        {task.title} &nbsp;
                                                        {task.subTasksCount == 0 && <Checkbox checked={task.isDone} onCheckedChange={(e) => { handleUpdateWholeTask(task.taskId, e) }} />}
                                                    </DialogTitle>
                                                    <DialogDescription id="cardDesc">
                                                        {task.description}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                {task.subTasksCount > 0 &&

                                                    <div>
                                                        <DialogDescription>subtasks</DialogDescription>
                                                        <ul>
                                                            {task.subTasks.map((sub, j) => {
                                                                return (
                                                                    <li key={j}>
                                                                        <Checkbox id="subTask" checked={sub.isDone} onCheckedChange={(e) => handleSubTaskUpdate(task.taskId, j, e)} />
                                                                        &nbsp;
                                                                        <label
                                                                            htmlFor="subTask">
                                                                            {sub.subTask}
                                                                        </label>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                }
                                                <DialogFooter className="sm:justify-start">
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="secondary">
                                                            Close
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <CardDescription id="cardDesc">{task.subTasksDone} of {task.subTasksCount}</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => handleDeleteTask(task.taskId)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardFooter>
                                </Card>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TaskList;