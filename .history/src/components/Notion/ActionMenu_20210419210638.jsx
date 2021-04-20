import styles from "../../scss/_ActionMenu.scss";
import { BiTrashAlt } from "react-icons/bi";

const MENU_WIDTH = 150;
const MENU_HEIGHT = 40;

const ActionMenu = ({ position, actions }) => {
  const x = position.x - MENU_WIDTH / 2;
  const y = position.y - MENU_HEIGHT - 10;

  return (
    <div
      className="menuWrapper"
      style={{
        top: y,
        left: x,
      }}
    >
      <div className="menu">
        <span
          id="turn-into"
          className="menuItem"
          role="button"
          tabIndex="0"
          onClick={() => actions.turnInto()}
        >
          Turn into
        </span>
        <span
          id="delete"
          className="menuItem"
          role="button"
          tabIndex="0"
          onClick={() => actions.deleteBlock()}
        >
          <BiTrashAlt />
        </span>
      </div>
    </div>
  );
};

export default ActionMenu;
