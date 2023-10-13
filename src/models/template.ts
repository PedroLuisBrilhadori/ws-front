export type Component = {
  type: string;
  format?: string;
  text: string;
};

export type Template = {
  name: string;
  components: Component[];
  language: string;
  status: string;
  category: string;
  id: string;
};
