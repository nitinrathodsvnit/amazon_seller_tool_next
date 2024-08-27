import React from 'react';
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen p-8">
      <main className="max-w-6xl mx-auto mt-16">
        <div className="flex items-start justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center mb-6">
              <div className="bg-gray-100 p-2 rounded-full mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="bg-[#FF4500] p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-4">
              Analytics
            </h1>
            <h2 className="text-6xl font-bold mb-4">
              <span>that </span>
              <span className="text-gray-400"> helps  </span>
               <span > you </span>
              <span > product </span> 
              {/* <span className="bg-yellow-400 p-2 rounded-full mx-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3v3m0 12v3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M3 12h3m12 0h3M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span> */}
              <span className="text-[#FF4500]">lising and fees </span>
                <span> optimization.</span>
            </h2>
            <Button className="bg-black text-white rounded-full px-8 py-6 text-lg">
              Get started
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-4 w-96 h-64">
              <img src="/path-to-your-analytics-image.png" alt="Analytics Dashboard" className="w-full h-full object-cover rounded" />
            </div>
            <div className="absolute top-0 right-0 bg-[#FF4500] p-2 rounded-full -mt-4 -mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3l14 9-14 9V3z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;