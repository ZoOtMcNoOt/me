import type { GraphData } from "@/types/graph"

export const graphData: GraphData = {
  nodes: [
    // ─────────────────────────────────────────────────────────────
    // CENTRAL NODE (Level 0)
    // ─────────────────────────────────────────────────────────────
    {
      id: "central",
      name: "What I Know",
      val: 50,
      color: "#3498db",
      category: "central",
      level: 0,
    },

    // ─────────────────────────────────────────────────────────────
    // PRIMARY BRANCHES (Level 1)
    // ─────────────────────────────────────────────────────────────
    {
      id: "engineering",
      name: "Engineering &\nDesign",
      val: 35,
      color: "#e74c3c",
      category: "branch",
      level: 1,
    },
    {
      id: "software",
      name: "Software\nDevelopment",
      val: 35,
      color: "#2ecc71",
      category: "branch",
      level: 1,
    },
    {
      id: "data",
      name: "Data &\nAnalytics",
      val: 35,
      color: "#9b59b6",
      category: "branch",
      level: 1,
    },
    {
      id: "research",
      name: "Research\nMethods",
      val: 35,
      color: "#f39c12",
      category: "branch",
      level: 1,
    },
    {
      id: "compliance",
      name: "Regulatory &\nCompliance",
      val: 35,
      color: "#95a5a6",
      category: "branch",
      level: 1,
    },

    // ─────────────────────────────────────────────────────────────
    // ENGINEERING & DESIGN (Level 2)
    // ─────────────────────────────────────────────────────────────
    {
      id: "hardware_prototyping",
      name: "Hardware\nPrototyping",
      val: 25,
      color: "#e74c3c",
      category: "domain",
      level: 2,
    },
    {
      id: "circuit_sim",
      name: "Circuit &\nSystem Sim",
      val: 25,
      color: "#e74c3c",
      category: "domain",
      level: 2,
    },
    {
      id: "control_signal",
      name: "Control &\nSignal Theory",
      val: 25,
      color: "#e74c3c",
      category: "domain",
      level: 2,
    },

    // ─────────────────────────────────────────────────────────────
    // SOFTWARE DEVELOPMENT (Level 2)
    // ─────────────────────────────────────────────────────────────
    {
      id: "languages",
      name: "Programming\nLanguages",
      val: 25,
      color: "#2ecc71",
      category: "domain",
      level: 2,
    },
    {
      id: "backend_dev",
      name: "Backend &\nCloud Services",
      val: 25,
      color: "#2ecc71",
      category: "domain",
      level: 2,
    },

    // ─────────────────────────────────────────────────────────────
    // DATA & ANALYTICS (Level 2)
    // ─────────────────────────────────────────────────────────────
    {
      id: "ml_ai",
      name: "Machine\nLearning & AI",
      val: 25,
      color: "#9b59b6",
      category: "domain",
      level: 2,
    },
    {
      id: "stats_viz",
      name: "Stats &\nVisualization",
      val: 25,
      color: "#9b59b6",
      category: "domain",
      level: 2,
    },
    {
      id: "hpc_data",
      name: "HPC &\nData Pipelines",
      val: 25,
      color: "#9b59b6",
      category: "domain",
      level: 2,
    },

    // ─────────────────────────────────────────────────────────────
    // RESEARCH METHODS (Level 2)
    // ─────────────────────────────────────────────────────────────
    {
      id: "study_design",
      name: "Study Design\n& Analysis",
      val: 25,
      color: "#f39c12",
      category: "domain",
      level: 2,
    },
    {
      id: "doc_reporting",
      name: "Documentation\n& Reporting",
      val: 25,
      color: "#f39c12",
      category: "domain",
      level: 2,
    },
    {
      id: "proj_mgmt",
      name: "Project\nManagement",
      val: 25,
      color: "#f39c12",
      category: "domain",
      level: 2,
    },

    // ─────────────────────────────────────────────���───────────────
    // COMPLIANCE SUB-DOMAINS (Level 2)
    // ─────────────────────────────────────────────────────────────
    {
      id: "health_data_privacy",
      name: "Health Data\nPrivacy",
      val: 25,
      color: "#95a5a6",
      category: "domain",
      level: 2,
    },
    {
      id: "medical_device_qms",
      name: "Medical Device\nQMS & Standards",
      val: 25,
      color: "#95a5a6",
      category: "domain",
      level: 2,
    },
    {
      id: "clinical_lab_stds",
      name: "Clinical & Lab\nStandards",
      val: 25,
      color: "#95a5a6",
      category: "domain",
      level: 2,
    },
    {
      id: "health_it_standards",
      name: "Health IT\nStandards",
      val: 25,
      color: "#95a5a6",
      category: "domain",
      level: 2,
    },
    {
      id: "accessibility",
      name: "Accessibility",
      val: 25,
      color: "#95a5a6",
      category: "domain",
      level: 2,
    },

    // ─────────────────────────────────────────────────────────────
    // ENGINEERING TOOLS & CONCEPTS (Level 3)
    // ─────────────────────────────────────────────────────────────
    {
      id: "arduino",
      name: "Arduino",
      val: 20,
      color: "#e74c3c",
      category: "tool",
      level: 3,
    },
    {
      id: "raspberry_pi",
      name: "Raspberry Pi",
      val: 20,
      color: "#e74c3c",
      category: "tool",
      level: 3,
    },
    {
      id: "biopac",
      name: "Biopac\nSystems",
      val: 20,
      color: "#e74c3c",
      category: "tool",
      level: 3,
    },
    {
      id: "multisim",
      name: "Multisim",
      val: 20,
      color: "#e74c3c",
      category: "tool",
      level: 3,
    },
    {
      id: "filter_design",
      name: "Filter Design",
      val: 20,
      color: "#e74c3c",
      category: "tool",
      level: 3,
    },
    {
      id: "control_theory",
      name: "Control Theory",
      val: 20,
      color: "#e74c3c",
      category: "tool",
      level: 3,
    },
    {
      id: "dsp",
      name: "Digital\nSignal Processing",
      val: 20,
      color: "#e74c3c",
      category: "tool",
      level: 3,
    },

    // ─────────────────────────────────────────────────────────────
    // SOFTWARE TOOLS (Level 3)
    // ─────────────────────────────────────────────────────────────
    {
      id: "cpp",
      name: "C++",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "python",
      name: "Python",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "matlab",
      name: "MATLAB",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "labview",
      name: "LabVIEW",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "r_lang",
      name: "R",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "js_ts",
      name: "JavaScript /\nTypeScript",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "java",
      name: "Java",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },

    // ─────────────────────────────────────────────────────────────
    // DATA & ML TOOLS (Level 3)
    // ─────────────────────────────────────────────────────────────
    {
      id: "xgboost",
      name: "XGBoost",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },
    {
      id: "pytorch",
      name: "PyTorch",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },
    {
      id: "tf_keras",
      name: "TensorFlow /\nKeras",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },
    {
      id: "sklearn",
      name: "scikit-learn",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },
    {
      id: "pytorch_light",
      name: "PyTorch\nLightning",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },
    {
      id: "minitab",
      name: "Minitab",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },

    // VISUALIZATION & STATS TOOLS (Level 3)
    {
      id: "tableau",
      name: "Tableau",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },
    {
      id: "powerbi",
      name: "Power BI",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },
    {
      id: "plotly_seaborn",
      name: "Plotly /\nSeaborn /\nMatplotlib",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },

    // BACKEND & CLOUD (Level 3)
    {
      id: "aws_lambda",
      name: "AWS Lambda",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "aip_foundry",
      name: "AIP Foundry",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "supabase",
      name: "Supabase",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },
    {
      id: "vercel",
      name: "Vercel",
      val: 20,
      color: "#2ecc71",
      category: "tool",
      level: 3,
    },

    // HPC & DATA PIPELINES (Level 3)
    {
      id: "hpc",
      name: "High-Performance\nComputing",
      val: 20,
      color: "#9b59b6",
      category: "tool",
      level: 3,
    },

    // RESEARCH METHODS (Level 3)
    {
      id: "hypothesis_testing",
      name: "Hypothesis\nTesting",
      val: 20,
      color: "#f39c12",
      category: "tool",
      level: 3,
    },
    {
      id: "anova_regression",
      name: "ANOVA /\nRegression",
      val: 20,
      color: "#f39c12",
      category: "tool",
      level: 3,
    },
    {
      id: "data_collection_quality",
      name: "Proper Data\nCollection &\nControl",
      val: 20,
      color: "#f39c12",
      category: "tool",
      level: 3,
    },
    {
      id: "latex",
      name: "LaTeX",
      val: 20,
      color: "#f39c12",
      category: "tool",
      level: 3,
    },
    {
      id: "project_mgmt",
      name: "Project\nManagement",
      val: 20,
      color: "#f39c12",
      category: "tool",
      level: 3,
    },
    {
      id: "agile_methods",
      name: "Agile /\nKanban /\nGantt",
      val: 20,
      color: "#f39c12",
      category: "tool",
      level: 3,
    },

    // ─────────────────────────────────────────────────────────────
    // COMPLIANCE TOOLS (Level 3)
    // ─────────────────────────────────────────────────────────────

    // 1) Health Data Privacy
    {
      id: "hipaa",
      name: "HIPAA",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },

    // 2) Medical Device QMS
    {
      id: "iso13485",
      name: "ISO 13485",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "iso14971",
      name: "ISO 14971",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "fda_part11",
      name: "FDA 21 CFR\nPart 11",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "iso_15223_1",
      name: "ISO 15223-1",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "iso_10993",
      name: "ISO 10993",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "alcoa_plus",
      name: "ALCOA+",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "dhf_dhr",
      name: "DHF / DHR",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "audit_trails",
      name: "Audit Trails",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },

    // 3) Clinical & Lab Standards
    {
      id: "gcp",
      name: "GCP\n(Good Clinical Practice)",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "glp",
      name: "GLP\n(Good Laboratory Practice)",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
    {
      id: "gmp",
      name: "GMP\n(Good Manufacturing Practice)",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },

    // 4) Health IT Standards
    {
      id: "dicom",
      name: "DICOM",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },

    // 5) Accessibility
    {
      id: "wcag",
      name: "WCAG",
      val: 20,
      color: "#95a5a6",
      category: "tool",
      level: 3,
    },
  ],

  links: [
    // ─────────────────────────────────────────────────────────────
    // CENTRAL → PRIMARY BRANCHES
    // ─────────────────────────────────────────────────────────────
    { source: "central", target: "engineering", value: 8, category: "primary" },
    { source: "central", target: "software", value: 8, category: "primary" },
    { source: "central", target: "data", value: 8, category: "primary" },
    { source: "central", target: "research", value: 8, category: "primary" },
    { source: "central", target: "compliance", value: 8, category: "primary" },

    // ─────────────────────────────────────────────────────────────
    // ENGINEERING & DESIGN (Domains → Tools)
    // ─────────────────────────────────────────────────────────────
    { source: "engineering", target: "hardware_prototyping", value: 5, category: "branch" },
    { source: "engineering", target: "circuit_sim", value: 5, category: "branch" },
    { source: "engineering", target: "control_signal", value: 5, category: "branch" },

    { source: "hardware_prototyping", target: "arduino", value: 4, category: "tool" },
    { source: "hardware_prototyping", target: "raspberry_pi", value: 4, category: "tool" },
    { source: "hardware_prototyping", target: "biopac", value: 4, category: "tool" },
    { source: "circuit_sim", target: "multisim", value: 4, category: "tool" },
    { source: "control_signal", target: "filter_design", value: 4, category: "tool" },
    { source: "control_signal", target: "control_theory", value: 4, category: "tool" },
    { source: "control_signal", target: "dsp", value: 4, category: "tool" },

    // ─────────────────────────────────────────────────────────────
    // SOFTWARE DEVELOPMENT (Domains → Tools)
    // ─────────────────────────────────────────────────────────────
    { source: "software", target: "languages", value: 5, category: "branch" },
    { source: "software", target: "backend_dev", value: 5, category: "branch" },

    { source: "languages", target: "cpp", value: 4, category: "tool" },
    { source: "languages", target: "python", value: 4, category: "tool" },
    { source: "languages", target: "matlab", value: 4, category: "tool" },
    { source: "languages", target: "labview", value: 4, category: "tool" },
    { source: "languages", target: "r_lang", value: 4, category: "tool" },
    { source: "languages", target: "js_ts", value: 4, category: "tool" },
    { source: "languages", target: "java", value: 4, category: "tool" },

    { source: "backend_dev", target: "aws_lambda", value: 4, category: "tool" },
    { source: "backend_dev", target: "aip_foundry", value: 4, category: "tool" },
    { source: "backend_dev", target: "postgresql", value: 4, category: "tool" },
    { source: "backend_dev", target: "supabase", value: 4, category: "tool" },
    { source: "backend_dev", target: "vercel", value: 4, category: "tool" },

    // ─────────────────────────────────────────────────────────────
    // DATA & ANALYTICS (Domains → Tools)
    // ─────────────────────────────────────────────────────────────
    { source: "data", target: "ml_ai", value: 5, category: "branch" },
    { source: "data", target: "stats_viz", value: 5, category: "branch" },
    { source: "data", target: "hpc_data", value: 5, category: "branch" },

    { source: "ml_ai", target: "xgboost", value: 4, category: "tool" },
    { source: "ml_ai", target: "pytorch", value: 4, category: "tool" },
    { source: "ml_ai", target: "tf_keras", value: 4, category: "tool" },
    { source: "ml_ai", target: "sklearn", value: 4, category: "tool" },
    { source: "ml_ai", target: "pytorch_light", value: 4, category: "tool" },

    { source: "stats_viz", target: "minitab", value: 4, category: "tool" },
    { source: "stats_viz", target: "tableau", value: 4, category: "tool" },
    { source: "stats_viz", target: "powerbi", value: 4, category: "tool" },
    { source: "stats_viz", target: "plotly_seaborn", value: 4, category: "tool" },

    { source: "hpc_data", target: "hpc", value: 4, category: "tool" },

    // ─────────────────────────────────────────────────────────────
    // RESEARCH METHODS (Domains → Tools)
    // ─────────────────────────────────────────────────────────────
    { source: "research", target: "study_design", value: 5, category: "branch" },
    { source: "research", target: "doc_reporting", value: 5, category: "branch" },
    { source: "research", target: "proj_mgmt", value: 5, category: "branch" },

    { source: "study_design", target: "hypothesis_testing", value: 4, category: "tool" },
    { source: "study_design", target: "anova_regression", value: 4, category: "tool" },
    { source: "study_design", target: "data_collection_quality", value: 4, category: "tool" },

    { source: "doc_reporting", target: "latex", value: 4, category: "tool" },

    { source: "proj_mgmt", target: "project_mgmt", value: 4, category: "tool" },
    { source: "proj_mgmt", target: "agile_methods", value: 4, category: "tool" },

    // ─────────────────────────────────────────────────────────────
    // COMPLIANCE (Domains → Tools)
    // ─────────────────────────────────────────────────────────────
    { source: "compliance", target: "health_data_privacy", value: 5, category: "branch" },
    { source: "compliance", target: "medical_device_qms", value: 5, category: "branch" },
    { source: "compliance", target: "clinical_lab_stds", value: 5, category: "branch" },
    { source: "compliance", target: "health_it_standards", value: 5, category: "branch" },
    { source: "compliance", target: "accessibility", value: 5, category: "branch" },

    // 1) Health Data Privacy
    { source: "health_data_privacy", target: "hipaa", value: 4, category: "tool" },

    // 2) Medical Device QMS
    { source: "medical_device_qms", target: "iso13485", value: 4, category: "tool" },
    { source: "medical_device_qms", target: "iso14971", value: 4, category: "tool" },
    { source: "medical_device_qms", target: "fda_part11", value: 4, category: "tool" },
    { source: "medical_device_qms", target: "iso_15223_1", value: 4, category: "tool" },
    { source: "medical_device_qms", target: "iso_10993", value: 4, category: "tool" },
    { source: "medical_device_qms", target: "alcoa_plus", value: 4, category: "tool" },
    { source: "medical_device_qms", target: "dhf_dhr", value: 4, category: "tool" },
    { source: "medical_device_qms", target: "audit_trails", value: 4, category: "tool" },

    // 3) Clinical & Lab Standards
    { source: "clinical_lab_stds", target: "gcp", value: 4, category: "tool" },
    { source: "clinical_lab_stds", target: "glp", value: 4, category: "tool" },
    { source: "clinical_lab_stds", target: "gmp", value: 4, category: "tool" },

    // 4) Health IT Standards
    { source: "health_it_standards", target: "dicom", value: 4, category: "tool" },

    // 5) Accessibility
    { source: "accessibility", target: "wcag", value: 4, category: "tool" },

    // ─────────────────────────────────────────────────────────────
    // IMPROVED / EXPANDED CROSS-LINKS
    // ─────────────────────────────────────────────────────────────

    // 1. Embedded & Control
    { source: "arduino", target: "cpp", value: 3, category: "cross" },
    { source: "arduino", target: "control_theory", value: 3, category: "cross" },
    { source: "raspberry_pi", target: "python", value: 3, category: "cross" },

    // 2. Data Acquisition & Tools
    { source: "biopac", target: "data_collection_quality", value: 3, category: "cross" },
    { source: "labview", target: "biopac", value: 3, category: "cross" },

    // 3. Signal Processing & Simulation
    { source: "matlab", target: "filter_design", value: 3, category: "cross" },
    { source: "python", target: "dsp", value: 3, category: "cross" },
    { source: "cpp", target: "multisim", value: 3, category: "cross" },

    // 4. Visualization & Stats
    { source: "plotly_seaborn", target: "python", value: 3, category: "cross" },
    { source: "anova_regression", target: "minitab", value: 3, category: "cross" },
    // Often R is used for ANOVA/regression
    { source: "anova_regression", target: "r_lang", value: 3, category: "cross" },

    // 5. HPC & ML
    { source: "pytorch_light", target: "hpc", value: 3, category: "cross" },
    // HPC frequently uses C++ for performance-critical tasks
    { source: "hpc", target: "cpp", value: 3, category: "cross" },
    // HPC also uses Python for HPC libraries, parallel computing
    { source: "hpc", target: "python", value: 3, category: "cross" },

    // 6. Medical Imaging
    { source: "dicom", target: "ml_ai", value: 3, category: "cross" },
    { source: "dicom", target: "pytorch", value: 3, category: "cross" },

    // 7. Documentation & QMS
    // DHF / DHR require thorough doc reporting
    { source: "doc_reporting", target: "dhf_dhr", value: 3, category: "cross" },
    // ISO 13485 also requires documented procedures & records
    { source: "doc_reporting", target: "iso13485", value: 3, category: "cross" },

    // 8. Clinical & Lab
    // GLP ensures data integrity in labs, ties to data collection
    { source: "glp", target: "data_collection_quality", value: 3, category: "cross" },
    // GCP demands robust doc & reporting for clinical trials
    { source: "gcp", target: "doc_reporting", value: 3, category: "cross" },

    // 9. Compliance Synergies
    { source: "audit_trails", target: "fda_part11", value: 3, category: "cross" },
    { source: "iso_10993", target: "iso14971", value: 3, category: "cross" },
    { source: "gmp", target: "iso13485", value: 3, category: "cross" },
    { source: "glp", target: "gcp", value: 3, category: "cross" },
    { source: "alcoa_plus", target: "data_collection_quality", value: 3, category: "cross" },

    // 10. Security & Web Dev
    { source: "aws_lambda", target: "hipaa", value: 3, category: "cross" },
    { source: "vercel", target: "js_ts", value: 3, category: "cross" },

    // 11. Accessibility & Web
    { source: "wcag", target: "js_ts", value: 3, category: "cross" },

    // 12. Classical Stats + ML
    { source: "anova_regression", target: "xgboost", value: 3, category: "cross" },
  ],
}

