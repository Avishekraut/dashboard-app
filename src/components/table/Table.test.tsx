import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table, { type Column } from "./Table";

//test cases
describe("Table Component", () => {
  const columns: Column[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  const data = [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" },
  ];

  test("renders column headers correctly", () => {
    render(<Table columns={columns} data={data} />);

    columns.forEach((col) => {
      expect(screen.getByText(col.label!)).toBeInTheDocument();
    });
  });

  test("renders all rows of data", () => {
    render(<Table columns={columns} data={data} />);

    data.forEach((row) => {
      expect(screen.getByText(String(row.id))).toBeInTheDocument();
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.email)).toBeInTheDocument();
    });
  });

  test("renders custom render function if provided", () => {
    const customColumns: Column[] = [
      {
        key: "custom",
        label: "Custom Render",
        render: (row) => (
          <span data-testid={`custom-${row.id}`}>{row.name.toUpperCase()}</span>
        ),
      },
    ];

    render(<Table columns={customColumns} data={data} />);
    data.forEach((row) => {
      expect(screen.getByTestId(`custom-${row.id}`)).toHaveTextContent(
        row.name.toUpperCase()
      );
    });
  });

  test("renders empty table if no data is provided", () => {
    render(<Table columns={columns} data={[]} />);
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
  });
});
