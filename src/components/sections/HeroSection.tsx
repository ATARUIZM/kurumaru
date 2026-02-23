"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/kurumaru-top.jpg"
        alt="株式会社くるまる"
        fill
        className="object-cover"
        priority
      />

      {/* Site color overlay */}
      <div className="absolute inset-0 bg-navy-950/70" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/40 via-transparent to-navy-950/60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="mb-6 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              神奈川県平塚市の自動車販売店
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            お車のことなら
            <br />
            <span className="text-accent">くるまる</span>へ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-10 max-w-2xl text-lg text-slate-400 sm:text-xl"
          >
            神奈川県平塚市を拠点に、自動車の販売・保険・整備まで、
            お車のことならなんでもお気軽にご相談ください。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button href="/contact" size="lg">
              お問い合わせ
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
}
