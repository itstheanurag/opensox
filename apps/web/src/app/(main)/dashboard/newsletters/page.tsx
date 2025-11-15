"use client";

import "@/styles/newsletter.css";

import { useEffect, useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/hooks/useSubscription";
import { Newsletter } from "@/components/newsletters/NewsletterCard";
import { NewsletterSkeleton } from "@/components/newsletters/NewsletterSkeleton";
import { PremiumUpgradePrompt } from "@/components/newsletters/PremiumUpgradePrompt";
import { NewsletterFilters, TimeFilter } from "@/components/newsletters/NewsletterFilters";
import { NewsletterPagination } from "@/components/newsletters/NewsletterPagination";
import { NewsletterList } from "@/components/newsletters/NewsletterList";
import { useNewsletterFilters } from "@/hooks/useNewsletterFilters";

export default function NewslettersPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { isPaidUser, isLoading: subscriptionLoading } = useSubscription();
  
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch newsletters for all users (testing mode)
    if (subscriptionLoading) return;
    
    fetch("/api/newsletters")
      .then((res) => res.json())
      .then((data) => {
        setNewsletters(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [subscriptionLoading]);

  const filteredNewsletters = useNewsletterFilters(newsletters, searchQuery, timeFilter);

  const totalPages = Math.ceil(filteredNewsletters.length / itemsPerPage);
  const paginatedNewsletters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNewsletters.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNewsletters, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, timeFilter]);

  if (subscriptionLoading) {
    return (
      <div className="w-full h-full overflow-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <Skeleton className="h-8 w-48 mb-6 bg-zinc-800" />
          <NewsletterSkeleton />
          <NewsletterSkeleton />
        </div>
      </div>
    );
  }

  if (!isPaidUser) {
    return <PremiumUpgradePrompt />;
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-ox-white mb-2">
            Newsletters
          </h1>
          <p className="text-sm sm:text-base text-zinc-400">
            Stay updated with our latest news and insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <NewsletterFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          <div className="space-y-4 sm:space-y-6">
            <NewsletterList
              newsletters={paginatedNewsletters}
              loading={loading}
              hasFilters={!!searchQuery || timeFilter !== "all"}
            />
          </div>

          <NewsletterPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
