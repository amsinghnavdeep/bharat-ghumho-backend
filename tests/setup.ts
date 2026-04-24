/**
 * Jest test setup
 */
import { prisma } from '../src/config/database';

afterAll(async () => {
  await prisma.$disconnect();
});
