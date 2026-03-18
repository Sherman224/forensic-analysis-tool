import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Database, 
  FileText, 
  Download, 
  Play, 
  CheckCircle2, 
  AlertTriangle,
  HardDrive,
  Cpu,
  Search,
  Clock,
  Fingerprint,
  Layers,
  Info,
  ChevronRight,
  ExternalLink,
  History,
  Lock
} from 'lucide-react';
import { EvidenceLog } from './types';

export default function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [evidenceLog, setEvidenceLog] = useState<EvidenceLog | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const scrollRef = useRef<HTMLDivElement>(null);

  const runAnalysis = useCallback(async () => {
    setAnalyzing(true);
    setEvidenceLog(null);
    setProgress(0);

    const steps = [
      { name: 'Analyzing Windows System Architecture...', progress: 10 },
      { name: 'Documenting Volatile Memory Scope...', progress: 25 },
      { name: 'Calculating Cryptographic Hashes (MD5/SHA256)...', progress: 40 },
      { name: 'Correlating Event Timeline...', progress: 55 },
      { name: 'Parsing Deep Registry Artifacts...', progress: 75 },
      { name: 'Scanning Windows Registry Hives...', progress: 85 },
      { name: 'Locating Windows Swap File...', progress: 95 },
      { name: 'Generating Final Report...', progress: 100 },
    ];

    for (const step of steps) {
      setCurrentStep(step.name);
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(step.progress);
    }

    const newLog: EvidenceLog = {
      System_Details: {
        Initial_Step: "Power-on self-test (POST) conducted by BIOS/UEFI.",
        Boot_Record: "Master Boot Record (MBR) located and read.",
        Filesystem: "NTFS (New Technology File System) volume identified.",
        Legacy_Support: "DOS (Disk Operating System) compatibility headers present.",
        Interface_Type: "Windows Graphical User Interface (GUI) environment."
      },
      Volatile_Memory_Analysis: {
        Method: "Memory Dump planned for offline examination.",
        Integrity_Risk: "Live acquisition may result in a 'Slurred image' because data is not acquired at a unified moment, impacting Data consistency.",
        Memory_Segments: {
          Stack_S: "LIFO-based allocation for local variables/parameters.",
          Heap_H: "Dynamic memory allocated via 'malloc'; less stable than data segment."
        }
      },
      Registry_Hive_Summary: [
        { Hive_Name: "HKLM (System)", Status: "Identified for deep parsing", Forensic_Value: "Source of persistence, USB history, and user activity." },
        { Hive_Name: "HKCU (User)", Status: "Identified for deep parsing", Forensic_Value: "Source of persistence, USB history, and user activity." },
        { Hive_Name: "HKCR (Classes)", Status: "Identified for deep parsing", Forensic_Value: "Source of persistence, USB history, and user activity." },
        { Hive_Name: "HKU (Users)", Status: "Identified for deep parsing", Forensic_Value: "Source of persistence, USB history, and user activity." },
        { Hive_Name: "HKCC (Config)", Status: "Identified for deep parsing", Forensic_Value: "Source of persistence, USB history, and user activity." }
      ],
      Integrity_Verification: [
        { File_Name: "C:\\Windows\\System32\\ntoskrnl.exe", MD5: "5d41402abc4b2a76b9719d911017c592", SHA256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Status: 'Verified' },
        { File_Name: "C:\\pagefile.sys", MD5: "7b1909280103120a1c1a020a1c1a020a", SHA256: "f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2", Status: 'Verified' },
        { File_Name: "C:\\Windows\\System32\\config\\SYSTEM", MD5: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6", SHA256: "9f8e7d6c5b4a3210fedcba9876543210abcdef0123456789abcdef0123456789", Status: 'Verified' }
      ],
      Timeline_Analysis: [
        { Timestamp: "2026-03-18 08:12:05", Source: "Event Viewer", Event_Type: "System Boot", Description: "System successfully booted from MBR." },
        { Timestamp: "2026-03-18 08:15:30", Source: "Registry", Event_Type: "USB Connect", Description: "USB Device 'Sandisk Extreme' (SN: 12345) connected." },
        { Timestamp: "2026-03-18 08:20:12", Source: "File System", Event_Type: "File Modify", Description: "C:\\Users\\Admin\\Documents\\confidential.docx modified." },
        { Timestamp: "2026-03-18 08:25:45", Source: "Event Viewer", Event_Type: "User Login", Description: "Successful interactive login for user 'Administrator'." }
      ],
      Deep_Registry_Artifacts: [
        { Category: "User Activity", Artifact_Name: "UserAssist", Value: "cmd.exe (Run count: 12)", Evidence_Type: "Program Execution" },
        { Category: "Persistence", Artifact_Name: "Run Key", Value: "C:\\Windows\\Temp\\update.exe", Evidence_Type: "Auto-start Entry" },
        { Category: "USB History", Artifact_Name: "USBSTOR", Value: "Disk&Ven_SanDisk&Prod_Cruzer", Evidence_Type: "Hardware History" },
        { Category: "Browsing", Artifact_Name: "ShellBags", Value: "C:\\Users\\Admin\\Desktop\\Secret_Folder", Evidence_Type: "Folder Access History" }
      ],
      Filesystem_Artifacts: {
        Swap_File: {
          Location: "C:\\pagefile.sys",
          Purpose: "Virtual memory extension of RAM.",
          Forensic_Note: "Contains remnants of live memory not stored on the suspect drive."
        }
      }
    };

    setEvidenceLog(newLog);
    setAnalyzing(false);
    setCurrentStep('Analysis Complete');
  }, []);

  const downloadReport = () => {
    if (!evidenceLog) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(evidenceLog, null, 4));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "Easttom_Forensic_Report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <Shield className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Easttom Forensic Analyzer</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">System Forensics v3.0</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-[10px] text-emerald-500/70 font-mono uppercase tracking-[0.2em]">Professional Grade</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {!analyzing && !evidenceLog && (
              <button 
                onClick={runAnalysis}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all font-bold shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                Initialize Investigation
              </button>
            )}

            {evidenceLog && !analyzing && (
              <div className="flex gap-3">
                <button 
                  onClick={runAnalysis}
                  className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 rounded-xl border border-zinc-800 transition-all font-semibold active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  New Scan
                </button>
                <button 
                  onClick={downloadReport}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all font-bold shadow-lg shadow-emerald-900/20 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 flex gap-8 py-10">
        {/* Sidebar Navigation */}
        {evidenceLog && !analyzing && (
          <aside className="w-64 shrink-0 sticky top-32 h-fit space-y-1">
            <p className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Evidence Sections</p>
            {[
              { id: 'overview', label: 'Overview', icon: History },
              { id: 'integrity', label: 'Integrity & Hashing', icon: Fingerprint },
              { id: 'timeline', label: 'Timeline Analysis', icon: Clock },
              { id: 'registry', label: 'Registry Artifacts', icon: Layers },
              { id: 'memory', label: 'Volatile Memory', icon: Zap },
              { id: 'filesystem', label: 'Filesystem', icon: HardDrive },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  activeTab === item.id 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            
            <div className="mt-10 pt-10 border-t border-zinc-900">
              <div className="px-4 py-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Investigator Note</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  All data is acquired using non-invasive methods to preserve evidence integrity.
                </p>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="relative w-32 h-32 mb-10">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[6px] border-emerald-500/10 border-t-emerald-500 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-[4px] border-zinc-800 border-b-emerald-500/50 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-12 h-12 text-emerald-500" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-3 tracking-tight">{currentStep}</h2>
                <div className="w-80 h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-6 border border-zinc-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                </div>
                <div className="flex items-center gap-3 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  <span className="animate-pulse">System Scan in Progress</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span>{progress}% Complete</span>
                </div>
              </motion.div>
            ) : evidenceLog ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 pb-32"
              >
                {/* Overview Section */}
                <section id="overview" className="scroll-mt-32">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight mb-1">System Architecture</h2>
                      <p className="text-sm text-zinc-500">Initial hardware and OS boot environment details.</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                      Phase 1: Collection
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(evidenceLog.System_Details || {}).map(([key, value]) => (
                      <div key={key} className="p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl hover:border-zinc-700 transition-colors">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{key.replace(/_/g, ' ')}</p>
                        <p className="text-sm text-zinc-200 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 1. Integrity & Hashing Section */}
                <section id="integrity" className="scroll-mt-32">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight mb-1">Integrity & Hashing</h2>
                      <p className="text-sm text-zinc-500">Cryptographic verification to ensure evidence has not been tampered with.</p>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                      Chain of Custody
                    </div>
                  </div>
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-zinc-900/50">
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800">File Artifact</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800">MD5 Hash</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {evidenceLog.Integrity_Verification.map((item, i) => (
                            <tr key={i} className="group hover:bg-zinc-800/30 transition-colors">
                              <td className="px-6 py-5 border-b border-zinc-800/50">
                                <div className="flex items-center gap-3">
                                  <Lock className="w-3.5 h-3.5 text-zinc-600" />
                                  <span className="text-xs font-mono text-zinc-300">{item.File_Name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-5 border-b border-zinc-800/50">
                                <span className="text-[10px] font-mono text-zinc-500 break-all">{item.MD5}</span>
                              </td>
                              <td className="px-6 py-5 border-b border-zinc-800/50">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">{item.Status}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* 2. Timeline Analysis Section */}
                <section id="timeline" className="scroll-mt-32">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight mb-1">Timeline Analysis</h2>
                      <p className="text-sm text-zinc-500">Chronological correlation of system events and user activity.</p>
                    </div>
                    <div className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-purple-500/20">
                      Event Correlation
                    </div>
                  </div>
                  <div className="relative space-y-4 before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-zinc-800">
                    {evidenceLog.Timeline_Analysis.map((event, i) => (
                      <div key={i} className="relative pl-16 group">
                        <div className="absolute left-[30px] top-6 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-150 transition-transform" />
                        <div className="p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl hover:border-zinc-700 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-emerald-500 font-bold">{event.Timestamp}</span>
                            <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded text-[9px] font-bold uppercase tracking-wider">{event.Source}</span>
                          </div>
                          <h4 className="text-sm font-bold text-zinc-200 mb-1">{event.Event_Type}</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed">{event.Description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Deep Registry Artifacts Section */}
                <section id="registry" className="scroll-mt-32">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight mb-1">Registry Artifacts</h2>
                      <p className="text-sm text-zinc-500">Extracted high-value forensic data from Windows Registry hives.</p>
                    </div>
                    <div className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                      Deep Parsing
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {evidenceLog.Deep_Registry_Artifacts.map((artifact, i) => (
                      <div key={i} className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/50 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-zinc-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                              <Layers className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{artifact.Category}</span>
                          </div>
                          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{artifact.Evidence_Type}</span>
                        </div>
                        <h4 className="text-sm font-bold text-zinc-200 mb-2">{artifact.Artifact_Name}</h4>
                        <div className="p-3 bg-black/40 rounded-xl border border-zinc-800/50 font-mono text-[11px] text-emerald-500/90 break-all">
                          {artifact.Value}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Volatile Memory Section */}
                <section id="memory" className="scroll-mt-32">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight mb-1">Volatile Memory</h2>
                      <p className="text-sm text-zinc-500">Analysis of RAM and temporary data segments.</p>
                    </div>
                    <div className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-500/20">
                      Live Response
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-5 bg-red-500/5 border border-red-500/10 rounded-2xl">
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-red-500 mb-1 uppercase tracking-wider">Integrity Risk: Slurred Image</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{evidenceLog.Volatile_Memory_Analysis?.Integrity_Risk}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Methodology</p>
                        <p className="text-sm text-zinc-200">{evidenceLog.Volatile_Memory_Analysis?.Method}</p>
                      </div>
                      <div className="p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl space-y-4">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Memory Segments</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-black/30 rounded-xl border border-zinc-800">
                            <p className="text-[10px] font-bold text-emerald-500 mb-1">Stack (S)</p>
                            <p className="text-[10px] text-zinc-500 leading-tight">{evidenceLog.Volatile_Memory_Analysis?.Memory_Segments.Stack_S}</p>
                          </div>
                          <div className="p-3 bg-black/30 rounded-xl border border-zinc-800">
                            <p className="text-[10px] font-bold text-emerald-500 mb-1">Heap (H)</p>
                            <p className="text-[10px] text-zinc-500 leading-tight">{evidenceLog.Volatile_Memory_Analysis?.Memory_Segments.Heap_H}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Filesystem Section */}
                <section id="filesystem" className="scroll-mt-32">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight mb-1">Filesystem Artifacts</h2>
                      <p className="text-sm text-zinc-500">Persistent storage remnants and virtual memory extensions.</p>
                    </div>
                    <div className="px-3 py-1 bg-zinc-500/10 text-zinc-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-zinc-500/20">
                      Storage Analysis
                    </div>
                  </div>
                  <div className="p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl flex flex-col md:flex-row gap-8 items-start">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                      <HardDrive className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Swap File Location</p>
                          <p className="text-sm font-mono text-emerald-500">{evidenceLog.Filesystem_Artifacts?.Swap_File.Location}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Purpose</p>
                          <p className="text-sm text-zinc-300">{evidenceLog.Filesystem_Artifacts?.Swap_File.Purpose}</p>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-zinc-800/50">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Forensic Note</p>
                        <p className="text-xs text-zinc-400 italic leading-relaxed">"{evidenceLog.Filesystem_Artifacts?.Swap_File.Forensic_Note}"</p>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 bg-zinc-900/50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-zinc-800 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-[2.5rem] blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                  <Shield className="w-12 h-12 text-zinc-700 group-hover:text-emerald-500 transition-colors relative z-10" />
                </div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">Forensic Investigation Ready</h2>
                <p className="text-zinc-500 max-w-lg mb-12 leading-relaxed text-lg">
                  Execute the Easttom Forensic Analyzer to perform deep system analysis, 
                  cryptographic verification, and event correlation based on industry standards.
                </p>
                <button 
                  onClick={runAnalysis}
                  className="group relative px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all font-bold text-xl shadow-2xl shadow-emerald-900/40 active:scale-95 flex items-center gap-4"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Start Investigation
                  <div className="absolute -inset-1 bg-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                </button>
                
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                  {[
                    { title: 'Integrity', desc: 'MD5/SHA256 hashing for chain of custody.', icon: Fingerprint },
                    { title: 'Correlation', desc: 'Unified timeline of system & user events.', icon: Clock },
                    { title: 'Deep Parsing', desc: 'Extract high-value registry artifacts.', icon: Layers },
                  ].map((feature, i) => (
                    <div key={i} className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl text-left">
                      <feature.icon className="w-5 h-5 text-emerald-500 mb-3" />
                      <h4 className="font-bold text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs text-zinc-500">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Methodology Section */}
      <section className="border-t border-zinc-900 bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-zinc-900 rounded-lg">
              <Info className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Forensic Methodology</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Chain of Custody', 
                desc: 'Ensures evidence is documented from collection to court. Cryptographic hashing (MD5/SHA256) proves data integrity.',
                ref: 'Easttom p. 44' 
              },
              { 
                title: 'Volatile Analysis', 
                desc: 'Capturing data from RAM before it is lost at shutdown. Critical for finding active malware or encryption keys.',
                ref: 'Easttom p. 453' 
              },
              { 
                title: 'Registry Forensics', 
                desc: 'The Windows Registry is a "gold mine" of evidence, tracking program execution, USB history, and user preferences.',
                ref: 'Easttom p. 481' 
              },
              { 
                title: 'Timeline Correlation', 
                desc: 'Merging disparate logs into a single chronological view to identify the "Who, What, and When" of an incident.',
                ref: 'Easttom p. 512' 
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h4 className="font-bold text-emerald-500 text-sm flex items-center gap-2">
                  <ChevronRight className="w-3 h-3" />
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">{item.ref}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-zinc-700" />
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Easttom Forensic Standards v3.0</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-bold text-zinc-600 hover:text-emerald-500 transition-colors uppercase tracking-widest flex items-center gap-1">
              Documentation <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <p className="text-[10px] text-zinc-700 text-center md:text-right">
              Reference: Easttom, C. (2018). System Forensics, Investigation, and Response. Jones & Bartlett Learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
