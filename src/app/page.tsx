'use client'

import { Board, Task } from "@/appTypes/appTypes";
import { Button } from "@/components/ui/button";
import BoardsList from "@/components/BoardsList";
import Nav from "@/components/Nav"
import TaskList from "@/components/TaskList";
import AppContext from "@/context/appContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<String>('');
  useEffect(() => {
    const storedBoardsString = localStorage.getItem("boards"); //possibility of being null or empty
    const storedTasksString = localStorage.getItem("tasks");
    if (storedBoardsString) {
      const storedBoards = JSON.parse(storedBoardsString) as Board[];
      setBoards(storedBoards);
    } else {
      setBoards([]);
    }
    if (storedTasksString) {
      const storedTasks = JSON.parse(storedTasksString) as Task[];
      setTasks(storedTasks);
    } else {
      setTasks([]);
    }
  }, [])
  return (
    <AppContext.Provider value={{ boards, setBoards, tasks, setTasks }}>
      <main className="px-2">
        <Nav activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
        {!activeBoardId && <BoardsList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />}
        {activeBoardId &&
          <TaskList activeBoardId={activeBoardId} />
        }
      </main>
    </AppContext.Provider>
  );
}
