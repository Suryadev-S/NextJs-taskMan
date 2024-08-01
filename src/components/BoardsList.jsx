import AppContext from "@/context/appContext";
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useContext } from "react";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";

const BoardsList = ({ activeBoardId, setActiveBoardId }) => {
    const { boards, setBoards, tasks, setTasks } = useContext(AppContext);
    const handleSetBoardId = (id) => {
        setActiveBoardId(id);
    }

    const handleDeleteBoard = (boardId) => {
        const updatedBoards = boards.filter((board) => board.boardId != boardId);
        const updatedTasks = tasks.filter((task) => task.boardId != boardId)

        //updating UI
        setBoards(updatedBoards);
        setTasks(updatedTasks);
        // setActiveBoardId(null);

        //updating storage
        localStorage.setItem("boards", JSON.stringify(updatedBoards));
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return;
    }
    return (
        <ul id="boardList">
            {boards.map((board, i) => {
                return (
                    <li key={i}>
                        <Card id="card">
                            <CardHeader>
                                <CardTitle onClick={() => handleSetBoardId(board.boardId)} id="cardTitle">
                                    {board.boardName}
                                </CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <DropdownMenu>
                                    <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleDeleteBoard(board.boardId)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardFooter>
                        </Card>
                    </li>
                )
            })}
        </ul>
    )
}

export default BoardsList;