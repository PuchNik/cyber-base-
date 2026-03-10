import React, { useEffect, useMemo, useState, useRef } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { commands, scenarios, laws } from "./data.js";
import heroImage from "../save.jpg";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: radial-gradient(circle at top left, #f3f7ff, #e7f0ff, #eaf4ff);
    --bg-elevated: rgba(255, 255, 255, 0.98);
    --bg-elevated-soft: #eef3fb;
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
    --bg: linear-gradient(90deg, #020617, #0f172a, #1e293b, #0f172a);
    --bg-elevated: #020617;
    --bg-elevated-soft: #0b1120;
    --text: #e8eaed;
    --text-soft: #bdc1c6;
    --accent: #8ab4f8;
    --accent-soft: rgba(138, 180, 248, 0.16);
    --border-subtle: #3c4043;
    --shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  body.theme-dark .cmd-text {
    color: #e0f2fe;
    text-shadow:
      0 0 4px rgba(56, 189, 248, 0.7),
      0 0 12px rgba(59, 130, 246, 0.6);
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
    font-size: 18px;
    line-height: 1.6;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 32px;
  background: linear-gradient(90deg, #020617, #0f172a, #1e293b, #0f172a);
  border-bottom: 1px solid var(--border-subtle);
  color: #e5e7eb;
   transition: transform 200ms ease-out;
   transform: translateY(${(props) => (props.hidden ? "-100%" : "0")});

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
    color: #e5e7eb;
  }
  p {
    margin: 4px 0 0;
    font-size: 0.9rem;
    color: #cbd5f5;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 1.15rem;
    }
    p {
      font-size: 0.8rem;
    }
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
  background: rgba(15, 23, 42, 0.9);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.4);

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
    padding: 2px 4px;
  }
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

  @media (max-width: 640px) {
    flex: 1;
    font-size: 0.72rem;
    padding: 6px 4px;
    min-width: 0;
  }

  &.active {
    background: linear-gradient(135deg, #38bdf8, #22c55e);
    color: #0b1120;
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

const ThemeToggle = styled(IconButton)`
  width: 36px;
  height: 36px;
  background: rgba(15, 23, 42, 0.9);
`;

const Main = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: ${(props) =>
    props.hasSidebar ? "minmax(260px, 300px) minmax(0, 1fr)" : "minmax(0, 1fr)"};
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
  border: 1px solid rgba(255, 255, 255, 0.99);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;

  .cmd-text {
    flex: 1;
    color: var(--text);
  }

  .cmd-copy-icon {
    flex: 0 0 auto;
    font-size: 0.85rem;
    color: rgba(148, 163, 184, 0.9);
  }
`;

const CommandDescription = styled.div`
  font-size: 0.86rem;
  color: var(--text-soft);
`;

const ScenarioTitle = styled.div`
  font-size: 1.12rem;
  font-weight: 600;
`;

const ScenarioDescription = styled.div`
  font-size: 1.3rem;
  color: var(--text-soft);
`;

const ScenarioSteps = styled.ol`
  margin: 4px 0 0;
  padding-left: 18px;
`;

const ScenarioStep = styled.li`
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const ScenarioStepCode = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-size: 1rem;
  background: color-mix(in srgb, var(--bg-elevated-soft) 94%, rgba(15, 23, 42, 0.08));
  border-radius: 6px;
  padding: 4px 8px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  .cmd-text {
    color: var(--text);
  }

  .cmd-copy-icon {
    font-size: 0.8rem;
    color: rgba(148, 163, 184, 0.9);
  }
`;

function copyToClipboard(text) {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
    return;
  }
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  } catch {
    // игнорируем сбой копирования
  }
}

const LawText = styled.div`
  font-size: 1.3rem;
  line-height: 1.7;
  max-width: 720px;
  margin: 4px auto 0;
`;

const LawParagraph = styled.p`
  margin: 0 0 6px;
  font-size: 1.3rem;
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
  font-size: 1.22rem;
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

const NetworkSplitRoot = styled.div`
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
`;

const NetworkSplit = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const NetworkPanel = styled.button`
  flex: 1;
  border: none;
  border-radius: 16px;
  padding: 24px 20px;
  background: radial-gradient(circle at top left, #0f172a, #020617);
  color: #e5e7eb;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition:
    transform 120ms ease-out,
    box-shadow 180ms ease-out,
    filter 160ms ease-out;

  h3 {
    margin: 0 0 12px;
    font-size: 1.6rem;
    letter-spacing: -0.04em;
  }

  p {
    margin: 0;
    font-size: 1.02rem;
    line-height: 1.7;
    color: rgba(226, 232, 240, 0.92);
  }

  @media (max-width: 900px) {
    padding: 20px 16px;
    align-items: flex-start;
    text-align: left;

    h3 {
      font-size: 1.35rem;
    }

    p {
      font-size: 0.96rem;
    }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.9);
    filter: brightness(1.03);
  }
`;

const Footer = styled.footer`
  padding: 10px 24px 14px;
  font-size: 0.8rem;
  color: var(--text-soft);
  text-align: center;
`;

const LandingRoot = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9fafb;
  overflow: hidden;
`;

const LandingBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
  transform: scale(1.02);
`;

const LandingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at top,
      rgba(37, 99, 235, 0.6),
      transparent 55%
    ),
    radial-gradient(circle at bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.96));
  mix-blend-mode: multiply;
`;

const LandingContent = styled.div`
  position: relative;
  max-width: 780px;
  padding: 32px 24px;
  text-align: center;
`;

const LandingTopBar = styled.div`
  position: absolute;
  inset-inline: 0;
  top: 0;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  background: #0d2447;

  @media (max-width: 640px) {
    padding-inline: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const LandingTitle = styled.h1`
  margin: 0 0 16px;
  font-size: 2.7rem;
  letter-spacing: -0.04em;
`;

const LandingSubtitle = styled.p`
  margin: 0 0 24px;
  font-size: 1.26rem;
  line-height: 1.9;
  color: rgba(226, 232, 240, 0.9);
`;

const LandingMeta = styled.p`
  margin: 0 0 28px;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: rgba(191, 219, 254, 0.9);
`;

const LandingButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 12px 28px;
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  color: #0b1120;
  background: linear-gradient(135deg, #38bdf8, #22c55e);
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.6);
  transition: transform 80ms ease-out, box-shadow 160ms ease-out, filter 160ms ease-out;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.03);
    box-shadow: 0 22px 60px rgba(15, 23, 42, 0.9);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 12px 26px rgba(15, 23, 42, 0.7);
  }
