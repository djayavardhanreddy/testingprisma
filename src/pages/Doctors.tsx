import React, { useState } from 'react';
import { Phone, Mail, Award, GraduationCap, X, Eye, Languages, Trophy, MessageSquare, Wrench } from 'lucide-react';

// Mock doctor data based on your components
const doctorsData = {
  cardiology: {
    id: 1,
    name: 'Dr. Kiran Kumar Reddy',
    title: 'Associate consultant - Cardiology',
    specialty: 'Cardiology',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
    phone: '+91 9876543210',
    email: 'kiran.reddy@hospital.com',
    overview: 'Dr. Kiran Kumar Reddy, a renowned heart specialist in Kurnool, Andhra Pradesh, is now serving as an associate consultant for the cardiology department at Manipal Hospitals. He has performed around 10,000 2D Echo Examinations included paediatric Echocardiography, Contrast Echo, DSE and Transoesophageal Echocardiographic examinations. Performed around 2500 Diagnostic Angiograms which included coronary, peripheral, Renal, post CABG graft angiograms and performed 30 primary Angioplasties.',
    expertise: [
      'Interventional Cardiology',
      'Pacemaker Implantations',
      'Preventive Cardiology',
      'Non-Invasive Bedside Cardiac Emergency Procedures',
      'Angiogram',
      'Coronary Interventions'
    ],
    languages: ['English', 'Telugu', 'Hindi', 'Kannada'],
    awards: [],
    publications: []
  },
  dermatology: {
    id: 2,
    name: 'Dr. A. Mounika',
    title: 'MBBS, MD DVL Gold Medalist',
    specialty: 'Dermatology',
    image: '/api/placeholder/200/150',
    phone: '+91 9876543211',
    email: 'mounika.a@hospital.com',
    overview: 'Dr. Mounika is a reputed and leading Skin Specialist and Dermatologist associated with Vasu Reddy Hospital, Prakash Nagar, and Lakshmi Sai Gastro Skin & Maternity Clinic, Gayatri Estate, Kurnool, with over a decade of experience in dermatology. Her medical qualifications include an MBBS, a diploma in Dermatology, Venereology and Leprosy, and an MD in Dermatology.',
    expertise: [
      'Diagnostic Endoscopy procedures',
      'Therapeutic endoscopy procedures',
      'ERCP and other procedures'
    ],
    languages: ['English', 'Telugu', 'Hindi'],
    awards: [
      'University Topper in MD DVL exams conducted by Dr NTR university of health sciences',
      'Awarded IADVL Scholarship to attend SARCD 2015, Mysore',
      'Awarded Gelivi Kondaiah Memorial Gold Medal for securing 1st place in Paraclinicals',
      'All India 2nd in NATIONAL ASI PG QUIZ CONTEST conducted by AIDS Society of India'
    ],
    publications: [
      'Presented a paper on "Prevalence of Metabolic syndrome in psoriasis: A Case control study"',
      'Presented a paper on "A Case report on Multicentric Anaplastic Lymphoma"',
      'Presented a paper on "MMF a better alternative to cyclophosphamide in DCP Resistant Pemphigus"'
    ],
    equipments: ['TRI-BEAM', 'MORPHEUS 8 PRO', 'VEGA Comfort']
  },
  gastroenterology: {
    id: 3,
    name: 'Dr. Praveen Kumar Reddy',
    title: 'MD, DM (Medical Gastroenterology)',
    specialty: 'Gastroenterology',
    image: '/api/placeholder/200/150',
    phone: '+91 9876543212',
    email: 'praveen.reddy@hospital.com',
    overview: 'Dr. Praveen Kumar Reddy is a leading Hepatologist and Gastroenterologist associated with Lakshmi Sai Gastro Skin & Maternity Clinic, Gayatri Estate, Kurnool, with over a decade of experience in gastroenterology. His medical qualification include an MBBS, an MD in internal Medicine, and a DM in Gastroenterology.',
    expertise: [
      'Diagnostic Endoscopy procedures',
      'Therapeutic endoscopy procedures',
      'ERCP and other procedures'
    ],
    languages: ['English', 'Telugu', 'Hindi'],
    awards: [
      'Awarded Gold Medal for securing 1st place in PHYSIOLOGY',
      'Got 2nd prize in quiz at state AP APICON 2014 held at Kakinada',
      'Got 1st Prize in quiz at ISGCON 2019 held at Kolkata'
    ],
    publications: [
      'EVALUATION OF BONE MINERAL DENSITY AMONG PATIENTS WITH INFLAMMATORY BOWEL DISEASE',
      'A RARE CASE OF DISSEMINATED INTRAABDOMINAL HYDATIDOSIS',
      'A RARE CASE OF CHOLESTASIS IN INFANCY'
    ]
  },
  gynaecology: {
    id: 4,
    name: 'Dr. A. Manasa',
    title: 'MBBS, MD Gold Medalist',
    specialty: 'Gynaecology',
    image: '/api/placeholder/200/150',
    phone: '+91 9876543213',
    email: 'manasa.a@hospital.com',
    overview: 'She is a leading Gynaecologist associated with Lakshmi Sai Gastro Skin & Maternity Clinic, Gayatri Estate, Kurnool, with over a decade of experience in gynaecology. Her medical qualifications include an MBBS, a diploma in Gynaecology, and an MD in Gynaecology.',
    expertise: [
      'Diagnostic Endoscopy procedures',
      'Therapeutic endoscopy procedures',
      'ERCP and other procedures'
    ],
    languages: ['English', 'Telugu', 'Hindi'],
    awards: [
      'University Topper in MD DVL exams conducted by Dr NTR university of health sciences',
      'Awarded IADVL Scholarship to attend SARCD 2015, Mysore',
      'Awarded Gelivi Kondaiah Memorial Gold Medal for securing 1st place in Paraclinicals'
    ],
    publications: [
      'Presented a paper on "Prevalence of Metabolic syndrome in psoriasis: A Case control study"',
      'Presented a paper on "A Case report on Multicentric Anaplastic Lymphoma"'
    ]
  }
};

