"use client";

import React from "react";

interface Paragraph {
  id: string;
  title: string;
  body: string; // contains full_html
}

interface WelcomeSectionProps {
  paragraphs: Paragraph[];
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ paragraphs }) => {
  if (!paragraphs || paragraphs.length === 0) return null;

  return (
    <section className="py-16 bg-[#fffef9]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Main Heading + Intro Paragraph */}
        <div className="text-center mb-12">
          {/* Extracting heading from body HTML automatically */}
          <div
            className="text-3xl md:text-4xl font-bold text-[#c68400] mb-4"
            dangerouslySetInnerHTML={{ __html: paragraphs[0].body.match(/<h2[^>]*>(.*?)<\/h2>/)?.[0] || "" }}
          />

          {/* Lead paragraph */}
          <div
            className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: paragraphs[0].body.replace(/<h2[^>]*>(.*?)<\/h2>/, "")
            }}
          />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paragraphs.slice(1).map((feature) => (
            <div
              key={feature.id}
              className="bg-white border border-yellow-300 shadow-md rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: feature.body }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WelcomeSection;
