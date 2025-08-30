
import React, { useRef } from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  backgroundImage?: string;
}

const testimonials: TestimonialProps[] = [{
  content: "I'm lucky to attend a school that allows full AI use, so I can maximize Hackademia. I couldn't have completed my degree without it, balancing full-time work and a post-grad load. I love how it clearly lays out academic integrity guidelines, so I can cite it confidently.",
  author: "Danny P",
  role: "MBA Student",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "/assets/images/vision-blue-1.png"
}, {
  content: "As an international student studying in English as my second language, I'm scared of using AI incorrectly and getting in trouble. That's why I stopped using ChatGPT and now only use Hackademia!",
  author: "Bella L",
  role: "Early Childhood Education student",
  gradient: "from-indigo-900 via-purple-800 to-orange-500",
  backgroundImage: "/assets/images/vision-orange-1.png"
}, {
  content: "I prefer my students use Hackademia because it clearly guides what they should and shouldn't do with AI based on assignment rules. Ultimately it's the student's responsibility, but this is the best solution so far.",
  author: "Dean P",
  role: "Business and Leadership Academic",
  gradient: "from-purple-800 via-pink-700 to-red-500",
  backgroundImage: "/assets/images/vision-blue-2.png"
}, {
  content: "AI cheating is a massive problem, and we're strict on its use but allow it in some scenarios. I'm more confident in students using Hackademia because they truly care about academic integrity and even consulted with us in its design, no other AI company has done that.",
  author: "Julie K",
  role: "Head of Faculty",
  gradient: "from-orange-600 via-red-500 to-purple-600",
  backgroundImage: "/assets/images/vision-blue-1.png"
}];

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png"
}: TestimonialProps) => {
  return <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
    backgroundImage: `url('${backgroundImage}')`
  }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>;
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}> {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Testimonials</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">What others say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => <TestimonialCard key={index} content={testimonial.content} author={testimonial.author} role={testimonial.role} gradient={testimonial.gradient} backgroundImage={testimonial.backgroundImage} />)}
        </div>
      </div>
    </section>;
};

export default Testimonials;
