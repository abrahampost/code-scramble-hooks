import { useEffect, useRef } from "react"

export const useScrollPercent = ({min = 0, max = 100}) => {
    const scroll = useRef(min);

    useEffect(() => {
        const listener = () => {
            const ratio = (window.scrollY * 100) / window.innerHeight;
            const lerpedRatio = Math.max(min, Math.min(max, ratio));
            scroll.current = lerpedRatio;
        }

        window.addEventListener('scroll', listener);

        return () => {
            window.removeEventListener('scroll', listener);
        }
    }, [min, max]);

    return scroll;
}