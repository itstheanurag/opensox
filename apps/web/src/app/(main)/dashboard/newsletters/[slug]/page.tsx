"use client";

import "@/styles/newsletter.css";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/hooks/useSubscription";

interface NewsletterData {
  title: string;
  date: string;
  readTime: string;
  content: string;
}

function NewsletterSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 pb-6 border-b border-[#1a1a1d]">
        <Skeleton className="h-10 w-full mb-4 bg-zinc-800" />
        <Skeleton className="h-8 w-3/4 mb-4 bg-zinc-800" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32 bg-zinc-800" />
          <Skeleton className="h-4 w-24 bg-zinc-800" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full bg-zinc-800" />
        <Skeleton className="h-4 w-full bg-zinc-800" />
        <Skeleton className="h-4 w-5/6 bg-zinc-800" />
        <Skeleton className="h-32 w-full bg-zinc-800 mt-6" />
        <Skeleton className="h-4 w-full bg-zinc-800" />
        <Skeleton className="h-4 w-4/5 bg-zinc-800" />
      </div>
    </div>
  );
}

export default function NewsletterPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [newsletter, setNewsletter] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoading: subscriptionLoading } = useSubscription();

  useEffect(() => {
    // Fetch for all users (testing mode)
    if (subscriptionLoading) return;

    fetch(`/api/newsletters/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setNewsletter(null);
        } else {
          setNewsletter(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setNewsletter(null);
        setLoading(false);
      });
  }, [slug, subscriptionLoading]);

  if (subscriptionLoading) {
    return (
      <div className="w-full h-full overflow-auto">
        <div className="w-full px-4 sm:px-6 py-4 sm:py-5">
          <Skeleton className="h-10 w-40 mb-6 bg-zinc-800" />
          <NewsletterSkeleton />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full overflow-auto">
        <div className="w-full px-4 sm:px-6 py-4 sm:py-5">
          <Skeleton className="h-10 w-40 mb-6 bg-zinc-800" />
          <NewsletterSkeleton />
        </div>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl text-ox-white mb-4">Newsletter not found</p>
          <button
            onClick={() => router.push("/dashboard/newsletters")}
            className="text-ox-purple hover:text-purple-400 transition-colors"
          >
            ← Back to newsletters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-ox-purple hover:text-purple-400 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-4 sm:size-5 shrink-0" />
          <span className="text-sm sm:text-base">Back to newsletters</span>
        </button>

        <article className="prose prose-invert max-w-4xl mx-auto">
          <header className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[#1a1a1d]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ox-white mb-4 break-words">
              {newsletter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400">
              <span className="flex items-center gap-1">
                <CalendarIcon className="size-4 shrink-0" />
                <span className="whitespace-nowrap">
                  {new Date(newsletter.date).toLocaleDateString("en-US", {
                    month: "long",
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
          </header>

          <div
            className="newsletter-content"
            dangerouslySetInnerHTML={{ __html: newsletter.content }}
          />
        </article>
      </div>
    </div>
  );
}
