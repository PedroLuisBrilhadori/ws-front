import { setTemplates } from "@/store/templates";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TemplateCards } from "./_components/templates-cards";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/services";

export default function Template() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/templates`).then(async (data) => {
      const templates = await data.json();

      dispatch(setTemplates(templates));
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-[#202c33] w-full h-14 px-4">
        <ArrowLeft
          className="cursor-pointer text-white"
          onClick={() => {
            navigate(`/`);
          }}
        />

        <Plus
          className="cursor-pointer text-white"
          onClick={() => {
            navigate(`/templates/create`);
          }}
        />
      </div>

      <TemplateCards />
    </div>
  );
}
