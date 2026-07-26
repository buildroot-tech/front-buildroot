"use client";

import { type Project } from "@/lib/projects";

interface ProjectVisualPreviewProps {
  readonly project: Project;
}

export function ProjectVisualPreview({ project }: ProjectVisualPreviewProps) {
  switch (project.id) {
    case "polo-pantoja-platform":
      return (
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b-3 border-[var(--border)] bg-[#0f172a] p-4 text-[var(--text-inverse)] select-none">
          {/* Blueprint Grid BG */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />

          {/* Architectural Overlay */}
          <div className="relative z-10 w-full font-mono text-xs">
            <div className="flex justify-between border-b border-blue-500/40 pb-1 text-[10px] text-blue-400">
              <span>CAD_PLAN // PARCELA_04</span>
              <span>SCALE: 1:100</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="border border-slate-700 bg-slate-900/80 p-2 text-center">
                <span className="block font-bold text-amber-400">ANTICRES</span>
                <span className="text-[9px] text-slate-400">LEGAL_CERT</span>
              </div>
              <div className="border border-blue-500 bg-blue-950/80 p-2 text-center shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                <span className="block font-bold text-white">PROPERTIES</span>
                <span className="text-[9px] text-blue-300">RBAC_ACTIVE</span>
              </div>
              <div className="border border-slate-700 bg-slate-900/80 p-2 text-center">
                <span className="block font-bold text-emerald-400">
                  LAWYERS
                </span>
                <span className="text-[9px] text-slate-400">SPRING_SEC</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
              <span>LAT: 0.8294° N, 77.6444° W</span>
              <span className="text-emerald-400">● 100% CLEAN ARCH</span>
            </div>
          </div>

          {/* Large Watermark Index */}
          <span className="absolute -right-2 -bottom-6 font-mono text-8xl font-black text-white/5 pointer-events-none">
            01
          </span>
        </div>
      );

    case "edusur-educational":
      return (
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b-3 border-[var(--border)] bg-[#2563eb] p-4 text-white select-none">
          {/* Wave Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

          <div className="relative z-10 w-full font-mono">
            <div className="flex items-center justify-between border-b border-white/30 pb-1 text-[10px] text-blue-100 uppercase">
              <span>ASTRO_ISLANDS // ZERO_JS</span>
              <span>GSAP_ACCEL</span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-black tracking-tighter text-white">
                  98/100
                </span>
                <span className="block text-[10px] text-blue-200 uppercase">
                  LIGHTHOUSE SCORE
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-amber-300">
                  &lt;500ms
                </span>
                <span className="block text-[10px] text-blue-200 uppercase">
                  MOBILE FCP
                </span>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-blue-900/60 overflow-hidden border border-white/20">
              <div className="h-full bg-amber-400 w-[98%]" />
            </div>
          </div>

          <span className="absolute -right-2 -bottom-6 font-mono text-8xl font-black text-white/10 pointer-events-none">
            02
          </span>
        </div>
      );

    case "salesforce-agentforce-omni":
      return (
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b-3 border-[var(--border)] bg-[#0f172a] p-4 text-[var(--text-inverse)] select-none">
          {/* Node Graph Wireframe */}
          <div className="relative z-10 w-full font-mono text-xs">
            <div className="flex justify-between border-b border-emerald-500/40 pb-1 text-[10px] text-emerald-400">
              <span>OMNI_CHANNEL // ROUTING_MATRIX</span>
              <span>AGENTFORCE AI</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="border border-emerald-500 bg-emerald-950/60 p-2 text-center w-1/3">
                <span className="block font-bold text-emerald-300">
                  INBOUND
                </span>
                <span className="text-[9px] text-emerald-400">CASE_FLOW</span>
              </div>
              <div className="text-emerald-400 font-bold text-xs">➔</div>
              <div className="border border-blue-500 bg-blue-950/80 p-2 text-center w-1/3 shadow-[0_0_12px_rgba(37,99,235,0.4)]">
                <span className="block font-bold text-white">AI AGENT</span>
                <span className="text-[9px] text-blue-300">AGENTFORCE</span>
              </div>
              <div className="text-emerald-400 font-bold text-xs">➔</div>
              <div className="border border-purple-500 bg-purple-950/60 p-2 text-center w-1/3">
                <span className="block font-bold text-purple-300">LWC CRM</span>
                <span className="text-[9px] text-purple-400">DISPATCH</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-slate-400">
              <span>AUTO_ROUTED: 85%</span>
              <span className="text-emerald-400">LATENCY: &lt;1.2S</span>
            </div>
          </div>

          <span className="absolute -right-2 -bottom-6 font-mono text-8xl font-black text-white/5 pointer-events-none">
            03
          </span>
        </div>
      );

    case "aca-diario-digital":
      return (
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b-3 border-[var(--border)] bg-[#f8fafc] p-4 text-[var(--text-primary)] select-none">
          {/* Newspaper Layout Mockup */}
          <div className="relative z-10 w-full font-mono">
            <div className="flex justify-between border-b-2 border-[#0f172a] pb-1 text-[10px] font-bold uppercase">
              <span>DIARIO_ACÁ // IPIALES_NARIÑO</span>
              <span>VOL. 2026</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="col-span-2 border-r border-[#0f172a] pr-2">
                <div className="bg-[#0f172a] text-white p-1 text-[10px] font-bold uppercase">
                  HEADLINE
                </div>
                <div className="mt-1 h-2 bg-slate-300 w-full" />
                <div className="mt-1 h-2 bg-slate-300 w-3/4" />
              </div>
              <div className="border border-[#0f172a] bg-amber-200 p-1 text-center">
                <span className="block text-[9px] font-bold">LOCAL AD</span>
                <span className="block text-[8px]">ROTATION</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-[#0f172a] pt-1 text-[10px] text-[var(--text-muted)]">
              <span>WORKFLOW: &lt;4H</span>
              <span className="font-bold text-[var(--accent)]">
                TARGET: 50K MAU
              </span>
            </div>
          </div>

          <span className="absolute -right-2 -bottom-6 font-mono text-8xl font-black text-slate-900/10 pointer-events-none">
            04
          </span>
        </div>
      );

    default:
      return (
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b-3 border-[var(--border)] bg-[#0f172a] p-4 text-[var(--text-inverse)] select-none">
          <div className="relative z-10 w-full font-mono text-xs">
            <div className="flex justify-between border-b border-slate-700 pb-1 text-[10px] text-slate-400">
              <span>SYS_MONITOR // {project.indexCode}</span>
              <span>BUILDROOT_LABS</span>
            </div>
            <div className="mt-4 text-center">
              <span className="font-mono text-2xl font-extrabold text-[var(--accent)] uppercase">
                {project.id.replace(/-/g, "_")}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1">
                STATUS: PRODUCTION_SHIPPED
              </span>
            </div>
          </div>
          <span className="absolute -right-2 -bottom-6 font-mono text-8xl font-black text-white/5 pointer-events-none">
            {project.indexCode}
          </span>
        </div>
      );
  }
}
