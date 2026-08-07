import type { ReactNode } from 'react';

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

export function SectionShell({ id, eyebrow, title, description, children }: SectionShellProps) {
  return (
    <section
      id={id}
      className="relative z-10 min-h-[90dvh] flex flex-col justify-center border-t border-white/10 bg-[#050505] text-white py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl px-6 md:px-12">
        <p className="section-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          {eyebrow}
        </p>
        <h2 className="section-title font-sans text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="section-desc mt-6 max-w-2xl text-base leading-relaxed text-white/64 md:text-lg">
          {description}
        </p>
        <div className="section-content mt-12">
          {children}
        </div>
      </div>
    </section>
  );
}
