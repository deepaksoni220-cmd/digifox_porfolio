import { FadeIn } from '../../components/FadeIn';
import { VideoComparisonSection } from '../VideoComparisonSection';

export const StoryAgitationSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[var(--bg-base)]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 flex flex-col gap-32">
        
        {/* Section 1 */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-[var(--text-strong)] text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8">
              Still Using a Website Built 5 Years Ago?
            </h2>
            <div className="space-y-4 text-[var(--text-primary)]/70 text-lg sm:text-xl font-light">
              <p>Your marketing has evolved.</p>
              <p>Your products have improved.</p>
              <p>Your services have grown.</p>
              <p className="text-[var(--text-strong)] font-medium mt-6 mb-8">But your website still looks like it belongs in 2020.</p>
              
              <p>Meanwhile...</p>
              <p>Your competitors are creating premium digital experiences that instantly build trust and make visitors feel confident before they even speak to a salesperson.</p>
              
              <p className="text-[#ef4444] font-medium pt-4">Every outdated website silently loses potential customers.</p>
            </div>
            
            <div className="mt-12 p-8 bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl text-center">
              <h3 className="text-[var(--text-strong)] font-bold text-2xl mb-6">Ready to Modernize Your Online Presence?</h3>
              <a
                href="https://calendly.com/deepak-soni220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[#3b82f6] hover:bg-[#2563eb] text-[var(--text-strong)] font-semibold rounded-full transition-all duration-300"
              >
                Book Your Free Strategy Call
              </a>
            </div>

            {/* Video Comparison */}
            <div className="mt-24 relative w-screen max-w-7xl left-1/2 -translate-x-1/2 px-0">
              <VideoComparisonSection />
            </div>
          </FadeIn>
        </div>

        {/* Section 2 */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-[var(--text-strong)] text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8">
              Every Click Costs Money.
            </h2>
            <div className="space-y-6 text-[var(--text-primary)]/70 text-lg sm:text-xl font-light">
              <p>Let's say...</p>
              <ul className="space-y-3 font-medium text-[var(--text-strong)]/90 bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-subtle)]">
                <li className="flex justify-between"><span>Meta Ads</span> <span>$5,000/month</span></li>
                <li className="flex justify-between"><span>Google Ads</span> <span>$3,000/month</span></li>
                <li className="flex justify-between"><span>Email Marketing</span> <span>$1,000/month</span></li>
                <li className="flex justify-between pt-4 border-t border-[var(--border-strong)] text-xl font-bold text-[#3b82f6]">
                  <span>Total</span> <span>$9,000 every month</span>
                </li>
              </ul>
              
              <p className="pt-4">That's over <strong className="text-[var(--text-strong)]">$9,000 every month</strong> bringing people to your website.</p>
              <p className="font-medium text-[var(--text-strong)] pt-4">Now ask yourself...</p>
              <p className="font-bold text-2xl text-[var(--text-strong)] leading-snug">Does your website deserve that investment and giving basic 1% conversions over visitors?</p>
              <p>Or is it reducing the return on everything else you're spending?</p>
            </div>
            
            <div className="mt-10">
              <a
                href="#demo"
                className="inline-block px-8 py-4 border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-[var(--text-strong)] font-semibold rounded-full transition-all duration-300"
              >
                See How We Increase Website Performance
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Section 2.5: ROAS Stats */}
        <div className="py-8 sm:py-16">
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-[var(--text-strong)] text-[clamp(1.5rem,3vw,2.5rem)] leading-tight mb-4 text-center">
              Why an exclusive website gets more ROAS for your business over a basic website
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[#3b82f6]/20 text-center flex flex-col items-center justify-center shadow-lg hover:border-[#3b82f6]/50 transition-colors duration-300">
                <span className="text-5xl font-black text-[#3b82f6] mb-3 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">2x</span>
                <span className="text-[var(--text-strong)] font-semibold text-lg">More Conversions & Sales</span>
              </div>
              <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[#3b82f6]/20 text-center flex flex-col items-center justify-center shadow-lg hover:border-[#3b82f6]/50 transition-colors duration-300">
                <span className="text-5xl font-black text-[#3b82f6] mb-3 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">200%</span>
                <span className="text-[var(--text-strong)] font-semibold text-lg">Time Spent on Website</span>
              </div>
              <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[#3b82f6]/20 text-center flex flex-col items-center justify-center shadow-lg hover:border-[#3b82f6]/50 transition-colors duration-300">
                <span className="text-5xl font-black text-[#3b82f6] mb-3 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">50%</span>
                <span className="text-[var(--text-strong)] font-semibold text-lg">Lower Bounce Rate</span>
              </div>
              <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[#3b82f6]/20 text-center flex flex-col items-center justify-center shadow-lg hover:border-[#3b82f6]/50 transition-colors duration-300">
                <span className="text-5xl font-black text-[#3b82f6] mb-3 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">&lt; 3s</span>
                <span className="text-[var(--text-strong)] font-semibold text-lg">Lightning Fast Load Time</span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Section 3 */}
        <div>
          <FadeIn delay={0.1} y={30}>
            <h2 className="font-black text-[var(--text-strong)] text-[clamp(2rem,4vw,3.5rem)] leading-tight mb-8">
              First Impressions Are Made in Seconds.
            </h2>
            <div className="space-y-6 text-[var(--text-primary)]/70 text-lg sm:text-xl font-light">
              <p>Before visitors</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Read your content...</li>
                <li>Compare your pricing...</li>
                <li>View your portfolio...</li>
              </ul>
              <p className="pt-2 font-medium text-[var(--text-strong)]">They've already formed an opinion about your business.</p>
              
              <p className="pt-6">Your website instantly communicates either:</p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="flex-1 p-6 bg-[var(--bg-surface)] rounded-2xl border border-green-500/20 text-center">
                  <p className="text-green-400 font-bold text-xl">"I'm an industry leader."</p>
                </div>
                <div className="flex items-center justify-center text-[var(--text-strong)]/30 font-bold text-xl">or</div>
                <div className="flex-1 p-6 bg-[var(--bg-surface)] rounded-2xl border border-red-500/20 text-center">
                  <p className="text-red-400 font-bold text-xl">"I'm just another option."</p>
                </div>
              </div>
              
              <p className="pt-8 text-[var(--text-strong)] font-medium text-2xl text-center">
                An exclusive website builds confidence and focus over your products / service instead of its pricing before the sales conversation even begins.
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};
