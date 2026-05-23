import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [
      hero,
      aboutMe,
      techStack,
      projects,
      education,
      skills,
      contact,
      stats,
      socialLinks,
    ] = await Promise.all([
      prisma.hero.findFirst(),
      prisma.aboutMe.findFirst(),
      prisma.techStack.findMany(),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.professionalSkill.findMany({ orderBy: { order: "asc" } }),
      prisma.contactInfo.findFirst(),
      prisma.portfolioStat.findFirst(),
      prisma.socialMediaLink.findMany({ orderBy: { order: "asc" } }),
    ]);

    return NextResponse.json({
      hero,
      aboutMe,
      techStack,
      projects,
      education,
      skills,
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
