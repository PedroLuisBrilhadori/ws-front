import { AlertTriangle, Check, CheckCheck, Clock } from "lucide-react";

export const StatusMessage = ({
  status,
  me,
}: {
  status: string;
  me?: boolean;
}) => {
  const props = { className: `w-[14px]` };

  if (!me) return null;

  if (status === "sent") return <Check {...props} />;

  if (status === "delivered") return <CheckCheck {...props} />;

  if (status === "recived") return null;

  if (status === "read")
    return <CheckCheck className={`${props.className} text-blue-600`} />;

  if (status === "fail") return <AlertTriangle {...props} />;

  return <Clock {...props} />;
};
