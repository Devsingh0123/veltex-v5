import React, { useEffect } from "react";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 pb-24 px-[6vw] min-h-screen bg-white text-[#0f172a]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-8 text-center">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none font-sans">
          <p className="text-xl mb-6">
            Welcome to Veltex Services Private Limited (veltexs.com). We value
            your privacy and are committed to protecting your personal data.
            This Privacy Policy outlines how we collect, use, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We may collect personal information that you voluntarily provide to
            us, including but not limited to your name, email address, phone
            number, and any other details you submit through our contact forms
            or service inquiries.
          </p>
          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            2. Consent & Opt-In / Opt-Out
          </h2>
          <p className="mb-4">
            By sharing your contact details with Veltex, you consent to receive
            campaign updates, project communication, and service offers via
            call, RCS, SMS, WhatsApp, or email. We do not sell or share your
            information with third parties for unrelated marketing.
            <br />
            <br />
            <span className="font-extrabold">Opt-Out:</span>
            You may withdraw consent anytime by replying STOP to any message or
            emailing hello@veltexs.com. Opting out stops promotional messages
            but not transactional updates on active projects.
          </p>

          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information we collect primarily to provide, maintain,
            protect and improve our current services and to develop new ones.
            This includes using the information to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              We use the information we collect for various business purposes,
              including:
            </li>
            <li>To provide, operate, and maintain our website and services.</li>
            <li>To improve, personalize, and expand our website offerings.</li>
            <li>To understand and analyze how you use our website.</li>
            <li>
              <span className="font-extrabold">To Communicate with You:</span>{" "}
              We may use your information to respond to your inquiries, provide
              customer service support, send you important information about the
              services, and send you marketing communications (with your
              consent) via different channels, including but not limited to SMS,
              Email, WhatsApp, RCS and Voice.
            </li>
          </ul>

          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            4. Data Protection and Security
          </h2>
          <p className="mb-4">
            We implement a variety of security measures to maintain the safety
            of your personal information. However, please note that no method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            5. Third-Party Sharing
          </h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personally
            identifiable information to outside parties unless we provide you
            with advance notice or are required to do so by law. This does not
            include trusted third parties who assist us in operating our website
            or conducting our business, so long as those parties agree to keep
            this information confidential.
          </p>
          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            6. Cookies
          </h2>
          <p className="mb-4">
            Our website may use "cookies" to enhance the user experience. You
            can choose to set your web browser to refuse cookies, or to alert
            you when cookies are being sent.
          </p>
          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            7. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            Veltex Services Private Limited reserves the right to update this
            privacy policy at any time. We encourage users to frequently check
            this page for any changes.
          </p>

          <h2 className="text-2xl font-serif font-medium mt-10 mb-4">
            8. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Website: www.veltexs.com</li>
            <li>Email: [hello@veltexs.com]</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
