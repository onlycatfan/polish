import { useState } from "react";
import { strings } from "../../i18n/language";

const CONFIRM_WINDOW = 4000;

/** Two clicks to erase: the first one asks to click again within 4 seconds */
export function ResetButton({ onReset }: { onReset: () => void }) {
  const text = strings();
  const [confirming, setConfirming] = useState(false);
  const onClick = () => {
    if (confirming) {
      onReset();
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), CONFIRM_WINDOW);
    }
  };
  return (
    <button className={"danger" + (confirming ? " armed" : "")} onClick={onClick}>
      {confirming ? text.resetConfirm : text.reset}
    </button>
  );
}
