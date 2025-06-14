"use client";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "../hooks/useApi";
import type { Column } from "../components/table/Table";
import Filters, { type Category } from "../components/table/Filters";
import Table from "../components/table/Table";
import Pagination from "../components/table/Pagination";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Loading from "../components/Loading";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  thumbnail?: string;
  tags?: string[];
}

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const Products = () => {
  const [skip, setSkip] = useState(0);
  const limit = 8;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState("");
  const loading = useSelector((state: RootState) => state.loading.isLoading);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setSkip(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // fetch categories
  const { data: categories } = useApi<Category[]>(
    `${baseUrl}/products/categories`
  );

  // build URL for filtered data
  const apiUrl = useMemo(() => {
    if (debouncedSearch) {
      return `${baseUrl}/products/search?q=${debouncedSearch}&limit=${limit}&skip=${skip}`;
    }
    if (category) {
      return `${baseUrl}/products/category/${category}?limit=${limit}&skip=${skip}`;
    }
    return `${baseUrl}/products?limit=${limit}&skip=${skip}`;
  }, [baseUrl, debouncedSearch, category, limit, skip]);

  const { data: apiResponse, error } = useApi<ApiResponse>(apiUrl);

  const products = apiResponse?.products || [];

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSkip(0);
  };

  // pagination info
  const paginationInfo = apiResponse
    ? {
        skip: apiResponse.skip,
        limit: apiResponse.limit,
        total: apiResponse.total,
        hasNext: apiResponse.skip + apiResponse.limit < apiResponse.total,
        hasPrevious: apiResponse.skip > 0,
      }
    : {
        skip: 0,
        limit: 9,
        total: 0,
        hasNext: false,
        hasPrevious: false,
      };

  const columns: Column[] = [
    {
      key: "thumbnail_title",
      label: "Product",
      render: (row) => (
        <div className="flex items-center gap-4">
          <img
            src={row.thumbnail}
            alt={row.title}
            className="w-12 h-12 object-cover rounded"
          />
          <span className="font-medium">{row.title}</span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "sku",
      label: "SKU",
    },
    {
      key: "tags",
      label: "Tags",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.tags && row.tags.length > 0 ? (
            row.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold shadow capitalize"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No tags</span>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock",
    },
    {
      key: "price",
      label: "Price",
      render: (row) => <span>${row.price}</span>,
    },
  ];

  if (loading) return <Loading />;

  return (
    <section className="container px-4 mx-auto h-full">
      <div className="pt-6">
        <h1 className="text-xl font-semibold">Product List</h1>
      </div>
      <Filters
        search={search}
        onSearchChange={setSearch}
        category={category}
        categories={categories || []}
        onCategoryChange={(val) => {
          setCategory(val);
          setSkip(0);
        }}
        onClear={clearFilters}
        isFilterApplied={search.trim() !== "" || category !== ""}
      />
      {error ? (
        <p className="text-center text-red-500">Failed to load products.</p>
      ) : (
        <>
          <Table columns={columns} data={products} />
          <Pagination
            skip={paginationInfo.skip}
            limit={paginationInfo.limit}
            total={paginationInfo.total}
            onSkipChange={setSkip}
            hasNext={paginationInfo.hasNext}
            hasPrevious={paginationInfo.hasPrevious}
          />
        </>
      )}
    </section>
  );
};

export default Products;
