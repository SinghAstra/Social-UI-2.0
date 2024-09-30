"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Function to fetch GitHub stars
async function getGitHubStars(): Promise<number | null> {
  try {
    const response = await axios.get(
      "https://api.github.com/repos/SinghAstra/AutoForm",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
        },
      }
    );

    if (response.status !== 200) {
      return null;
    }

    const starsCount = response.data["stargazers_count"];
    return parseInt(starsCount);
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    return null;
  }
}

const GithubStars = () => {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStars() {
      const starsData = await getGitHubStars();
      setStars(starsData);
      setLoading(false);
    }

    fetchStars();
  }, []);

  if (loading) {
    return (
      <Button variant="outline" size="lg">
        <Icons.spinner className="animate-spin mr-2" />
        Wait...
      </Button>
    );
  }

  if (stars === null) {
    return <span>Unable to fetch GitHub stars.</span>;
  }

  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      className="flex"
    >
      <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-5 w-5 text-foreground"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </svg>
      </div>
      <div className="flex items-center">
        <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
        <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
          {stars === 0 && "Star the repository"}
          {stars === 1 && "1 star"}
          {stars > 1 && `${stars} stars`}
        </div>
      </div>
    </Link>
  );
};

export default GithubStars;
