import { TablePage } from "@/pages/TablePage/TablePage";
import { Button, Space } from "antd";
import { useTranslation } from "@/shared/i18n/index";

function App() {
const { changeLang } = useTranslation();

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20, gap: 8 }}>
        <Button onClick={() => changeLang("ru")}>🇷🇺 RU</Button>
        <Button onClick={() => changeLang("en")}>🇬🇧 EN</Button>
      </Space>

      <TablePage />
    </div>
  );
}

export default App
