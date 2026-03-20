import { Button, Space } from "antd";

export const ActionsCell = ({ record, onEdit, onDelete }: any) => {
  return (
    <Space>
      <Button onClick={() => onEdit(record)}>✏️</Button>
      <Button danger onClick={() => onDelete(record.id)}>
        🗑
      </Button>
    </Space>
  );
};
