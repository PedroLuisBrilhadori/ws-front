import { ArrowLeft } from "lucide-react";
import {
  BaseForm,
  CreateMetaAccountButton,
  RestrictedForms,
} from "./_components";
import { useUserHeaders } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Index() {
  const { user } = useUserHeaders();

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  if (!user) return;

  return (
    <div className="bg-background flex flex-col h-screen w-full">
      <div className="h-[53px] w-full">
        <div className="fixed gap-y-2 h-fit px-4 top-0 w-full z-20 shadow-lg shadow-background">
          <h2 className="flex flex-row gap-x-2 h-[53px] items-center place-content-between w-full">
            <div className="flex flex-row gap-x-4 items-center">
              <ArrowLeft
                className="hover:cursor-pointer text-foreground"
                onClick={handleGoBack}
              />
              <p className="font-semibold text-foreground text-lg">Empresa</p>
            </div>
          </h2>
        </div>
      </div>

      <ScrollArea className="flex h-[calc(100vh-53px)] w-full">
        <div className="flex flex-col items-center px-4 gap-y-2 h-full pt-4 pb-24 w-full">
          <BaseForm />
          <RestrictedForms />
        </div>
      </ScrollArea>
      <CreateMetaAccountButton />
    </div>
  );
}
