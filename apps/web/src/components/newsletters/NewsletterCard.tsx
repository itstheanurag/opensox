import Link from "next/link";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

export interface Newsletter {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
}

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export function NewsletterCard({ newsletter }: NewsletterCardProps) {
  return (
    <Link
      href={`/dashboard/newsletters/${newsletter.slug}`}
      className="block"
    >
      <article className="p-4 sm:p-6 bg-[#121214] border border-[#1a1a1d] rounded-lg hover:border-ox-purple transition-colors">
        <h2 className="text-lg sm:text-xl font-semibold text-ox-white mb-2 hover:text-ox-purple transition-colors break-words">
          {newsletter.title}
        </h2>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400 mb-3">
          <span className="flex items-center gap-1">
            <CalendarIcon className="size-4 shrink-0" />
            <span className="whitespace-nowrap">
              {new Date(newsletter.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="size-4 shrink-0" />
            <span className="whitespace-nowrap">{newsletter.readTime}</span>
          </span>
        </div>
        <p className="text-sm sm:text-base text-zinc-300 line-clamp-2 break-words">
          {newsletter.excerpt}
        </p>
      </article>
    </Link>
  );
}
