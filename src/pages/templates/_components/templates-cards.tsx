import { TemplateCard } from "@/components/TemplateCard";
import { Template } from "@/models/template";
import { selectTemplates } from "@/store/templates";
import { useSelector } from "react-redux";

export type TemplateCardProps = {
  onClick?: (template: Template) => void;
};

export const TemplateCards = ({ onClick }: TemplateCardProps) => {
  const templates = useSelector(selectTemplates);

  // TODO: corrigir o scroll ficando atrás do header

  return (
    <div className="flex flex-wrap gap-y-2 place-content-evenly pt-4 pb-24">
      {templates.map((template) => (
        <div
          key={`template-card${template.id}`}
          onClick={() => onClick && onClick(template)}
          className={onClick && `cursor-pointer`}
        >
          <TemplateCard {...{ template, className: "" }} />
        </div>
      ))}
    </div>
  );
};
