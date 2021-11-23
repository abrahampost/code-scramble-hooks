import { useEffect, useRef, useState } from "react";
import { Present } from "../game/entities/Present";

const genRandomStart = (offset = 0) => ({
    left: offset + Math.random() * 25 + 100,
    top: Math.random() * 95 + 2.5
});

export const usePresent = ({ offset = 0, speed = 2 }) => {
    const [ resetting, setResetting ] = useState(false);
    const position = useRef(genRandomStart(offset));
    const reset = () => {
        setResetting(true);
    }
    
    useEffect(() => {
        if (resetting) {
            const newStart = genRandomStart();
            position.current.left = newStart.left;
            position.current.top = newStart.top;
            setTimeout(() => setResetting(false), 20);
        }
    }, [ resetting ])

    const moveLeft = () => {
        position.current = ({ left: position.current.left - speed, top: position.current.top });
    }

    const present = <Present left={position.current.left} top={position.current.top} resetting={resetting}/>;

    return { reset, position, moveLeft, present };
}