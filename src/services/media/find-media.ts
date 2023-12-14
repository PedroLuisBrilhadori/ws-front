import { Media } from "@/models";
import { BaseServiceOptions, baseUrl } from "../api";

export class FindMediaOptions extends BaseServiceOptions {
  conversationId: string;
}

export const findMedia = async ({
  headers,
  conversationId,
}: FindMediaOptions): Promise<Media[]> => {
  const response = await fetch(`${baseUrl}/medias/${conversationId}`, {
    headers,
  });

  if (response.status !== 200) {
    throw new Error("Error ao buscar mídias da conversa");
  }

  return response.json();
};
