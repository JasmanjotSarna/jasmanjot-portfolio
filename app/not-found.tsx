'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import NodeField from '@/components/NodeField'

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <NodeField className="w-full h-full opacity-50" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6"
      >
        <p className="font-mono text-signal text-sm mb-4">{'// error: route_not_found'}</p>
        <h1 className="font-display text-[clamp(4rem,14vw,9rem)] font-bold text-paper leading-none">
          404
        </h1>
        <p className="text-muted text-base md:text-lg mt-4 max-w-md mx-auto">
          This endpoint doesn&apos;t resolve to anything. The model returned a null prediction.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-9">
          <Link href="/" className="btn-signal">
            <Home size={15} /> Back to home
          </Link>
          <button onClick={() => window.history.back()} className="btn-ghost">
            <ArrowLeft size={15} /> Go back
          </button>
        </div>
      </motion.div>
    </section>
  )
}
