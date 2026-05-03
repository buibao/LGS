"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LeadStatus, SourceType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { LeadStatusBadge, SourceTypeBadge } from "@/components/ui/entity-badges";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section-card";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { leadStatusLabels, sourceTypeLabels } from "@/types";

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
        header: "Name",
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
        header: "Source",
        cell: ({ row }) => <SourceTypeBadge sourceType={row.original.sourceType} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <LeadStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "serviceInterest",
        header: "Interest",
        cell: ({ row }) => (
          <span className={row.original.serviceInterest || row.original.campaignName ? "text-slate-700" : "text-slate-400"}>
            {row.original.serviceInterest ?? row.original.campaignName ?? "General inquiry"}
          </span>
        ),
      },
      {
        accessorKey: "followUpAt",
        header: "Follow-up date",
        cell: ({ row }) => (
          <span className={row.original.followUpAt ? "text-slate-700" : "text-slate-400"}>
            {row.original.followUpAt ? formatDate(row.original.followUpAt) : "Not set"}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <SectionCard
      title="Lead workspace"
      description="Search, filter, and open lead records quickly so staff can take action without losing context."
      className="overflow-hidden"
      contentClassName="p-0"
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("ALL");
              setSourceFilter("ALL");
              setDateRange("ALL");
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset filters
          </Button>
          <Link href="/leads/new">
            <Button size="sm">Add Lead</Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-4 border-b border-[var(--border)]/70 px-6 py-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {filteredData.length} of {rows.length} leads visible
            </p>
          </div>
          <p className="text-sm text-slate-500">Open any row to review contact details, follow-up timing, and notes.</p>
        </div>

        <div className="grid gap-3 rounded-[24px] border bg-[var(--secondary)]/35 p-4 md:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <label className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9" placeholder="Search name, phone, email, interest" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="ALL">All statuses</option>
            {Object.entries(leadStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <Select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
            <option value="ALL">All sources</option>
            {Object.entries(sourceTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <Select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>
              <option value="ALL">All dates</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </Select>
          </div>
        </div>
      </div>

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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-14 text-center text-sm text-[var(--muted-foreground)]">
                No leads match your current filters. Reset the filters or add a new lead.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </SectionCard>
  );
}
