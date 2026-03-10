import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { commands, scenarios, laws } from "./data.js";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #ffffff;
    --bg-elevated: #ffffff;
    --bg-elevated-soft: #f1f3f4;
    --text: #202124;
    --text-soft: #5f6368;
    --accent: #1a73e8;
    --accent-soft: rgba(26, 115, 232, 0.12);
    --border-subtle: #dadce0;
    --danger: #d93025;
    --info: #1a73e8;
    --shadow-soft: 0 1px 3px rgba(60, 64, 67, 0.3), 0 4px 8px rgba(60, 64, 67, 0.15);
    --radius-lg: 12px;
    --radius-md: 8px;
    --radius-pill: 999px;
    --transition-fast: 160ms ease-out;
    --font-ui: "Times New Roman", Times, serif;
  }

  body.theme-dark {
    --bg: #202124;
    --bg-elevated: #202124;
    --bg-elevated-soft: #292a2d;
    --text: #e8eaed;
    --text-soft: #bdc1c6;
    --accent: #8ab4f8;
    --accent-soft: rgba(138, 180, 248, 0.16);
    --border-subtle: #3c4043;
    --shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: var(--font-ui);
    background: var(--bg);
    color: var(--text);
    display: flex;
    flex-direction: column;
  }
`;

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 32px;
  background: var(--bg);
  border-bottom: 1px solid var(--border-subtle);

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding-inline: 16px;
  }
`;

const AppTitle = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
    letter-spacing: -0.03em;
  }
  p {
    margin: 4px 0 0;
    font-size: 0.9rem;
    color: var(--text-soft);
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SectionToggle = styled.div`
  display: inline-flex;
  padding: 2px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg-elevated-soft) 82%, rgba(148, 163, 184, 0.35));
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.35);
`;

const SectionToggleBtn = styled.button`
  border: none;
  background: transparent;
  color: var(--text-soft);
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--transition-fast), color var(--transition-fast),
    box-shadow var(--transition-fast), transform 80ms ease-out;

  &.active {
    background: color-mix(in srgb, var(--bg-elevated) 96%, rgba(37, 99, 235, 0.2));
    color: var(--accent);
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.32);
    transform: translateY(-1px);
  }
`;

const IconButton = styled.button`
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: color-mix(in srgb, var(--bg-elevated) 80%, rgba(15, 23, 42, 0.02));
  color: var(--text-soft);
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background var(--transition-fast), transform 80ms ease-out,
    box-shadow var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.25);
  }

  &.active {
    background: var(--accent-soft);
    color: var(--accent);
    border-color: var(--accent);
  }
`;

const VendorToggle = styled.div`
  display: inline-flex;
  padding: 3px;
  background: color-mix(in srgb, var(--bg-elevated) 70%, rgba(148, 163, 184, 0.2));
  border-radius: var(--radius-pill);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.25);
`;

const VendorBtn = styled.button`
  border: none;
  background: transparent;
  color: var(--text-soft);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast),
    box-shadow var(--transition-fast), transform 80ms ease-out;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &.active {
    background: linear-gradient(135deg, var(--accent), #22c55e);
    color: #f9fafb;
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.45);
    transform: translateY(-1px);
  }
`;

const ThemeToggle = styled(IconButton)`
  width: 36px;
  height: 36px;
  background: color-mix(in srgb, var(--bg-elevated) 80%, rgba(15, 23, 42, 0.05));
`;

const Main = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: minmax(260px, 300px) minmax(0, 1fr);
  gap: 16px;
  padding: 16px 16px 20px;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    padding-inline: 12px;
  }
`;

const Sidebar = styled.aside`
  background: var(--bg-elevated);
  border-radius: var(--radius-lg);
  padding: 16px 16px 18px;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 900px) {
    order: -1;
  }

  &.hidden {
    display: none;
  }
`;

const SidebarLabel = styled.span`
  display: block;
  font-size: 0.78rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-soft);
  margin-bottom: 6px;
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  padding: 8px 12px;
  font-size: 0.9rem;
  outline: none;
  background: color-mix(in srgb, var(--bg-elevated) 92%, rgba(15, 23, 42, 0.02));
  color: var(--text);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast),
    background var(--transition-fast), transform 80ms ease-out;

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent-soft), 0 10px 30px rgba(37, 99, 235, 0.3);
    transform: translateY(-1px);
  }
