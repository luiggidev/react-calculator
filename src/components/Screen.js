import { Textfit } from "react-textfit";
import "./Screen.css";

const Screen = ({ value, flickState }) => {
  return (
    
    <Textfit className={'screen ' + (flickState === false ? "animate-flicker" : "") } mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;