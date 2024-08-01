import AppContext from "@/context/appContext";
import { useContext } from "react";
import { Button } from "./ui/button";
import BoardDialog from "@/components/BoardDialog"
import TaskDialog from "@/components/TaskDialog"

const Nav = ({ activeBoardId, setActiveBoardId }) => {
    const { boards } = useContext(AppContext);
    const activeBoard = boards.find((board) => board.boardId === activeBoardId);// chances of being null;
    const handleChangeActiveBoardId = () => {
        setActiveBoardId(null);
    }
    return (
        <nav id="nav">
            {activeBoardId && <Button variant={"outline"} size={"icon"} className="font-semibold" onClick={handleChangeActiveBoardId}>&#10229;</Button>}
            <div id="boardName">{activeBoard ? activeBoard.boardName : "select a board"}</div>
            {!activeBoard && <BoardDialog />}
            {activeBoard && <TaskDialog activeBoardId={activeBoardId} />}
        </nav>
    )
}

export default Nav;