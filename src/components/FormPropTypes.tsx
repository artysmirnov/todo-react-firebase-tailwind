import {FormEventHandler} from "react";

export interface FormPropTypes {
    createTodo: FormEventHandler<HTMLInputElement>;
    input: string;
    setInput: (input: string) => void;
}