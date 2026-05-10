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
import { useRouter } from "@/i18n/navigation";
import { EmptyState } from "@/components/design-system/empty-state";
import { OverflowTooltip } from "@/components/design-system/overflow-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
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

function getStatusTextClass(status: LeadStatus) {
  switch (status) {
    case LeadStatus.BOOKED:
      return "text-emerald-700";
    case LeadStatus.NEW:
      return "text-teal-700";
    case LeadStatus.INTERESTED:
      return "text-amber-700";
    case LeadStatus.CONTACTED:
      return "text-cyan-700";
    case LeadStatus.NO_RESPONSE:
      return "text-orange-700";
    case LeadStatus.LOST:
      return "text-rose-700";
    default:
      return "text-slate-600";
  }
}

function getSourceTextClass(sourceType: SourceType) {
  switch (sourceType) {
    case SourceType.FACEBOOK:
      return "text-cyan-700";
    case SourceType.TIKTOK:
      return "text-rose-700";
    case SourceType.ORGANIC:
      return "text-emerald-700";
    case SourceType.REFERRAL:
      return "text-amber-700";
    case SourceType.WEBSITE:
      return "text-teal-700";
    case SourceType.MANUAL:
      return "text-slate-600";
    default:
      return "text-orange-700";
  }
}

export function LeadsTable({ rows }: { rows: LeadRow[] }) {
  const tActions = useTranslations("Actions");
  const tFilters = useTranslations("Filters");
  const tLabels = useTranslations("Labels");
  const tLeadTable = useTranslations("LeadTable");
  const tEmpty = useTranslations("EmptyStates");
  const tStatus = useTranslations("LeadStatus");
  const tSource = useTranslations("LeadSource");
  const router = useRouter();
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
          <div className="min-w-0 space-y-0.5">
            <OverflowTooltip content={row.original.fullName}>
              <Link href={`/leads/${row.original.id}`} className="block truncate font-medium text-slate-900 hover:text-[var(--primary)]">
                {row.original.fullName}
              </Link>
            </OverflowTooltip>
            <div className="text-[0.8rem] leading-5 text-slate-500">{row.original.phone}</div>
            {row.original.email ? (
              <OverflowTooltip content={row.original.email}>
                <div className="truncate text-[0.76rem] leading-5 text-slate-400">{row.original.email}</div>
              </OverflowTooltip>
            ) : null}
          </div>
        ),
      },
      {
        accessorKey: "sourceType",
        header: tLabels("source"),
        cell: ({ row }) => <span className={cn("text-sm font-medium", getSourceTextClass(row.original.sourceType))}>{tSource(row.original.sourceType)}</span>,
      },
      {
        accessorKey: "status",
        header: tLabels("status"),
        cell: ({ row }) => <span className={cn("text-sm font-medium", getStatusTextClass(row.original.status))}>{tStatus(row.original.status)}</span>,
      },
      {
        accessorKey: "serviceInterest",
        header: tLabels("interest"),
        cell: ({ row }) => (
          <span className={cn("block max-w-[20rem] break-words text-sm", row.original.serviceInterest || row.original.campaignName ? "text-slate-700" : "text-slate-400")}>
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
    [tLabels, tLeadTable, tSource, tStatus],
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
      className="overflow-hidden"
      contentClassName="p-0"
      action={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="outline" size="sm" type="button" onClick={resetFilters}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {tActions("clearFilters")}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 border-b border-[var(--border)]/70 px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {tLeadTable("resultsSummary", { visible: filteredData.length, total: rows.length })}
            </p>
          </div>
          <p className="text-sm text-slate-500">{tLeadTable("reviewHint")}</p>
        </div>

        <div className="grid gap-3 rounded-[24px] border border-border/70 bg-[var(--secondary)]/35 p-3 sm:p-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <label className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-9"
              placeholder={tLeadTable("searchPlaceholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder={tFilters("allStatuses")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{tFilters("allStatuses")}</SelectItem>
              {leadStatusValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {tStatus(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger>
              <SelectValue placeholder={tFilters("allSources")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{tFilters("allSources")}</SelectItem>
              {sourceTypeValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {tSource(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex min-w-0 items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder={tFilters("allDates")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">{tFilters("allDates")}</SelectItem>
                <SelectItem value="7">{tLeadTable("last7Days")}</SelectItem>
                <SelectItem value="30">{tLeadTable("last30Days")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {table.getRowModel().rows.length ? (
        <div>
          <div className="grid gap-3 p-4 sm:p-5 md:hidden">
            {table.getRowModel().rows.map((row) => (
              <button
                key={row.id}
                type="button"
                className="rounded-[24px] border border-border/70 bg-white p-4 text-left shadow-[0_16px_36px_-30px_rgba(15,23,42,0.18)] transition hover:bg-[var(--secondary)]/35"
                onClick={() => router.push(`/leads/${row.original.id}`)}
                aria-label={`${tLeadTable("openLead")} ${row.original.fullName}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <OverflowTooltip content={row.original.fullName}>
                      <p className="truncate text-base font-semibold text-slate-950">{row.original.fullName}</p>
                    </OverflowTooltip>
                    <p className="mt-1 text-sm text-slate-600">{row.original.phone}</p>
                    {row.original.email ? (
                      <OverflowTooltip content={row.original.email}>
                        <p className="truncate text-xs text-slate-400">{row.original.email}</p>
                      </OverflowTooltip>
                    ) : null}
                  </div>
                  <span className={cn("text-sm font-medium", getStatusTextClass(row.original.status))}>{tStatus(row.original.status)}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className={cn("font-medium", getSourceTextClass(row.original.sourceType))}>{tSource(row.original.sourceType)}</span>
                  <Badge variant="outline" size="sm" className="text-slate-600">
                    {row.original.followUpAt ? formatDate(row.original.followUpAt) : tLeadTable("notSet")}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <MobileField
                    label={tLabels("interest")}
                    value={row.original.serviceInterest ?? row.original.campaignName ?? tLeadTable("generalInquiry")}
                  />
                  <MobileField label={tLeadTable("followUpDate")} value={row.original.followUpAt ? formatDate(row.original.followUpAt) : tLeadTable("notSet")} />
                  <MobileField label={tLabels("created")} value={formatDate(row.original.createdAt)} />
                </div>
              </button>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
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
                  <TableRow
                    key={row.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/leads/${row.original.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        router.push(`/leads/${row.original.id}`);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`${tLeadTable("openLead")} ${row.original.fullName}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="px-4 py-8 sm:px-5 md:px-6">
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

function MobileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-[var(--secondary)]/35 p-3">
      <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}
