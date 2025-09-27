import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  image_url: string;
  title?: string;
  text: string;
}

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

 const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "The Art of Healing",
    text: "The good physician treats the disease; the great physician treats the patient who has the disease",
    image_url: "https://img.freepik.com/free-photo/doctor-doing-cosmetology-process_624325-1515.jpg?t=st=1724572277~exp=1724575877~hmac=10e7c95a8227946ea267e619df6bd713e2da1d62a4c09383a03c9f204b16704b&w=740",
  },
  {
    id: 1,
    title: "Compassion in Medicine",
    text: "The good physician treats the disease; the great physician treats the patient who has the disease",
    image_url: "https://img.freepik.com/free-psd/brain-study-background-psd-mental-health-care-medical-technology_53876-123320.jpg?t=st=1724572725~exp=1724576325~hmac=687b776e42f8b2f3df0e9612417ae432391cd96c5d16f25c9173cacc9109cfd0&w=740",
  },
  {
    id: 2,
    title: "Pride in the White Coat",
    text: "Wear the white coat with dignity and pride, it is an honor and privilege to get to serve the public as a physician.",
    image_url: "https://img.freepik.com/premium-photo/collage-medical-issue-with-blood-stool_23-2150942845.jpg?w=740",
  },
  {
    id: 3,
    title: "The Power of Words",
    text: "As doctors, we are not trained to communicate and understand the power of our words as it is related to patient’s ability and desire to survive” – Bernie Siegel",
    image_url: "https://img.freepik.com/premium-vector/pregnant-woman-consult-pregnancy-with-doctor-consultation-check-up-pregnancy-concept_338371-1491.jpg?w=826",
  },
];
;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 md:h-[600px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image_url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl opacity-90">{slide.text}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;