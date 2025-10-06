import { SimulationModule, SimulationStepType, QuestionType } from '../types/simulation.types'

export const passwordSecurityBasics: SimulationModule = {
  id: 'password-security-basics',
  title: 'Password Security & Authentication',
  description: 'Master password creation, management, and multi-factor authentication best practices',
  difficulty: 'BEGINNER',
  estimatedMinutes: 15,
  category: 'Authentication Security',
  totalPoints: 70,
  totalSteps: 9,
  prerequisites: [],
  steps: [
    {
      id: 'pass-intro',
      type: SimulationStepType.INSTRUCTION,
      title: 'Introduction to Password Security',
      content: `# Password Security & Authentication

## Why This Matters

Weak passwords are the #1 cause of account breaches. Over 80% of data breaches involve compromised passwords.

## What You'll Learn

- Creating strong, memorable passwords
- Password management best practices
- Multi-factor authentication (MFA)
- Common password mistakes to avoid
- Secure password storage

Let's strengthen your authentication security!`,
      order: 1,
      points: 0
    },
    {
      id: 'pass-q1',
      type: SimulationStepType.QUESTION,
      title: 'Strong Password Characteristics',
      content: `## What Makes a Strong Password?

Which of these passwords is the **strongest**?`,
      order: 2,
      points: 10,
      question: {
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'Password123!',
          'mybirthday1985',
          'Tr0pic@l$unset#2024!River',
          'qwerty123'
        ],
        correctAnswer: 2,
        explanation: `**Correct!** "Tr0pic@l$unset#2024!River" is strongest because it:
- Contains 24+ characters (length is crucial!)
- Mixes uppercase, lowercase, numbers, and symbols
- Uses a memorable passphrase with substitutions
- Isn't a common pattern or dictionary word

**Why others fail:**
- "Password123!" - Common pattern, too short
- "mybirthday1985" - Personal info, predictable
- "qwerty123" - Keyboard pattern, very weak

**Best Practice:** Use 16+ character passphrases with random words, numbers, and symbols.`
      }
    },
    {
      id: 'pass-q2',
      type: SimulationStepType.QUESTION,
      title: 'Password Reuse Danger',
      content: `## Password Reuse

**True or False:**

It's safe to use the same strong password across multiple important accounts (email, banking, work) as long as the password is very complex.`,
      order: 3,
      points: 10,
      question: {
        type: QuestionType.TRUE_FALSE,
        correctAnswer: false,
        explanation: `**False!** Never reuse passwords across accounts, even if they're strong.

**Why this is critical:**
- If ONE site gets breached, ALL your accounts are compromised
- Attackers use "credential stuffing" - trying leaked passwords everywhere
- You can't control other sites' security
- One breach = cascading failure

**Real Example:**
LinkedIn breach (2012) → 117 million passwords leaked → used to hack other accounts

**Best Practice:**
- Use a unique password for EVERY account
- Use a password manager to handle the complexity
- Most important: unique passwords for email, banking, work`
      }
    },
    {
      id: 'pass-q3',
      type: SimulationStepType.QUESTION,
      title: 'Password Managers',
      content: `## Password Manager Benefits

What is the **primary benefit** of using a password manager?`,
      order: 4,
      points: 10,
      question: {
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'It makes passwords easier to remember',
          'It allows you to use unique, complex passwords for every account without memorizing them',
          'It automatically changes your passwords monthly',
          'It prevents hackers from attacking your accounts'
        ],
        correctAnswer: 1,
        explanation: `**Correct!** Password managers let you:
- Generate unique, complex passwords for each account
- Store them securely with encryption
- Auto-fill login forms
- Access across devices
- Only memorize ONE master password

**Popular Options:**
- 1Password (paid, excellent)
- Bitwarden (open-source, free)
- Dashlane (user-friendly)
- LastPass (popular)

**Security Note:**
- Choose a strong master password (20+ characters)
- Enable MFA on your password manager
- Use a reputable, audited service

Password managers are THE solution to password security!`
      }
    },
    {
      id: 'pass-q4',
      type: SimulationStepType.QUESTION,
      title: 'Multi-Factor Authentication (MFA)',
      content: `## Multi-Factor Authentication

You enable MFA on your email account using SMS text messages. Is this significantly more secure than just a password?`,
      order: 5,
      points: 10,
      question: {
        type: QuestionType.TRUE_FALSE,
        correctAnswer: true,
        explanation: `**True!** MFA adds a critical second layer of security.

**Why MFA matters:**
- Even if password is stolen, attacker needs the 2nd factor
- Blocks 99.9% of automated attacks (Microsoft data)
- Protects against phishing, keyloggers, breaches

**MFA Factor Types (strength order):**
1. **Hardware keys** (YubiKey) - Most secure
2. **Authenticator apps** (Google Authenticator, Authy) - Very secure
3. **SMS text codes** - Less secure but still valuable
4. **Email codes** - Weakest but better than nothing

**SMS Limitations:**
- Vulnerable to SIM swapping attacks
- Can be intercepted
- Still MUCH better than no MFA!

**Best Practice:** Use authenticator apps or hardware keys when possible, but SMS is better than nothing!`
      }
    },
    {
      id: 'pass-q5',
      type: SimulationStepType.QUESTION,
      title: 'Password Reset Security',
      content: `## Secure Password Resets

You forgot your password and need to reset it. What's the **most secure** method?`,
      order: 6,
      points: 10,
      question: {
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'Answer security questions like "mother\'s maiden name"',
          'Call customer support and verify identity over phone',
          'Receive a reset link via email to your verified email address',
          'Use social media profile to verify identity'
        ],
        correctAnswer: 2,
        explanation: `**Correct!** Email-based resets to a verified email are most secure because:

**Why this works:**
- You control the email account
- Link expires quickly (usually 1-24 hours)
- One-time use only
- Requires email account access (ideally with MFA)

**Why others are risky:**
- **Security questions:** Answers often public (social media) or guessable
- **Phone support:** Social engineering attacks, impersonation
- **Social media:** Easy to fake, not designed for security

**Best Practices:**
- Keep email account ultra-secure (strong password + MFA)
- Use backup email for recovery
- Don't use obvious security questions
- Save backup codes when offered

Your email is the "keys to the kingdom" - protect it!`
      }
    },
    {
      id: 'pass-task',
      type: SimulationStepType.TASK,
      title: 'Create Your Password Strategy',
      content: `## Your Password Security Plan

Based on what you've learned, create a personal password security strategy.

**Write a brief plan covering:**

1. How you'll create and manage passwords going forward
2. Which accounts you'll prioritize for MFA
3. Any immediate actions you need to take

**Example:**
"I'll use Bitwarden to generate unique 20+ character passwords for all accounts. I'll enable MFA on email, banking, and work accounts using Google Authenticator. I'll change my reused passwords this week starting with email and banking."`,
      order: 7,
      points: 15,
      task: {
        instructions: 'Write your personal password security strategy (3-5 sentences)',
        validationCriteria: [
          'Mentions a password manager or password creation method',
          'Identifies critical accounts for MFA',
          'Shows understanding of best practices'
        ],
        hints: [
          'Consider: What tool will you use for password management?',
          'Think about: Which 3-5 accounts are most critical to secure?',
          'Remember: Start with email and financial accounts'
        ]
      }
    },
    {
      id: 'pass-common-mistakes',
      type: SimulationStepType.QUESTION,
      title: 'Common Password Mistakes',
      content: `## Avoiding Common Mistakes

Which of these is a **critical mistake** to avoid?`,
      order: 8,
      points: 10,
      question: {
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'Using a password manager',
          'Enabling MFA on important accounts',
          'Writing down passwords in a notebook at home',
          'Sharing passwords via email or text message'
        ],
        correctAnswer: 3,
        explanation: `**Correct!** Never share passwords electronically!

**Why email/text is dangerous:**
- Unencrypted transmission
- Stored in multiple places (servers, devices)
- Can be intercepted
- Creates a permanent record
- Recipient might forward it

**Critical Mistakes to AVOID:**
1. ❌ Sharing passwords electronically
2. ❌ Reusing passwords across accounts
3. ❌ Using personal info (birthdays, names)
4. ❌ Ignoring password breach notifications
5. ❌ Saving passwords in browsers without master password

**Acceptable practices:**
- ✅ Writing passwords in a physical notebook at home (secure location)
- ✅ Using password managers
- ✅ Sharing through secure password managers (encrypted)

When you MUST share: Use encrypted methods like password manager sharing features or secure notes apps.`
      }
    },
    {
      id: 'pass-summary',
      type: SimulationStepType.ASSESSMENT,
      title: 'Password Security Mastery',
      content: `# Congratulations! 🎉

## You've Mastered Password Security!

### Key Takeaways:

**Strong Passwords:**
- ✅ 16+ characters with complexity
- ✅ Unique for every account
- ✅ Use passphrases with substitutions

**Password Management:**
- ✅ Use a password manager
- ✅ Never reuse passwords
- ✅ Regular security audits

**Multi-Factor Authentication:**
- ✅ Enable on all critical accounts
- ✅ Authenticator apps > SMS > nothing
- ✅ Save backup codes

**Security Hygiene:**
- ✅ Never share passwords electronically
- ✅ Secure email = secure everything
- ✅ Act on breach notifications

### Your Next Steps:

1. **This week:** Install a password manager
2. **This month:** Enable MFA on top 10 accounts
3. **Ongoing:** Replace weak/reused passwords

You're now equipped to protect your digital identity!`,
      order: 9,
      points: 5
    }
  ]
}

export default passwordSecurityBasics.steps
