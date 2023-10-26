import { BookTemplate, MessageSquarePlus, Plus } from "lucide-react";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/icon";
import { NewConversation } from "./new-conversation";

export const NewAction = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 absolute right-6 bottom-6">
      {open && <Actions />}

      <Icon onClick={() => setOpen((prev) => !prev)} className="bg-green-600">
        <Plus />
      </Icon>
    </div>
  );
};

const Actions = () => {
  const navigate = useNavigate();

  return (
    <>
      <Icon
        onClick={() => {
          navigate("/templates");
        }}
        className="bg-green-500"
      >
        <BookTemplate aria-label="Templates" />
      </Icon>
      <NewConversation />
    </>
  );
};
