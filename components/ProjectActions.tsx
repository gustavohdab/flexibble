"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import { deleteProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
};

const ProjectActions = ({ projectId }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencil.svg" alt="edit" width={15} height={15} />
      </Link>

      <button
        className={`flexCenter delete-action_btn transition-colors duration-300 ease-in-out ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        type="button"
        onClick={handleDeleteProject}
      >
        <Image src="/trash.svg" alt="delete" width={15} height={15} />
      </button>
    </>
  );
};

export default ProjectActions;
