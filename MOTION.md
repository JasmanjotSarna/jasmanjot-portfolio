# Motion Language Specification (MOTION.md)

Jasmanjot Singh Sarna — Personal Portfolio & Projects

---

## 1. Core Principles

1. **Reasoned Motion**: Every animation must have a clear purpose: reveal content, guide recruiter attention to technical proof, or confirm an interaction. Never animate purely for decoration.
2. **60fps Invariant**: Animate **only** GPU-composited properties:
   - `transform` (`translate3d`, `scale`, `rotate`)
   - `opacity`
   - `clip-path`
   - SVG `stroke-dashoffset` / `stroke-dasharray`
   - *Never* animate `width`, `height`, `margin`, `padding`, or `top/left` (zero layout thrashing).
3. **Accessibility First (`prefers-reduced-motion`)**:
   - All pinned scrolling, continuous marquees, particle/packet motion, and cursor lag are disabled when `prefers-reduced-motion: reduce` is active.
   - Immediate opacity transitions (150ms) replace multi-step choreographies.

---

## 2. Standardized Easing Curves

All animations across CSS, Framer Motion, and GSAP strictly utilize these two standardized bezier curves:

| Type | Cubic Bezier | Purpose |
| :--- | :--- | :--- |
| **Entrance (Editorial Decel)** | `cubic-bezier(0.22, 1, 0.36, 1)` | Swift start with a long, elegant deceleration. Used for reveals, card entrances, and modals. |
| **Exit / Retract (Editorial Accel)** | `cubic-bezier(0.64, 0, 0.78, 0)` | Smooth acceleration away. Used for transitions out and closing states. |
| **Interactive Spring** | `{ stiffness: 400, damping: 30, mass: 0.8 }` | Used for magnetic buttons and custom cursor tracking. |

---

## 3. Duration Tiers

| Tier | Duration Range | Target Elements |
| :--- | :--- | :--- |
| **Tier 1: Micro** | `150ms – 250ms` | Button hovers, link underline sweeps, text-scramble ticks, cursor label morphs, clipboard copied badges. |
| **Tier 2: Standard** | `500ms – 700ms` | Content reveals, accordion expansions, architecture node appearances, tab switching in Agent Explorer. |
| **Tier 3: Signature** | `900ms – 1400ms` | Hero masked line-by-line reveal, portrait clip-path wipe, page load monogram intro, circular theme switch. |

---

## 4. Stack Delegation

- **Lenis (`lenis`)**: Viewport-level smooth inertial scrolling with anchor navigation intercept.
- **Framer Motion (`framer-motion`)**: Component-level state transitions, line-masking reveals, role ticker, magnetic buttons, and interactive Agent Pipeline Explorer.
- **GSAP + ScrollTrigger**: Scroll-based pinned storytelling on Projects, differential numeral parallax, and architecture SVG line self-drawing.
- **Web APIs**: View Transitions API for the circular theme reveal; `matchMedia` for reduced-motion and mobile detection.

---

## 5. Responsive & Device Breakpoints

- **Desktop (>= 1024px)**: Full feature set enabled (custom cursor, magnetic pull, pinned project scroll, cursor-following preview frame).
- **Tablet (768px – 1023px)**: Custom cursor disabled, touch gestures enabled for Agent Pipeline, soft card stacking.
- **Mobile (< 768px)**: Native scroll (no pinning lock), simplified reveals, full touch accessibility, zero hover states.
