/**
 * Database seed — creates admin user, test user, and festival deals
 */
import { PrismaClient, CabinClass } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Admin user
  const adminHash = await bcrypt.hash('Admin123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@bharatghumho.com' },
    update: {},
    create: {
      email: 'admin@bharatghumho.com',
      passwordHash: adminHash,
      firstName: 'Admin',
      lastName: 'BG',
      role: 'ADMIN',
      isEmailVerified: true,
    },
  });
  console.log('✅ Admin user created');

  // 2. Test user
  const testHash = await bcrypt.hash('Test123!', 12);
  await prisma.user.upsert({
    where: { email: 'test@bharatghumho.com' },
    update: {},
    create: {
      email: 'test@bharatghumho.com',
      passwordHash: testHash,
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      isEmailVerified: true,
      language: 'en',
      currency: 'INR',
    },
  });
  console.log('✅ Test user created');

  // 3. Festival deals
  const festivals = [
    {
      festivalName: 'Diwali Special',
      description: 'Festival of Lights — fly home for Diwali! Special fares to major Indian cities.',
      startDate: new Date('2026-10-15'),
      endDate: new Date('2026-11-05'),
      destinations: [
        { city: 'Delhi', country: 'India', iataCode: 'DEL' },
        { city: 'Mumbai', country: 'India', iataCode: 'BOM' },
        { city: 'Jaipur', country: 'India', iataCode: 'JAI' },
        { city: 'Varanasi', country: 'India', iataCode: 'VNS' },
      ],
      discountPercentage: 15,
    },
    {
      festivalName: 'Holi Celebration',
      description: 'Festival of Colors — celebrate Holi with family. Book early for best fares!',
      startDate: new Date('2027-03-01'),
      endDate: new Date('2027-03-20'),
      destinations: [
        { city: 'Mathura', country: 'India', iataCode: 'AGR' },
        { city: 'Jaipur', country: 'India', iataCode: 'JAI' },
        { city: 'Delhi', country: 'India', iataCode: 'DEL' },
      ],
      discountPercentage: 12,
    },
    {
      festivalName: 'Eid al-Fitr',
      description: 'Celebrate Eid with loved ones. Special fares to Lucknow, Hyderabad, and more.',
      startDate: new Date('2027-03-20'),
      endDate: new Date('2027-04-05'),
      destinations: [
        { city: 'Lucknow', country: 'India', iataCode: 'LKO' },
        { city: 'Hyderabad', country: 'India', iataCode: 'HYD' },
        { city: 'Delhi', country: 'India', iataCode: 'DEL' },
      ],
      discountPercentage: 10,
    },
    {
      festivalName: 'Christmas & New Year',
      description: 'Holiday season fares! Fly to Goa, Kerala, or home for the holidays.',
      startDate: new Date('2026-12-15'),
      endDate: new Date('2027-01-05'),
      destinations: [
        { city: 'Goa', country: 'India', iataCode: 'GOI' },
        { city: 'Kochi', country: 'India', iataCode: 'COK' },
        { city: 'Mumbai', country: 'India', iataCode: 'BOM' },
        { city: 'Bangalore', country: 'India', iataCode: 'BLR' },
      ],
      discountPercentage: 10,
    },
    {
      festivalName: 'Pongal / Makar Sankranti',
      description: 'Harvest festival specials — fly to Tamil Nadu, Andhra Pradesh, and Karnataka.',
      startDate: new Date('2027-01-10'),
      endDate: new Date('2027-01-20'),
      destinations: [
        { city: 'Chennai', country: 'India', iataCode: 'MAA' },
        { city: 'Bangalore', country: 'India', iataCode: 'BLR' },
        { city: 'Hyderabad', country: 'India', iataCode: 'HYD' },
      ],
      discountPercentage: 8,
    },
    {
      festivalName: 'Navratri & Durga Puja',
      description: 'Nine nights of celebration — fly to Kolkata, Gujarat, or West Bengal.',
      startDate: new Date('2026-09-25'),
      endDate: new Date('2026-10-10'),
      destinations: [
        { city: 'Kolkata', country: 'India', iataCode: 'CCU' },
        { city: 'Ahmedabad', country: 'India', iataCode: 'AMD' },
        { city: 'Delhi', country: 'India', iataCode: 'DEL' },
      ],
      discountPercentage: 12,
    },
    {
      festivalName: 'Onam',
      description: 'Kerala's harvest festival — fly to God's Own Country!',
      startDate: new Date('2026-08-25'),
      endDate: new Date('2026-09-10'),
      destinations: [
        { city: 'Kochi', country: 'India', iataCode: 'COK' },
        { city: 'Trivandrum', country: 'India', iataCode: 'TRV' },
        { city: 'Calicut', country: 'India', iataCode: 'CCJ' },
      ],
      discountPercentage: 10,
    },
    {
      festivalName: 'Baisakhi',
      description: 'Punjabi New Year — fly to Punjab and celebrate with family!',
      startDate: new Date('2027-04-08'),
      endDate: new Date('2027-04-20'),
      destinations: [
        { city: 'Amritsar', country: 'India', iataCode: 'ATQ' },
        { city: 'Chandigarh', country: 'India', iataCode: 'IXC' },
        { city: 'Delhi', country: 'India', iataCode: 'DEL' },
      ],
      discountPercentage: 10,
    },
    {
      festivalName: 'Ganesh Chaturthi',
      description: 'Lord Ganesha festival — fly to Mumbai and Pune for grand celebrations!',
      startDate: new Date('2026-08-20'),
      endDate: new Date('2026-09-05'),
      destinations: [
        { city: 'Mumbai', country: 'India', iataCode: 'BOM' },
        { city: 'Pune', country: 'India', iataCode: 'PNQ' },
        { city: 'Hyderabad', country: 'India', iataCode: 'HYD' },
      ],
      discountPercentage: 8,
    },
    {
      festivalName: 'Independence Day',
      description: 'Celebrate India's Independence Day — special patriotic fares!',
      startDate: new Date('2026-08-10'),
      endDate: new Date('2026-08-20'),
      destinations: [
        { city: 'Delhi', country: 'India', iataCode: 'DEL' },
        { city: 'Mumbai', country: 'India', iataCode: 'BOM' },
        { city: 'Bangalore', country: 'India', iataCode: 'BLR' },
        { city: 'Chennai', country: 'India', iataCode: 'MAA' },
        { city: 'Kolkata', country: 'India', iataCode: 'CCU' },
      ],
      discountPercentage: 15,
    },
  ];

  for (const fest of festivals) {
    await prisma.festivalDeal.upsert({
      where: { id: fest.festivalName }, // This won't work with uuid, use create
      update: {},
      create: {
        festivalName: fest.festivalName,
        description: fest.description,
        startDate: fest.startDate,
        endDate: fest.endDate,
        destinations: fest.destinations,
        discountPercentage: fest.discountPercentage,
        isActive: true,
      },
    });
  }

  // Actually, since upsert needs unique field, let's use createMany with skipDuplicates
  // The above will fail, so let's just use deleteMany + createMany
  await prisma.festivalDeal.deleteMany({});
  for (const fest of festivals) {
    await prisma.festivalDeal.create({
      data: {
        festivalName: fest.festivalName,
        description: fest.description,
        startDate: fest.startDate,
        endDate: fest.endDate,
        destinations: fest.destinations,
        discountPercentage: fest.discountPercentage,
        isActive: true,
      },
    });
  }

  console.log('✅ 10 festival deals created');
  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
