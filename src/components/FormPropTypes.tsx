import {FormEventHandler} from "react";

export interface FormPropTypes {
    createTodo: FormEventHandler<HTMLFormElement>;
    input: string;
    setInput: (input: string) => void;
}