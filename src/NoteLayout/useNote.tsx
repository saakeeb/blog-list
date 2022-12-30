import { useOutletContext } from "react-router-dom";
import { Note } from "../AppProps";

export function useNote() {
    return useOutletContext<Note>()
}