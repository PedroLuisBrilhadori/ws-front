import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type ActionsProps<Type> = {
  row: Type;
  children?: React.ReactNode;
  open: boolean;
  handleOpen: () => any;
};

export const ActionsRow = <Type,>({
  row,
  children,
  open,
  handleOpen,
}: ActionsProps<Type>) => {
  const isEmpty = !children;

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button onClick={handleOpen} variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir opções</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isEmpty && <DropdownMenuItem>sem ações...</DropdownMenuItem>}

        {!isEmpty && (
          <div>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            {children}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
