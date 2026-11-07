import React, { useState, useMemo } from 'react';
import {
  Network,
  Globe,
  Map,
  MapPin,
  Flag,
  Building,
  AlertTriangle,
  TrendingUp,
  Box,
  ChevronRight,
  ChevronDown,
  Shield,
  Activity,
  Database,
  Sparkles,
  Inbox,
  CheckCircle,
  FileText,
  UserCheck,
  ListFilter,
  Clock,
  Compass,
  Layers,
  Cpu,
  KeyRound,
  DoorOpen,
  Info,
  RotateCcw,
  Plus,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Check,
  X,
  ArrowUpRight,
  Bookmark,
  Radio,
  Wrench,
  BarChart3,
  Calendar,
  Tag,
  Eye,
  Filter,
  ArrowUpDown
} from 'lucide-react';

// ============================================================================
// 1. GEOGRAPHICAL HIERARCHY (3-TIER STRUCTURE: DIVISION -> REGION -> COUNTRY)
// ============================================================================
const GEO_HIERARCHY = {
  "Opening Solutions EMEIA": {
    hasRegions: true,
    regions: {
      "Europe": ["Sweden", "Germany", "Norway"],
      "Middle East": ["UAE", "Saudi Arabia", "Qatar"],
      "India & Africa": ["India", "South Africa", "Kenya"]
    }
  },
  "Opening Solutions Americas": {
    hasRegions: true,
    regions: {
      "North America": ["USA", "Canada", "Mexico"],
      "Latin America": ["Costa Rica", "Panama", "Guatemala"],
      "South America": ["Brazil", "Chile", "Colombia"]
    }
  },
  "Opening Solutions Asia Pacific": {
    hasRegions: true,
    regions: {
      "East Asia": ["China", "South Korea", "Japan"],
      "Southeast Asia": ["Singapore", "Vietnam", "Thailand"],
      "Oceania": ["Australia", "New Zealand", "Fiji"]
    }
  },
  "Entrance Systems": {
    hasRegions: false,
    regions: {}
  },
  "Global Technologies": {
    hasRegions: false,
    regions: {}
  }
};

const DIVISION_LIST = Object.keys(GEO_HIERARCHY);

// ============================================================================
// 2. PRODUCT & TECHNOLOGY NATURE CATEGORIES (8 MULTI-SELECT CATEGORIES)
// ============================================================================
const PRODUCT_CATEGORIES = [
  "Mechanical locks & locking systems",
  "Electromechanical locks",
  "Digital access solutions",
  "Access control systems",
  "Identification & authentication",
  "Automatic doors",
  "Entrance automation",
  "Security doors and hardware"
];

// ============================================================================
// 3. GENERATION PLACEMENT HORIZONS (5 BANDS, MULTI-SELECT)
// ============================================================================
const HORIZON_BANDS = [
  {
    id: "Immediate",
    label: "Immediate",
    sub: "Now / Active Action",
    index: 0,
    color: "bg-[#005A9C]",
    lightBg: "bg-[#EBF5FF]",
    border: "border-[#99CCF3]"
  },
  {
    id: "0–2 years",
    label: "0–2 years",
    sub: "Near-Term Gen N+1",
    index: 1,
    color: "bg-[#0072CE]",
    lightBg: "bg-[#F0F8FF]",
    border: "border-[#B8E2F8]"
  },
  {
    id: "2–5 years",
    label: "2–5 years",
    sub: "Mid-Term Gen N+2",
    index: 2,
    color: "bg-[#00A0DF]",
    lightBg: "bg-[#F4FAFF]",
    border: "border-[#CBEBFB]"
  },
  {
    id: "5–10 years",
    label: "5–10 years",
    sub: "Long-Term Architecture",
    index: 3,
    color: "bg-[#0284C7]",
    lightBg: "bg-[#F8FCFF]",
    border: "border-sky-200"
  },
  {
    id: "10+ years",
    label: "10+ years",
    sub: "Far-Horizon Foresight",
    index: 4,
    color: "bg-slate-600",
    lightBg: "bg-slate-50",
    border: "border-slate-200"
  }
];

// ============================================================================
// 4. PRIORITISED IMPORTANCE LEVELS
// ============================================================================
const PRIORITY_LEVELS = [
  {
    id: "Critical",
    label: "Critical",
    rank: 1,
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    badgeBorder: "border-red-200",
    barBg: "bg-gradient-to-r from-red-600 to-rose-500",
    barLight: "bg-red-50/90 border-red-300 text-red-900",
    dotColor: "bg-red-600",
    activeBtn: "bg-red-600 text-white border-red-600 shadow-sm"
  },
  {
    id: "High",
    label: "High",
    rank: 2,
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    barBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    barLight: "bg-amber-50/90 border-amber-300 text-amber-900",
    dotColor: "bg-amber-500",
    activeBtn: "bg-amber-500 text-white border-amber-500 shadow-sm"
  },
  {
    id: "Standard",
    label: "Standard",
    rank: 3,
    badgeBg: "bg-sky-50",
    badgeText: "text-[#0072CE]",
    badgeBorder: "border-sky-200",
    barBg: "bg-gradient-to-r from-[#0072CE] to-[#00A0DF]",
    barLight: "bg-[#EBF5FF] border-[#82CEF5] text-[#005A9C]",
    dotColor: "bg-[#00A0DF]",
    activeBtn: "bg-[#00A0DF] text-white border-[#00A0DF] shadow-sm"
  },
  {
    id: "Monitor Only",
    label: "Monitor Only",
    rank: 4,
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-600",
    badgeBorder: "border-slate-200",
    barBg: "bg-gradient-to-r from-slate-500 to-slate-400",
    barLight: "bg-slate-100 border-slate-300 text-slate-700",
    dotColor: "bg-slate-400",
    activeBtn: "bg-slate-600 text-white border-slate-600 shadow-sm"
  }
];

const SGE_TYPES = [
  "Carryover (Standard Mechanical Base)",
  "Shape / Module Upgrade (Plug-in Architecture)",
  "Principle Variation (New Core Technology)"
];

