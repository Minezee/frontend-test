export interface InputParams {
  value?: string;
  type?: string;
  placeholder: string;
  label?: string;
  onChange: (value: string) => void;
}