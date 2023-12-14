import { DataTable } from "@/components/table";
import { columns } from "./columns";
import { useSelector } from "react-redux";
import { selectMedia } from "@/store/media";

export const GaleryTable = () => {
  const media = useSelector(selectMedia);

  return (
    <DataTable
      data={media}
      columns={columns(true)}
      paginator={true}
    ></DataTable>
  );
};
