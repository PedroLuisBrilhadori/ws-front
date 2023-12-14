import { useCurrentConversation } from "@/hooks/conversa";
import { telephoneMask } from "@/lib/telephone";

const Perfil = () => {
  const { current } = useCurrentConversation();

  const contactName = current
    ? `${current.name} - ${telephoneMask(current.to)}`
    : null;

  return (
    <div>
      <h1>Perfil de: {contactName}</h1>

      <h2>Fotos e videos</h2>
    </div>
  );
};

export default Perfil;
