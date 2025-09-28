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
    'Pediatrics & Child Care',
    'Maternity & Women\'s Health',
    'Diagnostic Imaging',
    'Dermatology & Skin care',
    'Gastrology & EndoScope'
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
    image_path: 'data:image/jpeg;base64,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',
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
                  {/* <p className="text-gray-600">{highlight.href}</p> */}
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
              <span>Or call: 08518232777</span>
            </div>
          </div>
 <Link
              to="/location"
              // className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
          <div className="mt-8 flex items-center justify-center space-x-2 text-blue-100">
            <MapPin className="h-5 w-5" />
            <span>Gayathree Estates, Deva Nagar, Kurnool, Andhra Pradesh 518002</span>
          </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;