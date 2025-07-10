'use client';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import MagneticCard from '@/components/Animations/MagneticCard';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const TIERS = [
  {
    id: 'price_Pro',
    name: 'Pro',
    price: '$199',
    interval: 'mo',
    features: [
      '100 scans / mo',
      'Core modules access',
      'Email support',
      'Standard SLA (99.9%)'
    ],
    cta: 'Subscribe',
    popular: false
  },
  {
    id: 'price_Elite',
    name: 'Elite',
    price: '$999',
    interval: 'mo',
    features: [
      '1,000 scans / mo',
      'All modules + integrations',
      'Priority support',
      'Enhanced SLA (99.95%)'
    ],
    cta: 'Subscribe',
    popular: true
  },
  {
    id: '',
    name: 'Enterprise',
    price: 'Contact Us',
    interval: '',
    features: [
      'Unlimited scans',
      'Dedicated account manager',
      '24/7 war-room support',
      'Custom SLA & compliance'
    ],
    cta: 'Contact Sales',
    popular: false
  },
];

export default function PricingTiers() {
  const handleCheckout = async (priceId: string) => {
    const stripe = await stripePromise;
    if (!stripe) return;
    
    await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl: window.location.href,
      cancelUrl: window.location.href,
    });
  };

  return (
    <section className="relative py-32 px-8 z-20" id="pricing">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-command font-bold cyan-glow mb-6">
            Pricing Tiers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose your level of defense. From indie builders to Fortune 500 fortresses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.23, 1, 0.32, 1] 
              }}
              viewport={{ once: true }}
              className={`relative ${tier.popular ? 'scale-105' : ''}`}
            >
              <MagneticCard>
                <div className={`h-full flex flex-col ${
                  tier.popular ? 'ring-2 ring-cyan-400' : ''
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-black px-6 py-2 rounded-full text-sm font-terminal font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-command font-bold text-white mb-4">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-4xl font-command text-cyan-400">{tier.price}</span>
                      {tier.interval && <span className="text-gray-400">/{tier.interval}</span>}
                    </div>
                  </div>

                  <div className="flex-1 mb-8">
                    <h4 className="text-sm font-terminal text-cyan-400 mb-4 uppercase tracking-wide">
                      What You Get
                    </h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse-glow"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.id ? (
                    <motion.button
                      onClick={() => handleCheckout(tier.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                        tier.popular 
                          ? 'bg-cyan-400 text-black hover:bg-cyan-300 btn-glow' 
                          : 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
                      }`}
                    >
                      {tier.cta}
                    </motion.button>
                  ) : (
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition font-bold text-lg text-center block"
                    >
                      {tier.cta}
                    </motion.a>
                  )}
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm">
            All plans include quantum-grade encryption, 24/7 monitoring, and our legendary support team.
            <br />
            Enterprise customers get dedicated war room access and custom threat intelligence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
