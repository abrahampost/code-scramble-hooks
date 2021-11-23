import PresentImage from '../../assets/Present.png';

export const Present = (props) => {
    const { top, left } = props;

    return (
        <div className={"present" + (props.resetting ? ' resetting' : '')} style={{top: `${top}%`, left: `${left}%`}}><img src={PresentImage} alt="present that fell of santas sleigh" /></div>
    );
}