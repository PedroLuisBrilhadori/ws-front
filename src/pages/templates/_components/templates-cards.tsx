import { TemplateCard } from "@/components/TemplateCard";
import { selectTemplates } from "@/store/templates";
import { useSelector } from "react-redux";

export const TemplateCards = () => {
  const templates = useSelector(selectTemplates);

  return (
    <div className="flex flex-col gap-3">
      {templates.map((template) => (
        <TemplateCard
          key={`template-card${template.id}`}
          {...{ template, className: "text-white" }}
        />
      ))}
    </div>
  );
};
