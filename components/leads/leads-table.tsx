"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LeadStatus, SourceType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
};

function statusVariant(status: LeadStatus) {
  if (status === LeadStatus.BOOKED) return "success";
  if (status === LeadStatus.NEW || status === LeadStatus.INTERESTED) return "warning";
  if (status === LeadStatus.LOST || status === LeadStatus.NO_RESPONSE) return "danger";
  return "info";
}

export function LeadsTable({ rows }: { rows: LeadRow[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [dateRange, setDateRange] = useState("ALL");

  const filteredData = useMemo(() => {
    const now = new Date();
    return rows.filter((row) => {
      const haystack = `${row.fullName} ${row.phone} ${row.email ?? ""}`.toLowerCase();
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
        header: "Lead",
        cell: ({ row }) => (
          <div>
            <Link href={`/leads/${row.original.id}`} className="font-medium text-slate-900">
              {row.original.fullName}
            </Link>
            <div className="text-xs text-slate-500">{row.original.phone}</div>
          </div>
        ),
      },
      {
        accessorKey: "sourceType",
        header: "Source",
        cell: ({ row }) => sourceTypeLabels[row.original.sourceType],
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge variant={statusVariant(row.original.status)}>{leadStatusLabels[row.original.status]}</Badge>,
      },
      {
        accessorKey: "campaignName",
        header: "Campaign",
        cell: ({ row }) => row.original.campaignName ?? "Unassigned",
      },
      {
        accessorKey: "followUpAt",
        header: "Follow-up",
        cell: ({ row }) => (row.original.followUpAt ? formatDate(row.original.followUpAt) : "Not set"),
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
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
        <Input placeholder="Search name, phone, email" value={search} onChange={(event) => setSearch(event.target.value)} />
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
        <Select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>
          <option value="ALL">All dates</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </Select>
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
              <TableCell colSpan={columns.length} className="py-12 text-center text-sm text-[var(--muted-foreground)]">
                No leads match your current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <Link href="/leads/new">
          <Button>Add Lead</Button>
        </Link>
      </div>
    </div>
  );
}
