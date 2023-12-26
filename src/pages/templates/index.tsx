import { setTemplates } from "@/store/templates";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TemplateCards } from "./_components/templates-cards";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/services";
import { useUserHeaders } from "@/hooks";
import { Icon } from "@/components/ui/icon";

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
    <div className="bg-background-dark flex flex-col h-screen w-full">
      <div className="h-[53px] w-full">
        <div className="bg-component-pageHeader fixed gap-y-2 h-fit px-4 top-0 w-full z-20">
          <h2 className="flex flex-row gap-x-2 h-[53px] items-center place-content-between text-typography-embedded-dark w-full">
            <div className="flex flex-row gap-x-4 items-center">
              <ArrowLeft className="text-icon" onClick={handleGoBack} />
              <p className="font-semibold text-typography-embedded-dark text-lg">
                Templates
              </p>
            </div>
          </h2>
        </div>
      </div>

      <TemplateCards />

      <Icon className="bg-component-button bottom-6 right-6 fixed">
        <Plus
          className="text-icon"
          onClick={() => {
            navigate(`/templates/create`);
          }}
        />
      </Icon>
    </div>
  );
}
