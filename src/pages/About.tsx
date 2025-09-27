import React from 'react';
import { Award, Heart, Users, Building } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: '20+', label: 'Medical Professionals' },
    { icon: Heart, number: '5000+', label: 'Patients Treated Annually' },
    { icon: Award, number: '10+', label: 'Years of Excellence' },
    { icon: Building, number: '8', label: 'Specialized Departments' }
  ];

  const values = [
    {
      title: 'Compassionate Care',
      description: 'We treat every patient with empathy, respect, and dignity, understanding that healing involves both physical and emotional well-being.'
    },
    {
      title: 'Medical Excellence',
      description: 'Our commitment to the highest standards of medical practice ensures that patients receive the best possible care and treatment outcomes.'
    },
    {
      title: 'Innovation & Technology',
      description: 'We continuously invest in cutting-edge medical technology and innovative treatment methods to provide advanced healthcare solutions.'
    },
    {
      title: 'Community Partnership',
      description: 'As a cornerstone of our community, we work closely with local organizations to promote health awareness and preventive care.'
    }
  ];

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Lakshmi Sai Hospital</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Committed to excellence in healthcare for over 10 years, providing compassionate care 
              with state-of-the-art medical technology and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                To provide exceptional, comprehensive healthcare services that promote healing, 
                wellness, and hope for all members of our community. We are committed to 
                delivering patient-centered care with compassion, integrity, and respect.
              </p>
              <p className="text-lg text-gray-600">
                Our mission extends beyond treatment to include education, prevention, and 
                community health initiatives that improve the overall well-being of those we serve.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-4">
                To be the leading healthcare provider in our region, recognized for clinical 
                excellence, innovative care delivery, and outstanding patient outcomes. 
                We strive to set new standards in healthcare quality and accessibility.
              </p>
              <p className="text-lg text-gray-600">
                We envision a healthier community where every individual has access to 
                world-class medical care and the resources needed to maintain optimal health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                 Lakshmi Sai Hospital was founded in 2017 with a simple yet powerful vision: 
                  to provide world-class healthcare services to our community with compassion 
                  and excellence at our core.
                </p>
                <p>
                  What started as a small clinic with just 10 beds has grown into a 
                  comprehensive medical center with over 300 beds, 15 specialized departments, 
                  and a team of more than 200 dedicated healthcare professionals.
                </p>
                <p>
                  Throughout our journey, we have remained committed to our founding principles 
                  while continuously evolving to meet the changing healthcare needs of our 
                  patients and community.
                </p>
                <p>
                  Today, we proudly serve as a beacon of hope and healing, treating over 
                  50,000 patients annually and maintaining our reputation as a trusted 
                  healthcare partner for families across the region.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Hospital Building"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These fundamental values guide everything we do and shape the culture of care 
              that defines MediCare Hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Accreditations & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Joint Commission Accredited</h3>
              <p className="text-gray-600">Recognized for meeting the highest standards of healthcare quality and safety.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Magnet Recognition</h3>
              <p className="text-gray-600">Honored for excellence in nursing practice and patient outcomes.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Hospital Award</h3>
              <p className="text-gray-600">Named "Best Hospital" by Healthcare Excellence Magazine for three consecutive years.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;