// ============================================================================
// 5. EXACT 6 EXAMPLE SIGNALS (2 PENDING IN INBOX, 4 ACTIVE IN LANDSCAPE)
// ============================================================================
const INITIAL_SIGNALS = [
  {
    id: 101,
    title: "Aliro 1.0 digital key standard",
    description: "The Connectivity Standards Alliance (CSA) officially released Aliro 1.0, a unified communication protocol and credential standard designed to ensure seamless interoperability between smartphones, wearables, and access control readers across BLE, UWB, and NFC.",
    category: "Technology & Interoperability Standard",
    originSource: "Connectivity Standards Alliance (CSA) & IoT M2M Council",
    sourceLinks: [
      "https://csa-iot.org/newsroom/introducing-aliro-1-0-a-unified-standard-to-transform-the-access-control-ecosystem/",
      "https://iotm2mcouncil.org/iot-library/news/iot-newsdesk/csa-releases-aliro-1-0-for-digital-access/"
    ],
    sourceType: "Standards Consortium & Industry Release",
    detectedAt: "2026-02-26",
    overallContext: "Published February 26, 2026 by the Connectivity Standards Alliance (CSA). Aliro 1.0 establishes a common application layer and cryptographic credential specification across mobile wallets and physical access readers, reducing fragmentation for OEMs and installers.",
    geoScope: {
      divisions: ["Global Technologies", "Opening Solutions EMEIA", "Opening Solutions Americas"],
      regions: ["Europe", "North America"],
      countries: ["Sweden", "Germany", "USA"]
    },
    productCategories: [
      "Digital access solutions",
      "Electromechanical locks",
      "Identification & authentication",
      "Access control systems"
    ],
    horizons: ["0–2 years", "2–5 years"],
    importance: "Critical",
    sgeStrategy: "Principle Variation (New Core Technology)",
    impact: "Reader Hardware Architecture & Mobile Credential Ecosystem",
    opportunity: "Accelerated enterprise and residential adoption of mobile credentials via standardized Apple/Google/Samsung wallet compatibility without proprietary middle-ware friction.",
    risk: "Commoditization of proprietary reader protocols if hardware value is not shifted toward cloud management and lifecycle security services.",
    status: "pending",
    notes: ""
  },
  {
    id: 102,
    title: "EU Cyber Resilience Act reporting duty",
    description: "Mandatory vulnerability and incident reporting obligations under the EU Cyber Resilience Act (CRA) take effect from 11 September 2026 for manufacturers of products with digital elements, requiring strict 24-hour early warning notifications to ENISA and CSIRT.",
    category: "Regulatory & Cybersecurity Compliance",
    originSource: "McCann FitzGerald Cyber Risk Briefing (EU CRA)",
    sourceLinks: [
      "https://www.mccannfitzgerald.com/knowledge/data-privacy-and-cyber-risk/cyber-resilience-act-reporting-obligations-apply-from-11-september-2026"
    ],
    sourceType: "EU Regulatory & Legal Analysis",
    detectedAt: "2026-09-10",
    overallContext: "Published September 10, 2026 ahead of the September 11, 2026 enforcement deadline. Applies across connected hardware and software products placed on the EU market, mandating continuous vulnerability handling and ENISA single-reporting platform integration.",
    geoScope: {
      divisions: ["Opening Solutions EMEIA", "Global Technologies", "Entrance Systems"],
      regions: ["Europe"],
      countries: ["Sweden", "Germany", "Norway"]
    },
    productCategories: [
      "Digital access solutions",
      "Access control systems",
      "Electromechanical locks",
      "Identification & authentication"
    ],
    horizons: ["Immediate", "0–2 years"],
    importance: "Critical",
    sgeStrategy: "Shape / Module Upgrade (Plug-in Architecture)",
    impact: "Product Cybersecurity Architecture & SBOM Lifecycle Management",
    opportunity: "Establish institutional trust as the benchmark CRA-compliant security provider in European commercial infrastructure.",
    risk: "Severe regulatory penalties and sales injunctions in EU markets if connected locks and access controllers lack automated telemetry and SBOM vulnerability tracking.",
    status: "approved",
    notes: "Mandatory across all EU-shipped connected products; requires unified PSIRT telemetry hooks in Gen N+1 firmware."
  },
  {
    id: 103,
    title: "EU Machinery Regulation",
    description: "The new EU Machinery Regulation (EU 2023/1230) becomes mandatory on 20 January 2027, replacing the old Machinery Directive and introducing legally binding cybersecurity, safety-control protection against corruption, and AI self-evolving behavior assessments for power-operated doors and industrial gates.",
    category: "Safety, AI & Machinery Directive",
    originSource: "Ecorpit & UL Solutions Regulatory Analysis (EU 2023/1230)",
    sourceLinks: [
      "https://ecorpit.com/eu-machinery-regulation-cybersecurity-ai-2027/",
      "https://www.ul.com/resources/navigating-new-eu-machinery-regulation-eu-20231230"
    ],
    sourceType: "EU Safety & Machinery Regulation",
    detectedAt: "2026-11-01",
    overallContext: "Published November 1, 2026 regarding the January 20, 2027 mandatory transition without grace period. Directly impacts automated pedestrian doors, industrial sectional doors, and perimeter security gates integrating connected control units or AI-assisted presence detection.",
    geoScope: {
      divisions: ["Entrance Systems", "Opening Solutions EMEIA"],
      regions: ["Europe"],
      countries: ["Sweden", "Germany", "Norway"]
    },
    productCategories: [
      "Automatic doors",
      "Entrance automation",
      "Security doors and hardware"
    ],
    horizons: ["Immediate", "0–2 years", "2–5 years"],
    importance: "High",
    sgeStrategy: "Principle Variation (New Core Technology)",
    impact: "Automated Door Controllers & Safety-Critical AI Sensor Loops",
    opportunity: "Differentiate automated entrance systems with certified safety-critical AI motion sensing and tamper-proof drive controllers.",
    risk: "Non-conformity of legacy industrial door and pedestrian operator architectures lacking isolated safety-cybersecurity control loops by the 2027 cutoff.",
    status: "approved",
    notes: "Key architectural requirement for Entrance Systems pedestrian and industrial door controllers prior to January 2027."
  },
  {
    id: 104,
    title: "EU Digital Identity Wallet rollout",
    description: "Under eIDAS 2.0, EU Member States are rolling out interoperable European Digital Identity (EUDI) Wallets in 2026, enabling citizens and employees to store verified government IDs, professional attributes, and physical/digital access credentials in a single sovereign wallet.",
    category: "Digital Identity & Public Policy",
    originSource: "Kennedys Law & B2Trust eIDAS 2.0 Implementation Tracker",
    sourceLinks: [
      "https://kennedyslaw.com/en/thought-leadership/article/2026/the-european-digital-identity-framework-introducing-the-new-eu-digital-identity-wallet/",
      "https://b2trust.com/en/blog/eidas-2-implementation-status-eu-27-q2-2026"
    ],
    sourceType: "Digital Identity Policy & Legal Tracker",
    detectedAt: "2026-03-25",
    overallContext: "Published March 25, 2026. Tracks the technical architecture and national implementation milestones across EU-27 for eIDAS 2.0 EUDI wallets, highlighting proximity verification (ISO/IEC 18013-5) for physical building access and high-security enterprise onboarding.",
    geoScope: {
      divisions: ["Global Technologies", "Opening Solutions EMEIA"],
      regions: ["Europe"],
      countries: ["Sweden", "Germany", "Norway"]
    },
    productCategories: [
      "Identification & authentication",
      "Digital access solutions",
      "Access control systems"
    ],
    horizons: ["0–2 years", "2–5 years", "5–10 years"],
    importance: "High",
    sgeStrategy: "Principle Variation (New Core Technology)",
    impact: "Credential Issuance Platforms & ISO 18013-5 Reader Verification",
    opportunity: "Integrate EUDI verifiable credentials directly into enterprise, hospitality, and public-sector physical access ecosystems.",
    risk: "Disintermediation of proprietary credential issuance platforms if public-sector and commercial tenants standardize on state-backed EUDI wallets.",
    status: "approved",
    notes: "Enable seamless EUDI attribute verification in commercial access control and visitor management platforms."
  },
  {
    id: 105,
    title: "US Section 232 metal tariff restructuring",
    description: "Restructured and elevated US Section 232 tariffs on imported aluminum, steel, and copper derivatives directly impact bill-of-materials costs for commercial hollow-metal doors, aluminum storefront frames, and mechanical lock hardware manufactured or assembled across North American supply chains.",
    category: "Supply Chain, Trade & Materials",
    originSource: "Aluminum Extruders Council (AEC) & GingerControl Trade Briefings",
    sourceLinks: [
      "https://aec.org/new-section-232-proclamation-reshapes-tariff-treatment-aluminum-steel-and-copper-imports",
      "https://gingercontrol.com/briefings/section-232-aluminum-steel-and-copper-tariffs-are-raised-a140cba6"
    ],
    sourceType: "Trade Policy & Supply Chain Briefing",
    detectedAt: "2026-04-13",
    overallContext: "Published April 13, 2026. Details the revised Section 232 tariff proclamations affecting primary and downstream steel, aluminum, and copper components, requiring melt-and-pour origin tracing and BOM value-engineering across North American door and hardware manufacturing.",
    geoScope: {
      divisions: ["Opening Solutions Americas", "Entrance Systems"],
      regions: ["North America"],
      countries: ["USA", "Canada", "Mexico"]
    },
    productCategories: [
      "Mechanical locks & locking systems",
      "Security doors and hardware",
      "Automatic doors"
    ],
    horizons: ["Immediate", "0–2 years"],
    importance: "High",
    sgeStrategy: "Shape / Module Upgrade (Plug-in Architecture)",
    impact: "Bill of Materials (BOM) Cost & North American Metal Sourcing",
    opportunity: "Leverage strong local US manufacturing footprint and value-engineering (material substitution) to outperform import-reliant competitors.",
    risk: "Margin compression on heavy mechanical and security door product lines if alloy sourcing and structural designs remain static.",
    status: "pending",
    notes: ""
  },
  {
    id: 106,
    title: "Q3 2026 report: diverging regional demand",
    description: "ASSA ABLOY's Q3 2026 interim report highlights resilient organic growth in Global Technologies, Entrance Systems, and Americas non-residential segments, contrasted against continued softness in APAC (particularly China residential construction) and selective European residential markets—underscoring the need for modular cost-scalable product generations.",
    category: "Macroeconomic & Divisional Market Dynamics",
    originSource: "ASSA ABLOY Q3 2026 Interim Report (Cision & Webull Financial News)",
    sourceLinks: [
      "https://news.cision.com/assa-abloy/r/quarterly-report-q3-2026,c4415570",
      "https://www.webull.com/news/15819054840074240"
    ],
    sourceType: "Corporate Financial Disclosure & Market Report",
    detectedAt: "2026-10-27 08:00 CET",
    overallContext: "Published October 27, 2026 at 08:00 CET by ASSA ABLOY. Highlights strong commercial aftermarket and electromechanical upgrade momentum in Americas and Global Technologies, while emphasizing strict cost control and shared platform modularity for price-sensitive regional markets.",
    geoScope: {
      divisions: [
        "Opening Solutions EMEIA",
        "Opening Solutions Americas",
        "Opening Solutions Asia Pacific",
        "Entrance Systems",
        "Global Technologies"
      ],
      regions: ["Europe", "North America", "East Asia", "Southeast Asia"],
      countries: ["Sweden", "Germany", "USA", "China", "Singapore"]
    },
    productCategories: [
      "Mechanical locks & locking systems",
      "Electromechanical locks",
      "Digital access solutions",
      "Entrance automation"
    ],
    horizons: ["Immediate", "0–2 years", "2–5 years"],
    importance: "Critical",
    sgeStrategy: "Carryover (Standard Mechanical Base)",
    impact: "Cross-Divisional Platform Modularity & R&D Capital Allocation",
    opportunity: "Shift R&D capital toward high-margin recurring aftermarket upgrades, electromechanical retrofits, and commercial specification segments.",
    risk: "Under-utilization of division-specific platforms in depressed residential construction markets if hardware architectures cannot be shared across commercial/residential tiers.",
    status: "approved",
    notes: "Prioritize shared core platform architectures that scale from value-tier residential to high-margin commercial aftermarket."
  }
];

// Helper to format a signal's geographical scope into a concise summary string
function formatGeoSummary(geoScope) {
  if (!geoScope) return "Global Scope";
  const divCount = geoScope.divisions?.length || 0;
  const regCount = geoScope.regions?.length || 0;
  const countryCount = geoScope.countries?.length || 0;

  if (countryCount > 0) {
    const preview = geoScope.countries.slice(0, 3).join(", ");
    const extra = countryCount > 3 ? ` +${countryCount - 3}` : "";
    return `${preview}${extra} (${ geoScope.regions.join("/") || geoScope.divisions[0] })`;
  }
  if (regCount > 0) {
    return `${geoScope.regions.join(", ")}`;
  }
  if (divCount > 0) {
    return geoScope.divisions.join(", ");
  }
  return "Unassigned Geography";
}

