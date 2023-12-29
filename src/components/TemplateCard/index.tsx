import { Component, Template } from "@/models/template";
import { Check, Loader2, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type TemplateProps = {
  template: Template;
  className?: string;
};

export const TemplateCard = ({ template, className }: TemplateProps) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle> {template.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Components template={template} />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <span className="text-typography-embedded">{template.language}</span>
          <Status status={template.status} />
        </div>
      </CardFooter>
    </Card>
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

  if (component.type === "BODY") return <p>{component.text}</p>;

  if (component.type === "FOOTER")
    return <span className="italic text-xs">{component.text}</span>;

  return <div></div>;
};

const Status = ({ status }: { status: string }) => {
  if (status === "APPROVED") return <Check className="text-primary" />;

  if (status === "PENDING")
    return <Loader2 className="animate-spin text-card-foreground" />;

  if (status === "REJECTED") return <X className="text-destructive" />;

  return status;
};
