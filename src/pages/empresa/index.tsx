import { ArrowLeft, Building2, FileCheck } from "lucide-react";
import { useUserHeaders } from "@/hooks";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { user } = useUserHeaders();

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  if (!user) return;

  console.log(user);

  return (
    <div className="w-full h-full text-[#AEBAC1] ">
      <div className="h-fit w-full gap-y-2 px-4 bg-[#111b21]">
        <h2 className="min-h-[53px] w-full flex flex-row items-center gap-x-2 place-content-between text-[#AEBAC1]">
          <div className="flex flex-row gap-x-4 items-center ">
            <ArrowLeft onClick={handleGoBack} />{" "}
            <p className="font-semibold text-lg text-gray-300">Empresa</p>
          </div>
        </h2>
      </div>

      <div className="flex flex-col w-full pt-10 gap-y-4">
        <div className="flex flex-col w-[150px] mx-auto gap-y-2">
          <p>Sua empresa</p>
          <div className="flex flex-row w-full gap-x-4">
            <Building2 style={{ height: 20 }} />
            <p>{user.company?.name.split(" ")[0]}</p>
          </div>
        </div>

        <div className="flex flex-col w-[150px] mx-auto gap-y-2">
          <p>CNPJ</p>
          <div className="flex flex-row w-full gap-x-4">
            <FileCheck style={{ height: 20 }} />
            <p>{user.company?.cnpj}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