export default function App() {
  const [signals, setSignals] = useState(INITIAL_SIGNALS);
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'landscape'
  const [selectedId, setSelectedId] = useState(101);

  // Inbox Filters & Sorting
  const [inboxSearch, setInboxSearch] = useState('');
  const [inboxSortBy, setInboxSortBy] = useState('PRIORITY'); // 'PRIORITY' | 'DATE'

  // Signal Landscape State
  const [landscapeGroupBy, setLandscapeGroupBy] = useState('PRODUCT'); // 'PRODUCT' | 'GEO' | 'PRIORITY'
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [geoDivisionFilter, setGeoDivisionFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('PRIORITY_DESC'); // 'PRIORITY_DESC' | 'HORIZON_ASC'
  const [searchQuery, setSearchQuery] = useState('');

  // Cross-lane Hover & Side Drawer state in Signal Landscape
  const [hoveredSignalId, setHoveredSignalId] = useState(null);
  const [drawerSignalId, setDrawerSignalId] = useState(null);

  // Simulate New Signal Modal State
  const [showNewSignalModal, setShowNewSignalModal] = useState(false);
  const [newSig, setNewSig] = useState({
    title: "",
    description: "",
    originSource: "Internal Divisional Workshop / Market Radar",
    sourceLink: "",
    sourceType: "Field Intelligence",
    overallContext: "",
    geoScope: {
      divisions: ["Opening Solutions EMEIA"],
      regions: ["Europe"],
      countries: ["Sweden"]
    },
    productCategories: ["Electromechanical locks", "Digital access solutions"],
    horizons: ["0–2 years", "2–5 years"],
    importance: "High",
    sgeStrategy: SGE_TYPES[0],
    opportunity: "",
    risk: ""
  });

  // Helper to get Priority metadata
  const getPriorityMeta = (level) =>
    PRIORITY_LEVELS.find(p => p.id === level) || PRIORITY_LEVELS[2];

  // Derived Pending & Approved lists
  const pendingSignals = useMemo(() => {
    return signals
      .filter(s => s.status === 'pending')
      .filter(s => {
        if (!inboxSearch.trim()) return true;
        const q = inboxSearch.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.originSource.toLowerCase().includes(q) ||
          s.productCategories.some(c => c.toLowerCase().includes(q)) ||
          s.geoScope.countries.some(c => c.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (inboxSortBy === 'PRIORITY') {
          return getPriorityMeta(a.importance).rank - getPriorityMeta(b.importance).rank;
        }
        return b.id - a.id;
      });
  }, [signals, inboxSearch, inboxSortBy]);

  const approvedSignals = useMemo(() => signals.filter(s => s.status === 'approved'), [signals]);

  const activeSignal = useMemo(
    () => signals.find(s => s.id === selectedId) || pendingSignals[0] || signals[0] || null,
    [signals, selectedId, pendingSignals]
  );

  const drawerSignal = useMemo(
    () => signals.find(s => s.id === drawerSignalId) || null,
    [signals, drawerSignalId]
  );

  // ==========================================================================
  // MUTATION HANDLERS FOR ACTIVE SIGNAL IN INBOX
  // ==========================================================================
  const handleUpdateSignalField = (signalId, field, value) => {
    setSignals(prev =>
      prev.map(sig => (sig.id === signalId ? { ...sig, [field]: value } : sig))
    );
  };

  // Toggle a Product & Technology Category (Multi-Select, keep at least 1)
  const handleToggleProductCategory = (signalId, category) => {
    setSignals(prev =>
      prev.map(sig => {
        if (sig.id !== signalId) return sig;
        const exists = sig.productCategories.includes(category);
        if (exists && sig.productCategories.length === 1) return sig; // keep at least 1
        const updated = exists
          ? sig.productCategories.filter(c => c !== category)
          : [...sig.productCategories, category];
        return { ...sig, productCategories: updated };
      })
    );
  };

  // Toggle a Generation Horizon Band (Multi-Select, keep at least 1)
  const handleToggleHorizon = (signalId, horizonId) => {
    setSignals(prev =>
      prev.map(sig => {
        if (sig.id !== signalId) return sig;
        const exists = sig.horizons.includes(horizonId);
        if (exists && sig.horizons.length === 1) return sig; // keep at least 1
        const updated = exists
          ? sig.horizons.filter(h => h !== horizonId)
          : [...sig.horizons, horizonId];
        // Sort according to HORIZON_BANDS order
        updated.sort(
          (a, b) =>
            HORIZON_BANDS.findIndex(h => h.id === a) -
            HORIZON_BANDS.findIndex(h => h.id === b)
        );
        return { ...sig, horizons: updated };
      })
    );
  };

  // Toggle 3-Tier Geographical Scope (Division -> Region -> Country)
  const handleToggleGeoDivision = (signalId, division) => {
    setSignals(prev =>
      prev.map(sig => {
        if (sig.id !== signalId) return sig;
        const exists = sig.geoScope.divisions.includes(division);
        if (exists && sig.geoScope.divisions.length === 1) return sig; // keep at least 1 division

        let nextDivisions = exists
          ? sig.geoScope.divisions.filter(d => d !== division)
          : [...sig.geoScope.divisions, division];

        // If removing a division, also clean up its child regions and countries
        let nextRegions = [...sig.geoScope.regions];
        let nextCountries = [...sig.geoScope.countries];

        if (exists && GEO_HIERARCHY[division]?.hasRegions) {
          const divRegions = Object.keys(GEO_HIERARCHY[division].regions);
          nextRegions = nextRegions.filter(r => !divRegions.includes(r));
          divRegions.forEach(r => {
            const rCountries = GEO_HIERARCHY[division].regions[r] || [];
            nextCountries = nextCountries.filter(c => !rCountries.includes(c));
          });
        }

        return {
          ...sig,
          geoScope: {
            divisions: nextDivisions,
            regions: nextRegions,
            countries: nextCountries
          }
        };
      })
    );
  };

  const handleToggleGeoRegion = (signalId, division, region) => {
    setSignals(prev =>
      prev.map(sig => {
        if (sig.id !== signalId) return sig;
        const exists = sig.geoScope.regions.includes(region);
        let nextDivisions = sig.geoScope.divisions.includes(division)
          ? sig.geoScope.divisions
          : [...sig.geoScope.divisions, division];

        let nextRegions = exists
          ? sig.geoScope.regions.filter(r => r !== region)
          : [...sig.geoScope.regions, region];

        let nextCountries = [...sig.geoScope.countries];
        if (exists) {
          const rCountries = GEO_HIERARCHY[division]?.regions[region] || [];
          nextCountries = nextCountries.filter(c => !rCountries.includes(c));
        }

        return {
          ...sig,
          geoScope: {
            divisions: nextDivisions,
            regions: nextRegions,
            countries: nextCountries
          }
        };
      })
    );
  };

  const handleToggleGeoCountry = (signalId, division, region, country) => {
    setSignals(prev =>
      prev.map(sig => {
        if (sig.id !== signalId) return sig;
        const exists = sig.geoScope.countries.includes(country);
        let nextDivisions = sig.geoScope.divisions.includes(division)
          ? sig.geoScope.divisions
          : [...sig.geoScope.divisions, division];
        let nextRegions = sig.geoScope.regions.includes(region)
          ? sig.geoScope.regions
          : [...sig.geoScope.regions, region];
        let nextCountries = exists
          ? sig.geoScope.countries.filter(c => c !== country)
          : [...sig.geoScope.countries, country];

        return {
          ...sig,
          geoScope: {
            divisions: nextDivisions,
            regions: nextRegions,
            countries: nextCountries
          }
        };
      })
    );
  };

  const handleApprove = () => {
    if (!activeSignal) return;
    const currentId = activeSignal.id;
    setSignals(prev =>
      prev.map(sig => (sig.id === currentId ? { ...sig, status: 'approved' } : sig))
    );
    const nextPending = pendingSignals.find(s => s.id !== currentId);
    if (nextPending) {
      setSelectedId(nextPending.id);
    }
  };

  const handleResetDemo = () => {
    setSignals(INITIAL_SIGNALS);
    setSelectedId(101);
    setPriorityFilter('ALL');
    setGeoDivisionFilter('ALL');
    setCategoryFilter('ALL');
    setSearchQuery('');
    setInboxSearch('');
    setDrawerSignalId(null);
  };

  // ==========================================================================
  // NEW SIGNAL MODAL HANDLERS
  // ==========================================================================
  const toggleNewSigArrayItem = (field, item) => {
    setNewSig(prev => {
      const list = prev[field];
      const exists = list.includes(item);
      if (exists && list.length === 1) return prev;
      return {
        ...prev,
        [field]: exists ? list.filter(x => x !== item) : [...list, item]
      };
    });
  };

  const toggleNewSigDivision = (div) => {
    setNewSig(prev => {
      const exists = prev.geoScope.divisions.includes(div);
      if (exists && prev.geoScope.divisions.length === 1) return prev;
      const nextDivs = exists
        ? prev.geoScope.divisions.filter(d => d !== div)
        : [...prev.geoScope.divisions, div];
      return {
        ...prev,
        geoScope: { ...prev.geoScope, divisions: nextDivs }
      };
    });
  };

  const handleCreateSignal = (e) => {
    e.preventDefault();
    if (!newSig.title.trim()) return;
    const orderedHorizons = [...newSig.horizons].sort(
      (a, b) =>
        HORIZON_BANDS.findIndex(h => h.id === a) -
        HORIZON_BANDS.findIndex(h => h.id === b)
    );
    const created = {
      id: Date.now(),
      title: newSig.title,
      description:
        newSig.description ||
        "Newly captured strategic signal submitted for generation planning synthesis.",
      category: "Custom Foresight Signal",
      originSource: newSig.originSource,
      sourceLinks: newSig.sourceLink.trim() ? [newSig.sourceLink.trim()] : [],
      sourceType: newSig.sourceType,
      detectedAt: "2026-11-06 | 19:15 CET",
      overallContext:
        newSig.overallContext ||
        newSig.description ||
        "Submitted by operator for cross-divisional evaluation and multi-horizon landscape placement.",
      geoScope: newSig.geoScope,
      productCategories: newSig.productCategories,
      horizons: orderedHorizons,
      importance: newSig.importance,
      sgeStrategy: newSig.sgeStrategy,
      impact: "Product Architecture & Portfolio Strategy",
      opportunity: newSig.opportunity || "Early platform readiness across divisions",
      risk: newSig.risk || "Delayed architectural response",
      status: "pending",
      notes: ""
    };
    setSignals(prev => [created, ...prev]);
    setSelectedId(created.id);
    setActiveTab('inbox');
    setShowNewSignalModal(false);
  };

  // ==========================================================================
  // SIGNAL LANDSCAPE FILTERING, LANES & HEATMAP COMPUTATION
  // ==========================================================================
  const filteredLandscapeSignals = useMemo(() => {
    return approvedSignals
      .filter(sig => {
        if (priorityFilter !== 'ALL' && sig.importance !== priorityFilter) return false;
        if (
          geoDivisionFilter !== 'ALL' &&
          !sig.geoScope.divisions.includes(geoDivisionFilter)
        )
          return false;
        if (
          categoryFilter !== 'ALL' &&
          !sig.productCategories.includes(categoryFilter)
        )
          return false;
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = sig.title.toLowerCase().includes(q);
          const matchDesc = sig.description.toLowerCase().includes(q);
          const matchSource = sig.originSource.toLowerCase().includes(q);
          const matchCat = sig.productCategories.some(c =>
            c.toLowerCase().includes(q)
          );
          const matchCountry = sig.geoScope.countries.some(c =>
            c.toLowerCase().includes(q)
          );
          const matchRegion = sig.geoScope.regions.some(r =>
            r.toLowerCase().includes(q)
          );
          const matchDiv = sig.geoScope.divisions.some(d =>
            d.toLowerCase().includes(q)
          );
          return (
            matchTitle ||
            matchDesc ||
            matchSource ||
            matchCat ||
            matchCountry ||
            matchRegion ||
            matchDiv
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'PRIORITY_DESC') {
          return getPriorityMeta(a.importance).rank - getPriorityMeta(b.importance).rank;
        }
        const aFirst = HORIZON_BANDS.findIndex(h => a.horizons.includes(h.id));
        const bFirst = HORIZON_BANDS.findIndex(h => b.horizons.includes(h.id));
        return aFirst - bFirst;
      });
  }, [
    approvedSignals,
    priorityFilter,
    geoDivisionFilter,
    categoryFilter,
    searchQuery,
    sortOrder
  ]);

  // Compute dynamic vertical swimlanes based on `landscapeGroupBy`
  const landscapeLanes = useMemo(() => {
    if (landscapeGroupBy === 'PRODUCT') {
      return PRODUCT_CATEGORIES.map(cat => ({
        id: cat,
        title: cat,
        subtitle: "Product & Technology Nature",
        signals: filteredLandscapeSignals.filter(s =>
          s.productCategories.includes(cat)
        )
      }));
    }
    if (landscapeGroupBy === 'GEO') {
      return DIVISION_LIST.map(div => ({
        id: div,
        title: div,
        subtitle: GEO_HIERARCHY[div].hasRegions
          ? `Regions: ${Object.keys(GEO_HIERARCHY[div].regions).join(" • ")}`
          : "Global Division Scope",
        signals: filteredLandscapeSignals.filter(s =>
          s.geoScope.divisions.includes(div)
        )
      }));
    }
    // PRIORITY
    return PRIORITY_LEVELS.map(prio => ({
      id: prio.id,
      title: `${prio.label} Priority`,
      subtitle: "Strategic Importance Tier",
      signals: filteredLandscapeSignals.filter(s => s.importance === prio.id)
    }));
  }, [landscapeGroupBy, filteredLandscapeSignals]);

  // Compute total KPI metrics for the Top Overview Strip
  const landscapeStats = useMemo(() => {
    const totalSignals = filteredLandscapeSignals.length;
    const activeCategories = new Set();
    let totalPlacements = 0;

    filteredLandscapeSignals.forEach(sig => {
      sig.productCategories.forEach(c => activeCategories.add(c));
      // Count placements across active lanes * horizons
      const laneMatches =
        landscapeGroupBy === 'PRODUCT'
          ? sig.productCategories.length
          : landscapeGroupBy === 'GEO'
          ? sig.geoScope.divisions.length
          : 1;
      totalPlacements += laneMatches * sig.horizons.length;
    });

    // Maximum cell count in heatmap for normalization
    let maxCell = 1;
    landscapeLanes.forEach(lane => {
      HORIZON_BANDS.forEach(hor => {
        const c = lane.signals.filter(s => s.horizons.includes(hor.id)).length;
        if (c > maxCell) maxCell = c;
      });
    });

    return {
      totalSignals,
      activeThemesCount: activeCategories.size,
      totalPlacements,
      maxCell
    };
  }, [filteredLandscapeSignals, landscapeGroupBy, landscapeLanes]);

  // Count how many lanes a signal appears in (for badge indicator)
  const getSignalLaneCopyCount = (signal) => {
    if (landscapeGroupBy === 'PRODUCT') return signal.productCategories.length;
    if (landscapeGroupBy === 'GEO') return signal.geoScope.divisions.length;
    return 1;
  };

  // Build contiguous horizontal span segments for a signal across the 5 horizon bands
  const getHorizonSegments = (signalHorizons) => {
    const indices = signalHorizons
      .map(hId => HORIZON_BANDS.findIndex(b => b.id === hId))
      .filter(idx => idx !== -1)
      .sort((a, b) => a - b);

    if (indices.length === 0) return [{ start: 0, end: 0 }];

    const segments = [];
    let segStart = indices[0];
    let prev = indices[0];

    for (let i = 1; i < indices.length; i++) {
      if (indices[i] === prev + 1) {
        prev = indices[i];
      } else {
        segments.push({ start: segStart, end: prev });
        segStart = indices[i];
        prev = indices[i];
      }
    }
    segments.push({ start: segStart, end: prev });
    return segments;
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#F4F8FB] text-slate-800 font-sans overflow-hidden">
      {/* ====================================================================
          TOP CORPORATE HEADER (ASSA ABLOY LIGHT THEME)
         ==================================================================== */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 shrink-0 z-30 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <div className="max-w-[1680px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#00A0DF] flex items-center justify-center text-white font-black tracking-tighter text-base shadow-sm">
              AA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-wider text-slate-900 text-base uppercase">
                  ASSA ABLOY
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0072CE] bg-[#EBF5FF] px-2 py-0.5 rounded border border-[#B8E2F8]">
                  Generation Planning &amp; Foresight
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Human-AI Signal Translation &amp; Multi-Horizon Signal Landscape
              </p>
            </div>
          </div>

          {/* Center Navigation Switcher */}
          <div className="flex items-center bg-[#F4F8FB] p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === 'inbox'
                  ? 'bg-[#00A0DF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Inbox size={15} />
              <span>1. Detected Signals Inbox</span>
              { signals.filter(s => s.status === 'pending').length > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    activeTab === 'inbox'
                      ? 'bg-white text-[#0072CE]'
                      : 'bg-[#00A0DF] text-white'
                  }`}
                >
                  {signals.filter(s => s.status === 'pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('landscape')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === 'landscape'
                  ? 'bg-[#00A0DF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Compass size={15} />
              <span>2. Signal Landscape</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'landscape'
                    ? 'bg-white text-[#0072CE]'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {approvedSignals.length}
              </span>
            </button>
          </div>

          {/* Right Utility Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowNewSignalModal(true)}
              className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#0072CE] bg-[#EBF5FF] hover:bg-[#D8EEFF] border border-[#B8E2F8] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Plus size={15} /> Simulate New Signal
            </button>
            <button
              onClick={handleResetDemo}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center gap-1.5"
              title="Reset demo signals to initial state"
            >
              <RotateCcw size={14} /> Reset Demo
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          MAIN WORKSPACE AREA
         ==================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* ==================================================================
            VIEW 1: DETECTED SIGNALS INBOX & HUMAN-AI TRANSLATION
           ================================================================== */}
        {activeTab === 'inbox' && (
          <div className="flex-1 flex overflow-hidden max-w-[1680px] w-full mx-auto">
            {/* LEFT COLUMN: DETECTED SIGNALS QUEUE WITH SEARCH & SORT */}
            <div className="w-96 bg-white border-r border-slate-200 flex flex-col shrink-0">
              <div className="p-4 border-b border-slate-200 bg-[#F8FBFE] space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Sparkles size={16} className="text-[#00A0DF]" />
                      AI-Detected Signals Queue
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Review &amp; translate into generation horizons
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#0072CE] bg-[#EBF5FF] px-2.5 py-1 rounded-full border border-[#B8E2F8]">
                    {pendingSignals.length} Pending
                  </span>
                </div>

                {/* Search & Priority Sort Bar in Inbox */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search
                      size={13}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={inboxSearch}
                      onChange={e => setInboxSearch(e.target.value)}
                      placeholder="Search signals..."
                      className="w-full pl-7 pr-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#00A0DF]"
                    />
                  </div>
                  <select
                    value={inboxSortBy}
                    onChange={e => setInboxSortBy(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[11px] font-bold text-slate-700 focus:outline-none focus:border-[#00A0DF]"
                    title="Sort signals"
                  >
                    <option value="PRIORITY">Sort: Priority</option>
                    <option value="DATE">Sort: Recent</option>
                  </select>
                </div>
              </div>

              {/* Pending Signal Cards List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5 bg-[#F4F8FB]/60">
                {pendingSignals.length === 0 ? (
                  <div className="text-center p-6 bg-white rounded-xl border border-slate-200 my-2">
                    <CheckCircle className="mx-auto mb-2 text-[#00A0DF]" size={32} />
                    <h4 className="font-bold text-slate-800 text-xs mb-1">
                      No Pending Signals Match
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-3">
                      All queued signals have been reviewed or filtered out.
                    </p>
                    <button
                      onClick={() => setActiveTab('landscape')}
                      className="w-full py-2 px-3 bg-[#00A0DF] hover:bg-[#0072CE] text-white font-bold text-xs rounded-lg transition-all"
                    >
                      Open Signal Landscape →
                    </button>
                  </div>
                ) : (
                  pendingSignals.map(signal => {
                    const isSelected = activeSignal && activeSignal.id === signal.id;
                    const prio = getPriorityMeta(signal.importance);

                    return (
                      <button
                        key={signal.id}
                        onClick={() => setSelectedId(signal.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all relative overflow-hidden ${
                          isSelected
                            ? 'bg-white border-[#00A0DF] ring-2 ring-[#00A0DF]/20 shadow-md'
                            : 'bg-white border-slate-200 hover:border-[#82CEF5] shadow-2xs'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${prio.badgeBg} ${prio.badgeText} ${prio.badgeBorder}`}
                          >
                            {signal.importance}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 leading-snug mb-2">
                          {signal.title}
                        </h4>

                        <div className="bg-[#F4F8FB] border border-slate-200/80 rounded-lg p-2 text-[11px] text-slate-600 space-y-1 mb-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <Radio size={11} className="text-[#00A0DF] shrink-0" />
                            <span className="font-semibold text-slate-700 truncate">
                              {signal.originSource}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 gap-2">
                            <span className="flex items-center gap-1 font-medium text-slate-700 truncate">
                              <MapPin size={10} className="text-[#0072CE] shrink-0" />
                              <span className="truncate">{formatGeoSummary(signal.geoScope)}</span>
                            </span>
                            <span className="flex items-center gap-1 shrink-0">
                              <Clock size={10} />
                              {signal.detectedAt.split(' ')[0]}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-semibold text-slate-500 pt-0.5">
                          <span className="text-[#005A9C] truncate max-w-[180px]">
                            {signal.productCategories.length} Tech Categor{signal.productCategories.length === 1 ? 'y' : 'ies'}
                          </span>
                          <span className="bg-[#EBF5FF] text-[#0072CE] px-1.5 py-0.5 rounded border border-[#B8E2F8]">
                            {signal.horizons.join(' → ')}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}

                {/* Approved Signals Reference List */}
                <div className="pt-3">
                  <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Active in Signal Landscape ({approvedSignals.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {approvedSignals.map(sig => (
                      <button
                        key={sig.id}
                        onClick={() => setSelectedId(sig.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all flex items-center justify-between gap-2 ${
                          activeSignal?.id === sig.id
                            ? 'bg-[#EBF5FF] border-[#00A0DF] text-[#005A9C] font-semibold'
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white'
                        }`}
                      >
                        <span className="truncate">{sig.title}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          {sig.horizons.length} {sig.horizons.length === 1 ? 'Band' : 'Bands'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIGNAL INFORMATION & HUMAN-AI SYMBIOSIS TRANSLATION */}
            <div className="flex-1 flex flex-col bg-[#F4F8FB] overflow-hidden">
              {activeSignal ? (
                <>
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                      {/* 1. SIGNAL HEADER CARD */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#EBF5FF] text-[#0072CE] border border-[#B8E2F8]">
                              {activeSignal.category}
                            </span>
                            {activeSignal.status === 'approved' && (
                              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                <CheckCircle size={12} /> Active in Landscape
                              </span>
                            )}
                          </div>
                        </div>

                        <h1 className="text-xl lg:text-2xl font-extrabold text-slate-900 mb-2">
                          {activeSignal.title}
                        </h1>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {activeSignal.description}
                        </p>
                      </div>

                      {/* 2. SIGNAL INFORMATION BOX */}
                      <div className="bg-white border-2 border-[#B8E2F8] rounded-2xl overflow-hidden shadow-2xs">
                        <div className="bg-gradient-to-r from-[#EBF5FF] to-[#F4F8FB] px-6 py-3 border-b border-[#B8E2F8] flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Info size={16} className="text-[#0072CE]" />
                            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#005A9C]">
                              Signal Information
                            </h3>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                            {/* Origin & Source */}
                            <div className="bg-[#F8FBFE] border border-slate-200 rounded-xl p-3.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                                <Radio size={12} className="text-[#00A0DF]" /> Origin &amp; Source
                              </span>
                              <p className="text-xs font-bold text-slate-900 leading-snug">
                                {activeSignal.originSource}
                              </p>
                              <span className="inline-block mt-1 text-[10px] text-[#0072CE] font-medium">
                                {activeSignal.sourceType}
                              </span>
                              {activeSignal.sourceLinks && activeSignal.sourceLinks.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-slate-200/80 space-y-1">
                                  {activeSignal.sourceLinks.map((url, idx) => (
                                    <a
                                      key={idx}
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-[10px] font-semibold text-[#0072CE] hover:text-[#00A0DF] hover:underline break-all leading-tight"
                                    >
                                      <ExternalLink size={10} className="shrink-0" />
                                      <span className="truncate">{url}</span>
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Date & Time Detected */}
                            <div className="bg-[#F8FBFE] border border-slate-200 rounded-xl p-3.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                                <Clock size={12} className="text-[#00A0DF]" /> Date &amp; Time Detected
                              </span>
                              <p className="text-xs font-bold text-slate-900">
                                {activeSignal.detectedAt}
                              </p>
                            </div>

                            {/* Geographical Spread Summary */}
                            <div className="bg-[#F8FBFE] border border-slate-200 rounded-xl p-3.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                                <Globe size={12} className="text-[#00A0DF]" /> Geographical Spread
                              </span>
                              <p className="text-xs font-bold text-slate-900 leading-snug">
                                {activeSignal.geoScope.divisions.join(", ")}
                              </p>
                              <span className="inline-block mt-1 text-[10px] text-[#0072CE] font-semibold">
                                {activeSignal.geoScope.countries.length > 0
                                  ? `Countries: ${activeSignal.geoScope.countries.join(", ")}`
                                  : "Division-Wide Scope"}
                              </span>
                            </div>
                          </div>

                          {/* Extended Context Box */}
                          <div className="bg-[#F4F8FB] border border-slate-200 rounded-xl p-4 mb-4">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#005A9C] mb-1">
                              Extended Context &amp; Cross-Divisional Relevance
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              {activeSignal.overallContext}
                            </p>
                          </div>

                          {/* Opportunity vs Risk Row */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5">
                              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider flex items-center gap-1.5 mb-1">
                                <TrendingUp size={13} /> Strategic Opportunity
                              </span>
                              <p className="text-xs text-emerald-950 font-semibold leading-snug">
                                {activeSignal.opportunity}
                              </p>
                            </div>
                            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5">
                              <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider flex items-center gap-1.5 mb-1">
                                <AlertTriangle size={13} /> Strategic Risk if Ignored
                              </span>
                              <p className="text-xs text-rose-950 font-semibold leading-snug">
                                {activeSignal.risk}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. HUMAN INPUT AND APPROVAL */}
                      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserCheck size={16} className="text-[#00A0DF]" />
                            <h3 className="text-xs font-extrabold uppercase tracking-wider">
                              Human input and approval
                            </h3>
                          </div>
                        </div>

                        <div className="p-6 space-y-6">
                          {/* STEP 1: PRODUCT & TECHNOLOGY NATURE (8 MULTI-SELECT CATEGORIES) */}
                          <div>
                            <div className="flex items-center justify-between mb-2.5">
                              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                1. Product &amp; Technology Nature (Multi-Select)
                              </label>
                              <span className="text-[11px] font-bold text-[#0072CE] bg-[#EBF5FF] px-2.5 py-0.5 rounded-full border border-[#B8E2F8]">
                                {activeSignal.productCategories.length} Selected
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                              {PRODUCT_CATEGORIES.map(category => {
                                const isSelected =
                                  activeSignal.productCategories.includes(category);
                                return (
                                  <button
                                    key={category}
                                    type="button"
                                    onClick={() =>
                                      handleToggleProductCategory(activeSignal.id, category)
                                    }
                                    className={`text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                                      isSelected
                                        ? 'bg-[#EBF5FF] border-[#00A0DF] text-[#005A9C] shadow-2xs ring-1 ring-[#00A0DF]/30'
                                        : 'bg-[#F8FBFE] border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                                    }`}
                                  >
                                    <span className="font-bold text-xs leading-snug">
                                      {category}
                                    </span>
                                    <div
                                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                                        isSelected
                                          ? 'bg-[#00A0DF] border-[#00A0DF] text-white'
                                          : 'border-slate-300 bg-white'
                                      }`}
                                    >
                                      {isSelected && <Check size={11} strokeWidth={3} />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* STEP 2: GENERATION PLACEMENT HORIZONS (5 HORIZON BANDS, MULTI-SELECT) */}
                          <div className="pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-2.5">
                              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                2. Generation Placement Horizons (Multi-Select)
                              </label>
                              <span className="text-[11px] font-bold text-[#0072CE] bg-[#EBF5FF] px-2.5 py-0.5 rounded-full border border-[#B8E2F8]">
                                Spans: {activeSignal.horizons.join(' → ')}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                              {HORIZON_BANDS.map(band => {
                                const isSelected = activeSignal.horizons.includes(band.id);
                                return (
                                  <button
                                    key={band.id}
                                    type="button"
                                    onClick={() =>
                                      handleToggleHorizon(activeSignal.id, band.id)
                                    }
                                    className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                                      isSelected
                                        ? 'bg-[#EBF5FF] border-[#0072CE] shadow-2xs'
                                        : 'bg-[#F8FBFE] border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between w-full mb-1.5">
                                      <span
                                        className={`text-xs font-extrabold ${
                                          isSelected ? 'text-[#005A9C]' : 'text-slate-800'
                                        }`}
                                      >
                                        {band.label}
                                      </span>
                                      <div
                                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                                          isSelected
                                            ? 'bg-[#0072CE] border-[#0072CE] text-white'
                                            : 'border-slate-300 bg-white'
                                        }`}
                                      >
                                        {isSelected && <Check size={11} strokeWidth={3} />}
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-500">
                                      {band.sub}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* STEP 3: GEOGRAPHICAL SPREAD CLASSIFICATION (3-TIER CASCADING SELECTOR) */}
                          <div className="pt-4 border-t border-slate-100">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                              <div>
                                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                                  3. Geographical Spread Classification (Divisions ➔ Regions ➔ Countries)
                                </label>
                              </div>
                            </div>

                            {/* Tier 1: The 5 Primary Divisions */}
                            <div className="mb-3">
                              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                Tier 1: Primary Divisions (5 Choices)
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                                {DIVISION_LIST.map(division => {
                                  const isDivSelected =
                                    activeSignal.geoScope.divisions.includes(division);
                                  return (
                                    <button
                                      key={division}
                                      type="button"
                                      onClick={() =>
                                        handleToggleGeoDivision(activeSignal.id, division)
                                      }
                                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-1.5 ${
                                        isDivSelected
                                          ? 'bg-[#0072CE] border-[#0072CE] text-white font-bold shadow-2xs'
                                          : 'bg-[#F8FBFE] border-slate-200 text-slate-700 hover:bg-white font-semibold'
                                      }`}
                                    >
                                      <span className="text-xs leading-tight">{division}</span>
                                      {isDivSelected && <Check size={13} className="shrink-0" />}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Tier 2 & Tier 3: Drill-down for selected geographic divisions (EMEIA, Americas, APAC) */}
                            <div className="space-y-3">
                              {activeSignal.geoScope.divisions
                                .filter(div => GEO_HIERARCHY[div]?.hasRegions)
                                .map(division => {
                                  const regionsObj = GEO_HIERARCHY[division].regions;
                                  return (
                                    <div
                                      key={division}
                                      className="bg-[#F8FBFE] border border-[#B8E2F8] rounded-xl p-4"
                                    >
                                      <div className="flex items-center gap-2 mb-2.5">
                                        <Globe size={14} className="text-[#0072CE]" />
                                        <span className="text-xs font-extrabold text-[#005A9C]">
                                          {division}
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {Object.entries(regionsObj).map(
                                          ([regionName, countriesList]) => {
                                            const isRegSelected =
                                              activeSignal.geoScope.regions.includes(
                                                regionName
                                              );
                                            return (
                                              <div
                                                key={regionName}
                                                className={`rounded-xl border p-3 transition-all ${
                                                  isRegSelected
                                                    ? 'bg-white border-[#00A0DF] shadow-2xs'
                                                    : 'bg-white/60 border-slate-200'
                                                }`}
                                              >
                                                {/* Region Toggle Header */}
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleToggleGeoRegion(
                                                      activeSignal.id,
                                                      division,
                                                      regionName
                                                    )
                                                  }
                                                  className="w-full flex items-center justify-between text-left mb-2 pb-1.5 border-b border-slate-100"
                                                >
                                                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                                                    <Map size={12} className="text-[#00A0DF]" />
                                                    {regionName}
                                                  </span>
                                                  <span
                                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                                      isRegSelected
                                                        ? 'bg-[#EBF5FF] text-[#0072CE]'
                                                        : 'bg-slate-100 text-slate-500'
                                                    }`}
                                                  >
                                                    {isRegSelected ? 'Active' : 'Select'}
                                                  </span>
                                                </button>

                                                {/* Top 3 Countries inside this Region */}
                                                <div className="flex flex-wrap gap-1.5">
                                                  {countriesList.map(country => {
                                                    const isCountrySelected =
                                                      activeSignal.geoScope.countries.includes(
                                                        country
                                                      );
                                                    return (
                                                      <button
                                                        key={country}
                                                        type="button"
                                                        onClick={() =>
                                                          handleToggleGeoCountry(
                                                            activeSignal.id,
                                                            division,
                                                            regionName,
                                                            country
                                                          )
                                                        }
                                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1 ${
                                                          isCountrySelected
                                                            ? 'bg-[#00A0DF] text-white border-[#00A0DF]'
                                                            : 'bg-[#F4F8FB] text-slate-600 border-slate-200 hover:border-slate-300'
                                                        }`}
                                                      >
                                                        <Flag size={9} />
                                                        {country}
                                                      </button>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>

                          {/* STEP 4: PRIORITISED IMPORTANCE (REMOVED LEAD-MARKET NOTE AS REQUESTED) */}
                          <div className="pt-4 border-t border-slate-100">
                            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2.5">
                              4. Prioritised Strategic Importance
                            </label>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {PRIORITY_LEVELS.map(prio => {
                                const isSelected = activeSignal.importance === prio.id;
                                return (
                                  <button
                                    key={prio.id}
                                    type="button"
                                    onClick={() =>
                                      handleUpdateSignalField(
                                        activeSignal.id,
                                        'importance',
                                        prio.id
                                      )
                                    }
                                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                                      isSelected
                                        ? prio.activeBtn
                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isSelected ? 'bg-white' : prio.dotColor
                                      }`}
                                    />
                                    {prio.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* STEP 5: SGE STRATEGY & OPERATOR NOTES */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div>
                              <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1.5">
                                SGE Platform Engineering Implication
                              </label>
                              <select
                                value={activeSignal.sgeStrategy}
                                onChange={e =>
                                  handleUpdateSignalField(
                                    activeSignal.id,
                                    'sgeStrategy',
                                    e.target.value
                                  )
                                }
                                className="w-full bg-[#F8FBFE] border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00A0DF]"
                              >
                                {SGE_TYPES.map(t => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1.5">
                                Notes
                              </label>
                              <input
                                type="text"
                                className="w-full bg-[#F8FBFE] border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#00A0DF]"
                                placeholder="Add instructions for generation planning workshops..."
                                value={activeSignal.notes}
                                onChange={e =>
                                  handleUpdateSignalField(
                                    activeSignal.id,
                                    'notes',
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM STICKY APPROVAL BAR */}
                  <div className="px-8 py-4 border-t border-slate-200 bg-white shrink-0 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
                      <span>Routing to Landscape:</span>
                      <strong className="text-slate-900">
                        {activeSignal.productCategories.length} Categories
                      </strong>
                      <span>•</span>
                      <span className="font-bold text-[#0072CE]">
                        {activeSignal.horizons.join(' → ')}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">
                        {formatGeoSummary(activeSignal.geoScope)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {activeSignal.status === 'pending' ? (
                        <button
                          onClick={handleApprove}
                          className="bg-[#00A0DF] hover:bg-[#0072CE] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2"
                        >
                          <CheckCircle size={16} /> Approve &amp; Route to Signal Landscape
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab('landscape')}
                          className="bg-[#0072CE] hover:bg-[#005A9C] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2"
                        >
                          <Compass size={16} /> View in Signal Landscape →
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                  <FileText size={48} className="mb-3 text-[#00A0DF]/40" />
                  <p className="text-base font-bold text-slate-700">
                    Select a signal from the queue to inspect or translate
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================
            VIEW 2: SIGNAL LANDSCAPE (HORIZONTAL HORIZON BANDS & SWIMLANES)
           ================================================================== */}
        {activeTab === 'landscape' && (
          <div className="flex-1 flex flex-col h-full overflow-hidden max-w-[1680px] w-full mx-auto relative">
            {/* 1. TOP OVERVIEW STRIP: KPI METRICS + COMPACT DENSITY HEATMAP + FILTERS */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 space-y-4 shadow-2xs z-20">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
                {/* Left 5 Cols: KPI Summary Cards */}
                <div className="xl:col-span-5 grid grid-cols-3 gap-3">
                  <div className="bg-[#F8FBFE] border border-slate-200 rounded-xl p-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Total Signals
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-slate-900">
                        {landscapeStats.totalSignals}
                      </span>
                      <span className="text-[11px] font-bold text-[#0072CE]">
                        Approved
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#F8FBFE] border border-slate-200 rounded-xl p-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Active Themes
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-[#0072CE]">
                        {landscapeStats.activeThemesCount}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        of 8 Categories
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#F8FBFE] border border-slate-200 rounded-xl p-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Total Placements
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-[#00A0DF]">
                        {landscapeStats.totalPlacements}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right 7 Cols: Compact Density Heatmap (Horizons × Current Grouping) */}
                <div className="xl:col-span-7 bg-[#F8FBFE] border border-[#B8E2F8] rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#005A9C] flex items-center gap-1.5">
                      <BarChart3 size={13} className="text-[#00A0DF]" />
                      Horizon Density Heatmap (Horizons ×{' '}
                      {landscapeGroupBy === 'PRODUCT'
                        ? 'Product & Tech Nature'
                        : landscapeGroupBy === 'GEO'
                        ? 'Geographic Division'
                        : 'Priority'}
                      )
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Hover signal bars below to highlight multi-lane copies
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="min-w-[520px]">
                      {/* Heatmap Header Row */}
                      <div className="grid grid-cols-12 gap-1 text-[9px] font-bold uppercase text-slate-500 pb-1">
                        <div className="col-span-4 truncate">Grouping Lane</div>
                        {HORIZON_BANDS.map(h => (
                          <div key={h.id} className="col-span-1 text-center truncate" style={{ gridColumn: 'span 1 / span 1' }}>
                            {h.label.replace(' years', 'y')}
                          </div>
                        ))}
                        <div className="col-span-3 text-right pr-1">Total Span</div>
                      </div>

                      {/* Heatmap Rows (show top 4 active lanes cleanly) */}
                      <div className="space-y-1 max-h-[86px] overflow-y-auto custom-scrollbar pr-1">
                        {landscapeLanes.map(lane => {
                          const rowTotal = lane.signals.reduce(
                            (acc, s) => acc + s.horizons.length,
                            0
                          );
                          return (
                            <div
                              key={lane.id}
                              className="grid grid-cols-12 gap-1 items-center text-[10px]"
                            >
                              <div
                                className="col-span-4 truncate font-semibold text-slate-700"
                                title={lane.title}
                              >
                                {lane.title}
                              </div>
                              {HORIZON_BANDS.map(h => {
                                const count = lane.signals.filter(s =>
                                  s.horizons.includes(h.id)
                                ).length;
                                const intensity =
                                  count === 0
                                    ? 'bg-white text-slate-300 border-slate-200/70'
                                    : count === 1
                                    ? 'bg-[#D8EEFF] text-[#005A9C] border-[#99CCF3] font-bold'
                                    : count === 2
                                    ? 'bg-[#00A0DF] text-white border-[#00A0DF] font-bold'
                                    : 'bg-[#005A9C] text-white border-[#005A9C] font-extrabold';
                                return (
                                  <div
                                    key={h.id}
                                    className={`h-5 rounded border flex items-center justify-center text-[10px] ${intensity}`}
                                  >
                                    {count}
                                  </div>
                                );
                              })}
                              <div className="col-span-3 text-right pr-1 font-bold text-[#0072CE]">
                                {rowTotal} {rowTotal === 1 ? 'band' : 'bands'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                {/* Group-By Toggle for Vertical Lanes */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    Group Vertical Lanes By:
                  </span>
                  <div className="flex items-center bg-[#F4F8FB] p-1 rounded-xl border border-slate-200">
                    {[
                      { id: 'PRODUCT', label: 'Product & Technology Nature' },
                      { id: 'GEO', label: 'Geographic Region' },
                      { id: 'PRIORITY', label: 'Priority' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setLandscapeGroupBy(opt.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          landscapeGroupBy === opt.id
                            ? 'bg-[#0072CE] text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filters: Search, Priority, Region, Category, Sort */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Search */}
                  <div className="relative">
                    <Search
                      size={13}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search signals..."
                      className="pl-7 pr-3 py-1.5 bg-[#F4F8FB] border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#00A0DF] w-44"
                    />
                  </div>

                  {/* Priority Filter */}
                  <select
                    value={priorityFilter}
                    onChange={e => setPriorityFilter(e.target.value)}
                    className="bg-[#F4F8FB] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00A0DF]"
                  >
                    <option value="ALL">All Priorities</option>
                    {PRIORITY_LEVELS.map(p => (
                      <option key={p.id} value={p.id}>
                        Priority: {p.label}
                      </option>
                    ))}
                  </select>

                  {/* Geographic Division Filter */}
                  <select
                    value={geoDivisionFilter}
                    onChange={e => setGeoDivisionFilter(e.target.value)}
                    className="bg-[#F4F8FB] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00A0DF]"
                  >
                    <option value="ALL">All Geographic Divisions</option>
                    {DIVISION_LIST.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  {/* Product & Tech Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="bg-[#F4F8FB] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00A0DF] max-w-[200px]"
                  >
                    <option value="ALL">All Tech Categories</option>
                    {PRODUCT_CATEGORIES.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  {/* Sorting Option */}
                  <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    className="bg-[#EBF5FF] border border-[#B8E2F8] rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#005A9C] focus:outline-none focus:border-[#00A0DF]"
                  >
                    <option value="PRIORITY_DESC">Sort: Priority (High → Low)</option>
                    <option value="HORIZON_ASC">Sort: Earliest Horizon</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. SIGNAL LANDSCAPE CANVAS (5 HORIZON BANDS + DYNAMIC VERTICAL SWIMLANES) */}
            <div className="flex-1 overflow-auto p-6 custom-scrollbar">
              <div className="min-w-[1150px] space-y-3">
                {/* STICKY TIME AXIS HEADER (5 HORIZON BANDS) */}
                <div className="grid grid-cols-12 gap-0 sticky top-0 z-20 bg-[#F4F8FB] pb-2">
                  {/* Lane Column Header (3 cols) */}
                  <div className="col-span-3 bg-white border border-slate-200 rounded-l-xl p-3.5 flex flex-col justify-center shadow-2xs">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00A0DF]">
                      Vertical Grouping Lanes
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {landscapeGroupBy === 'PRODUCT'
                        ? 'Product & Technology Nature'
                        : landscapeGroupBy === 'GEO'
                        ? 'Geographic Division & Regions'
                        : 'Strategic Priority Tiers'}
                    </h3>
                  </div>

                  {/* 5 Horizon Band Columns (9 cols total -> 5 equal columns inside) */}
                  <div className="col-span-9 grid grid-cols-5 bg-white border-y border-r border-slate-200 rounded-r-xl overflow-hidden shadow-2xs">
                    {HORIZON_BANDS.map((band, idx) => (
                      <div
                        key={band.id}
                        className={`p-3.5 border-t-4 border-t-[#00A0DF] ${
                          idx < 4 ? 'border-r border-slate-200/80' : ''
                        } bg-gradient-to-b from-[#F8FBFE] to-white`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-slate-900">
                            {band.label}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EBF5FF] text-[#0072CE]">
                            H{idx + 1}
                          </span>
                        </div>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                          {band.sub}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SWIMLANE ROWS */}
                {landscapeLanes.map(lane => {
                  const hasHoveredCopy =
                    hoveredSignalId !== null &&
                    lane.signals.some(s => s.id === hoveredSignalId);

                  return (
                    <div
                      key={lane.id}
                      className={`grid grid-cols-12 gap-0 rounded-xl border transition-all ${
                        hasHoveredCopy
                          ? 'border-[#00A0DF] bg-white shadow-md'
                          : 'border-slate-200 bg-white shadow-2xs'
                      }`}
                    >
                      {/* Left Lane Title Header (3 cols) */}
                      <div className="col-span-3 p-4 border-r border-slate-200 flex flex-col justify-between bg-[#F8FBFE]/70 rounded-l-xl">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                              {lane.title}
                            </h4>
                            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#EBF5FF] text-[#0072CE] border border-[#B8E2F8] shrink-0">
                              {lane.signals.length}
                            </span>
                          </div>
                          <p className="text-[10px] font-medium text-slate-500 mt-1">
                            {lane.subtitle}
                          </p>
                        </div>

                        {hasHoveredCopy && (
                          <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#0072CE] bg-[#EBF5FF] px-2 py-0.5 rounded border border-[#99CCF3] w-fit">
                            <Sparkles size={10} /> Contains Highlighted Signal
                          </div>
                        )}
                      </div>

                      {/* Right 5-Band Timeline Canvas for this Lane (9 cols) */}
                      <div className="col-span-9 relative py-3 px-2 min-h-[92px] flex flex-col justify-center">
                        {/* Background 5-column vertical grid guidelines */}
                        <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
                          {HORIZON_BANDS.map((b, idx) => (
                            <div
                              key={b.id}
                              className={`h-full ${
                                idx < 4 ? 'border-r border-dashed border-slate-200' : ''
                              } ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}`}
                            />
                          ))}
                        </div>

                        {/* Horizontal Signal Bars Stacked in this Swimlane */}
                        {lane.signals.length === 0 ? (
                          <div className="relative z-10 text-center text-[11px] text-slate-400 italic py-3">
                            No signals matching current filters in this lane
                          </div>
                        ) : (
                          <div className="relative z-10 space-y-2">
                            {lane.signals.map(signal => {
                              const prio = getPriorityMeta(signal.importance);
                              const segments = getHorizonSegments(signal.horizons);
                              const isHovered = hoveredSignalId === signal.id;
                              const isDimmed =
                                hoveredSignalId !== null && hoveredSignalId !== signal.id;
                              const copyCount = getSignalLaneCopyCount(signal);

                              return (
                                <div
                                  key={`${lane.id}-${signal.id}`}
                                  className="grid grid-cols-5 gap-1.5 items-center relative"
                                >
                                  {segments.map((seg, segIdx) => {
                                    const colStart = seg.start + 1;
                                    const colSpan = seg.end - seg.start + 1;

                                    return (
                                      <button
                                        key={segIdx}
                                        type="button"
                                        onMouseEnter={() => setHoveredSignalId(signal.id)}
                                        onMouseLeave={() => setHoveredSignalId(null)}
                                        onClick={() => setDrawerSignalId(signal.id)}
                                        style={{
                                          gridColumnStart: colStart,
                                          gridColumnEnd: `span ${colSpan}`
                                        }}
                                        className={`group text-left rounded-lg px-3 py-2 border transition-all flex items-center justify-between gap-2 relative overflow-hidden ${
                                          prio.barLight
                                        } ${
                                          isHovered
                                            ? 'ring-2 ring-[#00A0DF] shadow-lg scale-[1.01] z-20 bg-white!'
                                            : isDimmed
                                            ? 'opacity-45 hover:opacity-100'
                                            : 'hover:shadow-md hover:border-[#00A0DF]'
                                        }`}
                                      >
                                        {/* Left solid priority bar */}
                                        <span
                                          className={`w-1.5 self-stretch rounded-full shrink-0 ${prio.dotColor}`}
                                        />

                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-1.5">
                                            <span className="font-extrabold text-xs text-slate-900 truncate">
                                              {signal.title}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2 text-[10px] text-slate-600 mt-0.5 truncate">
                                            <span className="font-bold uppercase">
                                              {signal.importance}
                                            </span>
                                            <span>•</span>
                                            <span className="truncate">
                                              {formatGeoSummary(signal.geoScope)}
                                            </span>
                                          </div>
                                        </div>

                                        {/* Multi-lane badge & Horizon span pill */}
                                        <div className="flex items-center gap-1.5 shrink-0">
                                          {copyCount > 1 && (
                                            <span
                                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-all ${
                                                isHovered
                                                  ? 'bg-[#00A0DF] text-white border-[#00A0DF]'
                                                  : 'bg-white/80 text-slate-600 border-slate-200'
                                              }`}
                                              title={`Appears in ${copyCount} lanes`}
                                            >
                                              {copyCount}× lanes
                                            </span>
                                          )}
                                          <ArrowUpRight
                                            size={13}
                                            className="text-slate-400 group-hover:text-[#0072CE]"
                                          />
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================================================================
                INTERACTIVE SIDE PANEL (DRAWER) ON BAR CLICK
               ================================================================ */}
            {drawerSignal && (
              <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
                {/* Drawer Header */}
                <div className="p-5 border-b border-slate-200 bg-[#F8FBFE] flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                          getPriorityMeta(drawerSignal.importance).badgeBg
                        } ${getPriorityMeta(drawerSignal.importance).badgeText} ${
                          getPriorityMeta(drawerSignal.importance).badgeBorder
                        }`}
                      >
                        {drawerSignal.importance} Priority
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {drawerSignal.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setDrawerSignalId(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar text-xs">
                  {/* Signal Summary (Single Statement) */}
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Signal Summary
                    </h4>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {drawerSignal.description}
                    </p>
                  </div>

                  {/* Source & Timestamp */}
                  <div className="grid grid-cols-2 gap-3 bg-[#F8FBFE] border border-[#B8E2F8] rounded-xl p-3.5">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Origin &amp; Source
                      </span>
                      <span className="font-bold text-slate-900">
                        {drawerSignal.originSource}
                      </span>
                      <span className="block text-[10px] text-[#0072CE] mt-0.5">
                        {drawerSignal.sourceType}
                      </span>
                      {drawerSignal.sourceLinks && drawerSignal.sourceLinks.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#B8E2F8]/60 space-y-1">
                          {drawerSignal.sourceLinks.map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[10px] font-semibold text-[#0072CE] hover:text-[#00A0DF] hover:underline break-all leading-tight"
                            >
                              <ExternalLink size={10} className="shrink-0" />
                              <span className="truncate">{url}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Date &amp; Time Detected
                      </span>
                      <span className="font-bold text-slate-900">
                        {drawerSignal.detectedAt}
                      </span>
                    </div>
                  </div>

                  {/* SGE Platform Engineering Implication */}
                  <div className="bg-[#EBF5FF]/70 border border-[#99CCF3] rounded-xl p-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#005A9C] flex items-center gap-1.5 mb-1">
                      <Wrench size={13} className="text-[#0072CE]" />
                      SGE Platform Engineering Implication
                    </span>
                    <p className="font-extrabold text-slate-900 text-xs">
                      {drawerSignal.sgeStrategy}
                    </p>
                    <span className="block text-[10px] text-slate-600 mt-0.5">
                      Impact Area: {drawerSignal.impact}
                    </span>
                  </div>

                  {/* Active Generation Horizon Bands */}
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                      Active Generation Horizon Bands
                    </h4>
                    <div className="grid grid-cols-5 gap-1.5">
                      {HORIZON_BANDS.map(b => {
                        const active = drawerSignal.horizons.includes(b.id);
                        return (
                          <div
                            key={b.id}
                            className={`p-2 rounded-lg border text-center ${
                              active
                                ? 'bg-[#0072CE] text-white border-[#0072CE] font-extrabold shadow-2xs'
                                : 'bg-slate-50 text-slate-400 border-slate-200'
                            }`}
                          >
                            <div className="text-[11px]">{b.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product & Technology Nature Categories */}
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                      Product &amp; Technology Nature ({drawerSignal.productCategories.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {drawerSignal.productCategories.map(cat => (
                        <span
                          key={cat}
                          className="px-2.5 py-1 rounded-lg bg-[#EBF5FF] text-[#005A9C] border border-[#B8E2F8] font-bold text-[11px]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3-Tier Geographical Breakdown */}
                  <div className="bg-[#F8FBFE] border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Geographical Spread Breakdown
                    </h4>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">
                        Divisions:{' '}
                      </span>
                      <span className="font-bold text-slate-900">
                        {drawerSignal.geoScope.divisions.join(', ')}
                      </span>
                    </div>
                    {drawerSignal.geoScope.regions.length > 0 && (
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500">
                          Regions:{' '}
                        </span>
                        <span className="font-bold text-[#0072CE]">
                          {drawerSignal.geoScope.regions.join(', ')}
                        </span>
                      </div>
                    )}
                    {drawerSignal.geoScope.countries.length > 0 && (
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500">
                          Countries:{' '}
                        </span>
                        <span className="font-bold text-slate-800">
                          {drawerSignal.geoScope.countries.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Opportunity & Risk */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 flex items-center gap-1 mb-1">
                        <TrendingUp size={12} /> Strategic Opportunity
                      </span>
                      <p className="text-emerald-950 font-semibold">
                        {drawerSignal.opportunity}
                      </p>
                    </div>
                    <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3.5">
                      <span className="text-[10px] uppercase font-bold text-rose-800 flex items-center gap-1 mb-1">
                        <AlertTriangle size={12} /> Strategic Risk
                      </span>
                      <p className="text-rose-950 font-semibold">
                        {drawerSignal.risk}
                      </p>
                    </div>
                  </div>

                  {drawerSignal.notes && (
                    <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5">
                      <span className="text-[10px] uppercase font-bold text-amber-900 block mb-1">
                        Operator Notes
                      </span>
                      <p className="text-amber-950">{drawerSignal.notes}</p>
                    </div>
                  )}
                </div>

                {/* Drawer Footer */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedId(drawerSignal.id);
                      setDrawerSignalId(null);
                      setActiveTab('inbox');
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-[#0072CE] bg-[#EBF5FF] hover:bg-[#D8EEFF] border border-[#B8E2F8]"
                  >
                    Edit in Translation View
                  </button>
                  <button
                    onClick={() => setDrawerSignalId(null)}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-[#00A0DF] text-white hover:bg-[#0072CE]"
                  >
                    Close Panel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ====================================================================
          SIMULATE NEW DETECTED SIGNAL MODAL (MULTI-SELECT CATEGORIES/HORIZONS)
         ==================================================================== */}
      {showNewSignalModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateSignal}
            className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles size={16} className="text-[#00A0DF]" />
                Simulate New Foresight Signal
              </h3>
              <button
                type="button"
                onClick={() => setShowNewSignalModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Signal Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Ultra-Low-Power Matter 2.0 Thread Lock Actuator"
                  value={newSig.title}
                  onChange={e => setNewSig({ ...newSig, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00A0DF]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe the technological, regulatory, or customer shift..."
                  value={newSig.description}
                  onChange={e =>
                    setNewSig({ ...newSig, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#00A0DF] min-h-[60px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Origin &amp; Source
                  </label>
                  <input
                    type="text"
                    value={newSig.originSource}
                    onChange={e =>
                      setNewSig({ ...newSig, originSource: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Priority
                  </label>
                  <select
                    value={newSig.importance}
                    onChange={e =>
                      setNewSig({ ...newSig, importance: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {PRIORITY_LEVELS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multi-select Divisions */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Primary Divisions (Multi-Select)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {DIVISION_LIST.map(div => {
                    const active = newSig.geoScope.divisions.includes(div);
                    return (
                      <button
                        key={div}
                        type="button"
                        onClick={() => toggleNewSigDivision(div)}
                        className={`px-2.5 py-1.5 rounded-lg font-bold border transition-all ${
                          active
                            ? 'bg-[#0072CE] text-white border-[#0072CE]'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {div}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-select Product & Technology Categories */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Product &amp; Technology Nature (Multi-Select)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRODUCT_CATEGORIES.map(cat => {
                    const active = newSig.productCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() =>
                          toggleNewSigArrayItem('productCategories', cat)
                        }
                        className={`p-2 rounded-lg text-left font-semibold border flex items-center justify-between ${
                          active
                            ? 'bg-[#EBF5FF] text-[#005A9C] border-[#00A0DF]'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        {active && <Check size={12} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-select Horizons */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Generation Horizon Bands (Multi-Select)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {HORIZON_BANDS.map(h => {
                    const active = newSig.horizons.includes(h.id);
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => toggleNewSigArrayItem('horizons', h.id)}
                        className={`p-2 rounded-lg font-bold border text-center ${
                          active
                            ? 'bg-[#00A0DF] text-white border-[#00A0DF]'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {h.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowNewSignalModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#00A0DF] hover:bg-[#0072CE] text-white"
              >
                Add Signal to Inbox Queue
              </button>
            </div>
          </form>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `
        }}
      />
    </div>
  );
}