/** Option buttons; after an answer the right one turns green, the wrong pick red, the rest fade */
export function AnswerOptions({ options, answer, picked, onChoose }: {
  options: string[];
  answer: string;
  picked: string | null;
  onChoose: (option: string) => void;
}) {
  const stateOf = (option: string) => {
    if (picked == null) return "";
    if (option === answer) return " right";
    return option === picked ? " wrong" : " dimmed";
  };
  return (
    <div className="options">
      {options.map((option, index) => (
        <button key={option} className={"option" + stateOf(option)} disabled={picked != null} onClick={() => onChoose(option)} lang="pl">
          <span className="option-number">{index + 1}</span>
          {option}
        </button>
      ))}
    </div>
  );
}
