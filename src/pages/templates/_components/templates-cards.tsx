import { TemplateCard } from "@/components/TemplateCard";
import { Template } from "@/models/template";
import { selectTemplates } from "@/store/templates";
import { useSelector } from "react-redux";

export type TemplateCardProps = {
  onlyVerify?: boolean;
  onClick?: (template: Template) => void;
};

export const TemplateCards = ({ onClick, onlyVerify }: TemplateCardProps) => {
  const templates = useSelector(selectTemplates);

  if (onlyVerify) {
    return (
      <div className="flex flex-col gap-3">
        {templates.map(
          (template) =>
            template.status === "APPROVED" && (
              <div
                key={`template-card${template.id}`}
                onClick={() => onClick && onClick(template)}
                className={onClick && `cursor-pointer`}
              >
                <TemplateCard {...{ template, className: "text-white" }} />
              </div>
            )
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {templates.map((template) => (
        <div
          key={`template-card${template.id}`}
          onClick={() => onClick && onClick(template)}
          className={onClick && `cursor-pointer`}
        >
          <TemplateCard {...{ template, className: "text-white" }} />
        </div>
      ))}
    </div>
  );
};
