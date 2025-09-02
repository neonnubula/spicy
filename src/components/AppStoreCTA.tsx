import React from "react";
import { ArrowRight } from "lucide-react";

const AppStoreCTA = () => {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Download Most Important Thing
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your life one day at a time. Focus on what truly matters and achieve your most important daily goals.
        </p>
        <div className="text-sm text-gray-500">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white mr-2">✓</span>
          Free forever • No ads • No tracking
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a 
          href="#" 
          className="group transition-transform hover:scale-105"
          aria-label="Download on the App Store"
        >
          <img 
            src="/images/appstore-icon.svg" 
            alt="Download on the App Store" 
            className="h-12 sm:h-14"
          />
        </a>
        
        <a 
          href="#" 
          className="group transition-transform hover:scale-105"
          aria-label="Get it on Google Play"
        >
          <img 
            src="/images/GetItOnGooglePlay_Badge_Web_color_English.png" 
            alt="Get it on Google Play" 
            className="h-12 sm:h-14"
          />
        </a>
      </div>
      
      <div className="pt-4">
        <a 
          href="#features" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
        >
          Learn more about the app
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default AppStoreCTA;
