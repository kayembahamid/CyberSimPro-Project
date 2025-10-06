import { PrismaClient, UserRole, Plan, CompetitionStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.activityLog.deleteMany();
  await prisma.complianceReport.deleteMany();
  await prisma.userCertification.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.trainingRecommendation.deleteMany();
  await prisma.telemetryEvent.deleteMany();
  await prisma.simulation.deleteMany();
  await prisma.competitionTeam.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.scenario.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  // Create Organizations
  console.log('🏢 Creating organizations...');
  const org1 = await prisma.organization.create({
    data: {
      name: 'Acme Financial Corp',
      slug: 'acme-financial',
      plan: Plan.ENTERPRISE,
      industry: 'financial',
      simulationsQuota: 500,
      storageQuotaGB: 50,
    },
  });

  const org2 = await prisma.organization.create({
    data: {
      name: 'TechStart Inc',
      slug: 'techstart',
      plan: Plan.GROWTH,
      industry: 'technology',
    },
  });

  // Create Users
  console.log('👥 Creating users...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@acme-financial.com',
      name: 'Alex Admin',
      role: UserRole.ADMIN,
      organizationId: org1.id,
      totalScore: 1500,
      simulationsCompleted: 25,
      skillLevel: {
        defense: 85,
        forensics: 75,
        incident_response: 80,
        threat_hunting: 70,
      },
    },
  });

  const analyst1 = await prisma.user.create({
    data: {
      email: 'sarah.analyst@acme-financial.com',
      name: 'Sarah Analyst',
      role: UserRole.ANALYST,
      organizationId: org1.id,
      totalScore: 950,
      simulationsCompleted: 18,
      skillLevel: {
        defense: 75,
        forensics: 80,
        incident_response: 70,
        threat_hunting: 65,
      },
    },
  });

  const trainee1 = await prisma.user.create({
    data: {
      email: 'mike.trainee@techstart.com',
      name: 'Mike Trainee',
      role: UserRole.TRAINEE,
      organizationId: org2.id,
      totalScore: 450,
      simulationsCompleted: 8,
      skillLevel: {
        defense: 55,
        forensics: 45,
        incident_response: 50,
        threat_hunting: 40,
      },
    },
  });

  const trainee2 = await prisma.user.create({
    data: {
      email: 'jane.trainee@techstart.com',
      name: 'Jane Trainee',
      role: UserRole.TRAINEE,
      organizationId: org2.id,
      totalScore: 620,
      simulationsCompleted: 12,
      skillLevel: {
        defense: 60,
        forensics: 58,
        incident_response: 62,
        threat_hunting: 55,
      },
    },
  });

  // Create Teams
  console.log('🏆 Creating teams...');
  const redTeam = await prisma.team.create({
    data: {
      name: 'Red Team Alpha',
      description: 'Offensive security specialists',
      organizationId: org1.id,
      totalScore: 2450,
      globalRank: 15,
      members: {
        create: [
          {
            userId: admin.id,
            role: 'leader',
            score: 1500,
          },
          {
            userId: analyst1.id,
            role: 'member',
            score: 950,
          },
        ],
      },
    },
  });

  const blueTeam = await prisma.team.create({
    data: {
      name: 'Blue Team Beta',
      description: 'Defensive security specialists',
      organizationId: org2.id,
      totalScore: 1070,
      globalRank: 42,
      members: {
        create: [
          {
            userId: trainee1.id,
            role: 'leader',
            score: 450,
          },
          {
            userId: trainee2.id,
            role: 'member',
            score: 620,
          },
        ],
      },
    },
  });

  // Create Scenarios
  console.log('🎯 Creating scenarios...');
  const phishingScenario = await prisma.scenario.create({
    data: {
      name: 'Phishing Campaign Detection',
      description: 'Detect and respond to a sophisticated spear-phishing campaign targeting financial institutions.',
      type: 'phishing',
      difficulty: 'beginner',
      environment: 'corporate',
      sector: 'financial',
      focusCves: ['CVE-2023-23397'],
      mitreTactics: ['initial-access', 'execution', 'credential-access'],
      mitreTechniques: ['T1566.001', 'T1059.001', 'T1003.001'],
      estimatedDuration: 30,
      isActive: true,
      isPublished: true,
      popularity: 125,
      avgScore: 78.5,
      avgDuration: 28,
      objectives: [
        'Identify phishing email indicators',
        'Analyze malicious attachments',
        'Implement email filtering rules',
        'Conduct user awareness training',
      ],
      brief: 'Your organization has received reports of suspicious emails. Investigate and prevent credential theft.',
    },
  });

  const ransomwareScenario = await prisma.scenario.create({
    data: {
      name: 'Ransomware Incident Response',
      description: 'Respond to an active ransomware attack using proven incident response procedures.',
      type: 'ransomware',
      difficulty: 'intermediate',
      environment: 'corporate',
      sector: 'healthcare',
      adversaryProfile: 'fin7',
      focusCves: ['CVE-2024-21410', 'CVE-2023-36884'],
      mitreTactics: ['initial-access', 'execution', 'persistence', 'impact'],
      mitreTechniques: ['T1566.002', 'T1486', 'T1490', 'T1489'],
      estimatedDuration: 60,
      isActive: true,
      isPublished: true,
      popularity: 89,
      avgScore: 65.3,
      avgDuration: 58,
      objectives: [
        'Identify ransomware indicators',
        'Contain the infection',
        'Preserve evidence',
        'Execute recovery procedures',
      ],
      prerequisites: [phishingScenario.id],
      brief: 'Multiple systems are reporting encryption activity. Execute incident response protocols immediately.',
    },
  });

  const aptScenario = await prisma.scenario.create({
    data: {
      name: 'APT29 Advanced Persistent Threat',
      description: 'Detect and respond to an APT29 intrusion targeting government infrastructure.',
      type: 'apt',
      difficulty: 'expert',
      environment: 'cloud',
      sector: 'government',
      adversaryProfile: 'apt29',
      focusCves: ['CVE-2023-23397', 'CVE-2023-38831'],
      mitreTactics: ['reconnaissance', 'initial-access', 'persistence', 'command-and-control', 'exfiltration'],
      mitreTechniques: ['T1595', 'T1566', 'T1543', 'T1071', 'T1041'],
      estimatedDuration: 120,
      isActive: true,
      isPublished: true,
      popularity: 42,
      avgScore: 52.8,
      avgDuration: 115,
      objectives: [
        'Identify APT indicators',
        'Map adversary tactics',
        'Hunt for persistence mechanisms',
        'Execute threat intelligence procedures',
      ],
      prerequisites: [phishingScenario.id, ransomwareScenario.id],
      brief: 'Intelligence suggests nation-state actor targeting your infrastructure. Conduct threat hunting operations.',
    },
  });

  // Create Simulations
  console.log('⚡ Creating simulations...');
  const sim1 = await prisma.simulation.create({
    data: {
      userId: analyst1.id,
      scenarioId: phishingScenario.id,
      status: 'COMPLETED',
      progress: 100,
      score: 85,
      maxScore: 100,
      accuracy: 0.89,
      detectionRate: 0.92,
      responseTime: 450,
      falsePositives: 2,
      falseNegatives: 1,
      feedback: 'Excellent detection capabilities. Consider reducing false positives.',
      startedAt: new Date('2025-01-15T10:00:00Z'),
      completedAt: new Date('2025-01-15T10:28:00Z'),
      results: {
        detections: 23,
        blocked: 21,
        analyzed: 45,
      },
    },
  });

  const sim2 = await prisma.simulation.create({
    data: {
      userId: trainee1.id,
      scenarioId: phishingScenario.id,
      status: 'COMPLETED',
      progress: 100,
      score: 72,
      maxScore: 100,
      accuracy: 0.75,
      detectionRate: 0.78,
      responseTime: 680,
      falsePositives: 5,
      falseNegatives: 3,
      feedback: 'Good start. Focus on reducing false positives and improving response time.',
      startedAt: new Date('2025-01-20T14:00:00Z'),
      completedAt: new Date('2025-01-20T14:32:00Z'),
      results: {
        detections: 18,
        blocked: 15,
        analyzed: 40,
      },
    },
  });

  // Create Telemetry Events
  console.log('📊 Creating telemetry events...');
  await prisma.telemetryEvent.createMany({
    data: [
      {
        simulationId: sim1.id,
        eventType: 'technique_executed',
        severity: 'high',
        technique: 'T1566.001',
        phase: 'initial_access',
        title: 'Spear-phishing email received',
        description: 'Malicious email with credential harvesting link detected',
        data: { sender: 'attacker@evil.com', subject: 'Urgent: Password Reset Required' },
      },
      {
        simulationId: sim1.id,
        eventType: 'detection_triggered',
        severity: 'high',
        technique: 'T1566.001',
        phase: 'initial_access',
        title: 'Email filter triggered',
        description: 'Suspicious email pattern matched known phishing indicators',
        data: { rule: 'PHISH-001', confidence: 0.95 },
      },
      {
        simulationId: sim1.id,
        eventType: 'alert_fired',
        severity: 'critical',
        technique: 'T1566.001',
        phase: 'initial_access',
        title: 'SOC alert generated',
        description: 'High-confidence phishing attempt requiring analyst review',
        data: { alertId: 'ALT-2025-0115-001', priority: 'P1' },
      },
    ],
  });

  // Create Competitions
  console.log('🏁 Creating competitions...');
  const competition = await prisma.competition.create({
    data: {
      name: 'January Purple Team Challenge',
      description: 'Red Team vs Blue Team simulation competition',
      scenarioId: ransomwareScenario.id,
      mode: 'red_vs_blue',
      status: CompetitionStatus.ACTIVE,
      startAt: new Date('2025-01-25T00:00:00Z'),
      endAt: new Date('2025-01-31T23:59:59Z'),
      rewards: {
        first: 'CyberSim Gold Badge + $500 training credit',
        second: 'CyberSim Silver Badge + $250 training credit',
        third: 'CyberSim Bronze Badge + $100 training credit',
      },
      teams: {
        create: [
          {
            teamId: redTeam.id,
            score: 1850,
            rank: 1,
            metrics: {
              accuracy: 0.92,
              speed: 145,
              detections: 67,
              containment: 0.89,
            },
          },
          {
            teamId: blueTeam.id,
            score: 1520,
            rank: 2,
            metrics: {
              accuracy: 0.85,
              speed: 178,
              detections: 54,
              containment: 0.81,
            },
          },
        ],
      },
    },
  });

  // Create Certifications
  console.log('🎓 Creating certifications...');
  const bronzeCert = await prisma.certification.create({
    data: {
      name: 'CyberSim Bronze Defender',
      description: 'Completed foundational cybersecurity training scenarios',
      level: 'bronze',
      requiredScenarios: [phishingScenario.id],
      requiredScore: 70,
      requiredCompletions: 1,
      isActive: true,
    },
  });

  const silverCert = await prisma.certification.create({
    data: {
      name: 'CyberSim Silver Analyst',
      description: 'Demonstrated intermediate incident response capabilities',
      level: 'silver',
      requiredScenarios: [phishingScenario.id, ransomwareScenario.id],
      requiredScore: 75,
      requiredCompletions: 2,
      isActive: true,
    },
  });

  // Issue User Certifications
  console.log('📜 Issuing certifications...');
  await prisma.userCertification.create({
    data: {
      userId: analyst1.id,
      certificationId: bronzeCert.id,
      verificationCode: 'CSBD-2025-' + Math.random().toString(36).substring(7).toUpperCase(),
      verificationUrl: 'https://verify.cybersimpro.com/cert/CSBD-2025-ABC123',
      status: 'ISSUED',
      score: 85,
      issuedAt: new Date('2025-01-15T12:00:00Z'),
      expiresAt: new Date('2026-01-15T12:00:00Z'),
    },
  });

  // Create Training Recommendations
  console.log('🤖 Creating AI recommendations...');
  await prisma.trainingRecommendation.create({
    data: {
      userId: trainee1.id,
      scenarioId: ransomwareScenario.id,
      title: 'Improve Ransomware Detection Skills',
      reasoning: 'Based on your recent performance, you show strong foundational skills in phishing detection. To advance, I recommend focusing on ransomware incident response, which builds on these skills and addresses a critical gap in your security profile.',
      priority: 'high',
      skillGaps: ['ransomware_detection', 'incident_containment', 'forensic_analysis'],
      confidence: 0.87,
      aiModel: 'claude-3-sonnet-20240229',
      status: 'PENDING',
    },
  });

  await prisma.trainingRecommendation.create({
    data: {
      userId: trainee2.id,
      scenarioId: aptScenario.id,
      title: 'Advanced Threat Hunting',
      reasoning: 'You demonstrate consistent performance across beginner and intermediate scenarios. Consider advancing to APT scenarios to develop threat hunting capabilities and prepare for advanced security roles.',
      priority: 'medium',
      skillGaps: ['threat_hunting', 'advanced_persistence', 'c2_detection'],
      confidence: 0.75,
      aiModel: 'claude-3-sonnet-20240229',
      status: 'PENDING',
    },
  });

  // Create Compliance Reports
  console.log('📋 Creating compliance reports...');
  await prisma.complianceReport.create({
    data: {
      userId: admin.id,
      title: 'Q1 2025 SOC 2 Type II Readiness Assessment',
      framework: 'soc2',
      reportType: 'readiness',
      summary: 'Organization demonstrates strong security posture with 87% control coverage. Minor gaps identified in incident response documentation.',
      findings: [
        { id: 'F001', severity: 'low', control: 'CC6.1', description: 'Incomplete incident response runbooks' },
        { id: 'F002', severity: 'info', control: 'CC7.2', description: 'Security awareness training completion at 94%' },
      ],
      controls: [
        { id: 'CC6.1', status: 'partial', evidence: '15 simulations completed' },
        { id: 'CC7.2', status: 'pass', evidence: '25 team members trained' },
      ],
      coverageScore: 0.87,
      controlsCovered: 43,
      controlsTotal: 49,
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  - Organizations: 2`);
  console.log(`  - Users: 4`);
  console.log(`  - Teams: 2`);
  console.log(`  - Scenarios: 3`);
  console.log(`  - Simulations: 2`);
  console.log(`  - Competitions: 1`);
  console.log(`  - Certifications: 2`);
  console.log(`  - Recommendations: 2`);
  console.log(`  - Compliance Reports: 1\n`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
