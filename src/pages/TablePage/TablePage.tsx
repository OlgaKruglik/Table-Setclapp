import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ActionsCell } from "@/features/table-actions/ui/ActionsCell";
import { useTranslation } from "@/shared/i18n/index";
import { RowType } from "@/entities/row/model/types";
import { useState } from "react";

export const TablePage = () => {
  const [rows, setRows] = useState<RowType[]>([]);
  const { t } = useTranslation();

  const columns: ColumnsType<RowType> = [
    {
      title: t("table.name"),
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("table.date"),
      dataIndex: "date",
      sorter: (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: t("table.value"),
      dataIndex: "value",
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: t("table.actions"),
      render: (_, record) => (
        <ActionsCell
          record={record}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={rows}
    />
  );
};
