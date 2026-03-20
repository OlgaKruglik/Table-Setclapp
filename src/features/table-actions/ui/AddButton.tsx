import { Button } from "antd";
import { useTranslation } from "@/shared/i18n/index";

type Props = {
  onClick: () => void;
};

export const AddButton = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <Button type="primary" onClick={onClick}>
      {t("buttons.add")}
    </Button>
  );
};
