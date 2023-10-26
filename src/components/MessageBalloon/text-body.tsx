export const TextBody = ({
  text,
  truncate,
}: {
  text: string;
  truncate?: boolean;
}) => {
  if (!text?.split) return "";

  const components = text.split("\n");

  return (
    <div className="flex flex-col">
      {components.map((text) => {
        let className = truncate ? "truncate" : "";

        if (/(?<![{[?}\]])\*(?!\s)(.+?)\*/.test(text)) {
          className = "font-bold";
          text = text.replace(/(?<![{[?}\]])\*(?!\s)(.+?)\*/, "$1");
        }

        if (/(?<![{[?}\]])\_(?!\s)(.+?)\_/.test(text)) {
          className = "italic text-xs";
          text = text.replace(/(?<![{[?}\]])\_(?!\s)(.+?)\_/, "$1");
        }

        return (
          <span className={className} key={`${text}-${Math.random()}`}>
            {text}
          </span>
        );
      })}
    </div>
  );
};
