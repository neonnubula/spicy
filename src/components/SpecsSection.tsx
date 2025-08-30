
import React from "react";

const SpecsSection = () => {
  return (
    <section className="w-full py-6 sm:py-10 bg-white" id="specifications">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">3</span>
              <span>Specs</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        {/* Main content with text mask image - responsive text sizing */}
        <div className="max-w-5xl pl-4 sm:pl-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-tight mb-8 sm:mb-12">
            <span className="block bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(to right, #2dd4ff, #8b5cf6, #4c1d95, #ff36a3)',
              backgroundSize: '200% 100%',
              backgroundPosition: 'center'
            }}>
              Don't become another student using general AI like ChatGPT, which wasn't built for academics, leading to headaches with fake references and getting caught for cheating. <br className="hidden sm:block" /><br className="hidden sm:block" />Follow the rules and always use the only specialized AI tool designed for students and built with academic integrity in mind from the start.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
