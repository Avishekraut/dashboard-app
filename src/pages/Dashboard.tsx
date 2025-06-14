import { useApi } from "../hooks/useApi";
import Table from "../components/table/Table";
import { Users, PackageCheck, DollarSign } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Loading from "../components/Loading";

interface ApiResponse {
  users: any[];
  total: number;
  skip: number;
  limit: number;
}

const Dashboard = () => {
  const loading = useSelector((state: RootState) => state.loading.isLoading);

  const { data: apiResponse, error } = useApi<ApiResponse>(
    `${import.meta.env.VITE_BASE_URL}/users?limit=14`
  );

  const users = apiResponse?.users || [];

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: {
      city?: string;
    };
  }

  interface Column<T> {
    key: string;
    label: string;
    render?: (row: T) => React.ReactNode;
  }

  const columns: Column<User>[] = [
    { key: "id", label: "ID" },
    {
      key: "firstName",
      label: "First Name",
      render: (row: User) => (
        <div className="font-medium">
          {row.firstName} {row.lastName}
        </div>
      ),
    },

    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "address",
      label: "Location",
      render: (row) => `${row.address?.city ?? ""}`,
    },
  ];

  if (loading) return <Loading />;

  return (
    <section className="container px-4 mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-xl font-semibold text-primary">
              {apiResponse?.total ?? 0}
            </p>
          </div>
          <Users className="w-6 h-6 text-primary" />
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Total Orders</h2>
            <p className="text-xl font-semibold text-primary">523</p>
          </div>
          <PackageCheck className="w-6 h-6 text-primary" />
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Revenue</h2>
            <p className="text-xl font-semibold text-primary">$8,320</p>
          </div>
          <DollarSign className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
        {error ? (
          <p className="text-red-500">Failed to load users</p>
        ) : (
          <Table columns={columns} data={users} />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
