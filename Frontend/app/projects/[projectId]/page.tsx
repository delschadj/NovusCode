'use client';

import PageContainer from '@/components/layout/page-container';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Layout from './layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useProjectData } from '@/context/ProjectDataContext';

export default function ProjectPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { projectData, setProjectData } = useProjectData();
  const [loading, setLoading] = useState(!projectData);
  const [error, setError] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (projectData) {
        setLoading(false);
        return;
      }

      const projectId = pathname?.split('/').pop();
      if (projectId) {
        try {
          const docRef = doc(firestore, 'projects', projectId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setProjectData(data);

            // Fetch the file content
            const response = await fetch(`http://localhost:4000/file/${projectId}/general.md`);
            if (response.ok) {
              const content = await response.text();
              setFileContent(content);
            } else {
              setError('Failed to fetch file content.');
            }
          } else {
            setError('No such document!');
          }
        } catch (error) {
          console.error('Error fetching project data:', error);
          setError('Failed to fetch project data.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Invalid project ID.');
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname, projectData, setProjectData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Project Details</h1>
          <pre className="bg-gray-100 p-4 rounded-md shadow-md">
            {JSON.stringify(projectData, null, 2)}
          </pre>
          {fileContent && (
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold">File Content</h2>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{fileContent}</ReactMarkdown>
            </div>
          )}
        </div>
      </PageContainer>
    </Layout>
  );
}
