import express from 'express';
import cors from 'cors';
import { prisma } from '../lib/prisma';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Create new appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      department,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
      insuranceProvider,
      emergencyContact,
      emergencyPhone
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !dateOfBirth || 
        !department || !appointmentDate || !appointmentTime || !reason) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 
                  'department', 'appointmentDate', 'appointmentTime', 'reason']
      });
    }

    // Check if appointment slot is already taken
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        doctor: doctor || undefined,
        status: { not: 'cancelled' }
      }
    });

    if (existingAppointment) {
      return res.status(409).json({ 
        error: 'This appointment slot is already booked. Please choose a different time.' 
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        department,
        doctor: doctor || null,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        reason,
        insuranceProvider: insuranceProvider || null,
        emergencyContact: emergencyContact || null,
        emergencyPhone: emergencyPhone || null,
        status: 'pending'
      }
    });

    res.status(201).json({
      message: 'Appointment scheduled successfully',
      appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Get appointment by ID
app.get('/api/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

// Update appointment status
app.patch('/api/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be: pending, confirmed, or cancelled' 
      });
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    });

    res.json({
      message: 'Appointment status updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Get doctors by department
app.get('/api/doctors/department/:department', async (req, res) => {
  try {
    const { department } = req.params;
    const doctors = await prisma.doctor.findMany({
      where: { specialty: department },
      orderBy: { name: 'asc' }
    });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors by department:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Get all departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// Check available time slots for a specific date and doctor
app.get('/api/appointments/availability/:date', async (req, res) => {
  try {
    const { date } = req.params;
    const { doctor } = req.query;

    const appointmentDate = new Date(date);
    
    const bookedSlots = await prisma.appointment.findMany({
      where: {
        appointmentDate,
        doctor: doctor as string || undefined,
        status: { not: 'cancelled' }
      },
      select: { appointmentTime: true }
    });

    const allTimeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
    ];

    const bookedTimes = bookedSlots.map(slot => slot.appointmentTime);
    const availableSlots = allTimeSlots.filter(slot => !bookedTimes.includes(slot));

    res.json({
      date,
      doctor: doctor || 'Any doctor',
      availableSlots,
      bookedSlots: bookedTimes
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});