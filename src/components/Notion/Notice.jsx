import { useState } from "react";
import { BiX } from "react-icons/bi";

const Notice = ({ children, status, mini, dismissible, style }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      style={{ ...style }}
      className={[
        "notice",
        isVisible !== true ? "notDisplayed" : null,
        status === "SUCCESS" ? "successNotice" : null,
        status === "ERROR" ? "errorNotice" : null,
        mini ? "miniNotice" : null,
      ].join(" ")}
    >
      {dismissible && (
        <span
          role="button"
          tabIndex="0"
          className="dismiss"
          onClick={() => setIsVisible(false)}
        >
          <BiX />
        </span>
      )}
      {children}
    </div>
  );
};

export default Notice;
