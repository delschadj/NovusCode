"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import PageContainer from '@/components/layout/page-container';
import { ProjectClient } from '@/components/tables/project-tables/client';
import { firestore } from '@/firebaseConfig';
import { Project } from '@/constants/data';

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'projects'));
        const projectsData: Project[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <div className="space-y-2">

        <ProjectClient data={projects} />
      </div>
    </PageContainer>
  );
}
