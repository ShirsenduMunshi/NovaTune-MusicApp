import React from "react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 py-10 text-foreground">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <section className="space-y-5 text-muted-foreground">
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of the NovaTune app and services. By using NovaTune, you agree to these Terms. If you do not agree, please refrain from using the platform.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">1. Use of Service</h2>
        <p>
          NovaTune is intended for personal and non-commercial use only. You agree not to misuse the platform, distribute unauthorized content, or interfere with the proper operation of the service.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">2. User Accounts</h2>
        <p>
          You may be required to create an account to access some features. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">3. Intellectual Property</h2>
        <p>
          All music, graphics, code, and branding on NovaTune are the property of NovaTune or its partners. You may not copy, reproduce, or reuse content without permission.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the platform at any time, especially in cases of policy violations or abuse.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">5. Limitation of Liability</h2>
        <p>
          NovaTune is provided "as is" without any warranties. We are not liable for any direct, indirect, or incidental damages resulting from your use of the service.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">6. Modifications</h2>
        <p>
          We may update these Terms at any time. It is your responsibility to review the latest version. Continued use of NovaTune after changes implies acceptance.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6">7. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{" "}
          <a href="mailto:shirsendumunshi4@gmail.com" className="text-primary underline">
            support@novatune.com
          </a>
        </p>

        <p>
          Read our{" "}
          <Link href="/privacy" className="text-primary underline">
            Privacy Policy
          </Link>{" "}
          to learn how we handle your data.
        </p>
      </section>
    </main>
  );
}
