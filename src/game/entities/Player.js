import Santa from '../../assets/Santa.png'

export const Player = (props) => {
    const { scroll } = props;
    return (
        <div className="player" style={{ top: `${scroll}%`}}><img src={Santa} alt="santa on his sleigh" /></div>
    );
}