`;

const FiltersSection = styled.section`
  border-radius: 14px;
  padding: 10px 10px 6px;
  background: var(--bg-elevated-soft);
  border: 1px solid var(--border-subtle);
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LinkButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font-size: 0.75rem;
  color: var(--accent);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const FiltersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

const FilterChip = styled.button`
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.65);
  padding: 4px 10px;
  font-size: 0.8rem;
  background: color-mix(in srgb, var(--bg-elevated-soft) 92%, rgba(148, 163, 184, 0.06));
  cursor: pointer;
  color: var(--text-soft);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background var(--transition-fast), border-color var(--transition-fast),
    color var(--transition-fast), box-shadow var(--transition-fast), transform 80ms ease-out;

  span {
    font-size: 0.7rem;
    opacity: 0.75;
  }

  &.active {
    border-color: var(--accent);
    background: var(--accent-soft);
    color: var(--accent);
    box-shadow: 0 12px 28px rgba(37, 99, 235, 0.35);
    transform: translateY(-1px);
  }
`;

const LegendSection = styled.section`
  border-radius: 14px;
  padding: 10px 10px 6px;
  background: var(--bg-elevated-soft);
  border: 1px solid var(--border-subtle);
`;

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--text-soft);
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 1px 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  &.badge-mode {
    background: rgba(59, 130, 246, 0.12);
    color: #1d4ed8;
  }

  &.badge-danger {
    background: rgba(248, 113, 113, 0.15);
    color: var(--danger);
  }

  &.badge-info {
    background: rgba(56, 189, 248, 0.18);
    color: var(--info);
  }
`;

const Content = styled.section`
  background: var(--bg-elevated);
  border-radius: 16px;
  padding: 16px 20px 20px;
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: 640px) {
    padding-inline: 10px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 2px 2px 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.4);
`;

const ViewToggle = styled.div`
  display: inline-flex;
  padding: 2px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg-elevated-soft) 82%, rgba(148, 163, 184, 0.35));
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.35);
`;

const ViewToggleBtn = styled.button`
  border: none;
  background: transparent;
  color: var(--text-soft);
  font-size: 0.78rem;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast),
    box-shadow var(--transition-fast), transform 80ms ease-out;

  &.active {
    background: color-mix(in srgb, var(--bg-elevated) 96%, rgba(37, 99, 235, 0.2));
    color: var(--accent);
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.32);
    transform: translateY(-1px);
  }
`;

const ResultsCount = styled.span`
  font-size: 0.8rem;
  color: var(--text-soft);
`;

const CommandsGrid = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: flex-start;
`;

const Card = styled.article`
  background: color-mix(in srgb, var(--bg-elevated) 100%, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius-md);
  padding: 10px 10px 10px;
  border: 1px solid rgba(148, 163, 184, 0.55);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: transform 90ms ease-out, box-shadow var(--transition-fast),
    border-color var(--transition-fast), background var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.32);
    border-color: var(--accent);
  }
`;

const CommandHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;

const CommandCategory = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-soft);
`;

const CommandBadges = styled.div`
  display: flex;
  gap: 4px;
`;

const CommandCode = styled.pre`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-size: 0.9rem;
  background: color-mix(in srgb, var(--bg-elevated-soft) 94%, rgba(15, 23, 42, 0.08));
  border-radius: 8px;
  padding: 6px 8px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  white-space: pre-wrap;
  word-break: break-word;
`;

const CommandDescription = styled.div`
  font-size: 0.86rem;
  color: var(--text-soft);
`;

const ScenarioTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
`;

const ScenarioDescription = styled.div`
  font-size: 0.83rem;
  color: var(--text-soft);
`;

const ScenarioSteps = styled.ol`
  margin: 4px 0 0;
  padding-left: 18px;
`;

const ScenarioStep = styled.li`
  margin-bottom: 4px;
  font-size: 0.83rem;
`;

const ScenarioStepCode = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-size: 0.82rem;
  background: color-mix(in srgb, var(--bg-elevated-soft) 94%, rgba(15, 23, 42, 0.08));
  border-radius: 6px;
  padding: 2px 6px;
  border: 1px solid rgba(148, 163, 184, 0.6);
