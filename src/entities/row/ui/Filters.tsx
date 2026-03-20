import { DatePicker } from "antd";
import dayjs from "dayjs";
import { InputField } from "@/features/table-actions/ui/InputField";
import { useTranslation } from "@/shared/i18n";

type FiltersType = {
  name: string;
  city: string;
  date: string | null;
};

type Props = {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
};

export const Filters = ({ filters, onChange }: Props) => {
  const { t } = useTranslation();

  const updateFilter = (key: keyof FiltersType, value: any) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <div style={{ flex: 1 }}>
        <InputField
          placeholder={t("table.name")}
          value={filters.name}
          onChange={(value) => updateFilter("name", value)}
        />
      </div>

      <div style={{ flex: 1 }}>
        <InputField
          placeholder={t("table.city")}
          value={filters.city}
          onChange={(value) => updateFilter("city", value)}
        />
      </div>

      <div style={{ flex: 1 }}>
        <DatePicker
          placeholder={t("table.date")}
          value={filters.date ? dayjs(filters.date) : null}
          onChange={(date) =>
            updateFilter("date", date ? date.format("YYYY-MM-DD") : null)
          }
          style={{ width: "100%" }} 
        />
      </div>
    </div>
  );
};