`;

function LandingPage({ onEnter, onOpenLaws, isDark, onToggleTheme }) {
  return (
    <LandingRoot>
      <LandingBackground />
      <LandingOverlay />

      <LandingContent>
        <LandingMeta>· Информационная безопасность ·</LandingMeta>
        <LandingTitle>Справочник по информационной безопасности</LandingTitle>
        <LandingSubtitle>
        На моем ресурсе Вы найдете все полезные материалы по теме информационной безопасности. Я собрали для вас актуальную информацию по сетевым технологиям, нормативно-правовым актам и основным аспектам информационной безопасности.<br/>
        Я стремлюсь создать удобную платформу, где Вы сможете легко находить полезные советы, руководства и аналитические материалы.<br/>
        Все это бесплатно, поэтому читайте, познавайте и помогайте другим!
        </LandingSubtitle>
        <LandingButton type="button" onClick={onEnter}>
          Перейти к справочнику
        </LandingButton>
      </LandingContent>
    </LandingRoot>
  );
}

function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // По умолчанию всегда светлая тема
    setIsDark(false);
    document.body.classList.remove("theme-dark");
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
  const navigate = useNavigate();
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
              <CommandCode
                title="Нажмите, чтобы скопировать команду"
                onClick={() => copyToClipboard(item.cmd)}
              >
                <span className="cmd-text">{item.cmd}</span>
                <span className="cmd-copy-icon">📋</span>
              </CommandCode>
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
          <Card
            key={scenario.title}
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/app/scenarios/${encodeURIComponent(scenario.title)}`)
            }
          >
            <ScenarioTitle>{scenario.title}</ScenarioTitle>
            <ScenarioDescription>{scenario.description}</ScenarioDescription>
          </Card>
        ))}
      </CommandsGrid>
    </>
  );
}

function NetworkHub() {
  const navigate = useNavigate();

  return (
    <NetworkSplitRoot>
      <ContentHeader>
        <h2>Сетевые технологии</h2>
      </ContentHeader>
      <NetworkSplit>
        <NetworkPanel type="button" onClick={() => navigate("/app/theory")}>
          <h3>Теория</h3>
          <p>
            В этом разделе вы найдете основные теоретические концепции сетевых технологий,
            включая принципы работы, архитектуру сети и типы сетей. Понимание этих основ
            поможет вам лучше ориентироваться в настройках и управлении сетевым
            оборудованием.
          </p>
        </NetworkPanel>
        <NetworkPanel type="button" onClick={() => navigate("/app/cheatsheet")}>
          <h3>Справочник команд</h3>
          <p>
            Этот раздел предлагает быстрое и удобное руководство по основным командам,
            необходимым для настройки и управления сетевым оборудованием. Здесь вы найдете
            краткие описания и примеры использования каждой команды.
          </p>
        </NetworkPanel>
      </NetworkSplit>
    </NetworkSplitRoot>
  );
}

