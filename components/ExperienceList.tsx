'use client'

import { EXPERIENCE, SHOW_LEADERSHIP, LEADERSHIP_EXPERIENCE } from '@/lib/content'
import { MapPin, Calendar, Briefcase } from 'lucide-react'

export default function ExperienceList() {
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 border-y border-border bg-[#141413] text-[#ECEAE4] transition-colors duration-200 relative overflow-hidden"
    >
      {/* Corner Crop Marks for Print Proof Contrast */}
      <div className="absolute top-4 left-6 font-mono text-[10px] text-[#9E9A92]/40 select-none hidden sm:block">
        + INVERSE_PLATE [SEC.03]
      </div>
      <div className="absolute top-4 right-6 font-mono text-[10px] text-[#9E9A92]/40 select-none hidden sm:block">
        + RECORD_EXPERIENCE
      </div>

      <div className="container-editorial">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 font-mono text-xs text-[#E05D35] font-semibold tracking-wider uppercase mb-2">
            <span>Section 03</span>
            <span>•</span>
            <span>Professional Background</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#ECEAE4] tracking-tight mb-3">
            Work Experience
          </h2>
          <p className="text-sm sm:text-base text-[#9E9A92] max-w-2xl leading-relaxed">
            A verified record of hands-on internships across AI full-stack development, exploratory data analysis, and KPI reporting.
          </p>
        </div>

        {/* Experience Scannable Rows */}
        <div className="space-y-6 sm:space-y-8">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={exp.role + exp.company}
              className="p-6 sm:p-8 rounded-sm border border-white/10 bg-[#1D1C1A] hover:border-[#E05D35]/40 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-[#ECEAE4]">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-[#E05D35] font-medium mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-[#9E9A92]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>{exp.period}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 mt-4 pt-4 border-t border-white/10">
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="text-sm text-[#ECEAE4]/90 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="text-[#E05D35] mt-1 text-xs flex-shrink-0">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Optional Leadership Section */}
          {SHOW_LEADERSHIP && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-display text-xl font-normal text-[#ECEAE4] mb-4">
                Leadership Experience (AIESEC Jaipur)
              </h3>
              <div className="space-y-4">
                {LEADERSHIP_EXPERIENCE.map((exp) => (
                  <div
                    key={exp.role}
                    className="p-4 rounded-sm border border-white/10 bg-[#1D1C1A]/60"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                      <h4 className="font-display text-base font-semibold text-[#ECEAE4]">
                        {exp.role} — <span className="text-[#E05D35]">{exp.company}</span>
                      </h4>
                      <span className="font-mono text-xs text-[#9E9A92]">{exp.period}</span>
                    </div>
                    <ul className="space-y-1">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="text-xs text-[#9E9A92] flex items-start gap-2">
                          <span className="text-[#E05D35]">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
