import { useCurrentConversation } from "@/hooks/conversa";
import { telephoneMask } from "@/lib/telephone";
import { PhotosGalery } from "./_components/galery";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { current } = useCurrentConversation();
  const navigate = useNavigate();

  const contactName = current
    ? `${current.name} - ${telephoneMask(current.to)}`
    : null;

  return (
    <div className="flex flex-col gap-3 items-center justify-between w-full">
      <div className="flex justify-between items-center bg-[#202c33] w-full h-14 px-4">
        <ArrowLeft
          className="cursor-pointer text-white"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      <h1>Perfil de: {contactName}</h1>

      <PhotosGalery />
    </div>
  );
};

export default Perfil;
