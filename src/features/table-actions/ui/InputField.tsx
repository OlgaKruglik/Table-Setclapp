import { Input } from "antd";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const InputField = ({ value, onChange, placeholder }: Props) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
