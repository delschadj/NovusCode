import { Breadcrumbs } from '@/components/breadcrumbs';
import { CreateProfileOne } from '@/components/forms/user-profile-stepper/create-profile';
import PageContainer from '@/components/layout/page-container';

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <CreateProfileOne categories={[]} initialData={null} />
      </div>
    </PageContainer>
  );
}
