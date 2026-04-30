import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import brandImage1 from "../assets/service/brand/logo2.png"
import brandImage2 from "../assets/service/brand/drinking water logo.png"
import brandImage3 from "../assets/service/brand/giz logo.png"
import brandImage4 from "../assets/service/brand/ireda logo.png"
import brandImage5 from "../assets/service/brand/logo.png"
import brandImage6 from "../assets/service/brand/ministry log.png"
import brandImage7 from "../assets/service/brand/ministry renewable logo.png"
import brandImage8 from "../assets/service/brand/namami gange logo.png"
import brandImage9 from "../assets/service/brand/SECI logo.png"
import mediaImage1 from "../assets/service/media/afro logo.png"
import mediaImage2 from "../assets/service/media/anon log.png"
import mediaImage3 from "../assets/service/media/gopa logo.png"
import mediaImage4 from "../assets/service/media/idh.png"
import mediaImage5 from "../assets/service/media/IIFM logo.png"
import mediaImage6 from "../assets/service/media/soft logo.png"
import mediaImage7 from "../assets/service/media/vedanta log.png"
import mediaImage8 from "../assets/service/media/wadhwani logo.png"
import mediaImage9 from "../assets/service/media/wotr logo.png"
import techImage1 from "../assets/service/tech/Airtel-logo.png"
import techImage2 from "../assets/service/tech/du.png"
import techImage3 from "../assets/service/tech/etisalat.png"
import techImage4 from "../assets/service/tech/Google-Logo-PNG-Picture.png"
import techImage5 from "../assets/service/tech/my account logo.png"
import techImage6 from "../assets/service/tech/Reliance_Jio_Logo_(October_2015).png"
import techImage7 from "../assets/service/tech/Vi-Logo-Vector-300x300.png"
import cpaasImage1 from "../assets/service/cpaas/astrotring.png"
import cpaasImage2 from "../assets/service/cpaas/digitantra logo.png"
import cpaasImage3 from "../assets/service/cpaas/golden logo.png"
import cpaasImage4 from "../assets/service/cpaas/mobisastra.png"
import cpaasImage5 from "../assets/service/cpaas/sportrz.jpg"





gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = {
    BRAND: 'brand Solution',
    MEDIA: 'media Solution',
    TECH: 'tech Solution',
    CPAAS: 'Communication Platform'
};
const SERVICES_DATA = {
    [CATEGORIES.BRAND]: {
        title: "Brand Solutions",
        description: "Our Strategists, Designers, Video Editors and Animators provide you with holistic solutions to grow your digital presence and achieve your business goals through both day-to-day content and integrated flagship campaigns.",
        logos: [
            { name: 'Afro', src: brandImage1 },
            { name: 'Airtel', src: brandImage2 },
            { name: 'Anon', src: brandImage3 },
            { name: 'Digitantra', src: brandImage4 },
            { name: 'Drinking Water', src: brandImage5 },
            { name: 'Giz', src: brandImage6 },
            { name: 'Golden Arc', src: brandImage7 },
            { name: 'Google', src: brandImage8 },
            { name: 'Gopa', src: brandImage9 },

        ],
        accordions: [
            { title: "Social Media Management", content: "We create well-researched, insight-driven content strategies that build real communities." },
            { title: "Original Content and Copywriting", content: "Compelling ad copy and original content that prioritizes impact and clarity." },
            { title: "Graphic Design & Illustrations", content: "Thumb-stopping visual content that brings your brand’s personality to life." },
            { title: "Video Editing and Animation", content: "High-quality 2D/3D animations and video edits optimized for social sharing." },
            { title: "Film Production & Photography", content: "In-house production hub creating ad films and premium photo/video assets." },
            { title: "Campaign Planning", content: "Integrated flagship campaigns that deliver beyond expectations." },
            { title: "Veltex Fluence & ORM", content: "Connecting you with influencers and monitoring brand conversations." },
            { title: "Print, OOH, Mainline Advertising", content: "Creating neck-turning outdoor assets and physical touchpoints." },
            { title: "New Brand Launch and Rebranding", content: "Meditation on brand purpose and crafting fluid personality kits." }
        ]
    },
    [CATEGORIES.MEDIA]: {
        title: "Media Solutions",
        description: "We orchestrate data-driven media strategies to ensure your brand reaches the right audience at the ideal moment, maximizing ROI across every digital channel through precision and research.",
        logos: [
            { name: 'hitech', src: mediaImage1 },
            { name: 'IIFM', src: mediaImage2 },
            { name: 'ireda', src: mediaImage3 },
            { name: 'logo', src: mediaImage4 },
            { name: 'logo2', src: mediaImage5 },
            { name: 'ministry logo', src: mediaImage6 },
            { name: 'ministry renewable logo', src: mediaImage7 },
            { name: 'my account logo', src: mediaImage8 },
            { name: 'namami gange logo', src: mediaImage9 },
        ],
        accordions: [
            { title: "Media Planning & Buying", content: "Strategic allocation of budgets across premium inventory for maximum impact." },
            { title: "Performance Marketing", content: "Data-led SEM and Paid Social campaigns focused on conversions and scale." },
            { title: "Programmatic Advertising", content: "Automated real-time bidding to reach specific audience segments at scale." },
            { title: "Market Research & Insights", content: "Deep diving into consumer behavior to fuel media decisions." },
            { title: "SEO & Organic Growth", content: "Technical and content-led search engine optimization for long-term visibility." },
            { title: "Influencer Media Strategy", content: "Scaling influencer campaigns with paid media amplification." }
        ]
    },
    [CATEGORIES.TECH]: {
        title: "Tech Solutions",
        description: "Transforming businesses through scalable technology and custom digital infrastructure. From complex web apps to integrated automation systems, we build what drives growth.",
        logos: [
            { name: 'wotr logo', src: techImage1 },
            { name: 'reliance jio logo', src: techImage2 },
            { name: 'SECI logo', src: techImage3 },
            { name: 'soft logo', src: techImage4 },
            { name: 'vedanta logo', src: techImage5 },
            { name: 'Vi-Logo-Vector', src: techImage6 },
            { name: 'wadhwani logo', src: techImage7 },


        ],
        accordions: [
            { title: "UI/UX Design & Prototyping", content: "User-centric design systems and interactive prototypes for modern applications." },
            { title: "Web & App Development", content: "Scalable frontend and backend architectures using React, Next.js, and more." },
            { title: "CRM & CMS Implementation", content: "Expert setup of HubSpot, Zoho, and headless CMS solutions." },
            { title: "Marketing Automation", content: "Building automated workflows that streamline customer journeys." },
            { title: "Custom API Integrations", content: "Connecting disparate systems to ensure seamless data flow." },
            { title: "E-commerce Architectures", content: "Building high-performance online stores with headless capabilities." }
        ]
    },
    [CATEGORIES.CPAAS]: {
        title: "Communications Platform as a Service (CPaaS)",
        description: "The digital era offers businesses unprecedented opportunities to build meaningful relationships with their customers.",
        logos: [
            { name: 'astrotring', src: cpaasImage1 },
            { name: 'digitantra logo', src: cpaasImage2 },
            { name: 'golden logo', src: cpaasImage3 },
            { name: 'mobisastra', src: cpaasImage4 },
            { name: 'sportrz', src: cpaasImage5 }
        ],
        accordions: [
            { title: "Transforming Customer Engagement in the Digital Age", content: "The digital era offers businesses unprecedented opportunities to build meaningful relationships with their customers. Success requires a strategic approach across all key dimensions." },
            { title: "WhatsApp Business Messaging (WABA)", content: "WhatsApp Business Messaging empowers enterprises to break through traditional boundaries and create hyper-personalized customer experiences that drive meaningful revenue growth. As customers’ preferred channel for direct communication, WhatsApp enables instant, authentic conversations that forge deeper connections between brands and their audiences, turning satisfied customers into passionate advocates." },
            { title: "Rich Communication Service (RCS)", content: "RCS is a messaging protocol for Google/ Android users, which is experienced within the native messaging app of Android phones." },
            { title: "SMS Solutions", content: "SMS sevice allows enterprises to establish communication with mobile subscribers for establishing customer engagement and revenue growth." },
            { title: "Email – Enterprise Platform", content: "Made for all volume customers and can support till 20 million emails per day volume with 100Kb mailer / attachment size. The platform can send both unique and common attachments and more attachment size can be configured after scoping." },
            { title: "Enterprise Voice Platform", content: "With an expert voice broadcast platform, businesses can engage with a vast audience, maintain high levels of personalization and craft campaigns that deeply resonate." }
        ]
    }
};

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES.BRAND);
    const [openIndex, setOpenIndex] = useState(-1);
    const containerRef = useRef(null);

    const currentData = SERVICES_DATA[activeCategory];

    useEffect(() => {
        window.scrollTo(0, 0);
        setOpenIndex(-1); // Reset accordion on category change
    }, [activeCategory]);

    const handleToggle = (index) => {
        setOpenIndex(prev => prev === index ? -1 : index);
    };

    return (
        <div ref={containerRef} className="bg-white min-h-screen pt-20 pb-44 px-[6vw] font-sans selection:bg-black selection:text-white">

            {/* CATEGORY NAVIGATION */}
            <div className="flex justify-center border-b border-neutral-100 mb-24">
                <div className="flex overflow-x-auto gap-14">
                    {Object.values(CATEGORIES).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`pb-5 text-[0.8rem] font-bold uppercase tracking-[0.25em] transition-all relative ${activeCategory === cat ? 'text-black' : 'text-neutral-300 hover:text-black'
                                }`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-black"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 justify-between lg:gap-x-28 md:gap-x-14 gap-y-20 items-start"
            >
                {/* LEFT SECTION */}
                <div className="w-full">
                    <h1 className="text-3xl md:text-[2.2rem] font-black text-black mb-4 tracking-tighter leading-[1] uppercase">
                        {currentData.title}
                    </h1>
                    <p className="text-[1rem] leading-[1.25] text-neutral-800 mb-8 max-w-[540px] font-normal">
                        {currentData.description}
                    </p>

                    <div className="w-24 h-[1.5px] bg-black mb-8"></div>

                    <p className="text-[0.75rem] font-black text-black mb-8 uppercase tracking-[0.2em]">
                        Proud to work with the biggest brands in India & Abroad
                    </p>

                    <div className="grid grid-cols-3 md:grid-cols-3 gap-x-20 gap-y-10 items-center mt-20">
                        {currentData.logos.map((logo, i) => (
                            <div key={i} className="flex justify-center items-center h-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SECTION: ACCORDIONS */}
                <div className="w-full">
                    <div className="border-neutral-200">
                        {currentData.accordions.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className="border-b border-neutral-200">
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(index)}
                                        className="w-full flex items-center justify-between text-left group cursor-pointer relative py-6 transition-all duration-300 hover:bg-neutral-50/50"
                                    >
                                        <span className={`text-xl md:text-[1rem] font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-black' : 'text-black group-hover:text-black'}`}>
                                            {item.title}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex items-center justify-center w-7 h-7"
                                        >
                                            <svg className={`w-5 h-5 transition-colors ${isOpen ? 'text-black' : 'text-black group-hover:text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </motion.div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-4">
                                                    <p className="text-[0.85rem] leading-[1.8] text-neutral-800 max-w-[95%] font-normal">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
