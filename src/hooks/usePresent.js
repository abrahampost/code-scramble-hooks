import { useEffect, useState } from "react";
import { Present } from "../game/entities/Present";

const genRandomStart = (offset = 0) => ({
    left: offset + Math.random() * 25 + 100,
    top: Math.random() * 95 + 2.5
});

export const usePresent = ({ offset = 0, speed = 2 }) => {
    const [ resetting, setResetting ] = useState(false);
    const [ position, setPosition ] = useState(genRandomStart(offset));
    const reset = () => {
        setResetting(true);
    }
    
    useEffect(() => {
        if (resetting) {
            const newStart = genRandomStart();
            setPosition(position => ({left: newStart.left, top: newStart.top}));
            setTimeout(() => setResetting(false), 20);
        }
    }, [ resetting ])

    const moveLeft = () => {
        if (!resetting) setPosition(position => ({ left: position.left - speed, top: position.top }));
    }

    const present = <Present left={position.left} top={position.top} resetting={resetting}/>;

    return { reset, position, moveLeft, present };
}