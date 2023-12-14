import { GaleryTable } from "../table-galery";

export const PhotosGalery = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold">Midías da conversa: </h2>

      <GaleryTable />
    </div>
  );
};
