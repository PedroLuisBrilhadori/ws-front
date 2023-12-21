import { ArrowLeft } from "lucide-react";
import { BaseForm, RestrictedForms } from "./_components";
import { useUserHeaders } from "@/hooks";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { user } = useUserHeaders();

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  if (!user) return;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[53px] text-gray-300 w-full">
        <div className="bg-[#111b21] fixed gap-y-2 h-fit px-4 top-0 w-full z-20">
          <h2 className="flex flex-row gap-x-2 min-h-[53px] items-center place-content-between text-[#AEBAC1] w-full">
            <div className="flex flex-row gap-x-4 items-center">
              <ArrowLeft onClick={handleGoBack} />
              <p className="font-semibold text-gray-300 text-lg">Empresa</p>
            </div>
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 h-[calc(100vh-53px)] overflow-y-auto p-4 pb-20 w-full">
        <BaseForm />
        <RestrictedForms />
      </div>
    </div>
  );
}
