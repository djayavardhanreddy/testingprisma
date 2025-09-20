export interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  department: string;
  doctor?: string;
  appointmentDate: Date;
  appointmentTime: string;
  reason: string;
  insuranceProvider?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  education: string;
  experience: string;
  image: string;
  phone: string;
  email: string;
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  insuranceProvider: string;
  emergencyContact: string;
  emergencyPhone: string;
}