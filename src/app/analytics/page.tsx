'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Overview from '@/components/analytics/Overview';
import Reel from '@/components/analytics/Reel';
import StaticImage from '@/components/analytics/Image';
import Carousel from '@/components/analytics/carousel';
import '@/app/globals.css';

export default function Analytics() {
    const [activeTab, setActiveTab] = useState<string>('Overview');
    const router = useRouter();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const tabData = [
        { id: 'Overview', label: 'Overview' },
        { id: 'Reels', label: 'Reels' },
        { id: 'static_Images', label: 'Static Images' },
        { id: 'Carousel', label: 'Carousel' },
    ];

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#f5cbc4] via-[#e8b4eb] to-[#c7d3f4] text-gray-800'>
            <div className="sticky top-0 bg-opacity-90 backdrop-blur-sm z-10">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 p-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>

            <div className="flex flex-col w-full md:pl-0">
                <div>
                    <ul className="flex flex-nowrap overflow-x-auto gap-2 p-5 text-sm font-medium text-center text-gray-500 dark:text-gray-400 hide-scrollbar">
                        {tabData.map((tab) => (
                            <li key={tab.id} className="me-2 flex-shrink-0">
                                <a
                                    href={`#${tab.id}`}
                                    className={`inline-block px-4 py-2 sm:px-8 sm:py-4 rounded-[50px] transition-all duration-200 transform ${
                                        activeTab === tab.id
                                            ? 'text-white bg-[#464646] shadow-lg'
                                            : 'text-gray-500 bg-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:-translate-y-1'
                                    }`}
                                    onClick={() => handleTabClick(tab.id)}
                                    aria-current={activeTab === tab.id ? 'page' : undefined}
                                >
                                    {tab.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="px-4 md:px-12">
                    {activeTab === 'Overview' && (
                        <>
                            <h1 className='text-2xl font-semibold md:text-2xl lg:text-3xl mt-6 mb-12'>Overview</h1>
                            <div className="mx-3 pr-3">
                                <Overview />
                            </div>
                        </>
                    )}
                    {activeTab === 'Reels' && (
                        <>
                            <h1 className='text-2xl font-semibold md:text-2xl lg:text-3xl mt-6 mb-12'>Reel Metrics</h1>
                            <Reel />
                        </>
                    )}
                    {activeTab === 'static_Images' && (
                        <>
                            <h1 className='text-2xl font-semibold md:text-2xl lg:text-3xl mt-6 mb-12'>Static Images Metrics</h1>
                            <StaticImage />
                        </>
                    )}
                    {activeTab === 'Carousel' && (
                        <>
                            <h1 className='text-2xl font-semibold md:text-2xl lg:text-3xl mt-6 mb-12'>Carousel Metrics</h1>
                            <Carousel />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
