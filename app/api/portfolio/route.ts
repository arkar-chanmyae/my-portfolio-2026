import { NextResponse } from "next/server";

// Ensure Next does not attempt to statically collect page data
export const dynamic = "force-dynamic";

export async function GET() {
  // Lazy-import the Prisma client so module initialization doesn't
  // attempt to connect or run queries during build-time collection.
  const prisma = (await import("@/lib/prisma")).default;

  try {
    const [
      hero,
      aboutMe,
      techStack,
      projects,
      education,
      skills,
      workExperience,
      contact,
      stats,
      socialLinks,
    ] = await Promise.all([
      prisma.hero.findFirst().catch(() => null),
      prisma.aboutMe.findFirst().catch(() => null),
      prisma.techStack.findMany().catch(() => []),
      prisma.project.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      prisma.education.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      prisma.professionalSkill
        .findMany({ orderBy: { order: "asc" } })
        .catch(() => []),
      prisma.workExperience.findMany().catch(() => []),
      prisma.contactInfo.findFirst().catch(() => null),
      prisma.portfolioStat.findFirst().catch(() => null),
      prisma.socialMediaLink
        .findMany({ orderBy: { order: "asc" } })
        .catch(() => []),
    ]);

    return NextResponse.json({
      hero,
      aboutMe,
      techStack,
      projects,
      education,
      skills,
      workExperience,
      experience: workExperience,
      contact,
      stats,
      socialLinks,
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 },
    );
  }
}
