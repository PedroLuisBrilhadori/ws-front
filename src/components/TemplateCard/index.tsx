import { Component, Template } from "@/models/template";
import { BadgeCheck, CircleDashed } from "lucide-react";

export type TemplateProps = {
  template: Template;
  className?: string;
};

export const TemplateCard = ({ template, className }: TemplateProps) => {
  return (
    <div
      className={`flex flex-col gap-3 bg-[#2a3942]  rounded-md p-2 m-2 ${className}`}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{template.name}</h1>
      </div>

      <div>
        <Components template={template} />
      </div>

      <div className="flex justify-between">
        <span>{template.language}</span>

        <Status status={template.status} />
      </div>
    </div>
  );
};

const Components = ({ template }: TemplateProps) => {
  return (
    <div>
      {template.components.map((component) => (
        <ComponentType
          key={`component-template-${template.id}-${component.type}`}
          component={component}
        />
      ))}
    </div>
  );
};

const ComponentType = ({ component }: { component: Component }) => {
  if (component.type === "HEADER")
    return <h1 className="font-bold">{component.text}</h1>;

  if (component.type === "BODY") return <p className="">{component.text}</p>;

  if (component.type === "FOOTER")
    return <span className="italic text-xs">{component.text}</span>;

  return <div></div>;
};

const Status = ({ status }: { status: string }) => {
  if (status === "APPROVED") return <BadgeCheck className="text-green-600" />;

  if (status === "PENDING") return <CircleDashed className="text-yellow-600" />;

  if (status === "REJECTED") return <BadgeCheck className="text-red-600" />;

  return <span>{status}</span>;
};
