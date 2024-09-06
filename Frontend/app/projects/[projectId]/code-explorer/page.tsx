'use client';
import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import TreeView from './TreeView';
import InputBar from '@/components/InputBar';
import PageContainer from '@/components/layout/page-container';
import { Sparkle } from 'lucide-react';
import axios from 'axios';
import { FileIcon, FolderIcon, DefaultIcon } from 'lucide-react';

import { useProjectData } from '@/context/ProjectDataContext';
import { useUserData } from '@/context/UserDataContext';

interface FileContents {
  [key: string]: string;
}

const CodeExplorer: React.FC = () => {
  const [code, setCode] = useState<string>(
    '// Select a file to view its content'
  );
  const [theme, setTheme] = useState<
    'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  >('vs');
  const [filePath, setFilePath] = useState<string>('');
  const [language, setLanguage] = useState<string>('plaintext');
  const { projectData } = useProjectData();
  const { user } = useUserData();

  // Safely extract base URL from fileUrl
  const baseFileUrl = projectData?.fileUrl?.replace('.zip', '') ?? '';

  const handleFileClick = async (filePath: string) => {
    setFilePath(filePath);
    console.log('Base File URL:', baseFileUrl);
    console.log('File Path:', filePath);

    try {
      // Ensure the file path is correctly formatted
      const cleanFilePath = filePath.startsWith('/')
        ? filePath.slice(1)
        : filePath;

      // Construct the full API URL by combining baseFileUrl and cleanFilePath
      const apiUrl = `${baseFileUrl}/${encodeURIComponent(cleanFilePath)}`;
      console.log('API URL to send to backend:', apiUrl);

      // Send request to our backend server
      const response = await axios.get(
        'http://localhost:4000/api/fetch-file-content',
        {
          params: { url: apiUrl }
        }
      );

      console.log('File content:', response.data);
      setCode(response.data);

      const fileExtension = cleanFilePath.split('.').pop()?.toLowerCase();
      setLanguage(getLanguageFromExtension(fileExtension));
    } catch (error) {
      console.error('An error occurred:', error);
      setCode(
        `// Error fetching file content: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  const getLanguageFromExtension = (extension: string | undefined): string => {
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      case 'go':
        return 'go';
      case 'rb':
        return 'ruby';
      case 'php':
        return 'php';
      case 'sql':
        return 'sql';
      case 'yaml':
      case 'yml':
        return 'yaml';
      case 'xml':
        return 'xml';
      case 'sh':
        return 'shell';
      case 'dockerfile':
        return 'dockerfile';
      default:
        return 'plaintext';
    }
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    const updateTheme = () => {
      setTheme(darkModeMediaQuery.matches ? 'vs-dark' : 'vs');
    };

    updateTheme();
    darkModeMediaQuery.addEventListener('change', updateTheme);

    return () => {
      darkModeMediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  const handleExplainClick = () => {
    alert(`Explain the content of ${filePath}`);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as 'vs' | 'vs-dark' | 'hc-black' | 'hc-light');
  };

  const FileTreeItem: React.FC<{ name: string; isFolder: boolean }> = ({
    name,
    isFolder
  }) => {
    const extension = name.split('.').pop()?.toLowerCase();
    let Icon = DefaultIcon;

    if (isFolder) {
      Icon = FolderIcon;
    } else {
      switch (extension) {
        case 'js':
          Icon = () => <FileIcon color="#F0DB4F" />;
          break;
        case 'ts':
        case 'tsx':
          Icon = () => <FileIcon color="#007ACC" />;
          break;
        case 'html':
          Icon = () => <FileIcon color="#E34C26" />;
          break;
        case 'css':
          Icon = () => <FileIcon color="#264DE4" />;
          break;
        case 'json':
          Icon = () => <FileIcon color="#000000" />;
          break;
        case 'md':
          Icon = () => <FileIcon color="#083FA1" />;
          break;
        default:
          Icon = FileIcon;
      }
    }

    return (
      <div className="flex items-center">
        <Icon className="mr-2" size={16} />
        <span>{name}</span>
      </div>
    );
  };

  return (
    <PageContainer scrollable>
      <div className="flex gap-4 p-4">
        {/* File Explorer Card */}
        <div
          className="flex w-full flex-shrink-0 flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-black md:w-1/6"
          style={{ height: 'calc(100vh - 120px)' }}
        >
          <h2 className="mb-4 text-lg font-semibold md:text-xl">
            File Explorer
          </h2>
          <div className="flex-1 overflow-y-auto">
            <TreeView onFileClick={handleFileClick} renderItem={FileTreeItem} />
          </div>
        </div>

        {/* Code Editor Card */}
        <div className="relative w-full flex-1 rounded-lg bg-white p-4 shadow-lg dark:bg-black md:w-1/2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold md:text-xl">Code Editor</h2>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center rounded-full border border-black bg-white px-4 py-2 text-xs font-bold text-black hover:bg-gray-100 focus:outline-none md:text-sm"
                onClick={handleExplainClick}
              >
                <Sparkle className="mr-2 h-5 w-5" />
                Explain
              </button>
              <select
                value={theme}
                onChange={handleThemeChange}
                className="rounded border border-gray-300 p-2 text-sm"
              >
                <option value="vs">Light</option>
                <option value="vs-dark">Dark</option>
                <option value="hc-black">High Contrast Black</option>
                <option value="hc-light">High Contrast Light</option>
              </select>
            </div>
          </div>

          <div className="h-[400px] w-full rounded-b-lg border border-gray-300 dark:border-gray-700 md:h-[500px]">
            <Editor
              height="100%"
              defaultLanguage="plaintext"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={theme}
              language={language}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                renderWhitespace: 'all',
                tabSize: 2
              }}
            />
          </div>
        </div>

        {/* Chat Card */}
        <div className="flex w-full flex-shrink-0 flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-black md:w-1/4">
          <h2 className="mb-4 text-lg font-semibold md:text-xl">Chat</h2>
          <div className="mb-4 flex-grow overflow-y-auto">
            {/* Chat messages would go here */}
          </div>
          <div className="mt-auto">
            <InputBar />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CodeExplorer;
