"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { RotateCcw, Search, SlidersHorizontal, Users } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LeadStatus, SourceType } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { EmptyState } from "@/components/design-system/empty-state";
import { Button } from "@/components/ui/button";
import { LeadStatusBadge, SourceTypeBadge } from "@/components/ui/entity-badges";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section-card";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { leadStatusValues, sourceTypeValues } from "@/types";

type LeadRow = {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  sourceType: SourceType;
  status: LeadStatus;
  followUpAt: string | null;
  createdAt: string;
  campaignName: string | null;
  serviceInterest: string | null;
};

export function LeadsTable({ rows }: { rows: LeadRow[] }) {
  const tActions = useTranslations("Actions");
  const tFilters = useTranslations("Filters");
  const tLabels = useTranslations("Labels");
  const tLeadTable = useTranslations("LeadTable");
  const tEmpty = useTranslations("EmptyStates");
  const tStatus = useTranslations("LeadStatus");
  const tSource = useTranslations("LeadSource");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [dateRange, setDateRange] = useState("ALL");

  const filteredData = useMemo(() => {
    const now = new Date();
    return rows.filter((row) => {
      const haystack = `${row.fullName} ${row.phone} ${row.email ?? ""} ${row.serviceInterest ?? ""}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || row.status === statusFilter;
      const matchesSource = sourceFilter === "ALL" || row.sourceType === sourceFilter;

      const createdAt = new Date(row.createdAt);
      const matchesDate =
        dateRange === "ALL" ||
        (dateRange === "7" && now.getTime() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000) ||
        (dateRange === "30" && now.getTime() - createdAt.getTime() <= 30 * 24 * 60 * 60 * 1000);

      return matchesSearch && matchesStatus && matchesSource && matchesDate;
    });
  }, [dateRange, rows, search, sourceFilter, statusFilter]);

  const columns = useMemo<ColumnDef<LeadRow>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: tLabels("name"),
        cell: ({ row }) => (
          <div className="space-y-1">
            <Link href={`/leads/${row.original.id}`} className="font-medium text-slate-900 hover:text-[var(--primary)]">
              {row.original.fullName}
            </Link>
            <div className="text-xs text-slate-500">{row.original.phone}</div>
            {row.original.email ? <div className="text-xs text-slate-400">{row.original.email}</div> : null}
          </div>
        ),
      },
      {
        accessorKey: "sourceType",
        header: tLabels("source"),
        cell: ({ row }) => <SourceTypeBadge sourceType={row.original.sourceType} />,
      },
      {
        accessorKey: "status",
        header: tLabels("status"),
        cell: ({ row }) => <LeadStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "serviceInterest",
        header: tLabels("interest"),
        cell: ({ row }) => (
          <span className={row.original.serviceInterest || row.original.campaignName ? "text-slate-700" : "text-slate-400"}>
            {row.original.serviceInterest ?? row.original.campaignName ?? tLeadTable("generalInquiry")}
          </span>
        ),
      },
      {
        accessorKey: "followUpAt",
        header: tLeadTable("followUpDate"),
        cell: ({ row }) => (
          <span className={row.original.followUpAt ? "text-slate-700" : "text-slate-400"}>
            {row.original.followUpAt ? formatDate(row.original.followUpAt) : tLeadTable("notSet")}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: tLabels("created"),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
    ],
    [tLabels, tLeadTable],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setSourceFilter("ALL");
    setDateRange("ALL");
  };

  return (
    <SectionCard
      title={tLeadTable("workspaceTitle")}
      description={tLeadTable("workspaceDescription")}
      className="overflow-hidden"
      contentClassName="p-0"
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm" type="button" onClick={resetFilters}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {tActions("clearFilters")}
          </Button>
          <Link href="/leads/new">
            <Button size="sm">{tActions("addLead")}</Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-4 border-b border-[var(--border)]/70 px-6 py-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {tLeadTable("resultsSummary", { visible: filteredData.length, total: rows.length })}
            </p>
          </div>
          <p className="text-sm text-slate-500">{tLeadTable("reviewHint")}</p>
        </div>

        <div className="grid gap-3 rounded-[24px] border bg-[var(--secondary)]/35 p-4 md:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <label className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder={tLeadTable("searchPlaceholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="ALL">{tFilters("allStatuses")}</option>
            {leadStatusValues.map((value) => (
              <option key={value} value={value}>
                {tStatus(value)}
              </option>
            ))}
          </Select>
          <Select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
            <option value="ALL">{tFilters("allSources")}</option>
            {sourceTypeValues.map((value) => (
              <option key={value} value={value}>
                {tSource(value)}
              </option>
            ))}
          </Select>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <Select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>
              <option value="ALL">{tFilters("allDates")}</option>
              <option value="7">{tLeadTable("last7Days")}</option>
              <option value="30">{tLeadTable("last30Days")}</option>
            </Select>
          </div>
        </div>
      </div>

      {table.getRowModel().rows.length ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="px-6 py-8">
          <EmptyState
            icon={Users}
            title={tEmpty("noFilteredLeadsTitle")}
            description={tEmpty("noFilteredLeadsDescription")}
            action={
              <Button variant="outline" type="button" onClick={resetFilters}>
                {tActions("clearFilters")}
              </Button>
            }
          />
        </div>
      )}
    </SectionCard>
  );
}
