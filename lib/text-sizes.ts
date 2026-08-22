// Central typography scale for the portfolio.
// Every section should pull its text sizes from here so scaling stays consistent.

export const TEXT = {
  // Section-level headings ("My journey so far.", "Let's work together.")
  sectionTitle: "text-4xl md:text-5xl lg:text-6xl",

  // Bento/card headings
  cardTitleLarge: "text-2xl md:text-3xl", // featured card heading
  cardTitle: "text-xl md:text-2xl", // standard card heading

  // Supporting text
  institution: "text-sm md:text-base",
  description: "text-base md:text-lg", // project/edu descriptions
  meta: "text-sm md:text-sm", // dates, mono metadata
  tag: "text-xs md:text-sm",

  // Footer
  footerBrand: "text-sm tracking-[0.25em]",
  footerLink: "text-sm",
  footerLegal: "text-xs md:text-sm",
} as const;
