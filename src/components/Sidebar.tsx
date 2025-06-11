import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      path: "/users",
    },
  ];

  return (
    <>
      {/* Mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg rounded-lg p-2 hover:bg-gray-50 transition-colors"
      >
        <Menu size={24} className="text-gray-600" />
      </button>

      <div
        className={`fixed h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-18" : "w-64"}
          lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white">
                  <Gauge size={16} />
                </div>
                <span className="font-semibold text-gray-900">Dashify</span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1 hover:bg-gray-100 rounded-md transition-colors ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight size={20} className="text-gray-500" />
            ) : (
              <ChevronLeft size={20} className="text-gray-500" />
            )}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <Icon size={20} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">AR</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Avishek Raut
                </p>
                <p className="text-xs text-gray-500 truncate">
                  avishekraut123@gmail.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
