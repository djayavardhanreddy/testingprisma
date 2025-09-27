import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Award, Clock, Phone, MapPin } from 'lucide-react';
import Carousel from '../components/Carousel';
import { apiPost, apiGet } from '../hooks/useApi';


const Home = () => {
  const highlights = [
    {
      icon: Award,
      title: 'Excellence in Healthcare',
      description: 'Award-winning medical care with internationally recognized standards.'
    },
    {
      icon: Users,
      title: 'Expert Medical Team',
      description: 'Over 20s specialized doctors and healthcare professionals.'
    },
    {
      icon: Clock,
      title: '24/7 Emergency Care',
      description: 'Round-the-clock emergency services and urgent care.'
    },
    {
      icon: Calendar,
      title: 'Easy Appointments',
      description: 'Convenient online booking system for all departments.'
    }
  ];

  const [appointments, setAppointments] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiGet('/appointments'); // or your apiGet('/appointments')
        console.log(response,'response')
        // setAppointments(response.data); // save the data in state
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const services = [
    'Cardiology & Heart Surgery',
    'Neurology & Brain Surgery', 
    'Oncology & Cancer Treatment',
    'Pediatrics & Child Care',
    'Orthopedics & Joint Replacement',
    'Emergency & Trauma Care',
    'Maternity & Women\'s Health',
    'Diagnostic Imaging'
  ];

  const specialities = [{
    image_path: 'https://img.freepik.com/premium-vector/pregnant-woman-future-mom-standing-nature-hugging-belly-with-arms-flat-vector-illustration_717949-78.jpg?w=740',
    text: 'PREGNANCY CARE',
    href: 'gynaecology'


  }, {
    image_path: 'https://img.freepik.com/free-vector/cartoon-gynecology-consultation-illustrated_23-2148676593.jpg?t=st=1725042958~exp=1725046558~hmac=4b7688a9a48d59b070bf4eebada10699aa091abf289387918f5c649535cc4240&w=740',
    text: 'GYNAECOLOGY',
    href: 'gynaecology'

  }, {
    image_path: 'https://img.freepik.com/free-vector/ai-use-healthcare-abstract-concept-illustration_335657-3789.jpg?t=st=1725042582~exp=1725046182~hmac=60e7000d17073f5687f4ffb3a13bc0de10af0a5419c9e7dc8fee645ec2747a1c&w=740',
    text: 'CARDIOLOGY',
    href: '/cardiology'
  }, {
    image_path: 'https://img.freepik.com/free-vector/flat-hand-drawn-microblading-concept_23-2148826280.jpg?t=st=1725042792~exp=1725046392~hmac=33a3d361a438b5f26f363ebb754024586106ae94777370e7c374cde4dd9263d4&w=740',
    text: 'DERMATOLOGY',
    href: 'dermatology'

  }, {
    image_path: 'https://www.freepik.com/free-vector/gradient-gut-health-illustration_58420840.htm#fromView=search&page=1&position=27&uuid=1950f3d7-b825-426f-94ee-37c2a1e80d10&query=gastroenterology+free',
    text: 'GASTROLOGY',
    href: 'gastroenterology'
  }

]

  return (
    <div>
      {/* Hero Carousel */}
      <Carousel />

      {/* Key Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Lakshmi Sai Hospital?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional healthcare services with a patient-centered approach, 
              advanced medical technology, and compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
       <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
             OUR SPECIALITIES
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional healthcare services with a patient-centered approach, 
              advanced medical technology, and compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {specialities.map((highlight, index) => {
              return (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src={highlight?.image_path}/>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.text}</h3>
                  <p className="text-gray-600">{highlight.href}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Medical Services
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our hospital offers a full range of medical specialties and services, 
                from routine check-ups to complex surgical procedures. We're equipped 
                with the latest technology and staffed by experienced professionals.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/doctors"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Meet Our Doctors
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7579319/pexels-photo-7579319.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Medical Services"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Schedule Your Appointment?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards better health. Book your appointment with our expert medical team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/appointment"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Schedule Appointment
            </Link>
            
            <div className="flex items-center space-x-2 text-blue-100">
              <Phone className="h-5 w-5" />
              <span>Or call: +1 (555) 123-4567</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-2 text-blue-100">
            <MapPin className="h-5 w-5" />
            <span>123 Medical Center Dr, Healthcare City</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;