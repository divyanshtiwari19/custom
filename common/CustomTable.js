import React, { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { mutate } from "swr";
import Link from "next/link";

const Export = ({ onExport }) => (
  <button
    className="bg-green-500 text-xs px-4 py-2 rounded-md font-semibold text-white hover:bg-green-600 duration-300"
    onClick={() => onExport()}
  >
    Export
  </button>
);

function CustomTable({
  columns,
  tableData,
  totalCount,
  setSorting,
  setPageNumber,
  setLimit,
  handleSearch,
  isLoading,
  exportAPIUrl,
  multipleDeleteAPIUrl,
  mutateUrl,
  multipleDeleteAPILabel,
  showExportBtn = false,
  showMultiselect = false,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPageNumber(1);
    setLimit(newPerPage);
  };

  const handleSort = async (column, sortDirection) => {
    if (column.sortField && sortDirection) {
      setSorting({
        sort: column.sortField,
        order: sortDirection === "asc" ? "ascending" : "descending",
      });
      setPageNumber(1);
    }
  };

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows.map((item) => item._id));
  };

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const contextActions = useMemo(() => {
    const handleDelete = async () => {
      if (window.confirm(`Are you sure you want to delete selected data`)) {
        try {
          const { data } = await axios.delete(multipleDeleteAPIUrl, {
            data: {
              [multipleDeleteAPILabel]: selectedRows,
            },
          });
          toast.success("Selected rows deleted successfully");
          mutate(mutateUrl);
          handleClearRows();
        } catch (err) {
          toast.error(err?.response?.data || "Something went wrong");
        }
      }
    };

    return (
      <button
        key="delete"
        className="bg-red-500 text-xs px-4 py-2 rounded-md font-semibold text-white hover:bg-red-600 duration-300"
        onClick={handleDelete}
        icon
      >
        Delete
      </button>
    );
  }, [tableData, selectedRows, toggledClearRows]);

  const actionsMemo = useMemo(
    () =>
      showExportBtn ? (
        <Export
          onExport={() => {
            toast.success("Data exported successfully");
          }}
        />
      ) : (
        <div></div>
      ),
    []
  );

  return (
    <>
      <div className="relative rounded-md bg-zinc-800 custom-table mt-24">
        <DataTable
          className="custom-table-content"
          title={
            <div className="flex bg-zinc-700 rounded-md w-full overflow-hidden cursor-pointer">
              <div className="px-3 py-2  flex items-center">
                <HiOutlineSearch className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="text-sm text-zinc-900 flex justify-between items-center w-full">
                <input
                  className="outline-none bg-zinc-700 w-full p-2 pl-0 text-white placeholder:text-zinc-400"
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          }
          progressPending={isLoading}
          progressComponent={
            <div className="flex justify-center items-center py-5">
              <div className="animate-spin text-green-500">
                <AiOutlineLoading3Quarters className="w-6 h-6" />
              </div>
            </div>
          }
          responsive
          pagination
          paginationServer
          columns={columns}
          data={tableData}
          paginationTotalRows={totalCount}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          onSort={handleSort}
          sortServer
          actions={actionsMemo}
          contextActions={contextActions}
          selectableRows={showMultiselect}
          onSelectedRowsChange={handleChange}
          clearSelectedRows={toggledClearRows}
        />
      </div>
    </>
  );
}

export default CustomTable;
