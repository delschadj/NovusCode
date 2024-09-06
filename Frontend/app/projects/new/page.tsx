import { ProjectForm } from '@/components/forms/project-form';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <ProjectForm initialData={null} key={null} />
      </div>
    </PageContainer>
  );
}