function TheoryPage() {
  return (
    <>
      <ContentHeader>
        <h2>Теория сетевых технологий</h2>
      </ContentHeader>
      <CommandsGrid>
        <Card>
          <ScenarioTitle>Контент находится в разработке</ScenarioTitle>
          <ScenarioDescription>
            Раздел с теоретическими материалами по сетевым технологиям скоро появится. Здесь
            будут базовые и продвинутые темы, примеры и разборы типовых ситуаций.
          </ScenarioDescription>
        </Card>
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

function LawsLibrary({ search }) {
  const navigate = useNavigate();
  const term = search.trim().toLowerCase();

  const filtered = laws.filter((law) => {
    if (!term) return true;
    const haystack = (
      law.title +
      " " +
      law.shortTitle +
      " " +
      law.description
    ).toLowerCase();
    return haystack.includes(term);
  });

  return (
    <>
      <ContentHeader>
        <h2>Нормативно‑правовые акты</h2>
        <ResultsCount>{`${filtered.length} документов`}</ResultsCount>
      </ContentHeader>
      <CommandsGrid>
        {filtered.map((law) => (
          <Card
            key={law.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/app/laws/${law.id}`)}
          >
            <ScenarioTitle>{law.shortTitle}</ScenarioTitle>
            <ScenarioDescription>{law.description}</ScenarioDescription>
          </Card>
        ))}
      </CommandsGrid>
    </>
  );
}

function LawDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);

  const law = laws.find((x) => x.id === id) || null;

  React.useEffect(() => {
    setPageIndex(0);
  }, [id]);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageIndex]);

  if (!law) {
    return (
      <>
        <ContentHeader>
          <h2>Документ не найден</h2>
        </ContentHeader>
        <CommandsGrid>
          <Card>
            <ScenarioDescription>
              Возможно, нормативный акт был переименован или удалён. Вернитесь к
              списку документов.
            </ScenarioDescription>
          </Card>
        </CommandsGrid>
      </>
    );
  }

  const total = law.parts.length;
  const index = Math.min(Math.max(pageIndex, 0), total - 1);
  const page = law.parts[index];

  const canPrev = index > 0;
  const canNext = index < total - 1;

  return (
    <>
      <ContentHeader>
        <h2>{`${law.shortTitle} — ${page.title}`}</h2>
        <ResultsCount>{`${index + 1} / ${total} частей`}</ResultsCount>
      </ContentHeader>
      <CommandsGrid>
        <Card style={{ textAlign: "center" }}>
          <ScenarioTitle>{law.shortTitle}</ScenarioTitle>
          <ScenarioDescription>{law.title}</ScenarioDescription>
          <ScenarioDescription style={{ marginTop: 8 }}>
            {`${page.title} (${index + 1} / ${total})`}
          </ScenarioDescription>
        </Card>
        <Card>
          <LawText>{renderLawPageContent(page.content)}</LawText>
        </Card>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <FilterChip
              type="button"
              disabled={!canPrev}
              onClick={() =>
                setPageIndex((prev) => (prev > 0 ? prev - 1 : prev))
              }
              style={!canPrev ? { opacity: 0.5, cursor: "default" } : {}}
            >
              ← Предыдущая часть
            </FilterChip>
            <FilterChip
              type="button"
              disabled={!canNext}
              onClick={() =>
                setPageIndex((prev) =>
                  prev < total - 1 ? prev + 1 : prev
                )
              }
              style={!canNext ? { opacity: 0.5, cursor: "default" } : {}}
            >
              Следующая часть →
            </FilterChip>
          </div>
        </Card>
      </CommandsGrid>
    </>
  );
}

function ScenarioDetail() {
  const { title } = useParams();
  const decodedTitle = title ? decodeURIComponent(title) : "";
  const scenario =
    scenarios.find((s) => s.title === decodedTitle) ?? null;

  if (!scenario) {
    return (
      <>
        <ContentHeader>
          <h2>Сценарий не найден</h2>
        </ContentHeader>
        <CommandsGrid>
          <Card>
            <ScenarioDescription>
              Возможно, сценарий был переименован или удалён. Вернитесь к списку сценариев.
            </ScenarioDescription>
          </Card>
        </CommandsGrid>
      </>
    );
  }

  const labelVendor = scenario.vendor === "cisco" ? "Cisco" : "MikroTik";

  return (
    <>
      <ContentHeader>
        <h2>{scenario.title}</h2>
        <ResultsCount>{labelVendor}</ResultsCount>
      </ContentHeader>
      <CommandsGrid>
        <Card>
          <ScenarioTitle>{scenario.title}</ScenarioTitle>
          <ScenarioDescription>{scenario.description}</ScenarioDescription>
        </Card>
        <Card>
          <ScenarioSteps>
            {scenario.steps.map((step) => (
              <ScenarioStep key={step.cmd + (step.note || "")}>
                <ScenarioStepCode
                  title="Нажмите, чтобы скопировать команду"
                  onClick={() => copyToClipboard(step.cmd)}
                >
                  <span className="cmd-text">{step.cmd}</span>
                  <span className="cmd-copy-icon">📋</span>
                </ScenarioStepCode>
                {step.note && <span>{` — ${step.note}`}</span>}
              </ScenarioStep>
            ))}
          </ScenarioSteps>
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
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const navigate = useNavigate();

  const isLandingRoute = location.pathname === "/";
  const isLawsRoute = location.pathname.startsWith("/app/laws");
  const isScenarioRoute = location.pathname.startsWith("/app/scenarios");
  const isNetworkHubRoute = location.pathname === "/app";
  const isTheoryRoute = location.pathname.startsWith("/app/theory");
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

  useEffect(() => {
    // при переключении между / и /laws очищаем поиск и фильтры
    setSearch("");
    setActiveCategories(new Set());
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY || 0;
      const prev = lastScrollY.current;

      if (current > prev && current > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLandingRoute) {
    return (
      <>
        <GlobalStyle />
        <LandingPage
          onEnter={() => navigate("/app")}
          onOpenLaws={() => navigate("/app/laws")}
          isDark={isDark}
          onToggleTheme={toggle}
        />
      </>
    );
  }

  return (
    <AppShell>
      <GlobalStyle />
      <Header className={isLawsRoute ? "laws-header" : ""} hidden={hideHeader}>
        <AppTitle>
          <h1>Универсальный справочник по ИБ</h1>
          <p>Пользуйтесь | Размышляйте | Учитесь | Делитесь</p>
        </AppTitle>
        <HeaderControls>
          <SectionToggle aria-label="Глобальные разделы">
            <SectionToggleBtn
              type="button"
              className={!isLawsRoute ? "active" : ""}
              onClick={() => navigate("/app")}
            >
              Сетевые технологии
            </SectionToggleBtn>
            <SectionToggleBtn
              type="button"
              className={isLawsRoute ? "active" : ""}
              onClick={() => navigate("/app/laws")}
            >
              Нормативно‑правовые акты
            </SectionToggleBtn>
          </SectionToggle>
          <ThemeToggle
            type="button"
            aria-label="Переключить тему"
            onClick={toggle}
          >
            {isDark ? "☀️" : "🌙"}
          </ThemeToggle>
        </HeaderControls>
      </Header>

      <Main hasSidebar={false}>
        <Content>
          {!(isNetworkHubRoute || isTheoryRoute) && (
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <IconButton type="button" aria-label="Назад" onClick={() => navigate(-1)}>
                  ←
                </IconButton>
                <IconButton type="button" aria-label="Вперёд" onClick={() => navigate(1)}>
                  →
                </IconButton>
              </div>
              <div
                style={{
                  flex: 1,
                  maxWidth: 480,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <SearchInput
                  type="search"
                  placeholder={
                    isLawsRoute
                      ? "Поиск по нормативным актам..."
                      : view === "scenarios"
                      ? "Поиск по сценариям на сайте..."
                      : "Поиск по командам на сайте..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          )}

          {!isLawsRoute && !isScenarioRoute && !isNetworkHubRoute && !isTheoryRoute && (
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "flex-end" }}>
              <ViewToggle aria-label="Режим отображения">
                <ViewToggleBtn
                  type="button"
                  className={view === "commands" && !isScenarioRoute ? "active" : ""}
                  onClick={() => setView("commands")}
                >
                  Команды
                </ViewToggleBtn>
                <ViewToggleBtn
                  type="button"
                  className={view === "scenarios" || isScenarioRoute ? "active" : ""}
                  onClick={() => setView("scenarios")}
                >
                  Сценарии
                </ViewToggleBtn>
              </ViewToggle>
            </div>
          )}

          <Routes>
            <Route
              path="/app"
              element={<NetworkHub />}
            />
            <Route
              path="/app/cheatsheet"
              element={
                <NetworkContent
                  vendor={vendor}
                  view={view}
                  search={search}
                  activeCategories={activeCategories}
                />
              }
            />
            <Route path="/app/theory" element={<TheoryPage />} />
            <Route
              path="/app/scenarios/:title"
              element={<ScenarioDetail />}
            />
            <Route
              path="/app/laws"
              element={<LawsLibrary search={search} />}
            />
            <Route
              path="/app/laws/:id"
              element={<LawDetail />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Main>

      <Footer>
      Сайт находится в постоянной доработке, информация обновляется, а контент пополняется.      </Footer>
    </AppShell>
  );
}

export default App;

