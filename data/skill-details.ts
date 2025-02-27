import type { GraphNode } from "../types/graph"

export interface SkillDetails extends GraphNode {
  level?: number
  description?: string
  yearsOfExperience?: number
}

export const skillDetails: Record<string, SkillDetails> = {
  // ─────────────────────────────────────────────────────────────
  // WEB & FRONTEND
  // ─────────────────────────────────────────────────────────────
  react: {
    id: "react",
    name: "React",
    level: 90,
    description:
      "Modern React development with hooks, context APIs, and Next.js. Familiar with server components, SSR/SSG, and state management (Redux, Zustand).",
    yearsOfExperience: 3,
    color: "#61DAFB",
    val: 20,
    category: "tool",
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    level: 85,
    description:
      "Type-safe development with advanced TypeScript features (generics, utility types, decorators). Strong experience building full-stack apps with tRPC and Next.js.",
    yearsOfExperience: 2,
    color: "#3178C6",
    val: 20,
    category: "tool",
  },
  js_ts: {
    id: "js_ts",
    name: "JavaScript / TypeScript",
    level: 90,
    description:
      "Core JS/TS expertise for front-end frameworks, libraries, and tooling. Proficient with ES6+ features, asynchronous patterns, and testing frameworks like Jest.",
    yearsOfExperience: 4,
    color: "#F0DB4F",
    val: 20,
    category: "tool",
  },

  // ─────────────────────────────────────────────────────────────
  // BACKEND & CLOUD
  // ─────────────────────────────────────────────────────────────
  nodejs: {
    id: "nodejs",
    name: "Node.js",
    level: 80,
    description:
      "Server-side JavaScript, RESTful APIs with Express/Nest.js, real-time apps with Socket.IO. Comfortable with microservices and event-driven architecture.",
    yearsOfExperience: 3,
    color: "#339933",
    val: 20,
    category: "tool",
  },
  aws_lambda: {
    id: "aws_lambda",
    name: "AWS Lambda",
    level: 75,
    description:
      "Serverless computing on AWS for event-driven architectures. Experience with IAM roles, API Gateway, and cost optimization strategies.",
    yearsOfExperience: 2,
    color: "#FF9900",
    val: 20,
    category: "tool",
  },
  vercel: {
    id: "vercel",
    name: "Vercel",
    level: 80,
    description:
      "Deploying React/Next.js apps with zero-config, serverless functions, and automatic CI/CD. Skilled in environment management, edge functions, and optimization.",
    yearsOfExperience: 2,
    color: "#000000",
    val: 20,
    category: "tool",
  },
  aip_foundry: {
    id: "aip_foundry",
    name: "AIP Foundry",
    level: 70,
    description:
      "Experience deploying AI pipelines and data workflows. Familiar with data integration, model hosting, and collaborative analytics features.",
    yearsOfExperience: 1,
    color: "#2ecc71",
    val: 20,
    category: "tool",
  },
  supabase: {
    id: "supabase",
    name: "Supabase",
    level: 80,
    description:
      "Managed backend platform with Postgres, auth, and real-time capabilities. Skilled in schema design, row-level security, and open-source integrations.",
    yearsOfExperience: 2,
    color: "#3FCF8E",
    val: 20,
    category: "tool",
  },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    level: 85,
    description:
      "Advanced SQL (CTEs, window functions), schema design, indexing, and performance tuning. Comfortable with PL/pgSQL for stored procedures and triggers.",
    yearsOfExperience: 3,
    color: "#336791",
    val: 20,
    category: "tool",
  },

  // ─────────────────────────────────────────────────────────────
  // LANGUAGES & SOFTWARE
  // ─────────────────────────────────────────────────────────────
  python: {
    id: "python",
    name: "Python",
    level: 95,
    description:
      "Scientific computing, data analysis, and scripting with NumPy, Pandas, SciPy. Experience with HPC workflows and parallel programming. Skilled in building ML pipelines.",
    yearsOfExperience: 4,
    color: "#3776AB",
    val: 20,
    category: "tool",
  },
  java: {
    id: "java",
    name: "Java",
    level: 70,
    description:
      "Object-oriented development for enterprise apps (Spring Boot) and Android. Familiar with concurrency (Threads, Executors) and memory management (GC tuning).",
    yearsOfExperience: 2,
    color: "#007396",
    val: 20,
    category: "tool",
  },
  r_lang: {
    id: "r_lang",
    name: "R",
    level: 80,
    description:
      "Statistical computing, data manipulation (tidyverse), and advanced plotting (ggplot2). Familiar with Shiny dashboards, Bioconductor packages, and script-based workflows.",
    yearsOfExperience: 3,
    color: "#276DC3",
    val: 20,
    category: "tool",
  },
  cplusplus: {
    id: "cplusplus",
    name: "C++",
    level: 90,
    description:
      "High-performance programming for embedded systems, HPC, and real-time applications. Skilled with modern C++ standards (C++17/20), STL, templates, and concurrency.",
    yearsOfExperience: 4,
    color: "#2ecc71",
    val: 20,
    category: "tool",
  },
  matlab: {
    id: "matlab",
    name: "MATLAB",
    level: 85,
    description:
      "Signal processing, control systems, and data visualization. Skilled with toolboxes (DSP, Control System) and Simulink for modeling and simulation.",
    yearsOfExperience: 3,
    color: "#0076A8",
    val: 20,
    category: "tool",
  },
  labview: {
    id: "labview",
    name: "LabVIEW",
    level: 70,
    description:
      "Graphical data acquisition and instrument control. Experience building real-time measurement systems and hardware-in-the-loop test setups.",
    yearsOfExperience: 2,
    color: "#FFDB00",
    val: 20,
    category: "tool",
  },

  // ─────────────────────────────────────────────────────────────
  // DATA SCIENCE & MACHINE LEARNING
  // ─────────────────────────────────────────────────────────────
  pytorch: {
    id: "pytorch",
    name: "PyTorch",
    level: 85,
    description:
      "Deep learning framework for CNNs, RNNs, and large-scale GPU training. Comfortable with TorchVision/TorchAudio, transfer learning, and HPC cluster usage.",
    yearsOfExperience: 2,
    color: "#EE4C2C",
    val: 20,
    category: "tool",
  },
  pytorch_light: {
    id: "pytorch_light",
    name: "PyTorch Lightning",
    level: 75,
    description:
      "Structured deep learning training loops, distributed training, and experiment organization. Familiar with checkpointing, early stopping, and multi-GPU usage.",
    yearsOfExperience: 1,
    color: "#EE4C2C",
    val: 20,
    category: "tool",
  },
  tf_keras: {
    id: "tf_keras",
    name: "TensorFlow / Keras",
    level: 80,
    description:
      "Designing and training neural networks, data pipelines with tf.data, and deploying models via TensorFlow Serving or TFLite for edge devices.",
    yearsOfExperience: 2,
    color: "#FF6F00",
    val: 20,
    category: "tool",
  },
  sklearn: {
    id: "sklearn",
    name: "scikit-learn",
    level: 80,
    description:
      "Classical ML algorithms (SVM, random forest, logistic regression), feature engineering, pipeline creation. Experienced in hyperparameter tuning and cross-validation.",
    yearsOfExperience: 3,
    color: "#F7931E",
    val: 20,
    category: "tool",
  },
  xgboost: {
    id: "xgboost",
    name: "XGBoost",
    level: 75,
    description:
      "Gradient boosting for structured data. Experience with parameter tuning (learning rates, boosting rounds) and GPU acceleration for large datasets.",
    yearsOfExperience: 2,
    color: "#9b59b6",
    val: 20,
    category: "tool",
  },

  // ─────────────────────────────────────────────────────────────
  // ENGINEERING / EMBEDDED / CONTROL
  // ─────────────────────────────────────────────────────────────
  arduino: {
    id: "arduino",
    name: "Arduino",
    level: 80,
    description:
      "Prototyping microcontroller-based systems for sensing, data acquisition, and simple robotics. Comfortable with C/C++ firmware and serial communication protocols.",
    yearsOfExperience: 3,
    color: "#00979D",
    val: 20,
    category: "tool",
  },
  raspberry_pi: {
    id: "raspberry_pi",
    name: "Raspberry Pi",
    level: 75,
    description:
      "Single-board computer for IoT, edge computing, and Python-based prototyping. Experience interfacing sensors, controlling GPIO pins, and running Linux-based services.",
    yearsOfExperience: 3,
    color: "#C51A4A",
    val: 20,
    category: "tool",
  },
  biopac: {
    id: "biopac",
    name: "Biopac Systems",
    level: 70,
    description:
      "Collecting and analyzing physiological signals (ECG, EMG, EEG) for research or prototyping. Integrating with LabVIEW or MATLAB for real-time data streams.",
    yearsOfExperience: 2,
    color: "#e74c3c",
    val: 20,
    category: "tool",
  },
  multisim: {
    id: "multisim",
    name: "Multisim",
    level: 65,
    description:
      "Circuit simulation for analog/digital components, SPICE-based analysis, and schematic design. Familiar with Bode plots, time-domain, and mixed-signal debugging.",
    yearsOfExperience: 2,
    color: "#e74c3c",
    val: 20,
    category: "tool",
  },
  filter_design: {
    id: "filter_design",
    name: "Filter Design",
    level: 75,
    description:
      "Digital and analog filter design (FIR, IIR) for noise reduction and signal shaping. Skilled with MATLAB's Filter Designer or Python-based libraries (NumPy/SciPy).",
    yearsOfExperience: 2,
    color: "#e74c3c",
    val: 20,
    category: "tool",
  },
  dsp: {
    id: "dsp",
    name: "Digital Signal Processing",
    level: 80,
    description:
      "Fourier transforms, wavelets, time-frequency analysis, and real-time DSP on embedded platforms. Applied to audio, biomedical, and sensor data pipelines.",
    yearsOfExperience: 3,
    color: "#e74c3c",
    val: 20,
    category: "tool",
  },
  control_theory: {
    id: "control_theory",
    name: "Control Theory",
    level: 70,
    description:
      "Design of feedback loops (PID, robust, state-space). Simulation and tuning in MATLAB/Simulink. Familiar with real-time control on microcontrollers.",
    yearsOfExperience: 2,
    color: "#e74c3c",
    val: 20,
    category: "tool",
  },

  // ─────────────────────────────────────────────────────────────
  // DATA VISUALIZATION & STATS
  // ─────────────────────────────────────────────────────────────
  minitab: {
    id: "minitab",
    name: "Minitab",
    level: 65,
    description:
      "Classical statistical software for process control, ANOVA, DOE. Used in quality improvement and manufacturing analytics.",
    yearsOfExperience: 2,
    color: "#9b59b6",
    val: 20,
    category: "tool",
  },
  powerbi: {
    id: "powerbi",
    name: "Power BI",
    level: 70,
    description:
      "Data visualization and BI dashboards. Skilled in DAX calculations, data modeling, and publishing interactive reports for business stakeholders.",
    yearsOfExperience: 2,
    color: "#F2C811",
    val: 20,
    category: "tool",
  },
  tableau: {
    id: "tableau",
    name: "Tableau",
    level: 75,
    description:
      "Building interactive dashboards and data stories. Familiar with calculated fields, blending data sources, and parameter-driven visualizations.",
    yearsOfExperience: 2,
    color: "#E97627",
    val: 20,
    category: "tool",
  },
  plotly_seaborn: {
    id: "plotly_seaborn",
    name: "Plotly / Seaborn / Matplotlib",
    level: 85,
    description:
      "Comprehensive Python data visualization. Skilled in interactive dashboards (Plotly), advanced statistical plots (Seaborn), and custom figures (Matplotlib).",
    yearsOfExperience: 3,
    color: "#9b59b6",
    val: 20,
    category: "tool",
  },

  // ─────────────────────────────────────────────────────────────
  // HPC & DATA PIPELINES
  // ─────────────────────────────────────────────────────────────
  hpc: {
    id: "hpc",
    name: "High-Performance Computing",
    level: 85,
    description:
      "Parallel/distributed computing on clusters or supercomputers. Skilled with MPI, OpenMP, SLURM scheduling, and scaling ML or simulation workloads on GPUs.",
    yearsOfExperience: 2,
    color: "#9b59b6",
    val: 20,
    category: "tool",
  },
}

