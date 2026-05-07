"use client";

import { Candidat } from "@/types";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";

interface CandidatesTableProps {
  candidats: Candidat[];
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: string;
}

export default function CandidatesTable({
  candidats,
  onSort,
  sortField,
  sortDirection,
}: CandidatesTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field)
      return <span className="w-3 h-3 inline-block" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-3 h-3 inline" />
    ) : (
      <ChevronDown className="w-3 h-3 inline" />
    );
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
              <th
                onClick={() => onSort("Candidat")}
                className="text-left p-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  Candidat <SortIcon field="Candidat" />
                </div>
              </th>
              <th
                onClick={() => onSort("Filiere")}
                className="text-left p-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  Filière <SortIcon field="Filiere" />
                </div>
              </th>
              <th
                onClick={() => onSort("Etablissement")}
                className="text-left p-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  Établissement <SortIcon field="Etablissement" />
                </div>
              </th>
              <th className="text-left p-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Contact
              </th>
              <th
                onClick={() => onSort("Date de Debut")}
                className="text-left p-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  Période <SortIcon field="Date de Debut" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {candidats.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-zinc-500 dark:text-zinc-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p>Aucun candidat trouvé</p>
                  </div>
                </td>
              </tr>
            ) : (
              candidats.map((candidat) => (
                <tr
                  key={candidat.id}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-blue-50/50 dark:hover:bg-zinc-700/30 transition-colors"
                >
                  <td className="p-4">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {candidat.Candidat || "-"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {candidat.Filiere || "-"}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-300">
                    {candidat.Etablissement || "-"}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      {candidat["Numero Telephone"] && (
                        <a
                          href={`tel:${candidat["Numero Telephone"]}`}
                          className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {candidat["Numero Telephone"]}
                        </a>
                      )}
                      {candidat.Email && (
                        <a
                          href={`mailto:${candidat.Email}`}
                          className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {candidat.Email}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-zinc-600 dark:text-zinc-300">
                        Début: {formatDate(candidat["Date de Debut"])}
                      </span>
                      <span className="text-sm text-zinc-600 dark:text-zinc-300">
                        Fin: {formatDate(candidat["Date de Fin"])}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {candidats.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
            <div className="flex flex-col items-center gap-2">
              <svg
                className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Aucun candidat trouvé</p>
            </div>
          </div>
        ) : (
          candidats.map((candidat) => {
            const isExpanded = expandedRows.includes(candidat.id);
            return (
              <div
                key={candidat.id}
                className="border-b border-zinc-100 dark:border-zinc-800 p-4 hover:bg-blue-50/50 dark:hover:bg-zinc-700/30 transition-colors"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleRow(candidat.id)}
                >
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50 block">
                      {candidat.Candidat || "-"}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {candidat.Filiere || "-"} - {candidat.Etablissement || "-"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isExpanded && (
                  <div className="mt-3 space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-zinc-400" />
                      <a
                        href={`tel:${candidat["Numero Telephone"]}`}
                        className="text-sm text-zinc-600 dark:text-zinc-300"
                      >
                        {candidat["Numero Telephone"] || "-"}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-zinc-400" />
                      <a
                        href={`mailto:${candidat.Email}`}
                        className="text-sm text-zinc-600 dark:text-zinc-300"
                      >
                        {candidat.Email || "-"}
                      </a>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-300">
                      <span>Début: {formatDate(candidat["Date de Debut"])}</span>
                      <span>Fin: {formatDate(candidat["Date de Fin"])}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
