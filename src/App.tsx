import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Products" element={<Products />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
