
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  Search,
  Smartphone,
  Users,
  Settings,
  Bell,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Globe,
  LogOut,
  Menu,
  X,
  Eye,
  Clock3,
  FileSearch,
  CircleAlert,
  Filter,
  ChevronRight,
  ClipboardCheck,
  RotateCcw,
  Download,
} from "lucide-react";
import "./App.css";

const API_URL = "http://localhost:5000/api/investigations";

const demoProfiles = [
  {
    name: "BrandShield Official",
    handle: "@brandshield",
    platform: "Instagram",
    status: "Likely Official",
    score: 96,
  },
  {
    name: "BrandShield Support Help",
    handle: "@brandshield_support_help",
    platform: "Instagram",
    status: "Suspicious",
    score: 18,
  },
  {
    name: "Brand Shield Updates",
    handle: "@brand.shield_updates",
    platform: "X",
    status: "Needs Review",
    score: 54,
  },
];

const navigationItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Social Scanner", icon: Users },
  { name: "App Scanner", icon: Smartphone },
  { name: "Investigations", icon: Search },
  { name: "Brand Profile", icon: Settings },
];

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [investigationCount, setInvestigationCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadCount() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Unable to load investigation count");
        }

        if (!cancelled) {
          setInvestigationCount(
            result.count ?? result.data?.length ?? 0
          );
        }
      } catch {
        if (!cancelled) setInvestigationCount(0);
      }
    }

    loadCount();

    return () => {
      cancelled = true;
    };
  }, []);

  const storedSession =
    localStorage.getItem("brandshieldSession") ||
    sessionStorage.getItem("brandshieldSession");

  let session = {};

  try {
    session = storedSession ? JSON.parse(storedSession) : {};
  } catch {
    session = {};
  }

  const displayEmail = session.email || "demo@brandshield.ai";
  const avatar = displayEmail.charAt(0).toUpperCase();

  const filteredProfiles = demoProfiles.filter((profile) =>
    `${profile.name} ${profile.handle} ${profile.platform}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleLogout() {
    localStorage.removeItem("brandshieldSession");
    sessionStorage.removeItem("brandshieldSession");
    navigate("/login", { replace: true });
  }

  function selectTab(tabName) {
    setActiveTab(tabName);
    setSidebarOpen(false);
    setSearch("");
  }

  const pageDescriptions = {
    Dashboard:
      "Monitor your brand's digital presence and review potential threats.",
    "Social Scanner":
      "Review public profile indicators with a transparent risk checklist.",
    "App Scanner":
      "Assess app and developer details against a review checklist.",
    Investigations:
      "Review suspicious signals, inspect evidence, and track case status.",
    "Brand Profile":
      "Manage the official brand details used as a reference for reviews.",
  };

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand-logo sidebar-logo">
          <ShieldCheck size={29} />
          <span>
            BrandShield <b>AI</b>
          </span>
          <button
            className="mobile-close"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="side-caption">WORKSPACE</div>

        <nav className="sidebar-navigation">
          {navigationItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${activeTab === name ? "active" : ""}`}
              onClick={() => selectTab(name)}
            >
              <Icon size={18} />
              <span>{name}</span>
              {name === "Investigations" && (
                <span className="nav-count">{investigationCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="protection-card">
            <ShieldCheck size={23} />
            <strong>Brand protection</strong>
            <p>
              Review suspicious activity and verify evidence before taking
              action.
            </p>
          </div>

          <div className="sidebar-user">
            <div className="avatar">{avatar}</div>
            <div className="sidebar-user-info">
              <strong>{displayEmail.split("@")[0]}</strong>
              <small>{displayEmail}</small>
            </div>
          </div>

          <button className="nav-item logout-button" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>

          <span className="version-text">PROTOTYPE · V1.2</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>

            <div className="breadcrumb-wrap">
              <span className="breadcrumb">Workspace /</span>{" "}
              <span>{activeTab}</span>
            </div>
          </div>

          <div className="topbar-right">
            <span className="demo-label">DEMO DATA</span>

            <div className="notification-wrapper">
              <button
                className="icon-button"
                aria-label="Notifications"
                aria-expanded={showNotifications}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={19} />
              </button>

              {showNotifications && (
                <div className="notification-popover">
                  <div className="notification-title">
                    <strong>Notifications</strong>
                    <button
                      className="notification-close"
                      onClick={() => setShowNotifications(false)}
                      aria-label="Close notifications"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="notification-item">
                    <AlertTriangle size={18} />
                    <div>
                      <strong>Review example signals</strong>
                      <p>Sample cases are ready for manual inspection.</p>
                    </div>
                  </div>

                  <div className="notification-item">
                    <ShieldCheck size={18} />
                    <div>
                      <strong>Workspace ready</strong>
                      <p>Your prototype is ready to explore.</p>
                    </div>
                  </div>

                  <p className="notification-footnote">
                    Sample notifications only.
                  </p>
                </div>
              )}
            </div>

            <div className="avatar topbar-avatar">{avatar}</div>
          </div>
        </header>

        <section className="content-area">
          <div className="page-heading">
            <div>
              <div className="eyebrow">DIGITAL RISK INTELLIGENCE</div>
              <h1>{activeTab}</h1>
              <p>{pageDescriptions[activeTab]}</p>
            </div>

            <span className="workspace-status">
              <span className="live-dot" /> Prototype workspace
            </span>
          </div>

          {activeTab === "Dashboard" && (
            <DashboardOverview
              filteredProfiles={filteredProfiles}
              search={search}
              setSearch={setSearch}
              onNavigate={selectTab}
            />
          )}

          {activeTab === "Social Scanner" && (
            <ScannerPanel
              title="Social Profile Scanner"
              description="Assess profile indicators with a transparent demo risk check."
              placeholder="Profile URL or handle, e.g. @brandname"
              buttonLabel="Analyze profile"
              scannerType="social"
            />
          )}

          {activeTab === "App Scanner" && (
            <ScannerPanel
              title="Mobile App Scanner"
              description="Review app identity and developer details using a guided checklist."
              placeholder="App name, store URL, or developer"
              buttonLabel="Analyze app"
              scannerType="app"
            />
          )}

          {activeTab === "Investigations" && (
            <Investigations onCountChange={setInvestigationCount} />
          )}

          {activeTab === "Brand Profile" && <BrandProfile />}
        </section>
      </main>
    </div>
  );
}

function DashboardOverview({
  filteredProfiles,
  search,
  setSearch,
  onNavigate,
}) {
  return (
    <>
      <div className="notice">
        <ShieldCheck size={20} />
        <div>
          <strong>Welcome to BrandShield AI</strong>
          <p>
            Sample data demonstrates how this prototype organizes signals.
            It does not represent live platform monitoring.
          </p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={<Users size={22} />}
          label="Profiles reviewed"
          value="128"
          detail="Illustrative demo metric"
          tone="blue"
        />
        <StatCard
          icon={<AlertTriangle size={22} />}
          label="Suspicious signals"
          value="12"
          detail="Requires manual verification"
          tone="red"
        />
        <StatCard
          icon={<Smartphone size={22} />}
          label="Apps reviewed"
          value="24"
          detail="Illustrative demo metric"
          tone="purple"
        />
        <StatCard
          icon={<CheckCircle size={22} />}
          label="Likely official"
          value="96"
          detail="Based on example indicators"
          tone="green"
        />
      </div>

      <div className="quick-actions">
        <QuickAction
          icon={<Users size={21} />}
          title="Scan social profile"
          subtitle="Review a public account"
          onClick={() => onNavigate("Social Scanner")}
        />
        <QuickAction
          icon={<Smartphone size={21} />}
          title="Review mobile app"
          subtitle="Check app risk indicators"
          tone="purple"
          onClick={() => onNavigate("App Scanner")}
        />
        <QuickAction
          icon={<Globe size={21} />}
          title="Configure your brand"
          subtitle="Add official brand details"
          tone="green"
          onClick={() => onNavigate("Brand Profile")}
        />
      </div>

      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Social profile monitoring</h2>
            <p>Example accounts and their assessment status</p>
          </div>
          <span className="table-count">{filteredProfiles.length} RESULTS</span>
        </div>

        <input
          className="search-input"
          placeholder="Search profiles, handles or platforms..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search demo profiles"
        />

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PROFILE</th>
                <th>PLATFORM</th>
                <th>ASSESSMENT</th>
                <th>CONFIDENCE</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile) => (
                <tr key={profile.handle}>
                  <td>
                    <strong>{profile.name}</strong>
                    <small>{profile.handle}</small>
                  </td>
                  <td>{profile.platform}</td>
                  <td>
                    <Status status={profile.status} />
                  </td>
                  <td>
                    <ScoreBar score={profile.score} />
                  </td>
                </tr>
              ))}

              {filteredProfiles.length === 0 && (
                <tr>
                  <td colSpan="4">No matching demo profiles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="panel-footer">
          <span>Illustrative sample records, not live findings.</span>
          <button
            className="text-action"
            onClick={() => onNavigate("Social Scanner")}
          >
            Open scanner <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </>
  );
}

