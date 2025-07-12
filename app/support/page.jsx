import React from "react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Support</h1>

      <section className="space-y-6 text-muted-foreground">
        <p>
          Welcome to the NovaTune Support Center. We’re here to help you have the best experience
          while using our platform. Whether you're facing technical issues, have questions, or
          need guidance, we’re just a click away.
        </p>

        <h2 className="text-xl font-semibold text-foreground">📩 Contact Us</h2>
        <p>
          For any issues or feedback, feel free to reach out to us at:{" "}
          <a href="mailto:shirsendumunshi4@gmail.com" className="text-primary underline">
            support@novatune.com
          </a>
        </p>

        <h2 className="text-xl font-semibold text-foreground">🛠️ Common Support Topics</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Having trouble playing music or loading pages</li>
          <li>Issues with your NovaTune account</li>
          <li>Suggestions for new features or improvements</li>
          <li>Report broken links or incorrect data</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground">🔒 Security & Privacy</h2>
        <p>
          We take your data seriously. Visit our{" "}
          <Link href="/privacy" className="text-primary underline">
            Privacy Policy
          </Link>{" "}
          to learn more about how we handle your information.
        </p>

        <h2 className="text-xl font-semibold text-foreground">📃 Terms of Use</h2>
        <p>
          Before using NovaTune, please review our{" "}
          <Link href="/terms" className="text-primary underline">
            Terms & Conditions
          </Link>{" "}
          to understand your rights and responsibilities.
        </p>

        <h2 className="text-xl font-semibold text-foreground">💡 Tips</h2>
        <p>
          Try refreshing your browser or clearing cache if something isn’t working as expected.
          Still stuck? Email us anytime — we respond within 24–48 hours!
        </p>
      </section>
    </main>
  );
}
