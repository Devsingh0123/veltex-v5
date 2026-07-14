import React, { useEffect } from 'react';

export default function TermsConditionsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 pb-24 px-[6vw] min-h-screen bg-white text-[#0f172a]">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-8 text-center">Terms & Conditions</h1>

                <div className="prose prose-lg max-w-none font-sans">
                    <p className="text-xl mb-6">By accessing and using veltexs.com, you accept and agree to be bound by the terms and provision of this agreement.</p>

                    <h2 className="text-2xl font-serif font-medium mt-10 mb-4">1. Use of the Website</h2>
                    <p className="mb-4">You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
                        Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>

                    <h2 className="text-2xl font-serif font-medium mt-10 mb-4">2. Intellectual Property</h2>
                    <p className="mb-4">All content, trademarks, logos, and data on this website, including text, graphics, and software, are the property of Veltex Services Private Limited or its content suppliers and are protected by applicable intellectual property laws.</p>

                    <h2 className="text-2xl font-serif font-medium mt-10 mb-4">3. User Communications</h2>
                    <p className="mb-4">By providing your contact information on our website, you expressly grant Veltex Services Private Limited permission to reach out to you.<br/>

                      <span className="font-extrabold">To Communicate with You:</span>   We may use your information to respond to your inquiries, provide customer service support, send you important information about the services, and send you marketing communications (with your consent) via different channels, including but not limited to SMS, Email, WhatsApp, RCS and Voice.

                        You may opt-out of receiving marketing communications at any time by following the unsubscribe instructions provided in those communications.</p>

                    <h2 className="text-2xl font-serif font-medium mt-10 mb-4">4. Limitation of Liability</h2>
                    <p className="mb-4">Veltex Services Private Limited will not be liable for any consequential, incidental, indirect, or punitive damages arising out of your access to, or use of, this website or any variation of the services provided.</p>

                    <h2 className="text-2xl font-serif font-medium mt-10 mb-4">5. Governing Law</h2>
                    <p className="mb-4">These terms and conditions are governed by and construed in accordance with the laws of India, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Delhi.</p>
                    <h2 className="text-2xl font-serif font-medium mt-10 mb-4">6. Changes to Terms</h2>
                    <p className="mb-4">Veltex Services Private Limited reserves the right to revise these terms and conditions at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms & Conditions.</p>


                </div>
            </div>
        </div>
    );
}