const DoctorModal = ({ doctor, isOpen, onClose }:any) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !doctor) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'expertise', label: 'Field of Expertise', icon: Award },
    { id: 'languages', label: 'Languages Spoken', icon: Languages },
    { id: 'awards', label: 'Awards & Achievements', icon: Trophy },
    { id: 'publications', label: 'Talks & Publications', icon: MessageSquare },
    ...(doctor.equipments ? [{ id: 'equipments', label: 'Equipments', icon: Wrench }] : [])
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-teal-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-lg object-cover border-2 border-white"
            />
            <div>
              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              <p className="text-teal-100">{doctor.title}</p>
              <p className="text-teal-200 text-sm">{doctor.specialty}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-teal-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-teal-600'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{doctor.overview}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">{doctor.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-teal-600" />
                  <span className="text-gray-700">{doctor.email}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expertise' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Field of Expertise</h3>
              <ul className="space-y-2">
                {doctor.expertise.map((item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Languages Spoken</h3>
              <ul className="space-y-2">
                {doctor.languages.map((language: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{language}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'awards' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Awards & Achievements</h3>
              {doctor.awards.length > 0 ? (
                <ul className="space-y-2">
                  {doctor.awards.map((award: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{award}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Awards information will be updated soon.</p>
              )}
            </div>
          )}

          {activeTab === 'publications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Talks & Publications</h3>
              {doctor.publications.length > 0 ? (
                <ul className="space-y-2">
                  {doctor.publications.map((publication: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{publication}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Publications information will be updated soon.</p>
              )}
            </div>
          )}

          {activeTab === 'equipments' && doctor.equipments && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Equipment & Technology</h3>
              <ul className="space-y-2">
                {doctor.equipments.map((equipment: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{equipment}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specialties = [
    'All Specialties',
    'Cardiology',
    'Dermatology',
    'Gastroenterology',
    'Gynaecology'
  ];

  const doctors = Object.values(doctorsData);

  const filteredDoctors = selectedSpecialty === 'All Specialties' 
    ? doctors 
    : doctors.filter(doctor => doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase());

  const handleDoctorClick = (doctor:any) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-20">
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
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-teal-50 hover:text-teal-600'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleDoctorClick(doctor)}
              >
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {doctor.specialty}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-gray-600 mb-2">{doctor.title}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <GraduationCap className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">{doctor.specialty} Specialist</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Award className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">10+ years experience</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4 text-teal-600" />
                      <span className="text-sm">{doctor.email}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDoctorClick(doctor);
                      }}
                      className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
                    >
                      View Profile
                    </button>
                    <button className="flex-1 border border-teal-600 text-teal-600 py-2 rounded-lg hover:bg-teal-50 transition-colors duration-200 font-medium">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right Doctor?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our patient care coordinators are here to help you find the right specialist for your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Contact Patient Care
            </button>
            
            <div className="flex items-center space-x-2 text-teal-100">
              <Phone className="h-5 w-5" />
              <span>Call us: +91 8518-221-222</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <DoctorModal 
        doctor={selectedDoctor} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Doctors;