'use client';

// page.tsx

import { firestore } from '@/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import PageContainer from '@/components/layout/page-container';
import { useState } from 'react';
import documentsBackground from '../../public/documentsBackground.png';
import { useRouter } from 'next/navigation'; // Import useRouter

interface Document {
  id: string;
  title: string;
  type: string;
  content: string;
}

async function fetchDocuments(): Promise<Document[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'documents'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Document, 'id'>)
    }));
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

async function fetchDocumentContent(id: string): Promise<Document | null> {
  try {
    const documentRef = doc(firestore, 'documents', id);
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      return {
        id: documentSnapshot.id,
        ...(documentSnapshot.data() as Omit<Document, 'id'>)
      };
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document content:', error);
    return null;
  }
}

export default function Page() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const router = useRouter(); // Initialize useRouter

  useState(() => {
    fetchDocuments().then(setDocuments);
  }, []);

  const handleCardClick = async (id: string) => {
    const document = await fetchDocumentContent(id);
    if (document) {
      setSelectedDocument(document);
      setIsModalOpen(true);
    }
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const startChatting = () => {
    router.push('/documents/chat'); // Navigate to the new route
  };

  return (
    <PageContainer scrollable={true}>
      {/* Welcome Banner Section */}
      <div
        className="relative mb-8 overflow-hidden rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${documentsBackground.src})` }}
      >
        <div className="flex h-[400px] flex-col items-center justify-center rounded-lg bg-black/40 p-6 backdrop-blur-sm">
          <div className="max-w-4xl text-center text-white">
            <h1 className="mb-4 text-4xl font-semibold">Documents</h1>
            <p className="mb-4 text-lg">
              Connect your custom data sources and start chatting with your own
              business-related data.
            </p>
            <button
              onClick={startChatting} // Use the handler here
              className="rounded-lg bg-white px-4 py-2 text-black transition duration-300 hover:bg-black hover:text-white"
            >
              Start Chatting
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Explore</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="block max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title || 'Untitled'}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {item.type || 'Unknown Type'}
              </p>
            </div>
          ))}
          {/* Add Document Card */}
          <div
            onClick={openUploadModal}
            className="block max-w-sm cursor-pointer rounded-lg border border-dashed border-gray-400 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add Document
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Click here to add a new document.
            </p>
          </div>
        </div>
      </div>

      {/* View Document Modal */}
      {isModalOpen && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-auto max-w-lg rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold">
              {selectedDocument.title}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {selectedDocument.type}
            </p>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {selectedDocument.content}
            </p>
            <button
              onClick={closeModal}
              className="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 dark:bg-gray-800">
            <h2 className="mb-6 text-3xl font-bold">Upload New Document</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter document title"
                />
              </div>
              <div>
                <label className="mb-2 block text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter document description"
                  rows={4}
                ></textarea>
              </div>
              <div>
                <label className="mb-2 block text-gray-700 dark:text-gray-300">
                  Upload PDF
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeUploadModal}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => alert('Upload functionality not implemented')}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
