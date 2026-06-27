'use client'
/* eslint-disable @next/next/no-img-element -- third-party badge images with dynamic, server-determined dimensions */

import { Github, GitFork, Star, Users } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const USERNAME = 'JasmanjotSarna'

const stats = [
  { icon: Github, label: 'Public Repos', value: '4+' },
  { icon: Star, label: 'Stars Earned', value: '—' },
  { icon: GitFork, label: 'Forks', value: '—' },
  { icon: Users, label: 'Followers', value: '—' },
]

export default function GithubStats() {
  return (
    <section id="github" className="py-24 md:py-32 container-grid">
      <SectionHeader
        index="// 06"
        kicker="Open Source"
        title="GitHub activity"
        description="Live snapshot of where the code actually lives — commits, languages, and repositories, pulled straight from GitHub."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05} className="panel p-6 flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-signal-dim flex-shrink-0">
              <s.icon size={17} className="text-signal" />
            </div>
            <div>
              <div className="font-mono text-xl text-paper">{s.value}</div>
              <div className="text-xs text-muted tracking-wide">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="panel p-7 md:p-9 space-y-6">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=4C8DFF&icon_color=4C8DFF&text_color=7C8694&hide=prs,issues`}
          alt={`GitHub stats for ${USERNAME}`}
          loading="lazy"
          className="max-w-full"
          style={{ maxHeight: 165 }}
        />
        <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=4C8DFF&text_color=7C8694`}
          alt={`Top languages for ${USERNAME}`}
          loading="lazy"
          className="max-w-full"
          style={{ maxHeight: 165 }}
        />
        <img
          src={`https://ghchart.rshah.org/4C8DFF/${USERNAME}`}
          alt={`Contribution graph for ${USERNAME}`}
          loading="lazy"
          className="max-w-full w-full"
        />
      </Reveal>

      <Reveal delay={0.2} className="mt-8 text-center">
        <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="btn-ghost">
          View full profile <Github size={15} />
        </a>
      </Reveal>
    </section>
  )
}
