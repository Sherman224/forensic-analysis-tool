export interface SystemDetails {
  Initial_Step: string;
  Boot_Record: string;
  Filesystem: string;
  Legacy_Support: string;
  Interface_Type: string;
}

export interface VolatileMemoryAnalysis {
  Method: string;
  Integrity_Risk: string;
  Memory_Segments: {
    Stack_S: string;
    Heap_H: string;
  };
}

export interface RegistryHive {
  Hive_Name: string;
  Status: string;
  Forensic_Value: string;
}

export interface IntegrityVerification {
  File_Name: string;
  MD5: string;
  SHA256: string;
  Status: 'Verified' | 'Mismatch' | 'Pending';
}

export interface TimelineEvent {
  Timestamp: string;
  Source: string;
  Event_Type: string;
  Description: string;
}

export interface RegistryArtifact {
  Category: string;
  Artifact_Name: string;
  Value: string;
  Evidence_Type: string;
}

export interface FilesystemArtifacts {
  Swap_File: {
    Location: string;
    Purpose: string;
    Forensic_Note: string;
  };
}

export interface EvidenceLog {
  System_Details: SystemDetails | null;
  Volatile_Memory_Analysis: VolatileMemoryAnalysis | null;
  Registry_Hive_Summary: RegistryHive[];
  Integrity_Verification: IntegrityVerification[];
  Timeline_Analysis: TimelineEvent[];
  Deep_Registry_Artifacts: RegistryArtifact[];
  Filesystem_Artifacts: FilesystemArtifacts | null;
}
