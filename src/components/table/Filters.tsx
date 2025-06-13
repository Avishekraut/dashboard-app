import { Search } from "lucide-react";

const Filters = () => {
  return (
    <div className="flex justify-between items-center gap-4 mt-4 mb-6">
      <div className="inline-flex bg-white border rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-700">
        <button className="px-4 py-2 text-sm dark:text-gray-300">All</button>
        <button className="px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Monitored</button>
        <button className="px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Unmonitored</button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
        />
      </div>
    </div>
  );
};

export default Filters;
