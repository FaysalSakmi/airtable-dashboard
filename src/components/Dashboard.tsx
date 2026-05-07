"use client";

import { useState, useEffect, useCallback } from "react";
import { Candidat } from "@/types";
import StatsCards from "./StatsCards";
import SearchFilters from "./SearchFilters";
import CandidatesTable from "./CandidatesTable";
import { RefreshCw, Moon, Sun } from "lucide-react";

export default function Dashboard() {
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedEtablissement, setSelectedEtablissement] = useState("");
  const [sortField, setSortField] = useState("Date de Debut");
  const [sortDirection, setSortDirection] = useState("desc");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/candidats");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCandidats(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto refresh every 30 seconds
  useEffect(() => {
    if (!isAutoRefresh) return;
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchData, isAutoRefresh]);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Filter and sort
  const filteredCandidats = candidats
    .filter((candidat) => {
      const matchesSearch =
        !searchQuery ||
        candidat.Candidat.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidat.Filiere.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidat.Etablissement.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        candidat.Email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFiliere =
        !selectedFiliere || candidat.Filiere === selectedFiliere;
      const matchesEtablissement =
        !selectedEtablissement ||
        candidat.Etablissement === selectedEtablissement;

      return matchesSearch && matchesFiliere && matchesEtablissement;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof Candidat];
      const bValue = b[sortField as keyof Candidat];

      if (sortField === "Date de Debut" || sortField === "Date de Fin") {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return sortDirection === "asc"
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Dashboard Candidats
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Dernière mise à jour: {lastUpdate.toLocaleTimeString("fr-FR")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Auto Refresh Toggle */}
              <button
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isAutoRefresh
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isAutoRefresh ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"
                  }`}
                />
                {isAutoRefresh ? "Auto" : "Manuel"}
              </button>

              {/* Refresh Button */}
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                />
                Rafraîchir
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <StatsCards candidats={candidats} />

        {/* Filters */}
        <SearchFilters
          candidats={candidats}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFiliere={selectedFiliere}
          setSelectedFiliere={setSelectedFiliere}
          selectedEtablissement={selectedEtablissement}
          setSelectedEtablissement={setSelectedEtablissement}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {filteredCandidats.length} candidat
            {filteredCandidats.length > 1 ? "s" : ""} sur {candidats.length}
          </p>
        </div>

        {/* Table */}
        <CandidatesTable
          candidats={filteredCandidats}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </main>
    </div>
  );
}
