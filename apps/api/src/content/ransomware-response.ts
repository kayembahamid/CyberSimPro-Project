import { SimulationStep, SimulationStepType, QuestionType } from '../types/simulation.types'

/**
 * Ransomware Response Training
 * Teaches users how to recognize and respond to ransomware attacks
 */
export const ransomwareResponse: SimulationStep[] = [
  {
    id: 'ransom-intro',
    type: SimulationStepType.INSTRUCTION,
    title: 'Understanding Ransomware',
    content: `
# Ransomware Response Training

Ransomware is malicious software that encrypts your files and demands payment for their release.

**Key Facts:**
- Average ransom demand: $200,000
- 60% of victims who pay never get their data back
- Ransomware attacks have increased 300% in recent years
- Recovery without backups can take months

**In this training, you'll learn:**
- How to identify ransomware attacks
- Immediate response actions
- Prevention strategies
- Recovery procedures
    `,
    order: 1,
    points: 0
  },

  {
    id: 'ransom-q1',
    type: SimulationStepType.QUESTION,
    title: 'Early Warning Signs',
    content: `
## Question 1: Recognizing Ransomware

Your computer suddenly displays a message:
"Your files have been encrypted! Pay 1 Bitcoin within 48 hours or lose everything!"

What is your FIRST action?
    `,
    order: 2,
    points: 15,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'Pay the ransom immediately',
        'Try to decrypt the files yourself',
        'Disconnect from network and report to IT',
        'Restart your computer'
      ],
      correctAnswer: 2,
      explanation: `
**Correct!** Disconnect immediately to prevent spread.

**Critical First Steps:**
1. **Disconnect** from network (unplug ethernet, turn off WiFi)
2. **Do not** turn off computer (preserves evidence)
3. **Report** to IT security immediately
4. **Document** everything (screenshots, messages)
5. **Do not pay** the ransom

**Why disconnect?**
- Prevents spread to other systems
- Stops data exfiltration
- Preserves forensic evidence
      `
    }
  },

  {
    id: 'ransom-q2',
    type: SimulationStepType.QUESTION,
    title: 'Should You Pay?',
    content: `
## Question 2: Payment Decision

The ransom note promises to decrypt your files if you pay. Your backups are 2 weeks old. Should you pay the ransom?
    `,
    order: 3,
    points: 10,
    question: {
      type: QuestionType.TRUE_FALSE,
      correctAnswer: false,
      explanation: `
**Correct!** Never pay ransoms.

**Why Not To Pay:**
- No guarantee you'll get files back (60% don't)
- Funds criminal organizations
- Marks you as a willing payer (target for future attacks)
- May be illegal in some jurisdictions
- Doesn't remove the malware

**Better Options:**
- Restore from backups
- Use decryption tools (check No More Ransom project)
- Consult cybersecurity professionals
- Report to law enforcement
      `
    }
  },

  {
    id: 'ransom-task1',
    type: SimulationStepType.TASK,
    title: 'Incident Response Plan',
    content: `
## Task: Create Response Checklist

A ransomware attack is in progress. Create a prioritized action plan.

**Scenario:**
- 10 computers showing encryption messages
- Network file shares affected
- Backups are 1 day old
- Critical business operations impacted

**Your task:** List the correct order of response actions.
    `,
    order: 4,
    points: 15,
    task: {
      instructions: 'Order the incident response steps',
      validationCriteria: [
        '1. Isolate affected systems',
        '2. Alert IT security team',
        '3. Preserve evidence',
        '4. Assess damage scope',
        '5. Begin recovery from backups'
      ],
      hints: [
        'Stop the spread first',
        'Document everything',
        'Don\'t skip reporting'
      ]
    }
  },

  {
    id: 'ransom-q3',
    type: SimulationStepType.QUESTION,
    title: 'Prevention Methods',
    content: `
## Question 3: Best Defense

Which is the MOST effective defense against ransomware?
    `,
    order: 5,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'Antivirus software only',
        'Regular, tested backups',
        'Strong passwords',
        'Firewall protection'
      ],
      correctAnswer: 1,
      explanation: `
**Correct!** Regular, tested backups are the best defense.

**3-2-1 Backup Rule:**
- **3** copies of your data
- **2** different storage types
- **1** off-site copy

**Why Backups Matter:**
- Allows recovery without paying ransom
- Minimizes downtime
- Protects against all data loss scenarios
- Must be tested regularly

**Additional Defenses:**
- Keep systems updated
- Use email filtering
- Implement least-privilege access
- Train employees
- Segment networks
      `
    }
  },

  {
    id: 'ransom-q4',
    type: SimulationStepType.QUESTION,
    title: 'Recovery Process',
    content: `
## Question 4: System Recovery

After isolating the infected systems, what should you do before restoring from backups?
    `,
    order: 6,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'Immediately restore all files',
        'Remove malware and verify system is clean',
        'Pay the ransom first',
        'Upgrade all software'
      ],
      correctAnswer: 1,
      explanation: `
**Correct!** Clean the system before restoring.

**Recovery Process:**
1. **Isolate** infected systems
2. **Scan** for malware
3. **Remove** all traces of ransomware
4. **Verify** system is clean
5. **Restore** from backups
6. **Monitor** for re-infection
7. **Update** security measures

**Why This Order?**
Restoring to infected systems will just re-encrypt your files!

**Post-Recovery:**
- Change all passwords
- Review security logs
- Identify entry point
- Strengthen defenses
      `
    }
  },

  {
    id: 'ransom-assessment',
    type: SimulationStepType.ASSESSMENT,
    title: 'Response Readiness',
    content: `
## Congratulations!

You've completed Ransomware Response Training.

**Key Takeaways:**
- ✓ Recognize ransomware attacks quickly
- ✓ Follow proper response procedures
- ✓ Never pay ransoms
- ✓ Maintain regular backups
- ✓ Have recovery plan ready

**Remember:**
- **Act Fast** - Disconnect immediately
- **Report Always** - Alert IT security
- **Never Pay** - Explore all other options
- **Backup Regularly** - Test your backups
- **Stay Trained** - Review procedures annually

**Be Prepared:**
- Document your incident response plan
- Test backup restoration monthly
- Keep emergency contact list updated
- Practice isolation procedures

Stay protected!
    `,
    order: 7,
    points: 5
  }
]

export default ransomwareResponse
