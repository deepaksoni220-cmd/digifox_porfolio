'use client';

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "bookcabs aus is our non-negotiable partner for C-suite executive transfers across Melbourne and Sydney. Impeccable punctuality and immaculate luxury sedans.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    name: "Eleanor Vance",
    role: "Managing Director",
    company: "Apex Capital Group",
    rating: 5,
  },
  {
    quote:
      "Flight tracking worked seamlessly when my Melbourne flight was delayed by 2 hours. My chauffeur was waiting right at arrivals with chilled water and luggage assistance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    name: "Marcus Sterling",
    role: "VP of Global Partnerships",
    company: "Vanguard Tech",
    rating: 5,
  },
  {
    quote:
      "The hourly chauffeur service for our multi-venue corporate summit was flawless. The Audi A7 and Tesla Model S fleets are pristine and whisper-quiet.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    name: "Sophia Chen",
    role: "Chief Operating Officer",
    company: "Aura Luxury Retail",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-3 mt-12">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          index={index}
          key={testimonial.name}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
  index: number;
}) {
  const { quote, name, role, company, image, rating = 5 } = testimonial;

  return (
    <figure
      className={cn(
        "group relative flex flex-col justify-between gap-6 p-8 rounded-2xl bg-[#0e131f] border border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#d4a359]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(212,163,89,0.18)]",
        className,
      )}
      {...props}
    >
      {/* Top Header: Star Rating & Verified Badge */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="size-4 fill-[#d4a359] text-[#d4a359]"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#d4a359] tracking-wider uppercase bg-[#d4a359]/10 px-2.5 py-1 rounded-full border border-[#d4a359]/25">
          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Verified Client
        </span>
      </div>

      {/* Quote Content */}
      <blockquote className="flex flex-col gap-3">
        <svg
          className="size-8 text-[#d4a359]/40 group-hover:text-[#d4a359] transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <p className="font-normal text-[15px] text-white/85 leading-relaxed">
          "{quote}"
        </p>
      </blockquote>

      {/* Client Profile */}
      <figcaption className="flex items-center gap-3.5 pt-4 border-t border-white/5">
        <Avatar className="size-12 rounded-full ring-2 ring-[#d4a359]/40 ring-offset-2 ring-offset-[#0e131f] transition-all group-hover:ring-[#d4a359] group-hover:scale-105">
          <AvatarImage alt={`${name}'s profile picture`} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-semibold text-white text-[15px] not-italic">
            {name}
          </cite>
          <p className="text-white/50 text-xs">
            {role}, <span className="text-[#d4a359] font-medium">{company}</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
