import { useMemo } from "react";
import { Newsletter } from "@/components/newsletters/NewsletterCard";
import { TimeFilter } from "@/components/newsletters/NewsletterFilters";

export function useNewsletterFilters(
  newsletters: Newsletter[],
  searchQuery: string,
  timeFilter: TimeFilter
) {
  return useMemo(() => {
    let filtered = newsletters;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (newsletter) =>
          newsletter.title.toLowerCase().includes(query) ||
          newsletter.excerpt.toLowerCase().includes(query)
      );
    }

    // Time filter
    if (timeFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter((newsletter) => {
        const newsletterDate = new Date(newsletter.date);
        
        switch (timeFilter) {
          case "day":
            return newsletterDate >= today;
          case "week":
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return newsletterDate >= weekAgo;
          case "month":
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return newsletterDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [newsletters, searchQuery, timeFilter]);
}
