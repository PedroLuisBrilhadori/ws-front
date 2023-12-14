import { useCurrentConversation } from "@/hooks/conversa";
import { telephoneMask } from "@/lib/telephone";
import { PhotosGalery } from "./_components/galery";

const Perfil = () => {
  const { current } = useCurrentConversation();

  const contactName = current
    ? `${current.name} - ${telephoneMask(current.to)}`
    : null;

  return (
    <div>
      <h1>Perfil de: {contactName}</h1>

      <PhotosGalery />
    </div>
  );
};

export default Perfil;
