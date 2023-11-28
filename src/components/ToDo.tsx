import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoType } from "../types";

interface TodoProps {
    todos: TodoType;
    toggleComplete: (todo: TodoType) => void;
    deleteTodo: (id: string) => void;
}

const Todo = ({ todos, toggleComplete, deleteTodo }: TodoProps) => {
    return (
        <li className="p-2 bg-blue-300
         my-2 rounded-md uppercase shadow-sm">
            <div className="flex items-center justify-between">
                <p
                    className={
                        todos.completed ? "text-black cursor-pointer line-through opacity-50 overflow-clip" : "text-gray-700 cursor-pointer overflow-clip "
                    }
                >
                    {todos.text}
                </p>
                <div className="flex gap-3">
                    <button onClick={() => toggleComplete(todos)}>
                        <CheckIcon />
                    </button>
                    <button onClick={() => deleteTodo(todos.id)}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Todo;