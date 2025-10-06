export interface ComplianceControl {
  id: string
  framework: 'NIST' | 'ISO27001' | 'CIS'
  category: string
  control: string
  description: string
  trainingModules: string[]
  priority: 'critical' | 'high' | 'medium' | 'low'
}

export const complianceFrameworks: ComplianceControl[] = [
  // NIST CSF Controls
  {
    id: 'NIST-PR-AC-1',
    framework: 'NIST',
    category: 'Protect: Access Control',
    control: 'PR.AC-1',
    description: 'Identities and credentials are issued, managed, verified, revoked, and audited',
    trainingModules: ['password-security-basics'],
    priority: 'critical'
  },
  {
    id: 'NIST-PR-AC-7',
    framework: 'NIST',
    category: 'Protect: Access Control',
    control: 'PR.AC-7',
    description: 'Users, devices, and other assets are authenticated commensurate with risk',
    trainingModules: ['password-security-basics', 'network-security-basics'],
    priority: 'critical'
  },
  {
    id: 'NIST-PR-AT-1',
    framework: 'NIST',
    category: 'Protect: Awareness and Training',
    control: 'PR.AT-1',
    description: 'All users are informed and trained on cybersecurity awareness',
    trainingModules: ['phishing-detection-101', 'password-security-basics'],
    priority: 'high'
  },
  {
    id: 'NIST-PR-AT-2',
    framework: 'NIST',
    category: 'Protect: Awareness and Training',
    control: 'PR.AT-2',
    description: 'Privileged users understand roles and responsibilities',
    trainingModules: ['network-security-basics'],
    priority: 'high'
  },
  {
    id: 'NIST-DE-CM-1',
    framework: 'NIST',
    category: 'Detect: Continuous Monitoring',
    control: 'DE.CM-1',
    description: 'Network monitored to detect potential cybersecurity events',
    trainingModules: ['network-security-basics'],
    priority: 'high'
  },
  {
    id: 'NIST-RS-MI-3',
    framework: 'NIST',
    category: 'Respond: Mitigation',
    control: 'RS.MI-3',
    description: 'Newly identified vulnerabilities are mitigated or documented',
    trainingModules: ['ransomware-response'],
    priority: 'critical'
  },

  // ISO 27001 Controls
  {
    id: 'ISO-A.8.2.2',
    framework: 'ISO27001',
    category: 'Access Control',
    control: 'A.8.2.2',
    description: 'Privileged access rights',
    trainingModules: ['password-security-basics', 'network-security-basics'],
    priority: 'critical'
  },
  {
    id: 'ISO-A.8.2.3',
    framework: 'ISO27001',
    category: 'Access Control',
    control: 'A.8.2.3',
    description: 'Information access restriction',
    trainingModules: ['network-security-basics'],
    priority: 'high'
  },
  {
    id: 'ISO-A.6.8',
    framework: 'ISO27001',
    category: 'People Controls',
    control: 'A.6.8',
    description: 'Information security awareness, education and training',
    trainingModules: ['phishing-detection-101', 'password-security-basics'],
    priority: 'high'
  },
  {
    id: 'ISO-A.5.16',
    framework: 'ISO27001',
    category: 'Organizational Controls',
    control: 'A.5.16',
    description: 'Identity management',
    trainingModules: ['password-security-basics'],
    priority: 'critical'
  },

  // CIS Controls
  {
    id: 'CIS-5.1',
    framework: 'CIS',
    category: 'Account Management',
    control: 'CIS Control 5.1',
    description: 'Establish and maintain an inventory of accounts',
    trainingModules: ['password-security-basics'],
    priority: 'high'
  },
  {
    id: 'CIS-5.2',
    framework: 'CIS',
    category: 'Account Management',
    control: 'CIS Control 5.2',
    description: 'Use unique passwords',
    trainingModules: ['password-security-basics'],
    priority: 'critical'
  },
  {
    id: 'CIS-14.1',
    framework: 'CIS',
    category: 'Security Awareness Training',
    control: 'CIS Control 14.1',
    description: 'Establish and maintain a security awareness program',
    trainingModules: ['phishing-detection-101', 'password-security-basics'],
    priority: 'high'
  },
  {
    id: 'CIS-14.2',
    framework: 'CIS',
    category: 'Security Awareness Training',
    control: 'CIS Control 14.2',
    description: 'Train workforce members to recognize social engineering attacks',
    trainingModules: ['phishing-detection-101'],
    priority: 'critical'
  },
  {
    id: 'CIS-10.1',
    framework: 'CIS',
    category: 'Malware Defenses',
    control: 'CIS Control 10.1',
    description: 'Deploy and maintain anti-malware software',
    trainingModules: ['ransomware-response'],
    priority: 'critical'
  }
]

export const getControlsByFramework = (framework: string) => {
  return complianceFrameworks.filter(c => c.framework === framework)
}

export const getControlsByModule = (moduleId: string) => {
  return complianceFrameworks.filter(c => c.trainingModules.includes(moduleId))
}

export const getCriticalControls = () => {
  return complianceFrameworks.filter(c => c.priority === 'critical')
}
