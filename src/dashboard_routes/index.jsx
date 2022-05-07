import { Route, Routes } from "react-router-dom";
import QrcodeScreen from "./screens/qr_code_screen/QrcodeScreen";
import ProductControler from "./screens/products";
import UsersControler from "./screens/users";
import SettingsControler from "./screens/settings";
import TransferControler from "./screens/transfer";
import Main from "./screens/main/Main";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/users/*" element={<UsersControler />} />
        <Route path="/products/*" element={<ProductControler />} />
        <Route path="/qrcode/*" element={<QrcodeScreen />} />
        <Route path="/settings/*" element={<SettingsControler />} />
        <Route path="/transfer/*" element={<TransferControler />} />
      </Routes>
    </>
  );
};

export default Index;
