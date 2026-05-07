"use client";

import { Candidat } from "@/types";
import { Search } from "lucide-react";
import { useMemo } from "react";

interface SearchFiltersProps {
  candidats: Candidat[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFiliere: string;
  setSelectedFiliere: (filiere: string) => void;
  selectedEtablissement: string;
  setSelectedEtablissement: (etablissement: string) => void;
}

export default function SearchFilters({
  candidats,
  searchQuery,
  setSearchQuery,
  selectedFiliere,
  setSelectedFiliere,
  selectedEtablissement,
  setSelectedEtablissement,
}: SearchFiltersProps) {
  const filieres = useMemo(
    () => [...new Set(candidats.map((c) => c.Filiere).filter(Boolean))].sort(),
    [candidats]
  );

  const etablissements = useMemo(
    () =>
      [...new Set(candidats.map((c) => c.Etablissement).filter(Boolean))].sort(),
    [candidats]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher un candidat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Filiere */}
        <select
          value={selectedFiliere}
          onChange={(e) => setSelectedFiliere(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[160px]"
        >
          <option value="">Toutes les filières</option>
          {filieres.map((filiere) => (
            <option key={filiere} value={filiere}>
              {filiere}
            </option>
          ))}
        </select>

        {/* Filter Etablissement */}
        <select
          value={selectedEtablissement}
          onChange={(e) => setSelectedEtablissement(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[180px]"
        >
          <option value="">Tous les établissements</option>
          {etablissements.map((etablissement) => (
            <option key={etablissement} value={etablissement}>
              {etablissement}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
