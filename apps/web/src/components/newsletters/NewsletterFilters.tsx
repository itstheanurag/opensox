import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export type TimeFilter = "all" | "day" | "week" | "month";

interface NewsletterFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  timeFilter: TimeFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
}

export function NewsletterFilters({
  searchQuery,
  onSearchChange,
  timeFilter,
  onTimeFilterChange,
}: NewsletterFiltersProps) {
  const filters: { value: TimeFilter; label: string }[] = [
    { value: "all", label: "All Time" },
    { value: "day", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  return (
    <div className="space-y-4 mb-6">
      <InputGroup className="max-w-md">
        <InputGroupAddon align="inline-start">
          <MagnifyingGlassIcon className="size-4 text-zinc-400" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          placeholder="Search newsletters..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onTimeFilterChange(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeFilter === filter.value
                ? "bg-ox-purple text-white"
                : "bg-[#121214] text-zinc-400 hover:text-zinc-200 border border-[#1a1a1d] hover:border-zinc-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
