import { Component, Template } from "@/models/template";
import { Check, Loader2, X } from "lucide-react";

export type TemplateProps = {
  template: Template;
  className?: string;
};

export const TemplateCard = ({ template, className }: TemplateProps) => {
  return (
    <div
      className={`flex flex-col gap-3 bg-component-templateCard rounded-md p-4 ${className}`}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-typography-embedded-dark">
          {template.name}
        </h1>
      </div>

      <div>
        <Components template={template} />
      </div>

      <div className="flex justify-between">
        <span className="text-typography-embedded-dark">
          {template.language}
        </span>

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
    return (
      <h1 className="font-bold text-typography-embedded-dark">
        {component.text}
      </h1>
    );

  if (component.type === "BODY")
    return <p className=" text-typography-embedded-dark">{component.text}</p>;

  if (component.type === "FOOTER")
    return (
      <span className="italic text-xs text-typography-embedded-dark">
        {component.text}
      </span>
    );

  return <div></div>;
};

const Status = ({ status }: { status: string }) => {
  if (status === "APPROVED") return <Check className="text-success" />;

  if (status === "PENDING")
    return <Loader2 className="animate-spin text-info" />;

  if (status === "REJECTED") return <X className="text-destructive" />;

  return <span className="text-typography-embedded-dark">{status}</span>;
};
