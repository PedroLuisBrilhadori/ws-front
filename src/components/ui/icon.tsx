import { ReactNode } from "react";

export type IconProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Icon = ({ children, className, onClick }: IconProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-14 h-14 rounded-full z-20 flex justify-center items-center text-white cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};
