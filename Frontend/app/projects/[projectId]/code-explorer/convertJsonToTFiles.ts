import { TFiles } from './types';

type ApiResponse = {
  directories: { [key: string]: any };
};

// Helper function to extract the file/directory name from the full path
const extractNameFromPath = (path: string): string => {
  const parts = path.split('\\');
  return parts[parts.length - 1];
};

// Helper function to get the file extension from filename
const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
};

// Recursive function to build the file tree structure
const buildTree = (node: any): TFiles[] => {
  const result: TFiles[] = [];

  if (node.files && Array.isArray(node.files)) {
    node.files.forEach((file: string) => {
      result.push({
        name: file,
        type: 'file',
        extension: getFileExtension(file)
      });
    });
  }

  if (node.directories && typeof node.directories === 'object') {
    Object.entries(node.directories).forEach(
      ([dirName, dirNode]: [string, any]) => {
        result.push({
          name: dirName,
          type: 'directory',
          children: buildTree(dirNode)
        });
      }
    );
  }

  return result;
};

const convertJsonToTFiles = (data: any): TFiles[] => {
  if (!data || typeof data !== 'object') {
    console.log('Invalid data structure:', data);
    return [];
  }

  const root = data['Directory and File Structure'];
  if (!root || typeof root !== 'object') {
    console.log('Root directory structure is missing or invalid:', root);
    return [];
  }

  return buildTree(root);
};

export default convertJsonToTFiles;
