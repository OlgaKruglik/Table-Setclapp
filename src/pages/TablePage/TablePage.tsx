import { Table, Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Filters } from "@/entities/row/ui/Filters";
import { useTranslation } from "@/shared/i18n";
import { RowType } from "@/entities/row/model/types";
import { useState, useEffect } from "react";
import { RowFormModal } from "@/entities/row/ui/RowFormModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const TablePage = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<RowType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRow, setEditingRow] = useState<RowType | undefined>(undefined);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    date: null as string | null,
  });

  useEffect(() => {
    const savedRows = localStorage.getItem("tableRows");
    if (savedRows) {
      try {
        const parsed = JSON.parse(savedRows);
        if (Array.isArray(parsed)) {
          setRows(parsed);
        } else {
          setRows([]);
        }
      } catch (e) {
        console.error("Ошибка парсинга localStorage:", e);
        setRows([]);
      }
    } else {
      setRows([]); 
    }
  }, []);

  const handleAdd = () => {
    setEditingRow(undefined);
    setModalVisible(true);
  };

  const handleEdit = (row: RowType) => {
    setEditingRow(row);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const newRows = rows.filter(r => r.id !== id);
    setRows(newRows);
    localStorage.setItem("tableRows", JSON.stringify(newRows));
  };

  const handleSave = (row: RowType) => {
    setRows(prev => {
      const index = prev.findIndex(r => r.id === row.id);
      const newRows: RowType[] = index !== -1 ? [...prev] : [...prev, row];
      if (index !== -1) newRows[index] = row;

      localStorage.setItem("tableRows", JSON.stringify(newRows));
      return newRows;
    });
    setModalVisible(false);
  };

  const columns: ColumnsType<RowType> = [
    { title: t("table.name"), dataIndex: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: t("table.surname"), dataIndex: "surname", sorter: (a, b) => a.surname.localeCompare(b.surname) },
    { title: t("table.date"), dataIndex: "date", sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() },
    { title: t("table.value"), dataIndex: "value", sorter: (a, b) => a.value - b.value },
    { title: t("table.city"), dataIndex: "city", sorter: (a, b) => a.city.localeCompare(b.city) },
    {
      title: t("table.actions"),
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];
  const filteredRows = rows.filter((row) => {
    const matchName =
      !filters.name ||
      row.name.toLowerCase().includes(filters.name.toLowerCase());

    const matchCity =
      !filters.city ||
      row.city.toLowerCase().includes(filters.city.toLowerCase());

    const matchDate =
      !filters.date || row.date === filters.date;

    return matchName && matchCity && matchDate;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          {t("buttons.add")}
        </Button>
        <Filters filters={filters} onChange={setFilters} />
      </div>

      <Table rowKey="id" columns={columns} dataSource={filteredRows} />

      <RowFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSave={handleSave}
        initialValues={editingRow}
      />
    </div>
  );
};
