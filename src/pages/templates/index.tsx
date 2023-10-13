import { setTemplates } from "@/store/templates";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TemplateCards } from "./_components/templates-cards";

export default function Template() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/templates").then(async (data) => {
      const templates = await data.json();

      dispatch(setTemplates(templates));
    });
  }, []);

  return <TemplateCards />;
}
