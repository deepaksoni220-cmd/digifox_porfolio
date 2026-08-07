import { SectionShell } from '../components/SectionShell';

const STATS = [
  { value: '240K+', label: 'Run club members' },
  { value: '48', label: 'City chapters' },
  { value: '12', label: 'Pro athlete partners' },
];

export function CommunitySection() {
  return (
    <SectionShell
      id="community"
      eyebrow="Together"
      title={
        <>
          ARC PACE <span className="font-serif italic">community</span>
        </>
      }
      description="Weekly meetups, maker workshops, and early access for members who train, explore, and shape what we build next."
    >
      <div className="mt-12 flex flex-wrap gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="community-stat">
            <p className="font-serif text-5xl italic text-[#DA3A16]">{s.value}</p>
            <p className="mt-1 text-sm text-white/50">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="community-desc mt-12 max-w-xl text-sm text-white/50">
        Tag <span className="text-white">#ArcPace</span> to be featured in our global lookbook. Members get
        first access to fit sessions and prototype wear tests.
      </p>
    </SectionShell>
  );
}

