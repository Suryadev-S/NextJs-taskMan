import { createContext } from "react";
import { Board, Task } from "@/appTypes/appTypes";

interface AppContextType {
    boards: Board[];
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;