# CodeExec - Reactive Animated Frontend

A reactive visual code execution and step-by-step trace animator built with **React**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

---

## Features

- **Step-by-Step Animated Execution**: Follow code execution line-by-line with glowing gutter line accents and trace history.
- **Specialized Data Structure Shapes**:
  - **Binary Trees & BSTs**: Hierarchical SVG layout with smooth bezier edges, node pop-ins, and pointer badges.
  - **Singly & Doubly Linked Lists**: Linear sequence of memory cards with `next` and `prev` directional arrows and pointer badges.
  - **LIFO Stacks**: Vertical cylinder container with open top, depth meter, and top-of-stack arrow.
  - **FIFO Queues & Deques**: Horizontal conveyor tunnel with `ENQUEUE` and `DEQUEUE` indicators.
  - **Circular Queues**: Circular radial dial with capacity slots, `head` and `tail` needles, and wraparound detection.
  - **Min/Max Heaps**: Dual representation with Binary Heap Tree + Backing Array.
  - **HashMaps & Dictionaries**: Key-Value chips and hash bucket slots.
  - **Unique Sets**: Organic bubble cluster with cardinality metrics.
  - **1D & 2D Arrays / Matrices**: Contiguous memory cells with animated variable pointer arrows (`i`, `j`, etc.).
  - **Directed Graphs & Cycles**: Interactive circular graph layout with automatic cycle detection in glowing crimson.
  - **Tries (Prefix Trees)**: Rooted tree with character branch tags and terminal word indicators.
  - **Union-Find (DSU)**: Parent pointer array + connected component clusters.
  - **Recursion**: 3D-feeling call stack tower with frame parameters and active call highlights.
- **55 Built-in Catalog Presets**: Preloaded with every single fixture from `fixtures/api-traces/` and `api-input-output-catalog.md`.
- **Live Code Execution**: Switch between Python and Java, edit or write any custom code, and run it live on the backend at `http://localhost:8080/api/execute`.
- **Playback Controls**: Play, Pause, Step Forward, Step Backward, Jump to Start, Jump to End, Timeline Scrubbing slider, and speed control (`0.5x` to `3x`).
- **Multiple Views**: Tabbed switcher between `Specialized Shape`, `Heap Objects`, `Variables`, and `Stdout Terminal`.

---

## Getting Started

### 1. Ensure the Backend is Running
The Spring Boot backend should be running on port `8080`:
```bash
./mvnw spring-boot:run
```

### 2. Run the Frontend Dev Server
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Celebration**: Canvas Confetti
