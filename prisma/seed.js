const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jibtalischool.edu.bd' },
    update: {},
    create: {
      email: 'admin@jibtalischool.edu.bd',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create Classes
  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const createdClasses = [];
  for (const className of classes) {
    const cls = await prisma.class.upsert({
      where: { name: className },
      update: {},
      create: { name: className },
    });
    createdClasses.push(cls);
  }

  // Create Subjects for each class
  const baseSubjects = [
    { name: 'Bangla', code: 'BAN' },
    { name: 'English', code: 'ENG' },
    { name: 'Mathematics', code: 'MAT' },
    { name: 'Science', code: 'SCI' },
  ];

  for (const cls of createdClasses) {
    for (const sub of baseSubjects) {
      await prisma.subject.upsert({
        where: { code: `${sub.code}-${cls.name.replace(' ', '')}` },
        update: {},
        create: {
          name: sub.name,
          code: `${sub.code}-${cls.name.replace(' ', '')}`,
          classId: cls.id,
        },
      });
    }
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
