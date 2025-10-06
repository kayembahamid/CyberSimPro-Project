import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@cybersimpro.com' },
    update: {},
    create: {
      email: 'test@cybersimpro.com',
      fullName: 'Test User',
    },
  });
  console.log('✅ Created user:', user.email);

  // Create scenarios
  const scenarios = [
    {
      userId: user.id,
      title: 'Phishing Email Detection',
      description: 'Learn to identify and respond to phishing attempts through realistic email scenarios.',
      difficulty: 'BEGINNER',
      completed: false,
    },
    {
      userId: user.id,
      title: 'Ransomware Response',
      description: 'Handle a ransomware attack scenario and learn proper incident response procedures.',
      difficulty: 'ADVANCED',
      completed: false,
    },
    {
      userId: user.id,
      title: 'Network Intrusion Detection',
      description: 'Detect and analyze network intrusions using real-world attack patterns.',
      difficulty: 'EXPERT',
      completed: false,
    },
  ];

  for (const scenarioData of scenarios) {
    const scenario = await prisma.scenario.upsert({
      where: { id: scenarioData.title }, // Using title as unique identifier for upsert
      update: {},
      create: scenarioData,
    });
    console.log('✅ Created scenario:', scenario.title);
  }

  // Create simulations
  const allScenarios = await prisma.scenario.findMany();
  
  const simulation1 = await prisma.simulation.create({
    data: {
      userId: user.id,
      scenarioId: allScenarios[0].id,
      type: 'TRAINING',
      status: 'COMPLETED',
      score: 92,
      completedAt: new Date(),
    },
  });
  console.log('✅ Created simulation 1:', simulation1.id);

  const simulation2 = await prisma.simulation.create({
    data: {
      userId: user.id,
      scenarioId: allScenarios[1].id,
      type: 'TRAINING',
      status: 'IN_PROGRESS',
    },
  });
  console.log('✅ Created simulation 2:', simulation2.id);

  // Create certifications
  const certifications = [
    {
      userId: user.id,
      name: 'Phishing Detection Expert',
      issueDate: new Date('2024-09-15'),
      expiryDate: new Date('2025-09-15'),
      status: 'ACTIVE',
    },
    {
      userId: user.id,
      name: 'Incident Response Specialist',
      issueDate: new Date('2024-08-22'),
      expiryDate: new Date('2025-08-22'),
      status: 'ACTIVE',
    },
  ];

  for (const certData of certifications) {
    const cert = await prisma.certification.create({
      data: certData,
    });
    console.log('✅ Created certification:', cert.name);
  }

  console.log('🎉 Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
