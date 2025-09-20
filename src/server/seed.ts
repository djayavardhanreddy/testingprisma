import { prisma } from '../lib/prisma';

async function main() {
  // Seed departments
  const departments = [
    { name: 'Cardiology', description: 'Heart and cardiovascular care' },
    { name: 'Neurology', description: 'Brain and nervous system care' },
    { name: 'Pediatrics', description: 'Children\'s healthcare' },
    { name: 'Orthopedics', description: 'Bone and joint care' },
    { name: 'Oncology', description: 'Cancer treatment and care' },
    { name: 'Emergency Medicine', description: '24/7 emergency care' },
    { name: 'Internal Medicine', description: 'General internal medicine' },
    { name: 'Dermatology', description: 'Skin and dermatological care' },
    { name: 'Psychiatry', description: 'Mental health care' },
    { name: 'Radiology', description: 'Medical imaging and diagnostics' }
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept
    });
  }

  // Seed doctors
  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      education: 'MD from Harvard Medical School',
      experience: '15 years',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@medicare.com',
      achievements: JSON.stringify(['Board Certified Cardiologist', 'Fellow of American College of Cardiology', 'Published 50+ Research Papers'])
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      education: 'MD from Johns Hopkins University',
      experience: '18 years',
      image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      phone: '+1 (555) 234-5678',
      email: 'michael.chen@medicare.com',
      achievements: JSON.stringify(['Brain Surgery Specialist', 'International Neurology Award Winner', 'Department Head of Neurology'])
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      education: 'MD from Stanford University',
      experience: '12 years',
      image: 'https://images.pexels.com/photos/7446982/pexels-photo-7446982.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      phone: '+1 (555) 345-6789',
      email: 'emily.rodriguez@medicare.com',
      achievements: JSON.stringify(['Board Certified Pediatrician', 'Child Advocacy Award', 'Specialist in Developmental Disorders'])
    },
    {
      name: 'Dr. Robert Thompson',
      specialty: 'Orthopedics',
      education: 'MD from Mayo Clinic College',
      experience: '20 years',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      phone: '+1 (555) 456-7890',
      email: 'robert.thompson@medicare.com',
      achievements: JSON.stringify(['Joint Replacement Pioneer', 'Sports Medicine Expert', 'Olympic Team Physician'])
    },
    {
      name: 'Dr. Lisa Park',
      specialty: 'Oncology',
      education: 'MD from Yale School of Medicine',
      experience: '14 years',
      image: 'https://images.pexels.com/photos/7825766/pexels-photo-7825766.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      phone: '+1 (555) 567-8901',
      email: 'lisa.park@medicare.com',
      achievements: JSON.stringify(['Cancer Research Leader', 'Immunotherapy Specialist', 'Patient Choice Award Winner'])
    },
    {
      name: 'Dr. James Wilson',
      specialty: 'Emergency Medicine',
      education: 'MD from UCLA Medical School',
      experience: '16 years',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      phone: '+1 (555) 678-9012',
      email: 'james.wilson@medicare.com',
      achievements: JSON.stringify(['Emergency Medicine Director', 'Trauma Care Specialist', 'Life-Saving Excellence Award'])
    }
  ];

  for (const doctor of doctors) {
    await prisma.doctor.upsert({
      where: { email: doctor.email },
      update: {},
      create: doctor
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });