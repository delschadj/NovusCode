export type TFiles = {
  name: string;
  type: 'file' | 'directory';
  extension?: string;
  children?: TFiles[];
};
