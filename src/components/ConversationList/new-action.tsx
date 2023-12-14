import {
  BookTemplate,
  Building2,
  LogOut,
  MessageSquarePlus,
  Plus,
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

      <Icon onClick={() => setOpen((prev) => !prev)} className="bg-green-600">
        <Plus />
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
        className="bg-red-500"
      >
        <LogOut aria-label="Templates" />
      </Icon>
      {/* Profile */}
      <Icon
        onClick={() => {
          navigate("/usuario");
        }}
        className="bg-green-500"
      >
        <User aria-label="Templates" />
      </Icon>
      {/* Company */}
      <Icon
        onClick={() => {
          navigate("/empresa");
        }}
        className="bg-green-500"
      >
        <Building2 aria-label="Templates" />
      </Icon>
      {/* Template */}
      <Icon
        onClick={() => {
          navigate("/templates");
        }}
        className="bg-green-500"
      >
        <BookTemplate aria-label="Templates" />
      </Icon>
      {/* New Conversation */}
      <NewConversation />
    </>
  );
};
