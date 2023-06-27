import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

type Props = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: Props) => {
  const result = (await getUserProjects(userId)) as { user?: UserProfile };

  const filteredProjects = result.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node.id !== projectId
  );

  if (filteredProjects?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">
          More by {result.user?.name} ({filteredProjects?.length})
        </p>
        <Link
          href={`/profile/${result.user?.id}`}
          className="text-primary-purple text-base"
        >
          View all
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div
            className="flexCenter related_project-card drop-shadow-card"
            key={node.id}
          >
            <Link href={`/project/${node.id}`} className="flexCenter group relative w-full h-full">
              <Image
                src={node?.image}
                alt={node?.title}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">
                  {node?.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
