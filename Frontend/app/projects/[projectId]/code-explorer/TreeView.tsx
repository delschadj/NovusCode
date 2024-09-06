import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaFolder,
  FaHtml5,
  FaCss3Alt,
  FaMarkdown,
  FaJsSquare,
  FaTypewriter,
  FaJson,
  FaFileAlt
} from 'react-icons/fa';
import { TFiles } from './types';
import convertJsonToTFiles from './convertJsonToTFiles';

const sortEntries = (entries: TFiles[]): TFiles[] => {
  return entries.sort((a, b) => {
    if ((a.children && b.children) || (!a.children && !b.children)) {
      return a.name.localeCompare(b.name);
    }
    return a.children ? -1 : 1;
  });
};

const getFileIcon = (type?: string) => {
  switch (type) {
    case 'html':
      return <FaHtml5 className="text-black dark:text-white" />;
    case 'css':
      return <FaCss3Alt className="text-black dark:text-white" />;
    case 'md':
      return <FaMarkdown className="text-black dark:text-white" />;
    case 'js':
      return <FaJsSquare className="text-black dark:text-white" />;
    case 'ts':
      return <FaTypewriter className="text-black dark:text-white" />;
    case 'json':
      return <FaJson className="text-black dark:text-white" />;
    default:
      return <FaFileAlt className="text-black dark:text-white" />;
  }
};

type EntryProps = {
  entry: TFiles;
  depth: number;
  onFileClick: (filePath: string) => void;
  selectedFile: string;
  onSelect: (filePath: string) => void;
  parentPath: string;
};

const Entry: React.FC<EntryProps> = ({
  entry,
  depth,
  onFileClick,
  selectedFile,
  onSelect,
  parentPath
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const currentPath = `${parentPath}/${entry.name}`;

  const handleClick = () => {
    if (entry.children && entry.children.length > 0) {
      setIsExpanded((prev) => !prev);
    } else {
      onFileClick(currentPath);
      onSelect(currentPath);
    }
  };

  const isSelected = currentPath === selectedFile;
  const isFolder = entry.children && entry.children.length > 0;

  return (
    <div className={`flex flex-col ${depth > 2 ? 'ml-2' : ''}`}>
      <div
        className={`flex items-center ${
          isSelected ? 'bg-gray-200 dark:bg-gray-800' : ''
        }`}
      >
        {isFolder ? (
          <FaFolder className="text-black dark:text-white" />
        ) : (
          getFileIcon(entry.type)
        )}
        <span
          onClick={handleClick}
          className={`ml-2 cursor-pointer text-gray-800 hover:underline dark:text-gray-200 ${
            isSelected ? 'font-bold' : ''
          }`}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {entry.name}
        </span>
      </div>
      {isExpanded && isFolder && (
        <div className="ml-2 flex flex-col">
          {sortEntries(entry.children).map((child) => (
            <Entry
              key={child.name}
              entry={child}
              depth={depth + 1}
              onFileClick={onFileClick}
              selectedFile={selectedFile}
              onSelect={onSelect}
              parentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type TreeViewProps = {
  onFileClick: (fileName: string) => void;
};

const TreeView: React.FC<TreeViewProps> = ({ onFileClick }) => {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [filesData, setFilesData] = useState<TFiles[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/file/K4aG5qzzZxitNLGyEgXR/directoryFiles.json'
        );
        const convertedData = convertJsonToTFiles(response.data);
        console.log('Converted Data:', convertedData);
        setFilesData(sortEntries(convertedData));
      } catch (error) {
        console.log('Error fetching directory structure:', error);
      }
    };

    fetchData();
  }, []);

  // Filter files based on the search query, recursively
  const filterFiles = (files: TFiles[], query: string): TFiles[] => {
    const filtered = files.reduce((acc: TFiles[], file) => {
      if (file.type === 'file' && file.name.toLowerCase().includes(query)) {
        acc.push(file);
      } else if (file.type === 'directory') {
        const filteredChildren = filterFiles(file.children || [], query);
        if (
          filteredChildren.length > 0 ||
          file.name.toLowerCase().includes(query)
        ) {
          acc.push({
            ...file,
            children: filteredChildren
          });
        }
      }
      return acc;
    }, []);

    return filtered;
  };

  return (
    <div className="scrollable-container p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search files..."
          className="w-full rounded border border-gray-300 p-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {filesData.length === 0 ? (
        <p>No files available</p>
      ) : (
        filterFiles(filesData, searchQuery).map((entry) => (
          <Entry
            key={entry.name}
            entry={entry}
            depth={0}
            onFileClick={onFileClick}
            selectedFile={selectedFile}
            onSelect={handleSelect}
            parentPath=""
          />
        ))
      )}
    </div>
  );
};

export default TreeView;
