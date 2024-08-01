import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import AppContext from "@/context/appContext"
import { useContext, useState } from "react"

const BoardDialog = () => {
    const [input, setInput] = useState('');
    const { boards, setBoards } = useContext(AppContext);
    const handleCreateBoard = () => {
        const newBoard = {
            boardId: Date.now().toString(),
            boardName: input
        }
        const updatedBoards = [...boards, newBoard];
        //updateUI
        setBoards(updatedBoards);
        //updateStorage
        localStorage.setItem("boards", JSON.stringify(updatedBoards));
        setInput('');
    }
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Board</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Create Board</DialogTitle>
                    <DialogDescription>
                        Create a board to group tasks
                    </DialogDescription>
                </DialogHeader>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="BoardName" name="boardName" value={input} onChange={handleChange} />
                    <Button type="submit" onClick={handleCreateBoard}>Create</Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BoardDialog;