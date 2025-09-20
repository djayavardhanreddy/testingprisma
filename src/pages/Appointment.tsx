import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';
import { apiPost, apiGet } from '../hooks/useApi';
import type { AppointmentFormData } from '../types';

const Appointment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    department: '',
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    insuranceProvider: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const departments = [
    'Cardiology',
    'Neurology', 
    'Pediatrics',
    'Orthopedics',
    'Oncology',
    'Emergency Medicine',
    'Internal Medicine',
    'Dermatology',
    'Psychiatry',
    'Radiology'
  ];

  const doctors = {
    'Cardiology': ['Dr. Sarah Johnson', 'Dr. Mark Davis'],
    'Neurology': ['Dr. Michael Chen', 'Dr. Rebecca White'],
    'Pediatrics': ['Dr. Emily Rodriguez', 'Dr. David Kim'],
    'Orthopedics': ['Dr. Robert Thompson', 'Dr. Jennifer Lee'],
    'Oncology': ['Dr. Lisa Park', 'Dr. Steven Miller'],
    'Emergency Medicine': ['Dr. James Wilson', 'Dr. Maria Garcia'],
    'Internal Medicine': ['Dr. Thomas Brown', 'Dr. Amanda Taylor'],
    'Dermatology': ['Dr. Christopher Moore', 'Dr. Rachel Adams'],
    'Psychiatry': ['Dr. Daniel Wright', 'Dr. Nicole Clark'],
    'Radiology': ['Dr. Kevin Jones', 'Dr. Laura Martinez']
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'department' && { doctor: '' })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAppointment();
  };

  const submitAppointment = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const appointmentData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth,
        appointmentDate: formData.appointmentDate,
      };

      await apiPost('/appointments', appointmentData);
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to schedule appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkAvailability = async (date: string, doctor?: string) => {
    if (!date) return;
    
    try {
      const params = doctor ? `?doctor=${encodeURIComponent(doctor)}` : '';
      const response = await apiGet<{availableSlots: string[]}>(`/appointments/availability/${date}${params}`);
      setAvailableSlots(response.availableSlots);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  // Check availability when date or doctor changes
  React.useEffect(() => {
    if (formData.appointmentDate) {
      checkAvailability(formData.appointmentDate, formData.doctor);
    }
  }, [formData.appointmentDate, formData.doctor]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Scheduled!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for scheduling your appointment with MediCare Hospital. 
            You will receive a confirmation email shortly with all the details.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              <strong>Appointment Details:</strong><br/>
              {formData.department} - {formData.doctor}<br/>
              {formData.appointmentDate} at {formData.appointmentTime}
            </p>
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Schedule Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Schedule an Appointment</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Book your appointment with our expert medical team. We're here to provide 
              you with the best possible care.
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Information</h2>
              <p className="text-gray-600">Please fill out all required fields to schedule your appointment.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Appointment Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Doctor
                    </label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleInputChange}
                      disabled={!formData.department}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select Doctor</option>
                      {formData.department && doctors[formData.department as keyof typeof doctors]?.map(doc => (
                        <option key={doc} value={doc}>{doc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Time</option>
                      {(availableSlots.length > 0 ? availableSlots : timeSlots).map(time => (
                        <option 
                          key={time} 
                          value={time}
                          disabled={availableSlots.length > 0 && !availableSlots.includes(time)}
                        >
                          {time} {availableSlots.length > 0 && !availableSlots.includes(time) ? '(Booked)' : ''}
                        </option>
                      ))}
                    </select>
                    {formData.appointmentDate && availableSlots.length === 0 && (
                      <p className="text-sm text-red-600 mt-1">
                        No available slots for this date. Please choose another date.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline h-4 w-4 mr-1" />
                    Reason for Visit *
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your symptoms or reason for the appointment..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Blue Cross Blue Shield"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-6">
                {submitError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{submitError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                </button>
                
                <p className="text-sm text-gray-600 mt-4 text-center">
                  By scheduling this appointment, you agree to our terms and conditions. 
                  You will receive a confirmation email within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-lg text-gray-600">
              Our patient care team is available to assist you with scheduling your appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Monday - Friday: 8 AM - 8 PM</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">appointments@medicare.com</p>
              <p className="text-sm text-gray-500">Response within 4 hours</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Portal</h3>
              <p className="text-gray-600">Patient Portal Access</p>
              <p className="text-sm text-gray-500">24/7 online booking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;