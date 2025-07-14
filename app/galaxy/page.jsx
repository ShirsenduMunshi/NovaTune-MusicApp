"use client";

import { Rocket, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GalaxyPage() {
  const barCount = 30;

  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Stars className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse" />
        <h1 className="text-4xl font-bold">🌌 Galaxy of Music</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Dive into NovaTune’s music universe. From cosmic beats to AI-curated tracks,
          discover what's orbiting around you.
        </p>
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button size="lg" className="flex gap-2 items-center">
          <Rocket className="w-4 h-4" />
          Launch Galaxy Explorer
        </Button>
      </motion.div>

      {/* 🎵 Music Wave Animation */}
      <div className="mt-12 flex items-end gap-[3px] h-32">
        {Array.from({ length: barCount }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[4px] rounded-full bg-primary"
            animate={{
              scaleY: [1, 2, 0.7, 1.5, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Placeholder */}
      <div className="mt-10 w-full border border-dashed border-border rounded-xl p-6 text-muted-foreground">
        More Galaxy features coming soon... 🚀✨
      </div>
    </main>
  );
}
