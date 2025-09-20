import React from 'react';
import { Phone, Mail, Award, GraduationCap } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import type { Doctor } from '../types';

const Doctors = () => {
  const { data: doctors, loading, error } = useApi<Doctor[]>('/doctors');

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Oncology',
    'Emergency Medicine'
  ];

  const [selectedSpecialty, setSelectedSpecialty] = React.useState('All Specialties');

  const filteredDoctors = React.useMemo(() => {
    if (!doctors) return [];
    return selectedSpecialty === 'All Specialties' 
      ? doctors 
      : doctors.filter(doctor => doctor.specialty === selectedSpecialty);
  }, [doctors, selectedSpecialty]);

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Medical Team</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Meet our experienced doctors and specialists who are dedicated to providing 
              exceptional healthcare with compassion and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedSpecialty === specialty
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading doctors...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading doctors: {error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {doctor.specialty}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{doctor.education}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{doctor.experience} experience</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {(typeof doctor.achievements === 'string' 
                        ? JSON.parse(doctor.achievements) 
                        : doctor.achievements
                      ).map((achievement: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{doctor.email}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right Doctor?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our patient care coordinators are here to help you find the right specialist for your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Contact Patient Care
            </button>
            
            <div className="flex items-center space-x-2 text-blue-100">
              <Phone className="h-5 w-5" />
              <span>Call us: +1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;