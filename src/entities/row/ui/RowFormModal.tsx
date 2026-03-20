import { Modal, Form, Input, DatePicker, InputNumber } from "antd";
import { useTranslation } from "@/shared/i18n";
import { RowType } from "../model/types";
import dayjs from "dayjs";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSave: (row: RowType) => void;
  initialValues?: RowType;
};

const fields = [
  { name: "name", labelKey: "form.name", component: <Input /> },
  { name: "date", labelKey: "form.date", component: <DatePicker style={{ width: "100%" }} /> },
  { name: "value", labelKey: "form.value", component: <InputNumber style={{ width: "100%" }} /> },
  { name: "city", labelKey: "form.city", component: <Input /> },
];

export const RowFormModal = ({ visible, onCancel, onSave, initialValues }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(values => {
      onSave({
        id: initialValues?.id || Date.now().toString(),
        ...values,
        date: values.date.format("YYYY-MM-DD"),
      });
      form.resetFields();
    });
  };

  return (
    <Modal
      title={initialValues ? t("modal.editTitle") : t("modal.addTitle")}
      open={visible}
      onCancel={() => { form.resetFields(); onCancel(); }}
      onOk={handleSave}
      okText={t("buttons.save")}
      cancelText={t("buttons.cancel")}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          date: initialValues?.date ? dayjs(initialValues.date) : undefined,
        }}
      >
        {fields.map(f => (
          <Form.Item
            key={f.name}
            label={t(f.labelKey)}
            name={f.name}
            rules={[{ required: true, message: t("form.required") }]}
          >
            {f.component}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};