function QuickAction({ icon, title, subtitle, tone = "blue", onClick }) {
  return (
    <button className="quick-action-card" onClick={onClick}>
      <span className={`quick-action-icon ${tone}`}>{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <ArrowRight size={18} />
    </button>
  );
}

function StatCard({ icon, label, value, detail, tone }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function ScoreBar({ score }) {
  return (
    <div className="score-cell">
      <div className="score-track">
        <span style={{ width: `${score}%` }} />
      </div>
      <strong>{score}%</strong>
    </div>
  );
}

function Status({ status }) {
  const className =
    status === "Likely Official" ||
    status === "Resolved" ||
    status === "Completed"
      ? "official"
      : status === "Suspicious" ||
          status === "Open" ||
          status === "Pending"
        ? "suspicious"
        : status === "In Review" || status === "In Progress"
          ? "reviewing"
          : "review";

  return (
    <span className={`status-pill ${className}`}>
      <span />
      {status}
    </span>
  );
}

function ScannerPanel({
  title,
  description,
  placeholder,
  buttonLabel,
  scannerType,
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const isSocial = scannerType === "social";
  const API_URL = "http://localhost:5000/api/investigations";

  async function assess(event) {
    event.preventDefault();

    const cleaned = query.trim();

    if (!cleaned) {
      setError("Enter a profile or app detail before starting the assessment.");
      setResult(null);
      setSaveMessage("");
      return;
    }

    setError("");
    setSaveMessage("");
    setResult(null);
    setSaving(true);

    const signals = isSocial
      ? [
          {
            label: "Official website link",
            detail: "Needs manual verification",
            state: "review",
          },
          {
            label: "Username similarity",
            detail: "Compare with official brand handles",
            state: "warning",
          },
          {
            label: "Ownership evidence",
            detail: "No external verification performed",
            state: "review",
          },
          {
            label: "Account history",
            detail: "Not available in this demo",
            state: "neutral",
          },
        ]
      : [
          {
            label: "Developer identity",
            detail: "Needs independent verification",
            state: "review",
          },
          {
            label: "Official store link",
            detail: "Compare with the brand website",
            state: "warning",
          },
          {
            label: "App permissions",
            detail: "Not inspected by this demo",
            state: "neutral",
          },
          {
            label: "Publisher evidence",
            detail: "No store lookup performed",
            state: "review",
          },
        ];

    const score = isSocial ? 72 : 68;

    const riskLevel =
      score >= 80
        ? "Critical"
        : score >= 60
          ? "High"
          : score >= 35
            ? "Medium"
            : "Low";

    const scanResult = {
      query: cleaned,
      score,
      status: "Needs Review",
      signals,
    };

    // Display the demo assessment in the existing UI.
    setResult(scanResult);

    // Extract a URL only if the user entered a valid-looking HTTP(S) URL.
    let targetUrl = "";

    try {
      const candidate = /^https?:\/\//i.test(cleaned)
        ? new URL(cleaned)
        : null;

      if (candidate && ["http:", "https:"].includes(candidate.protocol)) {
        targetUrl = candidate.href;
      }
    } catch {
      targetUrl = "";
    }

    // Use the URL's hostname as the brand name when possible.
    let brandName = cleaned.replace(/^@/, "");

    if (targetUrl) {
      brandName = new URL(targetUrl).hostname.replace(/^www\./, "");
    }

    const payload = {
      brandName,
      platform: isSocial ? "Social Profile" : "Mobile App",
      targetUrl,
      riskScore: score,
      riskLevel,
      status: "Pending",
      findings: signals.map(
        (signal) => `${signal.label}: ${signal.detail}`
      ),
      notes: "Demo assessment only. Findings require manual verification.",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not save the investigation.");
      }

      setSaveMessage(
        "Assessment saved successfully! Open Investigations to view it."
      );
    } catch (err) {
      setError(
        `Assessment displayed, but saving failed: ${err.message}. Check that your backend is running.`
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="scanner-panel">
      <div className="scanner-panel-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <form onSubmit={assess}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : buttonLabel}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}

      {saveMessage && <p role="status">{saveMessage}</p>}

      {result && (
        <div className="scanner-result">
          <h3>Assessment Result</h3>
          <p>
            <strong>Target:</strong> {result.query}
          </p>
          <p>
            <strong>Risk Score:</strong> {result.score}/100
          </p>
          <p>
            <strong>Status:</strong> {result.status}
          </p>

          <h4>Assessment Signals</h4>

          <ul>
            {result.signals.map((signal, index) => (
              <li key={index}>
                <strong>{signal.label}:</strong> {signal.detail}
              </li>
            ))}
          </ul>

          <p>
            <em>
              Demo assessment only. No external profiles, app stores, or
              ownership records were checked.
            </em>
          </p>
        </div>
      )}
    </section>
  );

  function reset() {
    setQuery("");
    setResult(null);
    setError("");
  }

  return (
    <div className="scanner-layout">
      <div className="panel scanner-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">ASSESSMENT WORKSPACE</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <span className="scanner-heading-icon">
            {isSocial ? <Users size={22} /> : <Smartphone size={22} />}
          </span>
        </div>

        <form onSubmit={assess} className="scanner-form scanner-form-stacked">
          <label htmlFor={`scanner-query-${scannerType}`}>
            {isSocial
              ? "Public profile URL or handle"
              : "App name, listing URL, or developer"}
          </label>
          <input
            id={`scanner-query-${scannerType}`}
            className="search-input"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setResult(null);
              setError("");
            }}
            placeholder={placeholder}
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-button" type="submit">
            {buttonLabel} <ArrowRight size={17} />
          </button>
        </form>

        <div className="scanner-guidance">
          <ShieldCheck size={20} />
          <div>
            <strong>Transparent by design</strong>
            <p>
              This prototype creates a guided checklist. It does not contact
              social platforms or app stores.
            </p>
          </div>
        </div>
      </div>

      <div className="panel scanner-results">
        {result ? (
          <>
            <div className="panel-heading">
              <div>
                <span className="eyebrow">ASSESSMENT RESULT</span>
                <h2>Risk overview</h2>
              </div>
              <span className="demo-label">DEMO</span>
            </div>

            <div className="risk-score-row">
              <div className="risk-score">
                {result.score}
                <small>/100</small>
              </div>
              <div>
                <Status status={result.status} />
                <p className="muted-text">
                  Illustrative score, not a verified finding
                </p>
              </div>
            </div>

            <div className="risk-meter">
              <span style={{ width: `${result.score}%` }} />
            </div>

            <div className="assessment-target">
              <span>ASSESSMENT TARGET</span>
              <strong>{result.query}</strong>
            </div>

            <h3 className="section-subtitle">Indicators to verify</h3>

            <div className="signal-list">
              {result.signals.map((signal) => (
                <div className="signal-row" key={signal.label}>
                  <span className={`signal-icon ${signal.state}`}>
                    {signal.state === "warning" ? (
                      <AlertTriangle size={17} />
                    ) : signal.state === "review" ? (
                      <Eye size={17} />
                    ) : (
                      <Clock3 size={17} />
                    )}
                  </span>
                  <div>
                    <strong>{signal.label}</strong>
                    <small>{signal.detail}</small>
                  </div>
                </div>
              ))}
            </div>

            <button className="secondary-button" onClick={reset}>
              <RotateCcw size={16} /> New assessment
            </button>
          </>
        ) : (
          <div className="scanner-empty-state scanner-results-empty">
            <span className="scanner-empty-icon">
              {isSocial ? <FileSearch size={25} /> : <Smartphone size={25} />}
            </span>
            <h3>Your assessment will appear here</h3>
            <p>
              Enter a target on the left to see a sample score, review status,
              and a checklist of evidence to verify.
            </p>
            <div className="empty-feature">
              <CheckCircle size={16} /> Clear review indicators
            </div>
            <div className="empty-feature">
              <CheckCircle size={16} /> Explainable checklist
            </div>
            <div className="empty-feature">
              <CheckCircle size={16} /> No claim of live monitoring
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Investigations({ onCountChange }) {
  const [cases, setCases] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [draftNotes, setDraftNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function mapRecord(item) {
    return {
      id: item._id,
      title: `${item.brandName} investigation`,
      target: item.targetUrl || item.brandName,
      platform: item.platform,
      risk: Number(item.riskScore) || 0,
      severity: item.riskLevel || "Low",
      status:
        item.status === "Completed"
          ? "Resolved"
          : item.status === "In Progress"
            ? "In Review"
            : "Open",
      updated: item.updatedAt
        ? new Date(item.updatedAt).toLocaleString()
        : "Recently",
      evidence: item.findings || [],
      notes: item.notes || "",
      brandName: item.brandName,
      databaseStatus: item.status,
    };
  }

  async function fetchInvestigations() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "The server could not return investigations."
        );
      }

      const records = (result.data || []).map(mapRecord);

      setCases(records);
      setSelectedId((current) =>
        records.some((item) => item.id === current)
          ? current
          : records[0]?.id || ""
      );

      setDraftNotes(
        Object.fromEntries(records.map((item) => [item.id, item.notes]))
      );

      onCountChange?.(records.length);
    } catch (err) {
      setError(
        `${err.message} Check that the backend is running at localhost:5000.`
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInvestigations();
  }, []);

  const filteredCases = cases.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesSearch =
      `${item.id} ${item.title} ${item.target} ${item.platform} ${item.brandName}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const selectedCase = cases.find((item) => item.id === selectedId);

  const openCount = cases.filter((item) => item.status === "Open").length;
  const reviewCount = cases.filter(
    (item) => item.status === "In Review"
  ).length;
  const resolvedCount = cases.filter(
    (item) => item.status === "Resolved"
  ).length;
  const highCount = cases.filter(
    (item) =>
      ["High", "Critical"].includes(item.severity) &&
      item.status !== "Resolved"
  ).length;

  // Save notes and status directly to MongoDB.
  async function saveChanges(statusOverride) {
    if (!selectedCase || saving) return;

    setSaving(true);
    setError("");
    setMessage("");

    const notes = draftNotes[selectedCase.id] ?? "";
    const status = statusOverride || selectedCase.status;

    try {
      const response = await fetch(`${API_URL}/${selectedCase.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          notes,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(
          result.message || "Failed to save changes to MongoDB."
        );
      }

      const updatedCase = mapRecord(result.data);

      setCases((previous) =>
        previous.map((item) =>
          item.id === updatedCase.id ? updatedCase : item
        )
      );

      setDraftNotes((previous) => ({
        ...previous,
        [updatedCase.id]: updatedCase.notes,
      }));

      setMessage("Changes saved successfully to MongoDB.");
    } catch (err) {
      setError(err.message || "Unable to save changes.");
    } finally {
      setSaving(false);
    }
  }

  // Mark in review or resolve immediately through the backend.
  async function updateStatus(nextStatus) {
    if (!selectedCase || saving) return;

    await saveChanges(nextStatus);
  }

  function exportReport() {
    if (!selectedCase) return;

    const reportNotes = draftNotes[selectedCase.id] ?? selectedCase.notes;

    const report = [
      "BRANDSHIELD AI - INVESTIGATION REPORT",
      "====================================",
      "",
      `Database ID: ${selectedCase.id}`,
      `Brand: ${selectedCase.brandName}`,
      `Title: ${selectedCase.title}`,
      `Target: ${selectedCase.target}`,
      `Platform: ${selectedCase.platform}`,
      `Risk indicator: ${selectedCase.risk}/100`,
      `Severity: ${selectedCase.severity}`,
      `Status: ${selectedCase.status}`,
      `Last updated: ${selectedCase.updated}`,
      "",
      "EVIDENCE CHECKLIST",
      "------------------",
      ...selectedCase.evidence.map(
        (item, index) => `${index + 1}. ${item}`
      ),
      "",
      "REVIEWER NOTES",
      "--------------",
      reportNotes || "No notes provided.",
      "",
      "NOTICE",
      "Risk indicators should be manually verified before taking action.",
    ].join("\n");

    const blob = new Blob([report], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `investigation-${selectedCase.id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setMessage("Investigation report exported.");
  }

  return (
    <>
      <div className="notice">
        <ShieldCheck size={20} />
        <div>
          <strong>Database investigation records</strong>
          <p>
            Records load from MongoDB through your backend. Risk indicators
            still require manual verification.
          </p>
        </div>
      </div>

      <div className="investigation-stats">
        <MiniStat
          label="Open cases"
          value={openCount}
          icon={<CircleAlert size={19} />}
          tone="red"
        />
        <MiniStat
          label="High risk · unresolved"
          value={highCount}
          icon={<AlertTriangle size={19} />}
          tone="orange"
        />
        <MiniStat
          label="In review"
          value={reviewCount}
          icon={<Eye size={19} />}
          tone="blue"
        />
        <MiniStat
          label="Resolved"
          value={resolvedCount}
          icon={<ClipboardCheck size={19} />}
          tone="green"
        />
      </div>

      {error && (
        <div className="notice">
          <AlertTriangle size={20} />
          <div>
            <strong>Investigation error</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="investigation-workspace">
        <div className="panel case-list-panel">
          <div className="panel-heading">
            <div>
              <h2>Investigation queue</h2>
              <p>Choose a database record to inspect</p>
            </div>

            <button
              className="secondary-button"
              onClick={fetchInvestigations}
              disabled={loading || saving}
            >
              <RotateCcw size={16} /> Refresh
            </button>
          </div>

          <div className="case-tools">
            <div className="case-search">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cases..."
                aria-label="Search investigations"
              />
            </div>

            <div className="case-filter">
              <Filter size={16} />
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter cases"
              >
                <option>All</option>
                <option>Open</option>
                <option>In Review</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <div className="case-list">
            {loading && (
              <p className="no-cases">Loading investigations from MongoDB...</p>
            )}

            {!loading &&
              !error &&
              filteredCases.map((item) => (
                <button
                  key={item.id}
                  className={`case-list-item ${
                    selectedId === item.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedId(item.id);
                    setMessage("");
                    setError("");
                  }}
                >
                  <div className="case-item-top">
                    <span className="case-id">{item.id.slice(-8)}</span>
                    <span
                      className={`severity severity-${item.severity.toLowerCase()}`}
                    >
                      {item.severity} risk
                    </span>
                  </div>

                  <strong>{item.title}</strong>
                  <small>
                    {item.target} · {item.platform}
                  </small>

                  <div className="case-item-bottom">
                    <Status status={item.status} />
                    <span>{item.updated}</span>
                    <ChevronRight size={16} />
                  </div>
                </button>
              ))}

            {!loading && !error && filteredCases.length === 0 && (
              <div className="no-cases">
                {cases.length
                  ? "No cases match your search."
                  : "No investigations in MongoDB yet."}
              </div>
            )}
          </div>
        </div>

        <div className="panel case-detail-panel">
          {loading ? (
            <div className="investigation-empty">
              <Clock3 size={28} />
              <h3>Loading records</h3>
              <p>Please wait while the database records load.</p>
            </div>
          ) : selectedCase ? (
            <>
              <div className="case-detail-header">
                <div>
                  <span className="eyebrow">CASE DETAILS</span>
                  <h2>{selectedCase.title}</h2>
                  <p>
                    {selectedCase.id} · {selectedCase.platform}
                  </p>
                </div>
                <span
                  className={`severity severity-${selectedCase.severity.toLowerCase()}`}
                >
                  {selectedCase.severity} risk
                </span>
              </div>

              <div className="case-target">
                <span>REVIEW TARGET</span>
                <strong>{selectedCase.target}</strong>
                <Status status={selectedCase.status} />
              </div>

              <div className="case-risk-block">
                <div>
                  <span>Risk indicator</span>
                  <strong>
                    {selectedCase.risk}
                    <small>/100</small>
                  </strong>
                </div>
                <div className="risk-meter">
                  <span
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, selectedCase.risk)
                      )}%`,
                    }}
                  />
                </div>
                <p>
                  This score comes from the database record. It is not
                  independently verified by this interface.
                </p>
              </div>

              <h3 className="section-subtitle">Evidence checklist</h3>

              <div className="evidence-list">
                {selectedCase.evidence.length ? (
                  selectedCase.evidence.map((item, index) => (
                    <div className="evidence-item" key={`${index}-${item}`}>
                      <span>{index + 1}</span>
                      <p>{item}</p>
                      <Eye size={16} />
                    </div>
                  ))
                ) : (
                  <p className="no-cases">
                    No evidence has been added to this record.
                  </p>
                )}
              </div>

              <label className="notes-label" htmlFor="review-notes">
                Reviewer notes
              </label>

              <textarea
                id="review-notes"
                className="review-notes"
                value={draftNotes[selectedId] ?? ""}
                onChange={(event) => {
                  setDraftNotes((previous) => ({
                    ...previous,
                    [selectedId]: event.target.value,
                  }));
                  setMessage("");
                  setError("");
                }}
                rows={3}
                placeholder="Add reviewer notes..."
              />

              <div className="case-actions">
                <button
                  className="primary-button"
                  onClick={() => saveChanges()}
                  disabled={saving}
                >
                  <ClipboardCheck size={16} />
                  {saving ? "Saving..." : "Save changes"}
                </button>

                <button
                  className="secondary-button"
                  onClick={exportReport}
                  disabled={saving}
                >
                  <Download size={16} /> Export report
                </button>

                {selectedCase.status !== "In Review" &&
                  selectedCase.status !== "Resolved" && (
                    <button
                      className="secondary-button"
                      onClick={() => updateStatus("In Review")}
                      disabled={saving}
                    >
                      <Eye size={16} />
                      {saving ? "Saving..." : "Mark in review"}
                    </button>
                  )}

                {selectedCase.status !== "Resolved" && (
                  <button
                    className="resolve-button"
                    onClick={() => updateStatus("Resolved")}
                    disabled={saving}
                  >
                    <CheckCircle size={16} />
                    {saving ? "Saving..." : "Resolve case"}
                  </button>
                )}

                {selectedCase.status === "Resolved" && (
                  <button
                    className="secondary-button"
                    onClick={() => updateStatus("Open")}
                    disabled={saving}
                  >
                    <RotateCcw size={16} /> Reopen case
                  </button>
                )}
              </div>

              {message && (
                <p className="case-updated" role="status">
                  {message}
                </p>
              )}

              <p className="case-updated">
                Last updated: {selectedCase.updated}
              </p>
            </>
          ) : (
            <div className="investigation-empty">
              <FileSearch size={28} />
              <h3>Select a case</h3>
              <p>Choose an investigation from the list to review its details.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function MiniStat({ label, value, icon, tone }) {
  return (
    <div className="mini-stat">
      <span className={`mini-stat-icon ${tone}`}>{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function BrandProfile() {
  const [brand, setBrand] = useState(() => {
    try {
      const saved = localStorage.getItem("brandshield-profile");

      if (saved) {
        const parsed = JSON.parse(saved);

        return {
          name: parsed.name || "",
          website: parsed.website || "",
          instagram: parsed.instagram || "",
          developer: parsed.developer || "",
        };
      }
    } catch {
      // Start with an empty profile.
    }

    return {
      name: "",
      website: "",
      instagram: "",
      developer: "",
    };
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(event) {
    const { name, value } = event.target;

    setBrand((previous) => ({ ...previous, [name]: value }));
    setSaved(false);
    setError("");
  }

  function saveProfile(event) {
    event.preventDefault();

    if (brand.website.trim()) {
      try {
        const website = new URL(brand.website.trim());

        if (!["http:", "https:"].includes(website.protocol)) {
          setError("Please enter a valid HTTP or HTTPS website URL.");
          return;
        }
      } catch {
        setError("Enter a complete URL, such as https://example.com.");
        return;
      }
    }

    try {
      localStorage.setItem("brandshield-profile", JSON.stringify(brand));
      setSaved(true);
      setError("");
    } catch {
      setError("Unable to save the profile in this browser.");
    }
  }

  return (
    <div className="brand-profile-layout">
      <div className="panel">
        <div className="panel-heading">
          <div>
            <h2>Official brand profile</h2>
            <p>Set the reference details used during manual reviews.</p>
          </div>
          <Globe size={22} />
        </div>

        <form className="brand-form" onSubmit={saveProfile}>
          <label>
            Brand name
            <input
              name="name"
              value={brand.name}
              onChange={update}
              placeholder="e.g. Example Brand"
              required
            />
          </label>

          <label>
            Official website
            <input
              name="website"
              value={brand.website}
              onChange={update}
              placeholder="https://example.com"
            />
          </label>

          <label>
            Official social handle
            <input
              name="instagram"
              value={brand.instagram}
              onChange={update}
              placeholder="@officialhandle"
            />
          </label>

          <label>
            Official app developer
            <input
              name="developer"
              value={brand.developer}
              onChange={update}
              placeholder="Verified developer name"
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-button" type="submit">
            Save brand profile <ArrowRight size={17} />
          </button>

          {saved && (
            <p className="saved-message">
              <CheckCircle size={17} /> Brand profile saved in this browser.
            </p>
          )}
        </form>
      </div>

      <div className="panel brand-preview-panel">
        <span className="eyebrow">BRAND REFERENCE</span>
        <div className="brand-preview-icon">
          <ShieldCheck size={28} />
        </div>

        <h2>{brand.name || "Your brand name"}</h2>
        <p>Official reference details</p>

        <div className="brand-detail-row">
          <Globe size={17} />
          <span>{brand.website || "Website not added"}</span>
        </div>

        <div className="brand-detail-row">
          <Users size={17} />
          <span>{brand.instagram || "Social handle not added"}</span>
        </div>

        <div className="brand-detail-row">
          <Smartphone size={17} />
          <span>{brand.developer || "App developer not added"}</span>
        </div>

        {brand.website && /^https?:\/\//i.test(brand.website) && (
          <a
            className="brand-external-link"
            href={brand.website}
            target="_blank"
            rel="noreferrer"
          >
            Open official website <ArrowRight size={15} />
          </a>
        )}

        <p className="notification-footnote">
          Saved in this browser only. Not connected to a backend.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
