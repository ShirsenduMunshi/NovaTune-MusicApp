import React from "react";

export default function Policy() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="space-y-4 text-muted-foreground">
        <p>
          Welcome to <strong>NovaTune</strong>. Your privacy is important to us.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our application.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Personal Information:</strong> Such as name, email address, or profile image, only when you choose to provide it (e.g., during sign-up).</li>
          <li><strong>Usage Data:</strong> Details like pages visited, time spent, and device/browser type.</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-6">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To improve and personalize your music experience.</li>
          <li>To provide customer support and manage user accounts.</li>
          <li>To send important updates and promotional messages (only with your consent).</li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground mt-6">3. Data Sharing & Third Parties</h2>
        <p>
          We do not sell or trade your data. However, we may share anonymized or aggregate data with analytics providers to help improve the app.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">4. Data Security</h2>
        <p>
          We use industry-standard measures to protect your data. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">5. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data. You can do so by contacting our support team.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">6. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. We'll notify users of major changes via the app or email.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:{" "}
          <a href="mailto:shirsendumunshi4@gmail.com" className="text-primary underline">support@novatune.com</a>
        </p>
      </section>
    </main>
  );
}