`;

const LawText = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  max-width: 720px;
  margin: 4px auto 0;
`;

const LawParagraph = styled.p`
  margin: 0 0 6px;
`;

const LawPartLabel = styled(LawParagraph)`
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const LawLawTitle = styled(LawParagraph)`
  text-align: center;
  font-weight: 600;
  font-size: 1.02rem;
  margin-bottom: 12px;
`;

const LawSubheading = styled(LawParagraph)`
  font-weight: 600;
  margin-top: 10px;
`;

const LawList = styled.ul`
  margin: 6px 0 8px 20px;
  padding: 0 0 0 4px;
  list-style-type: disc;
`;

const Footer = styled.footer`
  padding: 10px 24px 14px;
  font-size: 0.8rem;
  color: var(--text-soft);
  text-align: center;
`;

function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cheatsheet-theme");
    const dark = saved === "dark";
    setIsDark(dark);
    document.body.classList.toggle("theme-dark", dark);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.body.classList.toggle("theme-dark", next);
      localStorage.setItem("cheatsheet-theme", next ? "dark" : "light");
      return next;
    });
  };

  return { isDark, toggle };
}

function useCategories(vendor) {
  return useMemo(() => {
    const set = new Set();
    for (const c of commands) {
      if (c.vendor === vendor) set.add(c.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ru"));
  }, [vendor]);
}

function NetworkContent({ vendor, view, search, activeCategories }) {
  const term = search.trim().toLowerCase();
  const useCategoryFilter = activeCategories.size > 0;

  if (view === "commands") {
    const filtered = commands.filter((item) => {
      if (item.vendor !== vendor) return false;
      if (useCategoryFilter && !activeCategories.has(item.category)) return false;
      if (!term) return true;
      const haystack = `${item.cmd} ${item.description} ${item.category}`.toLowerCase();
      return haystack.includes(term);
    });

    const labelVendor = vendor === "cisco" ? "Cisco" : "MikroTik";

    return (
      <>
        <ContentHeader>
          <h2>{`${labelVendor} — команды`}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ResultsCount>{`${filtered.length} команд(ы) найдено`}</ResultsCount>
          </div>
        </ContentHeader>
        <CommandsGrid>
          {filtered.map((item, idx) => (
            <Card key={`${item.vendor}-${item.cmd}-${idx}`}>
              <CommandHeader>
                <CommandCategory>{item.category}</CommandCategory>
                <CommandBadges>
                  {item.mode && <Badge className="badge-mode">{item.mode}</Badge>}
                  {item.danger && <Badge className="badge-danger">!</Badge>}
                  {item.diag && <Badge className="badge-info">diag</Badge>}
                </CommandBadges>
              </CommandHeader>
              <CommandCode>{item.cmd}</CommandCode>
              <CommandDescription>{item.description}</CommandDescription>
            </Card>
          ))}
        </CommandsGrid>
      </>
    );
  }

  const filteredScenarios = scenarios.filter((scenario) => {
    if (scenario.vendor !== vendor) return false;
    if (!term) return true;
    const stepsText = scenario.steps.map((s) => `${s.cmd} ${s.note || ""}`).join(" ");
    const haystack = `${scenario.title} ${scenario.description} ${stepsText}`.toLowerCase();
    return haystack.includes(term);
  });

  const labelVendor = vendor === "cisco" ? "Cisco" : "MikroTik";

  return (
    <>
      <ContentHeader>
        <h2>{`${labelVendor} — сценарии`}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ResultsCount>{`${filteredScenarios.length} сценариев найдено`}</ResultsCount>
        </div>
      </ContentHeader>
      <CommandsGrid>
        {filteredScenarios.map((scenario) => (
          <Card key={scenario.title}>
            <ScenarioTitle>{scenario.title}</ScenarioTitle>
            <ScenarioDescription>{scenario.description}</ScenarioDescription>
            <ScenarioSteps>
              {scenario.steps.map((step) => (
                <ScenarioStep key={step.cmd + step.note}>
                  <ScenarioStepCode>{step.cmd}</ScenarioStepCode>
                  {step.note && <span>{` — ${step.note}`}</span>}
                </ScenarioStep>
              ))}
            </ScenarioSteps>
          </Card>
        ))}
      </CommandsGrid>
    </>
  );
}

function renderLawPageContent(content) {
  const lines = content.split("\n");
  const elements = [];
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      elements.push(
        <LawList key={`list-${elements.length}`}>{currentList.items}</LawList>
      );
      currentList = null;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;

    const ulMatch = /^[-•*]\s+(.+)$/.exec(line);
    if (ulMatch) {
      const contentText = ulMatch[1];
      if (!currentList) {
        currentList = { items: [] };
      }
      currentList.items.push(<li key={`li-${currentList.items.length}`}>{contentText}</li>);
      return;
    }

    const isNumberedHeading = /^[0-9]+\.\s/.test(line);
    flushList();

    if (/^\d+\s*часть/i.test(line)) {
      elements.push(<LawPartLabel key={`p-${elements.length}`}>{line}</LawPartLabel>);
    } else if (line.includes("152-ФЗ") || line.includes("149-ФЗ")) {
      elements.push(<LawLawTitle key={`p-${elements.length}`}>{line}</LawLawTitle>);
    } else if (line.endsWith("?") || isNumberedHeading) {
      elements.push(<LawSubheading key={`p-${elements.length}`}>{line}</LawSubheading>);
    } else {
      elements.push(<LawParagraph key={`p-${elements.length}`}>{line}</LawParagraph>);
    }
  });

  flushList();
  return elements;
}

function LawsContent({ lawId, pageIndex }) {
  const law =
    laws.find((x) => x.id === lawId) || (laws.length > 0 ? laws[0] : null);

  if (!law) {
    return (
      <>
        <ContentHeader>
          <h2>Нормативно‑правовые акты</h2>
          <ResultsCount>0 документов</ResultsCount>
        </ContentHeader>
      </>
    );
  }

  const total = law.parts.length;
  const index = Math.min(Math.max(pageIndex, 0), total - 1);
  const page = law.parts[index];

  return (
    <>
      <ContentHeader>
        <h2>{`${law.shortTitle} — ${page.title}`}</h2>
        <ResultsCount>{`${index + 1} / ${total} частей`}</ResultsCount>
      </ContentHeader>
      <CommandsGrid>
        <Card>
          <ScenarioTitle>{law.shortTitle}</ScenarioTitle>
          <ScenarioDescription>{law.title}</ScenarioDescription>
          <ScenarioDescription
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              marginTop: 8,
            }}
          >
            <span>{`${page.title} (${index + 1} / ${total})`}</span>
          </ScenarioDescription>
        </Card>
        <Card>
          <LawText>{renderLawPageContent(page.content)}</LawText>
        </Card>
      </CommandsGrid>
    </>
  );
}

function App() {
  const { isDark, toggle } = useTheme();
  const [vendor, setVendor] = useState("cisco");
  const [view, setView] = useState("commands"); // commands | scenarios
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [lawId, setLawId] = useState(laws[0]?.id ?? null);
  const [lawPage, setLawPage] = useState(0);
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isLawsRoute = location.pathname.startsWith("/laws");
  const categories = useCategories(vendor);

  const handleToggleCategory = (cat) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const resetFilters = () => {
    setActiveCategories(new Set());
  };

  const handleSelectLaw = (id) => {
    setLawId(id);
    setLawPage(0);
  };

  useEffect(() => {
    // при переключении между / и /laws очищаем поиск и фильтры
    setSearch("");
    setActiveCategories(new Set());
  }, [location.pathname]);

  return (
    <AppShell>
      <GlobalStyle />
      <Header className={isLawsRoute ? "laws-header" : ""}>
        <AppTitle>
          <h1>Справочник команд Cisco и MikroTik</h1>
          <p>Cheat‑sheet для быстрого поиска сетевых команд</p>
        </AppTitle>
        <HeaderControls>
          <SectionToggle aria-label="Глобальные разделы">
            <SectionToggleBtn
              type="button"
              className={!isLawsRoute ? "active" : ""}
              onClick={() => navigate("/")}
            >
              Сетевые технологии
            </SectionToggleBtn>
            <SectionToggleBtn
              type="button"
              className={isLawsRoute ? "active" : ""}
              onClick={() => navigate("/laws")}
            >
              Нормативно‑правовые акты
            </SectionToggleBtn>
          </SectionToggle>

          <IconButton
            type="button"
            aria-label="Скрыть или показать панель поиска"
            className={sidebarHidden ? "active" : ""}
            onClick={() => setSidebarHidden((v) => !v)}
          >
            🔍
          </IconButton>

          {!isLawsRoute && (
            <VendorToggle role="tablist" aria-label="Выбор вендора">
              <VendorBtn
                type="button"
                className={vendor === "cisco" ? "active" : ""}
                onClick={() => setVendor("cisco")}
              >
                Cisco
              </VendorBtn>
              <VendorBtn
                type="button"
                className={vendor === "mikrotik" ? "active" : ""}
                onClick={() => setVendor("mikrotik")}
              >
                MikroTik
              </VendorBtn>
            </VendorToggle>
          )}

          <ThemeToggle
            type="button"
            aria-label="Переключить тему"
            onClick={toggle}
          >
            {isDark ? "☀️" : "🌙"}
          </ThemeToggle>
        </HeaderControls>
      </Header>

      <Main>
        <Sidebar className={sidebarHidden ? "hidden" : ""}>
          <section>
            <SidebarLabel>Поиск по командам</SidebarLabel>
            <SearchInput
              type="search"
              placeholder={
                isLawsRoute
                  ? "Поиск по названию и описанию закона..."
                  : "Команда, описание, протокол..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section>

          {!isLawsRoute && (
            <>
              <FiltersSection>
                <FiltersHeader>
                  <SidebarLabel>Разделы</SidebarLabel>
                  <LinkButton type="button" onClick={resetFilters}>
                    Сбросить
                  </LinkButton>
                </FiltersHeader>
                <FiltersList>
                  {categories.map((cat) => (
                    <FilterChip
                      key={cat}
                      type="button"
                      className={
                        activeCategories.size === 0 || activeCategories.has(cat)
                          ? "active"
                          : ""
                      }
                      onClick={() => handleToggleCategory(cat)}
                    >
                      <span>●</span>
                      {cat}
                    </FilterChip>
                  ))}
                </FiltersList>
              </FiltersSection>

              <LegendSection>
                <SidebarLabel>Обозначения</SidebarLabel>
                <LegendList>
                  <li>
                    <Badge className="badge-mode">mode</Badge> режим конфигурации
                  </li>
                  <li>
                    <Badge className="badge-danger">!</Badge> осторожно / изменяет трафик
                  </li>
                  <li>
                    <Badge className="badge-info">diag</Badge> диагностика
                  </li>
                </LegendList>
              </LegendSection>
            </>
          )}

          {isLawsRoute && (
            <FiltersSection>
              <FiltersHeader>
                <SidebarLabel>Документы</SidebarLabel>
              </FiltersHeader>
              <FiltersList>
                {laws.map((law) => {
                  const haystack = (
                    law.title +
                    " " +
                    law.shortTitle +
                    " " +
                    law.description
                  ).toLowerCase();
                  if (search.trim() && !haystack.includes(search.trim().toLowerCase())) {
                    return null;
                  }
                  return (
                    <FilterChip
                      key={law.id}
                      type="button"
                      className={lawId === law.id ? "active" : ""}
                      onClick={() => handleSelectLaw(law.id)}
                    >
                      {law.shortTitle}
                    </FilterChip>
                  );
                })}
              </FiltersList>
            </FiltersSection>
          )}
        </Sidebar>

        <Content>
          {!isLawsRoute && (
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "flex-end" }}>
              <ViewToggle aria-label="Режим отображения">
                <ViewToggleBtn
                  type="button"
                  className={view === "commands" ? "active" : ""}
                  onClick={() => setView("commands")}
                >
                  Команды
                </ViewToggleBtn>
                <ViewToggleBtn
                  type="button"
                  className={view === "scenarios" ? "active" : ""}
                  onClick={() => setView("scenarios")}
                >
                  Сценарии
                </ViewToggleBtn>
              </ViewToggle>
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <NetworkContent
                  vendor={vendor}
                  view={view}
                  search={search}
                  activeCategories={activeCategories}
                />
              }
            />
            <Route
              path="/laws"
              element={<LawsContent lawId={lawId} pageIndex={lawPage} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Main>

      <Footer>
        Локальный оффлайн‑справочник. Можно использовать на лабах и экзаменах.
      </Footer>
    </AppShell>
  );
}

export default App;

