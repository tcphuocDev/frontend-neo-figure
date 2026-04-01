import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Filter,
} from 'lucide-react';
import TableSkeleton from './TableSkeleton';
import EmptyState from './EmptyState';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  searchable = true,
  filterable = false,
  onRowClick,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  onEmptyAction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const itemsPerPage = 10;

  // Search filter
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <TableSkeleton rows={5} columns={columns.length} />
      </div>
    );
  }

  return (
    <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 overflow-hidden">
      {/* Search and Filter Bar */}
      {(searchable || filterable) && (
        <div className="p-sm border-b border-border dark:border-gray-700 bg-background dark:bg-gray-900/30">
          <div className="flex items-center gap-sm">
            {searchable && (
              <div className="flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-sm py-xs border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white placeholder-text-secondary text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
            )}
            {filterable && (
              <button className="px-md py-sm border border-border dark:border-gray-600 rounded-lg hover:bg-primary-light dark:hover:bg-gray-700 transition-colors flex items-center gap-sm text-text-primary dark:text-gray-300 font-medium">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      {paginatedData.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          onAction={onEmptyAction}
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-border dark:border-gray-700 bg-background dark:bg-gray-900/50">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-md py-sm text-left text-small-text font-semibold text-text-secondary dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      <button
                        onClick={() =>
                          column.sortable && handleSort(column.key)
                        }
                        className="flex items-center gap-2 hover:text-text-primary dark:hover:text-white transition-colors"
                      >
                        {column.label}
                        {column.sortable &&
                          sortConfig.key === column.key &&
                          (sortConfig.direction === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-gray-800">
                {paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={() => onRowClick?.(row)}
                    className={`hover:bg-primary-light dark:hover:bg-gray-700/50 transition-all duration-200 ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-md py-sm text-body text-text-primary dark:text-gray-100 whitespace-nowrap"
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
              <div className="px-md py-sm border-t border-border dark:border-gray-700 bg-background dark:bg-gray-900/30 flex items-center justify-between">
                <div className="text-body text-text-secondary dark:text-gray-400 font-medium">
                Showing {startIndex + 1} to{' '}
                {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
                {sortedData.length} results
              </div>
              <div className="flex items-center gap-sm">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-xs rounded-lg border border-border dark:border-gray-600 hover:bg-primary-light hover:border-primary dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-text-primary dark:text-gray-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-xs">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`min-w-[40px] px-sm py-xs rounded-lg font-medium transition-all ${
                        currentPage === i + 1
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'hover:bg-primary-light dark:hover:bg-gray-700 text-text-secondary dark:text-gray-300 hover:text-primary'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-xs rounded-lg border border-border dark:border-gray-600 hover:bg-primary-light hover:border-primary dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-text-primary dark:text-gray-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DataTable;
