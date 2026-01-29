import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 초기 ADMIN 계정 생성
  const adminEmail = 'admin@example.com';
  const adminPassword = 'Admin123!';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin 계정이 이미 존재합니다.');
    return;
  }

  const hashedPassword = await hashPassword(adminPassword);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('✅ 초기 ADMIN 계정이 생성되었습니다.');
  console.log(`   이메일: ${adminEmail}`);
  console.log(`   비밀번호: ${adminPassword}`);
  console.log(`   ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
