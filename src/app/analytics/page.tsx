'use client';

import { useState } from "react";
import Overview from '@/components/analytics/Overview'
import Reel from '@/components/analytics/Reel'
import Image from '@/components/analytics/Image'
import Carousel from '@/components/analytics/carousel'
import '@/app/globals.css'

export default function Analytics() {

    const [activeTab, setActiveTab] = useState<string>('Overview');

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
            <div className="flex flex-col w-full md:pl-16">
                <div>
                    <ul className="flex gap-2 p-5 flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        {tabData.map((tab) => (
                            <li key={tab.id} className="me-2">
                                <a
                                    href={`#${tab.id}`}
                                    className={`inline-block px-8 py-4 rounded-[50px] transition-all duration-200 transform ${
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
                            <h1 className='text-2xl font-bold md:text-2xl lg:text-4xl mt-6 mb-12'>Overview</h1>
                           <div className="mx-3 pr-3">
                           <Overview />
                           </div>
                           
                        </>
                    )}
                    {activeTab === 'Reels' && (
                        <>
                            <h1 className='text-2xl font-bold md:text-2xl lg:text-4xl mt-6 mb-12'>Reel Metrics</h1>
                            <Reel />
                        </>
                    )}
                    {activeTab === 'static_Images' && (
                        <>
                            <h1 className='text-2xl font-bold md:text-2xl lg:text-4xl mt-6 mb-12'>Sales</h1>
                            <Image />
                        </>
                    )}
                    {activeTab === 'Carousel' && (
                        <>
                            <h1 className='text-2xl font-bold md:text-2xl lg:text-4xl mt-6 mb-12'>Customer</h1>
                            <Carousel />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
