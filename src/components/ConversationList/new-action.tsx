import {
  BookTemplate,
  Building2,
  LogOut,
  MessageSquarePlus,
  MoreHorizontal,
  User,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../ui/icon";
import { NewConversation } from "./new-conversation";
import { destroyCookie } from "nookies";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/user";

export const NewAction = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 absolute right-6 bottom-6">
      {open && <Actions />}

      <Icon
        onClick={() => setOpen((prev) => !prev)}
        className="bg-component-button"
      >
        <MoreHorizontal className="text-icon" />
      </Icon>
    </div>
  );
};

const Actions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    destroyCookie(undefined, "nextauth.whatsapp.token");

    dispatch(setUser(null));

    navigate("/login");
  };

  return (
    <>
      {/* Logout */}
      <Icon
        onClick={() => {
          logout();
        }}
        className="bg-destructive"
      >
        <LogOut aria-label="Templates" className="text-icon" />
      </Icon>
      {/* Profile */}
      <Icon
        onClick={() => {
          navigate("/usuario");
        }}
        className="bg-component-button"
      >
        <User aria-label="Templates" className="text-icon" />
      </Icon>
      {/* Company */}
      <Icon
        onClick={() => {
          navigate("/empresa");
        }}
        className="bg-component-button"
      >
        <Building2 aria-label="Templates" className="text-icon" />
      </Icon>
      {/* Template */}
      <Icon
        onClick={() => {
          navigate("/templates");
        }}
        className="bg-component-button"
      >
        <BookTemplate aria-label="Templates" className="text-icon" />
      </Icon>
      {/* New Conversation */}
      <NewConversation />
    </>
  );
};
