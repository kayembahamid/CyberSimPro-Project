import { SimulationStep, SimulationStepType, QuestionType } from '../types/simulation.types'

/**
 * Network Security Basics Training
 * Teaches users fundamental network security concepts and best practices
 */
export const networkSecurityBasics: SimulationStep[] = [
  {
    id: 'net-intro',
    type: SimulationStepType.INSTRUCTION,
    title: 'Network Security Fundamentals',
    content: `
# Network Security Basics

Network security protects your data as it travels between devices and across the internet.

**Why It Matters:**
- 43% of cyber attacks target small businesses
- Average cost of a network breach: $4.45 million
- 68% of breaches involve network vulnerabilities

**What You'll Learn:**
- Wi-Fi security best practices
- VPN usage and importance
- Password management
- Safe browsing habits
- Network monitoring basics
    `,
    order: 1,
    points: 0
  },

  {
    id: 'net-q1',
    type: SimulationStepType.QUESTION,
    title: 'Wi-Fi Security',
    content: `
## Question 1: Public Wi-Fi Safety

You're at a coffee shop and need to check your bank account. What should you do?
    `,
    order: 2,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'Connect directly to the free Wi-Fi and proceed',
        'Use your mobile hotspot or VPN before accessing',
        'Ask the barista if the network is secure',
        'Use incognito mode for privacy'
      ],
      correctAnswer: 1,
      explanation: `
**Correct!** Use a VPN or your mobile hotspot for sensitive transactions.

**Public Wi-Fi Risks:**
- Unencrypted connections
- Man-in-the-middle attacks
- Fake hotspots
- Packet sniffing
- Session hijacking

**Safe Practices:**
- Use VPN for all sensitive activities
- Verify network name with staff
- Avoid banking/shopping on public Wi-Fi
- Enable firewall
- Forget network after use

**VPN Benefits:**
- Encrypts your traffic
- Hides your IP address
- Protects on any network
      `
    }
  },

  {
    id: 'net-q2',
    type: SimulationStepType.QUESTION,
    title: 'Password Security',
    content: `
## Question 2: Strong Passwords

Which password is the MOST secure?
    `,
    order: 3,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'Password123!',
        'MyDog2024',
        'Tr0ub4dor&3',
        'correct-horse-battery-staple'
      ],
      correctAnswer: 3,
      explanation: `
**Correct!** Long passphrases are more secure than complex short passwords.

**Password Strength:**
- Length > Complexity
- 4 random words = very secure
- Easy to remember
- Hard to crack

**Password Best Practices:**
- Minimum 12 characters
- Use unique passwords for each account
- Enable two-factor authentication
- Use a password manager
- Never share passwords
- Change if compromised

**Avoid:**
- Personal information
- Common words/phrases
- Sequential patterns (123, abc)
- Reusing passwords
      `
    }
  },

  {
    id: 'net-task1',
    type: SimulationStepType.TASK,
    title: 'Secure Your Home Network',
    content: `
## Task: Router Security Checklist

You just got a new Wi-Fi router. What security measures should you implement?

**Your Task:** Identify the critical security configurations.
    `,
    order: 4,
    points: 15,
    task: {
      instructions: 'List essential router security steps',
      validationCriteria: [
        'Change default admin password',
        'Update router firmware',
        'Enable WPA3 or WPA2 encryption',
        'Change default SSID',
        'Disable WPS',
        'Enable firewall'
      ],
      hints: [
        'Default credentials are publicly known',
        'Encryption type matters',
        'Keep firmware updated'
      ]
    }
  },

  {
    id: 'net-q3',
    type: SimulationStepType.QUESTION,
    title: 'HTTPS vs HTTP',
    content: `
## Question 3: Secure Connections

You're about to enter credit card information on a website. What should you verify first?
    `,
    order: 5,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'The website looks professional',
        'URL starts with HTTPS and shows a padlock',
        'The site accepts your card type',
        'There are customer reviews'
      ],
      correctAnswer: 1,
      explanation: `
**Correct!** Always verify HTTPS and the padlock icon.

**HTTPS vs HTTP:**
- **HTTPS** = Encrypted & Secure
- **HTTP** = Unencrypted & Vulnerable

**What HTTPS Protects:**
- Credit card numbers
- Passwords
- Personal information
- Browsing activity

**Warning Signs:**
- No padlock icon
- HTTP (not HTTPS)
- Browser warning messages
- Expired certificates
- Mismatched domain names

**Additional Checks:**
- Verify domain spelling
- Check certificate details
- Look for trust seals
- Review privacy policy
      `
    }
  },

  {
    id: 'net-q4',
    type: SimulationStepType.QUESTION,
    title: 'Two-Factor Authentication',
    content: `
## Question 4: 2FA Security

Is SMS (text message) the most secure form of two-factor authentication?
    `,
    order: 6,
    points: 10,
    question: {
      type: QuestionType.TRUE_FALSE,
      correctAnswer: false,
      explanation: `
**Correct!** SMS is NOT the most secure 2FA method.

**2FA Security Ranking:**
1. **Hardware Keys** (YubiKey) - Most Secure
2. **Authenticator Apps** (Google Authenticator, Authy)
3. **Push Notifications**
4. **SMS** - Least Secure (but still better than nothing)

**SMS Vulnerabilities:**
- SIM swapping attacks
- SMS interception
- Phone number hijacking
- No encryption

**Best Practice:**
- Use authenticator app when possible
- Have backup codes stored securely
- Enable 2FA on all important accounts
- Never share 2FA codes

**Remember:**
Even weak 2FA is better than no 2FA!
      `
    }
  },

  {
    id: 'net-q5',
    type: SimulationStepType.QUESTION,
    title: 'Software Updates',
    content: `
## Question 5: Update Importance

Why are software updates critical for network security?
    `,
    order: 7,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'They make software faster',
        'They add new features',
        'They patch security vulnerabilities',
        'They improve user interface'
      ],
      correctAnswer: 2,
      explanation: `
**Correct!** Updates patch security vulnerabilities.

**Why Updates Matter:**
- Fix known security flaws
- Close entry points for hackers
- Protect against latest threats
- Improve system stability
- Maintain compatibility

**Update Best Practices:**
- Enable automatic updates
- Update within 48 hours of release
- Check for updates weekly
- Don't skip security patches
- Restart after updates

**What to Update:**
- Operating system
- Browsers
- Antivirus software
- Router firmware
- Applications
- Mobile apps

**Warning:**
Old software = Open door for hackers!
      `
    }
  },

  {
    id: 'net-assessment',
    type: SimulationStepType.ASSESSMENT,
    title: 'Network Security Mastery',
    content: `
## Congratulations!

You've completed Network Security Basics training.

**What You've Mastered:**
- ✓ Public Wi-Fi safety protocols
- ✓ Strong password practices
- ✓ Router security configuration
- ✓ HTTPS verification
- ✓ Two-factor authentication
- ✓ Update management

**Security Checklist:**
- [ ] VPN installed and configured
- [ ] Password manager in use
- [ ] 2FA enabled on critical accounts
- [ ] Router secured with strong password
- [ ] Automatic updates enabled
- [ ] Firewall activated

**Next Level:**
- Learn about network segmentation
- Study intrusion detection systems
- Explore zero-trust architecture
- Practice security audits

**Remember:**
Security is a journey, not a destination. Stay vigilant, keep learning, and always question before you click!

Stay secure!
    `,
    order: 8,
    points: 5
  }
]

export default networkSecurityBasics
