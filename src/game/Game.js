import { useEffect, useState } from 'react';
import { Snowflakes } from '../components/Snowflakes';
import { usePresent } from '../hooks/usePresent';
import { useScrollPercent } from '../hooks/useScrollPercent';
import { Player } from './entities/Player';
import './Game.scss';

export const Game = () => {
    const scroll = useScrollPercent({ min: 2.5, max: 97.5});
    const [ score, setScore ] = useState(0);
    const [ misses, setMisses ] = useState(0);
    const grabPresent = (points = 1) => setScore(score => score + points);
    const missPresent = (points = 1) => setMisses(misses => misses + points);

    const present1 = usePresent({ offset: 25, speed: 1.5 });
    const present2 = usePresent({ offset: 75, speed: 1.5 });
    const present3 = usePresent({ offset: 125, speed: 1.5 });


    useEffect(() => {
        const interval = setInterval(() => {
            const checkCollision = (present) => {
                if (present.position.left > 5 && present.position.left < 10) {
                    if (Math.abs(present.position.top - scroll.current) < 5) {
                        grabPresent();
                        present.reset();
                    }
                }
                if(present.position.left < -5) {
                    missPresent();
                    present.reset();
                }
            };
            checkCollision(present1);
            checkCollision(present2);
            checkCollision(present3);
            present1.moveLeft();
            present2.moveLeft();
            present3.moveLeft();
        }, 50);

        return () => clearInterval(interval);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ scroll, present1, present2, present3 ]);

    return (
        <div className="game">
            <Player scroll={scroll.current} />

            {/* Presents */}
            { present1.present }
            { present2.present }
            { present3.present }
            {/* UI Elements */}
            <Snowflakes />
            <div className="score">
                <div className="saved">{score} presents saved</div>
                <div className="misses">{misses} Christmases Ruined</div>
            </div>
        </div>
    );
}