import { Modal, Form, Input, DatePicker, InputNumber } from "antd";

export const RowFormModal = ({ open, onClose, onSubmit }: any) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();

    onSubmit({
      id: Date.now().toString(),
      ...values,
      date: values.date.toISOString(),
    });

    onClose();
    form.resetFields();
  };

  return (
    <Modal open={open} onOk={handleOk} onCancel={onClose}>
      <Form form={form}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Имя" />
        </Form.Item>

        <Form.Item name="date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="value" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
