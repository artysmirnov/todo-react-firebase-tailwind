import Form from "./components/Form";
import {FormEvent, FormEventHandler} from "react";
import {useState, useEffect} from "react";
import ToDo from "./components/ToDo";
import {db} from "./components/Firebase";
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from "firebase/firestore";

interface TodoType {
    text?: string;
    completed?: boolean;
    id: string;
}

const App = () => {
    const [todo, setTodo] = useState<TodoType[]>([]);

    useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todosArr: TodoType[] = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id});
            });
            setTodo(todosArr);
        });
        return () => unsubscribe();
    }, []);

    const toggleComplete = async (todo: TodoType) => {
        await updateDoc(doc(db, "todos", todo.id), {
            completed: !todo.completed
        })
    }

    const deleteToDo = async (id: string) => {
        await deleteDoc(doc(db, "todos", id));
    };
    const [input, setInput] = useState('')

    const createTodo: FormEventHandler<HTMLInputElement> = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (input === "") {
            return;
        }
        await addDoc(collection(db, "todos"), {
            text: input,
            completed: false,
        });
        setInput("");
    };

    return (
        <div className="h-screen w-screen p-5 bg-blue-600 overflow-y-scroll">
            <div
                className="bg-slate-100 max-w-[500px]
       w-full m-auto rounded-lg drop-shadow-2xl flex flex-col p-3 gap-3"
            >
                <h1 className="text-3xl font-bold text-center text-black p-2">
                    TODO LIST
                </h1>
                <Form createTodo={createTodo} input={input} setInput={setInput}/>
                <ul>
                    {todo.map((todos, index) => (
                        <ToDo
                            key={index}
                            todos={todos}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteToDo}
                        />
                    ))}
                </ul>
                {todo.length > 0 ? <p className="text-center text-black text-2xl">{`You have ${todo.length} tasks`}</p> :
                    <p className='text-center text-2xl text-black '>You have no tasks</p>}
            </div>
        </div>
    );
};

export default App;
