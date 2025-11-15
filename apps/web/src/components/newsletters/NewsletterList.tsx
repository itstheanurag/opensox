import { NewsletterCard, Newsletter } from "./NewsletterCard";
import { NewsletterSkeleton } from "./NewsletterSkeleton";

interface NewsletterListProps {
  newsletters: Newsletter[];
  loading: boolean;
  hasFilters: boolean;
}

export function NewsletterList({ newsletters, loading, hasFilters }: NewsletterListProps) {
  if (loading) {
    return (
      <>
        <NewsletterSkeleton />
        <NewsletterSkeleton />
        <NewsletterSkeleton />
      </>
    );
  }

  if (newsletters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">
          {hasFilters
            ? "No newsletters found matching your criteria."
            : "No newsletters available yet."}
        </p>
      </div>
    );
  }

  return (
    <>
      {newsletters.map((newsletter) => (
        <NewsletterCard key={newsletter.slug} newsletter={newsletter} />
      ))}
    </>
  );
}
