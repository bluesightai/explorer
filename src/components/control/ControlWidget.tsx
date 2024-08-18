
import { Config } from "../../config";
import "./ControlWidget.scss";
import DropDown from "./Dropdown/Dropdown";

const ControlWidget = ({ setViewState }: { setViewState: (config: Config) => void }) => {

  return (
    <div className="left-toolbar">
      <div className="logo">
        <a href="https://bluesight.ai/" className="logo-full" target="_blank" rel="noopener noreferrer">
          <span className="logo-dot"></span> <span className="logo-name">Bluesight.ai</span>
        </a>
        <DropDown setViewState={setViewState} />

      </div>


    </div>
  );
};

export default ControlWidget;