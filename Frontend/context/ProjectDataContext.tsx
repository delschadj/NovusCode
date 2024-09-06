'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ProjectDataContextType {
  projectData: any; // Renamed from rowData
  setProjectData: (data: any) => void; // Renamed from setRowData
}

const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined);

export function ProjectDataProvider({ children }: { children: ReactNode }) {
  // Initialize state from local storage or set default to null
  const [projectData, setProjectData] = useState<any>(() => {
    const savedData = localStorage.getItem('projectData'); // Renamed from rowData
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    // Save projectData to local storage whenever it changes
    if (projectData !== null) {
      localStorage.setItem('projectData', JSON.stringify(projectData)); // Renamed from rowData
    }
  }, [projectData]);

  return (
    <ProjectDataContext.Provider value={{ projectData, setProjectData }}> {/* Renamed from RowDataContext */}
      {children}
    </ProjectDataContext.Provider>
  );
}

export function useProjectData() { // Renamed from useRowData
  const context = useContext(ProjectDataContext); // Renamed from RowDataContext
  if (context === undefined) {
    throw new Error('useProjectData must be used within a ProjectDataProvider'); // Renamed from RowDataProvider
  }
  return context;
}
