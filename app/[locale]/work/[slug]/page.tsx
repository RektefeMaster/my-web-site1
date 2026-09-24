import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { pageMeta } from "@/lib/site";
import { projects, getProjectById } from "@/data/projects";
import { getProjectDetail } from "@/data/project-details";
import { routing } from "@/i18n/routing";
import ProjectDetailView from "@/components/ProjectDetailView";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.id }))
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectById(slug);
  const detail = getProjectDetail(locale, slug);
  if (!project || !detail) return {};
  return pageMeta(
    {
      locale,
      path: `/work/${slug}`,
      title: `${project.name} — METEK`,
      description: detail.summary,
      image: project.desktopImage,
    },
    parent
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectById(slug);
  const detail = getProjectDetail(locale, slug);
  if (!project || !detail) notFound();

  return <ProjectDetailView project={project} detail={detail} />;
}
