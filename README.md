<h1>Forensic Tool Lab</h1>

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<h2>Description</h2>
Project explores the functionality of Google AI Studio in its ability to create a forensic analysis tool based on a textbook (System Forensics, Investigation, and Response, 3rd Edition - by Chuck Easttom.) The app simulates a forensic scan with step-by-step documentation, including features such as initial hardware scanning, integrity and hashing verification, timeline analysis, and filesystem artifact location.

<br />

<h2> Languages and Utilities Used</h2>

<b>TypeScript</b> (Core Logic & Type Safety)

<b>React</b> (User Interface & State Management)

<b>Tailwind CSS</b> (Technical Dashboard Styling)

<b>Framer Motion</b> (Smooth UI Transitions & Progress Animations)

<b>Lucide React</b> (Forensic & System Iconography)

<h2>Environments Used </h2>

<b>Windows 10</b> (21H2)

<b>Node.js</b> (Development Runtime)

<b>Vite</b> (Fast Build & Hot Module Replacement)

<h2>Program walk-through:</h2>

<p align="center">
Start the investigation: <br/>
<img src="https://i.imgur.com/xsIZ1Eo.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
<br />
<br />
Scanning Files:  <br/>
<img src="https://i.imgur.com/8PKPOzK.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
<br />
<br />
Initial Hardware Scan Complete: <br/>
<img src="https://i.imgur.com/8Q7X0wN.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
<br />
<br />
Hashing and Integrity Analysis:  <br/>
<img src="https://i.imgur.com/FwvvfeN.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
<br />
<br />
Timeline Analysis: <br/>
<img src="https://i.imgur.com/yF9Bqho.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
<br />
<br />
Registry Artifacts Scan: <br/>
<img src="https://i.imgur.com/X21cgOT.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
<br />
<br />
Volatile Memory Scan & Filesystem Artifacts: <br/>
<img src="https://i.imgur.com/LKuYW6G.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
<br />
Forensic Methodology Disclosure: <br/>
<img src="https://i.imgur.com/Y8pt7F7.png" height="80%" width="80%" alt="Forensic Investigation Steps"/>
</p>

<h2>AI Prompt Engineering</h2>
Google's Gemini 3 AI was used to create the forensic analysis tool with Chuck Easttom's textbook as a reference. The following prompts below detail the creation of the forensic tool.
</br>
</br>
<b>Prompt #1:</b> "Create a digital forensics tool for analyzing the Windows operating system. The tool should minimally deal with at least two of the following key concepts:

Key Concepts -
Windows details,
Evidence in volatile data,
Windows swap file,
Windows logs and directories,
Windows Registry

Keywords -
Basic input/output system (BIOS),
Data consistency,
Disk Operating System (DOS),
Dump,
Graphical user interface (GUI),
Heap (H),
Hive,
Master boot record (MBR),
NTFS,
Power-on self-test (POST),
Slurred image,
Stack (S),
Volatile memory analysis

Create the forensic tool using the following textbook as a reference: 
System Forensics, Investigation, and Response, 3rd edition"

<b>AI Response:</b> "The forensic tool 'Easttom-Artifact-Analyzer,' specifically implements the book's descriptions of the Windows boot process, the nature of volatile data, and the structure of the Registry. The tool reflects the specific explanations provided in the Easttom textbook:

Volatile Data Differentiators (p. 454): The code now specifically differentiates between the Stack (S) and Heap (H). Per Easttom, the Stack is dynamic and influenced by function calls (LIFO), while the Heap is for dynamic requests (malloc) and is "less stable."

The "Slurred Image" Concept (p. 461): The tool includes a warning that live data extraction lacks Data consistency because the system is a "moving target." This directly quotes the textbook's warning about metadata and data sectors not agreeing if a file is modified during capture.

The Boot Timeline (p. 447): The analyze_windows_details module follows Easttom’s step-by-step boot summary: BIOS
→
→
 POST 
→
→
 MBR 
→
→
 Partition Load.

Registry Structure (p. 482): The tool categorizes the five major Hives (HKLM, HKCU, etc.) as the primary 'sections' of the Windows Registry, as defined in Chapter 8.

Swap File Significance (p. 466): The tool targets pagefile.sys, noting Easttom's point that because it is a 'scratch pad' for RAM, it contains evidence that was 'live in memory and not stored on the suspect drive' elsewhere."
</br>
</br>
<b>Prompt #2:</b> "Add hashing & integrity verification, timeline analysis, and deep registry parsing to the forensic tool. Improve user friendliness with basic headers and simple explanations for each section."

<b>AI Response:</b> "I have implemented the requested forensic features and significantly enhanced the user experience to meet professional standards.

New Forensic Features
Integrity & Hashing (Chain of Custody):

Added a dedicated module that calculates and displays MD5 and SHA256 hashes for critical system files (ntoskrnl.exe, SYSTEM hive, etc.).

This provides the cryptographic proof required to ensure evidence has not been tampered with since collection.

Timeline Analysis (Event Correlation):

Implemented a chronological event view that merges disparate data sources (Event Viewer, Registry, File System) into a single narrative.

This helps investigators correlate actions, such as a USB connection followed by a sensitive file modification.

Deep Registry Artifacts:

Added a module for high-value forensic artifacts including UserAssist (program execution history), USBSTOR (hardware connection history), and ShellBags (folder browsing history).

User Friendliness & UI Enhancements
Sidebar Navigation: A sticky navigation menu allows you to jump directly to specific evidence sections (Integrity, Timeline, Registry, etc.).

Contextual Headers & Badges: Each section now includes a clear title, a descriptive subtitle, and a "Forensic Phase" badge (e.g., Chain of Custody, Event Correlation) to explain the purpose of the data.

Forensic Methodology Section: Added a detailed reference area at the bottom of the app that explains core concepts like Volatile Analysis and Registry Forensics, including specific page references to Easttom's 3rd Edition.

Investigator Notes: Small informational boxes provide best-practice tips (e.g., "All data is acquired using non-invasive methods").

Visual Timeline: Replaced the basic list with a vertical timeline component for easier chronological reading.

Professional Dark Mode: Refined the "Technical Dashboard" aesthetic with better spacing, borders, and high-contrast typography.

The tool now functions as a comprehensive forensic dashboard that not only collects data but also explains its significance and ensures its integrity."

# Run and deploy the AI Studio app

This contains everything you need to run the forensic analyzer app locally.

View in AI Studio: https://ai.studio/apps/c66ade38-7828-4f6d-ad96-c9ec0265c3f2

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
