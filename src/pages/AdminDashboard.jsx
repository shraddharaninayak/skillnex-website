import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  X,
  PlusCircle,
  ArrowUpRight,
  Loader2,
  Layers,
  Settings,
  List,
  BookOpen,
  TrendingUp,
  Globe,
} from "lucide-react";
import fallbackPrograms from "../data/program.js";

const CATEGORIES = ["MARKETING", "CREATIVE", "DESIGN", "GROWTH", "ENGINEERING", "ECOMMERCE", "SECURITY"];

const EMPTY_PROGRAM = {
  title: "",
  slug: "",
  category: "MARKETING",
  description: "",
  duration: "",
  status: "published",
  displayOrder: 0,
  positioningLine: "",
  overview: { heading: "", description: "", note: "" },
  whyBecome: { heading: "", points: [] },
  careerBenefits: { heading: "", points: [] },
  structure: { items: [] },
  process: { heading: "", steps: [] },
  syllabus: [],
  outcomes: { heading: "", points: [] },
  companies: [],
  seo: { title: "", description: "", keywords: [] },
};

export default function AdminDashboard() {
  const shouldReduceMotion = useReducedMotion();

  // Views: 'list' | 'create' | 'edit'
  const [view, setView] = useState("list");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form State
  const [formData, setFormData] = useState(EMPTY_PROGRAM);
  const [activeFormTab, setActiveFormTab] = useState("basic"); // 'basic' | 'content' | 'journey' | 'curriculum'

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Selected Program for preview or delete modal
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* =========================================================
     API Calls
     ========================================================= */

  const fetchAllPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/programs?admin=true");
      if (!res.ok) throw new Error("Failed to load programs from API");
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.warn("API request failed, loading local fallback data:", err);
      if (Array.isArray(fallbackPrograms)) {
        setPrograms(fallbackPrograms);
      }
      setError("Backend API is not currently active. Connect backend to manage database records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPrograms();
  }, []);

  const handleEditClick = async (slug) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/programs/${slug}`);
      let programDetails;
      if (res.ok) {
        programDetails = await res.json();
      } else {
        // Fallback to in-memory list
        programDetails = programs.find((p) => p.slug === slug);
        if (!programDetails) throw new Error("Program details not found");
      }

      const formattedData = {
        ...EMPTY_PROGRAM,
        ...programDetails,
        overview: { ...EMPTY_PROGRAM.overview, ...programDetails.overview },
        whyBecome: {
          heading: programDetails.whyBecome?.heading || "",
          points: programDetails.whyBecome?.points || [],
        },
        careerBenefits: {
          heading: programDetails.careerBenefits?.heading || "",
          points: programDetails.careerBenefits?.points || [],
        },
        structure: {
          items: programDetails.structure?.items || [],
        },
        process: {
          heading: programDetails.process?.heading || "",
          steps: programDetails.process?.steps || [],
        },
        syllabus: programDetails.syllabus || [],
        outcomes: {
          heading: programDetails.outcomes?.heading || "",
          points: programDetails.outcomes?.points || [],
        },
        seo: {
          title: programDetails.seo?.title || "",
          description: programDetails.seo?.description || "",
          keywords: programDetails.seo?.keywords || [],
        },
      };

      setFormData(formattedData);
      setView("edit");
      setActiveFormTab("basic");
    } catch (err) {
      setError("Failed to fetch detailed program: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setFormData({
      ...JSON.parse(JSON.stringify(EMPTY_PROGRAM)),
      displayOrder: programs.length,
    });
    setView("create");
    setActiveFormTab("basic");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.duration) {
      setError("Title, slug, and duration are required fields.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSaving(true);
    setError(null);

    const isEdit = view === "edit";
    const endpoint = isEdit && formData._id ? `/api/programs/${formData._id}` : "/api/programs";
    const method = isEdit && formData._id ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Failed to save program changes");

      showBanner(isEdit ? "Program updated successfully!" : "Program created successfully!");
      setView("list");
      fetchAllPrograms();
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProgram) return;
    try {
      const endpoint = selectedProgram._id
        ? `/api/programs/${selectedProgram._id}`
        : `/api/programs/${selectedProgram.slug}`;
      const res = await fetch(endpoint, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete program");
      showBanner(`Deleted ${selectedProgram.title} successfully.`);
      setShowDeleteModal(false);
      setSelectedProgram(null);
      fetchAllPrograms();
    } catch (err) {
      setError("Failed to delete program: " + err.message);
      setShowDeleteModal(false);
    }
  };

  const showBanner = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  const generateSlug = () => {
    if (!formData.title) return;
    const generated = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setFormData((prev) => ({ ...prev, slug: generated }));
  };

  /* =========================================================
     Form Array Modifiers
     ========================================================= */

  const handleListFieldChange = (section, field, index, value) => {
    setFormData((prev) => {
      const updatedList = [...prev[section][field]];
      updatedList[index] = value;
      return {
        ...prev,
        [section]: { ...prev[section], [field]: updatedList },
      };
    });
  };

  const addListItem = (section, field, defaultValue = "") => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], defaultValue],
      },
    }));
  };

  const removeListItem = (section, field, index) => {
    setFormData((prev) => {
      const updatedList = prev[section][field].filter((_, i) => i !== index);
      return {
        ...prev,
        [section]: { ...prev[section], [field]: updatedList },
      };
    });
  };

  const handleStringArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addStringItem = (field) => {
    if (field === "structure") {
      setFormData((prev) => ({
        ...prev,
        structure: {
          ...prev.structure,
          items: [...(prev.structure?.items || []), ""],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), ""],
      }));
    }
  };

  const removeStringItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNestedStringArrayChange = (parentField, childField, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[parentField][childField]];
      updated[index] = value;
      return {
        ...prev,
        [parentField]: { ...prev[parentField], [childField]: updated },
      };
    });
  };

  const removeNestedStringItem = (parentField, childField, index) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: prev[parentField][childField].filter((_, i) => i !== index),
      },
    }));
  };

  // Process Steps Handler
  const handleProcessStepChange = (index, subField, value) => {
    setFormData((prev) => {
      const updatedSteps = [...prev.process.steps];
      updatedSteps[index] = { ...updatedSteps[index], [subField]: value };
      return {
        ...prev,
        process: { ...prev.process, steps: updatedSteps },
      };
    });
  };

  const addProcessStep = () => {
    setFormData((prev) => ({
      ...prev,
      process: {
        ...prev.process,
        steps: [...(prev.process?.steps || []), { title: "", description: "" }],
      },
    }));
  };

  const removeProcessStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      process: {
        ...prev.process,
        steps: prev.process.steps.filter((_, i) => i !== index),
      },
    }));
  };

  // Syllabus Module Handler
  const handleSyllabusModuleChange = (moduleIndex, field, value) => {
    setFormData((prev) => {
      const updatedSyllabus = [...prev.syllabus];
      updatedSyllabus[moduleIndex] = {
        ...updatedSyllabus[moduleIndex],
        [field]: value,
      };
      return { ...prev, syllabus: updatedSyllabus };
    });
  };

  const addSyllabusModule = () => {
    setFormData((prev) => ({
      ...prev,
      syllabus: [...prev.syllabus, { category: "New Module", topics: [""] }],
    }));
  };

  const removeSyllabusModule = (index) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== index),
    }));
  };

  // Syllabus Topic Handler
  const handleSyllabusTopicChange = (moduleIndex, topicIndex, value) => {
    setFormData((prev) => {
      const updatedSyllabus = [...prev.syllabus];
      const updatedTopics = [...updatedSyllabus[moduleIndex].topics];
      updatedTopics[topicIndex] = value;
      updatedSyllabus[moduleIndex] = {
        ...updatedSyllabus[moduleIndex],
        topics: updatedTopics,
      };
      return { ...prev, syllabus: updatedSyllabus };
    });
  };

  const addSyllabusTopic = (moduleIndex) => {
    setFormData((prev) => {
      const updatedSyllabus = [...prev.syllabus];
      updatedSyllabus[moduleIndex] = {
        ...updatedSyllabus[moduleIndex],
        topics: [...updatedSyllabus[moduleIndex].topics, ""],
      };
      return { ...prev, syllabus: updatedSyllabus };
    });
  };

  const removeSyllabusTopic = (moduleIndex, topicIndex) => {
    setFormData((prev) => {
      const updatedSyllabus = [...prev.syllabus];
      const updatedTopics = updatedSyllabus[moduleIndex].topics.filter(
        (_, i) => i !== topicIndex
      );
      updatedSyllabus[moduleIndex] = {
        ...updatedSyllabus[moduleIndex],
        topics: updatedTopics,
      };
      return { ...prev, syllabus: updatedSyllabus };
    });
  };

  // Filtered Programs
  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#07111f] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg border-b border-cyan-950">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-cyan-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-md font-bold text-white tracking-wider">
            SN
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              SkillNex <span className="text-cyan-400 text-sm font-semibold tracking-wide ml-1 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">Admin Control</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-full"
          >
            Visit Site
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Alert Banners */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl flex items-start gap-3 shadow-sm mb-4"
            >
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-sm font-medium">{error}</div>
              <button onClick={() => setError(null)} className="text-amber-600 hover:text-amber-800">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-start gap-3 shadow-sm mb-4"
            >
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1 text-sm font-medium">{successMsg}</div>
              <button onClick={() => setSuccessMsg(null)} className="text-emerald-500 hover:text-emerald-700">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-4 pb-20">
        <AnimatePresence mode="wait">
          {/* View 1: Program List Table */}
          {view === "list" && (
            <motion.div
              key="list-view"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Toolbar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search program title, slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                  />
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-all bg-white"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-all bg-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>

                  <button
                    onClick={handleCreateClick}
                    className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg shadow-cyan-600/10 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    New Program
                  </button>
                </div>
              </div>

              {/* Table / List Container */}
              {loading ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-cyan-600 animate-spin mb-4" />
                  <p className="text-slate-500 font-medium text-sm">Querying database programs...</p>
                </div>
              ) : filteredPrograms.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
                  <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-slate-700 mb-1">No Programs Found</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                    We couldn't find any courses matching your search criteria. Create a new program to get started.
                  </p>
                  <button
                    onClick={handleCreateClick}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Create Course
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider border-b border-slate-100">
                          <th className="px-6 py-4.5">Display Order</th>
                          <th className="px-6 py-4.5">Program Detail</th>
                          <th className="px-6 py-4.5">Category</th>
                          <th className="px-6 py-4.5">Duration</th>
                          <th className="px-6 py-4.5">Status</th>
                          <th className="px-6 py-4.5">Last Updated</th>
                          <th className="px-6 py-4.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                        {filteredPrograms.map((p) => (
                          <tr key={p._id || p.slug} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4.5 text-slate-400 text-center font-mono">
                              #{p.displayOrder ?? 0}
                            </td>
                            <td className="px-6 py-4.5">
                              <div className="font-bold text-slate-900 leading-snug">{p.title}</div>
                              <div className="text-slate-400 font-mono text-xs mt-0.5">/{p.slug}</div>
                            </td>
                            <td className="px-6 py-4.5">
                              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600 tracking-wide border border-slate-200">
                                {p.category}
                              </span>
                            </td>
                            <td className="px-6 py-4.5 text-slate-500 font-semibold">{p.duration}</td>
                            <td className="px-6 py-4.5">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border ${
                                  p.status === "draft"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${p.status === "draft" ? "bg-amber-500" : "bg-emerald-500"}`} />
                                {p.status === "draft" ? "Draft" : "Published"}
                              </span>
                            </td>
                            <td className="px-6 py-4.5 text-slate-400 text-xs font-mono">
                              {p.updatedAt
                                ? new Date(p.updatedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "—"}
                            </td>
                            <td className="px-6 py-4.5 text-right whitespace-nowrap">
                              <div className="flex justify-end gap-1.5">
                                <Link
                                  to={`/programs/${p.slug}`}
                                  target="_blank"
                                  title="Preview program page"
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 border border-transparent hover:border-cyan-100 transition-all"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => handleEditClick(p.slug)}
                                  title="Edit program details"
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 border border-transparent hover:border-cyan-100 transition-all"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedProgram(p);
                                    setShowDeleteModal(true);
                                  }}
                                  title="Delete program"
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* View 2: Form Creator / Editor */}
          {(view === "create" || view === "edit") && (
            <motion.div
              key="form-view"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Form Title bar */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className="w-10 h-10 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center transition-all hover:shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {view === "edit" ? `Modify "${formData.title}"` : "Design New Program"}
                    </h2>
                    <p className="text-slate-400 text-sm mt-0.5">
                      {view === "edit"
                        ? "Modify existing modules, syllabus structures, or metadata configurations."
                        : "Configure standard fields, curriculum modules, and placements."}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className="border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg shadow-cyan-600/10 inline-flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Publish Changes
                  </button>
                </div>
              </div>

              {/* Tabbed workspace panels */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* Form Navigation Tabs */}
                <div className="lg:col-span-1 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
                  {[
                    { id: "basic", label: "Basic Info & SEO", icon: Settings },
                    { id: "content", label: "Overview & Outcomes", icon: BookOpen },
                    { id: "journey", label: "Journey & Benefits", icon: TrendingUp },
                    { id: "curriculum", label: "Syllabus Curriculum", icon: List },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeFormTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveFormTab(tab.id)}
                        className={`w-full text-left flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                          isActive
                            ? "bg-cyan-50 text-cyan-700 border border-cyan-100"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50 border border-transparent"
                        }`}
                      >
                        <Icon className={`w-4.5 h-4.5 ${isActive ? "text-cyan-600" : "text-slate-400"}`} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Views */}
                <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
                  {/* TAB 1: BASIC INFO & SEO */}
                  {activeFormTab === "basic" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-cyan-600" /> General Setup Details
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Program Title *</label>
                          <input
                            type="text"
                            placeholder="e.g. Social Media Management"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Slug Endpoint *</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="e.g. social-media-management"
                              value={formData.slug}
                              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                            />
                            <button
                              type="button"
                              onClick={generateSlug}
                              className="px-3 border border-slate-200 rounded-xl text-xs hover:bg-slate-50 transition-colors text-slate-500 font-semibold"
                            >
                              Generate
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category *</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors bg-white font-semibold"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Duration *</label>
                          <input
                            type="text"
                            placeholder="e.g. 2 Months, 4 Months"
                            value={formData.duration}
                            onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Display Order</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={formData.displayOrder}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                displayOrder: parseInt(e.target.value) || 0,
                              }))
                            }
                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Status</label>
                          <div className="flex gap-4 items-center h-10 mt-1">
                            <label className="flex items-center gap-2 cursor-pointer font-semibold text-sm">
                              <input
                                type="radio"
                                name="status"
                                value="published"
                                checked={formData.status === "published"}
                                onChange={() => setFormData((prev) => ({ ...prev, status: "published" }))}
                                className="text-cyan-600 focus:ring-cyan-500"
                              />
                              Published
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer font-semibold text-sm">
                              <input
                                type="radio"
                                name="status"
                                value="draft"
                                checked={formData.status === "draft"}
                                onChange={() => setFormData((prev) => ({ ...prev, status: "draft" }))}
                                className="text-cyan-600 focus:ring-cyan-500"
                              />
                              Draft
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Program Card Subtitle / Description *</label>
                        <textarea
                          rows="3"
                          placeholder="Provide a one-sentence hook displaying on the landing card..."
                          value={formData.description}
                          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-y"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Program Tagline (Positioning Line)</label>
                        <input
                          type="text"
                          placeholder="e.g. A complete system to turn beginners into skilled managers..."
                          value={formData.positioningLine}
                          onChange={(e) => setFormData((prev) => ({ ...prev, positioningLine: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>

                      {/* Placements / Hiring Partners */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Hiring Brands / Target Placements</label>
                          <button
                            type="button"
                            onClick={() => addStringItem("companies")}
                            className="text-xs text-cyan-600 hover:text-cyan-700 font-bold inline-flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> Add Brand
                          </button>
                        </div>

                        {formData.companies.length === 0 ? (
                          <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                            No branding partners added. Placements logos will not display on course details.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {formData.companies.map((company, index) => (
                              <div key={`company-${index}`} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  placeholder="e.g. Swiggy"
                                  value={company}
                                  onChange={(e) => handleStringArrayChange("companies", index, e.target.value)}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeStringItem("companies", index)}
                                  className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-400"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* SEO Settings */}
                      <div className="border-t border-slate-100 pt-5 space-y-4">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <Globe className="w-4 h-4 text-slate-400" /> Search Engine Optimization (SEO)
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500">SEO Title</label>
                            <input
                              type="text"
                              placeholder="Title appearing in browser tab..."
                              value={formData.seo?.title || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  seo: { ...prev.seo, title: e.target.value },
                                }))
                              }
                              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500">SEO Keywords (Comma Separated)</label>
                            <input
                              type="text"
                              placeholder="marketing, analytics, advertising..."
                              value={formData.seo?.keywords?.join(", ") || ""}
                              onChange={(e) => {
                                const kwArray = e.target.value
                                  .split(",")
                                  .map((k) => k.trim())
                                  .filter(Boolean);
                                setFormData((prev) => ({
                                  ...prev,
                                  seo: { ...prev.seo, keywords: kwArray },
                                }));
                              }}
                              className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500">SEO Description</label>
                          <textarea
                            rows="2"
                            placeholder="Short search results snippet description..."
                            value={formData.seo?.description || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                seo: { ...prev.seo, description: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: OVERVIEW & OUTCOMES */}
                  {activeFormTab === "content" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-cyan-600" /> Syllabus Overview & Learning Outcomes
                      </h3>

                      {/* Course Overview Panel */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Course Overview Summary</h4>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500">Overview Section Heading</label>
                          <input
                            type="text"
                            placeholder="e.g. What is Social Media Management?"
                            value={formData.overview?.heading || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                overview: { ...prev.overview, heading: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500">Overview Long Description</label>
                          <textarea
                            rows="4"
                            placeholder="Detailed paragraph explaining what the course represents..."
                            value={formData.overview?.description || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                overview: { ...prev.overview, description: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500 resize-y"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500">Overview Highlight Note (Featured Box)</label>
                          <input
                            type="text"
                            placeholder="e.g. It’s not just about posting. It’s about building a brand..."
                            value={formData.overview?.note || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                overview: { ...prev.overview, note: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      {/* Course Outcomes Panel */}
                      <div className="border-t border-slate-100 pt-5 space-y-4">
                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Program Outcomes</h4>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500">Outcomes Title Header</label>
                          <input
                            type="text"
                            placeholder="e.g. By the end of this program, students will be able to:"
                            value={formData.outcomes?.heading || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                outcomes: { ...prev.outcomes, heading: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500">Learning Outcome Targets</label>
                            <button
                              type="button"
                              onClick={() => addListItem("outcomes", "points")}
                              className="text-xs text-cyan-600 hover:text-cyan-700 font-bold inline-flex items-center gap-1"
                            >
                              <PlusCircle className="w-3.5 h-3.5" /> Add Outcome
                            </button>
                          </div>

                          {formData.outcomes.points.length === 0 ? (
                            <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                              No learning outcomes added. Click "Add Outcome" to list student benefits.
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {formData.outcomes.points.map((point, index) => (
                                <div key={`outcome-${index}`} className="flex gap-2 items-center">
                                  <span className="text-xs font-bold text-slate-400 w-5 text-right font-mono">
                                    {(index + 1).toString().padStart(2, "0")}
                                  </span>
                                  <input
                                    type="text"
                                    placeholder="e.g. Manage social media accounts professionally."
                                    value={point}
                                    onChange={(e) => handleListFieldChange("outcomes", "points", index, e.target.value)}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeListItem("outcomes", "points", index)}
                                    className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-400"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: JOURNEY & BENEFITS */}
                  {activeFormTab === "journey" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-cyan-600" /> Career Journey & Placement Steps
                      </h3>

                      {/* Why Become Field */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">"Why Choose This Role?" Pitch</h4>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500">Why Become Heading</label>
                          <input
                            type="text"
                            placeholder="e.g. Why Become a Social Media Manager?"
                            value={formData.whyBecome?.heading || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                whyBecome: { ...prev.whyBecome, heading: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500">Key Points (List of Reasons)</label>
                            <button
                              type="button"
                              onClick={() => addListItem("whyBecome", "points")}
                              className="text-xs text-cyan-600 hover:text-cyan-700 font-bold inline-flex items-center gap-1"
                            >
                              <PlusCircle className="w-3.5 h-3.5" /> Add Point
                            </button>
                          </div>

                          {formData.whyBecome.points.length === 0 ? (
                            <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                              No selling points configured. Click "Add Point" to supply marketing arguments.
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {formData.whyBecome.points.map((point, index) => (
                                <div key={`why-${index}`} className="flex gap-2 items-center">
                                  <span className="text-xs font-bold text-slate-400 w-5 text-right font-mono">
                                    {(index + 1).toString().padStart(2, "0")}
                                  </span>
                                  <input
                                    type="text"
                                    placeholder="e.g. High demand across agencies, startups, and personal brands."
                                    value={point}
                                    onChange={(e) => handleListFieldChange("whyBecome", "points", index, e.target.value)}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeListItem("whyBecome", "points", index)}
                                    className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-400"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Career Benefits Panel */}
                      <div className="border-t border-slate-100 pt-5 space-y-4">
                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Long-Term Career Benefits</h4>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-slate-500">Benefits Title Heading</label>
                          <input
                            type="text"
                            placeholder="e.g. Long-Term Career Benefits"
                            value={formData.careerBenefits?.heading || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                careerBenefits: { ...prev.careerBenefits, heading: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500">Benefit Highlight Points</label>
                            <button
                              type="button"
                              onClick={() => addListItem("careerBenefits", "points")}
                              className="text-xs text-cyan-600 hover:text-cyan-700 font-bold inline-flex items-center gap-1"
                            >
                              <PlusCircle className="w-3.5 h-3.5" /> Add Benefit
                            </button>
                          </div>

                          {formData.careerBenefits.points.length === 0 ? (
                            <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                              No career benefits configured. Click "Add Benefit".
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {formData.careerBenefits.points.map((point, index) => (
                                <div key={`benefit-${index}`} className="flex gap-2 items-center">
                                  <span className="text-xs font-bold text-slate-400 w-5 text-right font-mono">
                                    {(index + 1).toString().padStart(2, "0")}
                                  </span>
                                  <input
                                    type="text"
                                    placeholder="e.g. Scalable career path: Executive → Manager → Strategist."
                                    value={point}
                                    onChange={(e) => handleListFieldChange("careerBenefits", "points", index, e.target.value)}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeListItem("careerBenefits", "points", index)}
                                    className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-400"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Course Structure Items */}
                      <div className="border-t border-slate-100 pt-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Course Training Structure</h4>
                          <button
                            type="button"
                            onClick={() => addStringItem("structure")}
                            className="text-xs text-cyan-600 hover:text-cyan-700 font-bold inline-flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> Add Structure Item
                          </button>
                        </div>

                        {formData.structure.items.length === 0 ? (
                          <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                            No structure points (e.g. "Live Training", "Practical Assignments") added.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {formData.structure.items.map((item, index) => (
                              <div key={`struct-${index}`} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  placeholder="e.g. Live Training Sessions"
                                  value={item}
                                  onChange={(e) => handleNestedStringArrayChange("structure", "items", index, e.target.value)}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeNestedStringItem("structure", "items", index)}
                                  className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-400"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Our Process Learning Steps */}
                      <div className="border-t border-slate-100 pt-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Step-by-Step Learning Process</h4>
                          <button
                            type="button"
                            onClick={addProcessStep}
                            className="text-xs text-cyan-600 hover:text-cyan-700 font-bold inline-flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" /> Add Stage Step
                          </button>
                        </div>

                        <div className="flex flex-col gap-1.5 mb-3">
                          <label className="text-xs font-bold text-slate-500">Process Header Label</label>
                          <input
                            type="text"
                            placeholder="e.g. Our Process"
                            value={formData.process?.heading || ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                process: { ...prev.process, heading: e.target.value },
                              }))
                            }
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-500"
                          />
                        </div>

                        {formData.process.steps.length === 0 ? (
                          <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                            No learning timeline stages configured.
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {formData.process.steps.map((step, index) => (
                              <div
                                key={`step-${index}`}
                                className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-3 relative group"
                              >
                                <button
                                  type="button"
                                  onClick={() => removeProcessStep(index)}
                                  className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 rounded-lg transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>

                                <div className="text-xs font-bold text-cyan-600 font-mono flex items-center gap-1.5">
                                  <span className="w-5 h-5 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-sans font-bold text-[10px]">
                                    {index + 1}
                                  </span>
                                  Learning Stage Detail
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div className="sm:col-span-1 flex flex-col gap-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Stage Title</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Career Clarity"
                                      value={step.title}
                                      onChange={(e) => handleProcessStepChange(index, "title", e.target.value)}
                                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-cyan-500"
                                    />
                                  </div>

                                  <div className="sm:col-span-2 flex flex-col gap-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Stage Description</label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Understanding the role, industry, and opportunities."
                                      value={step.description}
                                      onChange={(e) => handleProcessStepChange(index, "description", e.target.value)}
                                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-cyan-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: SYLLABUS CURRICULUM */}
                  {activeFormTab === "curriculum" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <List className="w-5 h-5 text-cyan-600" /> Syllabus Modules
                        </h3>
                        <button
                          type="button"
                          onClick={addSyllabusModule}
                          className="text-xs bg-cyan-50 hover:bg-cyan-100 border border-cyan-100 text-cyan-700 font-bold px-3 py-1.5 rounded-xl transition-colors inline-flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Module
                        </button>
                      </div>

                      {formData.syllabus.length === 0 ? (
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center text-slate-400">
                          <List className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                          <h4 className="font-bold text-slate-700 mb-1">No Curriculum Defined</h4>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                            You haven't defined any curriculum modules for this course yet. Modules represent categories like "Platform Mastery".
                          </p>
                          <button
                            type="button"
                            onClick={addSyllabusModule}
                            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
                          >
                            Add First Module
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {formData.syllabus.map((module, modIndex) => (
                            <div
                              key={`module-${modIndex}`}
                              className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
                            >
                              {/* Module Title Section */}
                              <div className="bg-slate-50/50 p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className="flex-1 flex gap-2 items-center w-full">
                                  <span className="w-6 h-6 bg-cyan-600 text-white rounded-lg flex items-center justify-center font-bold text-xs shrink-0 shadow-sm font-mono">
                                    {(modIndex + 1).toString().padStart(2, "0")}
                                  </span>
                                  <input
                                    type="text"
                                    placeholder="e.g. Platform Mastery"
                                    value={module.category}
                                    onChange={(e) => handleSyllabusModuleChange(modIndex, "category", e.target.value)}
                                    className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-cyan-500 px-1 py-0.5 text-sm font-bold focus:outline-none"
                                  />
                                </div>

                                <div className="flex gap-2 self-end sm:self-auto">
                                  <button
                                    type="button"
                                    onClick={() => addSyllabusTopic(modIndex)}
                                    className="text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-2.5 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
                                  >
                                    <Plus className="w-3.5 h-3.5" /> Topic
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeSyllabusModule(modIndex)}
                                    className="text-xs border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 text-slate-500 font-semibold px-2 py-1 rounded-lg transition-colors inline-flex items-center"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Topics List */}
                              <div className="p-4 bg-white">
                                {module.topics.length === 0 ? (
                                  <div className="text-center py-4 text-xs text-slate-400 font-medium border border-dashed border-slate-100 rounded-xl">
                                    No syllabus topics listed in this module.
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {module.topics.map((topic, topicIndex) => (
                                      <div key={`topic-${modIndex}-${topicIndex}`} className="flex gap-2 items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                                        <input
                                          type="text"
                                          placeholder="e.g. Instagram Management"
                                          value={topic}
                                          onChange={(e) => handleSyllabusTopicChange(modIndex, topicIndex, e.target.value)}
                                          className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-cyan-500"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => removeSyllabusTopic(modIndex, topicIndex)}
                                          className="p-2 border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-400"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-left"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Program</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-slate-800">"{selectedProgram?.title}"</span>? This will permanently remove the course details page, syllabus parameters, and data documents from the database. This action is irreversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProgram(null);
                  }}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-slate-600 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-rose-600/10"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
