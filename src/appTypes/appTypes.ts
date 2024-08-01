export interface Board {
    boardId: string,
    boardName: string
}

export interface Task {
    taskId: string,
    boardId: string,
    title: string,
    description: string,
    subTasks: {
        subTask: string,
        isDone: boolean,
    }[],
    status: string,
    subTasksCount: number,
    subTasksDone: boolean,
    isDone: boolean,
}