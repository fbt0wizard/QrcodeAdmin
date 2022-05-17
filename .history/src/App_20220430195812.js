import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Pages/login/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Loader from "./components/loader/Loader";
import { func } from "./functions";
import { useDispatch } from "react-redux";
import { get } from "./functions/apiCalls";
import { CssBaseline } from "@mui/material";
import ProtectedRoutes from "./ProtectedRoutes";
import Reroute from "./Reroute";
function App() {
  const theme = createTheme();

  const dispatch = useDispatch();
  const [processing, setProcessig] = useState(true);

  // run :: before page render
  useEffect(() => {
    const data = func.getStorageJson("user");
    const checkCondition = Object.keys(data).length === 0;
    if (!checkCondition) {
      get(`users/${data.uuid}`).then((res) => {
        if (res.status === 200) {
          func.setUserInfoToStore(res.data, dispatch);
          setProcessig(false);
        } else if (res.status === 404) {
          setProcessig(false);
        } else {
          setProcessig(false);
        }
      });
    } else {
      setProcessig(false);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {processing ? (
        <Loader />
      ) : (
        <HashRouter>
          <div className="app">
            <Routes>
              <Route element={<Reroute />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/*" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </HashRouter>
      )}
    </ThemeProvider>
  );
}

export default App;
