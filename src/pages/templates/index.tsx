import { setTemplates } from "@/store/templates";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TemplateCards } from "./_components/templates-cards";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/services";
import { useUserHeaders } from "@/hooks";
import { Icon } from "@/components/ui/icon";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Template() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { headers, user } = useUserHeaders();

  const handleGoBack = () => navigate("/");

  useEffect(() => {
    if (user.id)
      fetch(`${baseUrl}/templates`, { headers }).then(async (data) => {
        const templates = await data.json();

        dispatch(setTemplates(templates));
      });
  }, [user]);

  return (
    <div className="bg-background flex flex-col h-screen w-full">
      <div className="h-[53px] w-full">
        <div className="fixed h-fit px-4 top-0 w-full z-20 shadow-lg shadow-background">
          <h2 className="flex flex-row gap-x-2 h-[53px] items-center place-content-between w-full">
            <div className="flex flex-row gap-x-4 items-center">
              <ArrowLeft
                className="text-foreground hover:cursor-pointer"
                onClick={handleGoBack}
              />
              <p className="font-semibold text-foreground text-lg">Templates</p>
            </div>
          </h2>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-53px)]">
        <TemplateCards />
      </ScrollArea>

      <Icon className="bg-primary bottom-6 right-6 fixed">
        <Plus
          className="text-primary-foreground"
          onClick={() => {
            navigate(`/templates/create`);
          }}
        />
      </Icon>
    </div>
  );
}
