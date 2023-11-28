import AddCircleIcon from "@mui/icons-material/AddCircle";
import {FormPropTypes} from "./FormPropTypes.tsx";

const Form = ({createTodo, input, setInput}: FormPropTypes) => {
    return (
        <form onSubmit={createTodo} className="flex gap-3 justify-between bg-blue-500 p-3 rounded-lg items-center">
            <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="w-full text-lg rounded-lg p-[6px]"
                type="text"
                placeholder="Write your plans here"
            />
            <button className="p-0 text-black">
                <AddCircleIcon/>
            </button>
        </form>
    );
};

export default Form;