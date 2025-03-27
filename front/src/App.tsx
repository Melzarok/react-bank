import { BrowserRouter, Route, Routes } from "react-router-dom";

import WellcomePage from "./pages/welcomePage";
import SignupPage from "./pages/signup";
import SignInPage from "./pages/login";
import SignupConfirmPage from "./pages/signup-confirm/index";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRoute from "./container/AuthRoute";
import PrivateRoute from "./container/PrivateRoute";
import RecoveryPage from "./pages/recovery";
import RecoveryConfirmPage from "./pages/recovery-confirm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SignInPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          {/* <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/recive"
          element={
            <PrivateRoute>
              <RecivePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/send"
          element={
            <PrivateRoute>
              <SendPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction/:transactionId"
          element={
            <PrivateRoute>
              <TransactionPage />
            </PrivateRoute>
          }
        />  */}
          {/* <Route path="*" Component={Error} /> } */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
