'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

export const ProjectForm: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      setError('Only ZIP files are allowed');
    } else {
      setError(null);
      setUploadedFiles(acceptedFiles);
      setGithubUrl('');
    }
  }, []);

  const clearFiles = () => {
    setUploadedFiles([]);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/zip': ['.zip'] },
    multiple: false,
    directory: true
  });

  const handleGithubUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(e.target.value);
    if (e.target.value) {
      setUploadedFiles([]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = 'https://363sl9-4000.csb.app/';

    if (githubUrl) {
      try {
        console.log('Attempting to upload GitHub project...');
        const response = await fetch(`${apiUrl}/uploadGithub`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            githubUrl,
            name,
            description,
            organization: 'organization' // You might want to add this as a state variable
          })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${responseText}`
          );
        }

        console.log('GitHub project uploaded successfully');
      } catch (error) {
        console.error('Error uploading GitHub project:', error);
        setError(
          `Failed to upload GitHub project: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    } else if (uploadedFiles.length > 0) {
      try {
        console.log('Attempting to upload local file...');
        const formData = new FormData();
        formData.append('file', uploadedFiles[0]);
        formData.append('name', name);
        formData.append('description', description);

        const response = await fetch(`${apiUrl}/uploadLocal`, {
          method: 'POST',
          body: formData
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const responseText = await response.text();
        console.log('Response text:', responseText);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${responseText}`
          );
        }

        console.log('Local file uploaded successfully');
      } catch (error) {
        console.error('Error uploading local file:', error);
        setError(
          `Failed to upload local file: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    } else {
      setError('Please either enter a GitHub URL or upload a file');
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Create project"
          description="Add a new project. Upload either a ZIP folder or enter a GitHub repo, but not both."
        />
      </div>
      <Separator />
      <form className="w-full space-y-8" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project ZIP Folder
          </label>
          <div
            {...getRootProps()}
            className={`mt-2 flex items-center justify-center rounded-lg border-2 border-dashed p-4 ${
              isDragActive ? 'border-blue-400' : 'border-gray-300'
            } ${githubUrl ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input {...getInputProps()} disabled={!!githubUrl} />
            {isDragActive ? (
              <p>Drop the ZIP file here...</p>
            ) : (
              <p>Drag and drop a ZIP folder, or click to select files</p>
            )}
          </div>
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Uploaded Files:</h3>
              <ul className="mt-2">
                {uploadedFiles.map((file) => (
                  <li key={file.name} className="text-sm">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
              <Button
                variant="destructive"
                onClick={clearFiles}
                className="mt-4"
              >
                Clear Files
              </Button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            GitHub URL
          </label>
          <Input
            type="url"
            placeholder="https://github.com/your-repository"
            value={githubUrl}
            onChange={handleGithubUrlChange}
            disabled={uploadedFiles.length > 0}
          />
        </div>
        <div className="gap-8 md:grid md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <Button className="ml-auto" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};
