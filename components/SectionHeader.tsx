import Reveal from './Reveal'

export default function SectionHeader({
  index,
  kicker,
  title,
  description,
}: {
  index: string
  kicker: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-sm text-signal">{index}</span>
        <span className="index-label">{kicker}</span>
        <span className="hairline flex-1 ml-2 hidden sm:block" />
      </div>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="text-muted text-base md:text-lg mt-5 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  )
}
