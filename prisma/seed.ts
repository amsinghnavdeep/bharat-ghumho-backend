import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers(): Promise<void> {
  const adminPasswordHash = await bcrypt.hash("Admin123!", 12);
  const testPasswordHash = await bcrypt.hash("Test123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@bharatghumho.com" },
    update: {
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      isEmailVerified: true
    },
    create: {
      email: "admin@bharatghumho.com",
      passwordHash: adminPasswordHash,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      isEmailVerified: true
    }
  });

  await prisma.user.upsert({
    where: { email: "test@bharatghumho.com" },
    update: {
      firstName: "Test",
      lastName: "User",
      role: "USER",
      isEmailVerified: true
    },
    create: {
      email: "test@bharatghumho.com",
      passwordHash: testPasswordHash,
      firstName: "Test",
      lastName: "User",
      role: "USER",
      isEmailVerified: true
    }
  });
}

async function seedFestivalDeals(): Promise<void> {
  const deals = [
    {
      festivalName: "Diwali",
      description: "Celebrate the festival of lights with curated city escapes and temple trail discounts.",
      startDate: new Date("2026-10-25T00:00:00.000Z"),
      endDate: new Date("2026-11-05T23:59:59.000Z"),
      destinations: [
        { city: "Varanasi", country: "India", iataCode: "VNS" },
        { city: "Jaipur", country: "India", iataCode: "JAI" },
        { city: "Udaipur", country: "India", iataCode: "UDR" },
        { city: "Amritsar", country: "India", iataCode: "ATQ" }
      ],
      discountPercentage: "18.50"
    },
    {
      festivalName: "Holi",
      description: "Colorful spring getaways with heritage stays and cultural events across North India.",
      startDate: new Date("2026-03-10T00:00:00.000Z"),
      endDate: new Date("2026-03-20T23:59:59.000Z"),
      destinations: [
        { city: "Mathura", country: "India", iataCode: "AGR" },
        { city: "Vrindavan", country: "India", iataCode: "AGR" },
        { city: "Pushkar", country: "India", iataCode: "JDH" },
        { city: "Delhi", country: "India", iataCode: "DEL" }
      ],
      discountPercentage: "15.00"
    },
    {
      festivalName: "Eid al-Fitr",
      description: "Family-friendly holiday packages featuring cuisine trails and historic old-city markets.",
      startDate: new Date("2026-03-29T00:00:00.000Z"),
      endDate: new Date("2026-04-07T23:59:59.000Z"),
      destinations: [
        { city: "Hyderabad", country: "India", iataCode: "HYD" },
        { city: "Lucknow", country: "India", iataCode: "LKO" },
        { city: "Srinagar", country: "India", iataCode: "SXR" }
      ],
      discountPercentage: "12.00"
    },
    {
      festivalName: "Christmas",
      description: "Winter holiday escapes with beach and hill station specials for year-end celebrations.",
      startDate: new Date("2026-12-20T00:00:00.000Z"),
      endDate: new Date("2027-01-02T23:59:59.000Z"),
      destinations: [
        { city: "Goa", country: "India", iataCode: "GOI" },
        { city: "Kochi", country: "India", iataCode: "COK" },
        { city: "Shillong", country: "India", iataCode: "SHL" },
        { city: "Puducherry", country: "India", iataCode: "MAA" }
      ],
      discountPercentage: "20.00"
    },
    {
      festivalName: "Pongal",
      description: "South India harvest routes with temple visits, countryside stays, and local food experiences.",
      startDate: new Date("2026-01-11T00:00:00.000Z"),
      endDate: new Date("2026-01-20T23:59:59.000Z"),
      destinations: [
        { city: "Chennai", country: "India", iataCode: "MAA" },
        { city: "Madurai", country: "India", iataCode: "IXM" },
        { city: "Coimbatore", country: "India", iataCode: "CJB" }
      ],
      discountPercentage: "11.50"
    },
    {
      festivalName: "Navratri",
      description: "Nine-night celebration circuits with garba events, city breaks, and festive market tours.",
      startDate: new Date("2026-10-10T00:00:00.000Z"),
      endDate: new Date("2026-10-20T23:59:59.000Z"),
      destinations: [
        { city: "Ahmedabad", country: "India", iataCode: "AMD" },
        { city: "Vadodara", country: "India", iataCode: "BDQ" },
        { city: "Mumbai", country: "India", iataCode: "BOM" }
      ],
      discountPercentage: "16.25"
    },
    {
      festivalName: "Durga Puja",
      description: "Festive Kolkata and East India deals featuring pandal hopping and cultural performances.",
      startDate: new Date("2026-10-15T00:00:00.000Z"),
      endDate: new Date("2026-10-25T23:59:59.000Z"),
      destinations: [
        { city: "Kolkata", country: "India", iataCode: "CCU" },
        { city: "Bhubaneswar", country: "India", iataCode: "BBI" },
        { city: "Guwahati", country: "India", iataCode: "GAU" },
        { city: "Patna", country: "India", iataCode: "PAT" }
      ],
      discountPercentage: "14.75"
    },
    {
      festivalName: "Onam",
      description: "Kerala backwater and hill getaway plans with seasonal discounts on premium stays.",
      startDate: new Date("2026-08-20T00:00:00.000Z"),
      endDate: new Date("2026-09-03T23:59:59.000Z"),
      destinations: [
        { city: "Kochi", country: "India", iataCode: "COK" },
        { city: "Thiruvananthapuram", country: "India", iataCode: "TRV" },
        { city: "Kozhikode", country: "India", iataCode: "CCJ" }
      ],
      discountPercentage: "13.40"
    },
    {
      festivalName: "Baisakhi",
      description: "Punjab heritage experiences with farm stays, gurudwara routes, and culinary specials.",
      startDate: new Date("2026-04-10T00:00:00.000Z"),
      endDate: new Date("2026-04-18T23:59:59.000Z"),
      destinations: [
        { city: "Amritsar", country: "India", iataCode: "ATQ" },
        { city: "Chandigarh", country: "India", iataCode: "IXC" },
        { city: "Ludhiana", country: "India", iataCode: "LUH" }
      ],
      discountPercentage: "10.90"
    },
    {
      festivalName: "Ganesh Chaturthi",
      description: "Maharashtra celebration tours with immersion event access and city hotel offers.",
      startDate: new Date("2026-09-05T00:00:00.000Z"),
      endDate: new Date("2026-09-15T23:59:59.000Z"),
      destinations: [
        { city: "Mumbai", country: "India", iataCode: "BOM" },
        { city: "Pune", country: "India", iataCode: "PNQ" },
        { city: "Nagpur", country: "India", iataCode: "NAG" },
        { city: "Aurangabad", country: "India", iataCode: "IXU" }
      ],
      discountPercentage: "17.10"
    }
  ] as const;

  for (const deal of deals) {
    await prisma.festivalDeal.upsert({
      where: { festivalName: deal.festivalName },
      update: {
        description: deal.description,
        startDate: deal.startDate,
        endDate: deal.endDate,
        destinations: deal.destinations,
        discountPercentage: deal.discountPercentage,
        isActive: true
      },
      create: {
        festivalName: deal.festivalName,
        description: deal.description,
        startDate: deal.startDate,
        endDate: deal.endDate,
        destinations: deal.destinations,
        discountPercentage: deal.discountPercentage,
        isActive: true
      }
    });
  }
}

async function main(): Promise<void> {
  await seedUsers();
  await seedFestivalDeals();
}

void main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    process.stderr.write(`Seed failed: ${error instanceof Error ? error.message : "Unknown error"}\n`);
    await prisma.$disconnect();
    process.exit(1);
  });
