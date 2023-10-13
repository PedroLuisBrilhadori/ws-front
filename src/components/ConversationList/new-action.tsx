import { BookTemplate, Info, NewspaperIcon, Pencil, Plus } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    </>
  );
};

type IconProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Icon = ({ children, className, onClick }: IconProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-14 h-14 rounded-full z-20 flex justify-center items-center text-white cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};
