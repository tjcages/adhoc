import { useState } from "react";

import styles from "../../scss/_Notice.scss";
import { BiX } from "react-icons/bi";

const Notice = ({ children, status, mini, dismissible, style }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      style={{ ...style }}
      className={[
        styles.notice,
        isVisible !== true ? styles.notDisplayed : null,
        status === "SUCCESS" ? styles.successNotice : null,
        status === "ERROR" ? styles.errorNotice : null,
        mini ? styles.miniNotice : null,
      ].join(" ")}
    >
      {dismissible && (
        <span
          role="button"
          tabIndex="0"
          className={styles.dismiss}
          onClick={() => setIsVisible(false)}
        >
          {/* <img src={CloseIcon} alt="close icon" /> */}
          <BiX />
        </span>
      )}
      {children}
    </div>
  );
};

export default Notice;
