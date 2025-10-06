import { SimulationStep, SimulationStepType, QuestionType } from '../types/simulation.types'

/**
 * Phishing Detection 101 - Complete Training Scenario
 * Teaches users how to identify and respond to phishing emails
 */
export const phishingDetection101: SimulationStep[] = [
  {
    id: 'phish-intro',
    type: SimulationStepType.INSTRUCTION,
    title: 'Introduction to Phishing',
    content: `
# Welcome to Phishing Detection 101

Phishing is one of the most common cyber attacks. In this simulation, you'll learn to:
- Identify suspicious emails
- Recognize red flags in messages
- Take appropriate action when you encounter phishing attempts

**Statistics:**
- 90% of data breaches start with phishing
- 1 in 4 employees will click on a phishing link
- Average cost of a phishing attack: $14.8 million

Let's begin your training!
    `,
    order: 1,
    points: 0
  },
  
  {
    id: 'phish-q1',
    type: SimulationStepType.QUESTION,
    title: 'Common Phishing Indicators',
    content: `
## Question 1: Email Sender Analysis

You receive an email claiming to be from your bank. The sender address is:
**"security-alert@bank-verify-account-2024.com"**

Your actual bank's website is: **"www.firstnationalbank.com"**

What should you do?
    `,
    order: 2,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'Click the link to verify my account',
        'Delete the email immediately',
        'Reply asking if it\'s legitimate',
        'Forward to IT security and delete'
      ],
      correctAnswer: 3,
      explanation: `
**Correct!** The domain doesn't match your bank's official website. This is a classic phishing indicator.

**Key Learning:**
- Always verify the sender's email domain
- Legitimate banks never ask for account verification via email
- Report suspicious emails to IT security
- Never click links in suspicious emails
      `
    }
  },

  {
    id: 'phish-q2',
    type: SimulationStepType.QUESTION,
    title: 'Urgency and Threats',
    content: `
## Question 2: Recognizing Pressure Tactics

You receive an email with the subject:
**"URGENT: Your Account Will Be Closed in 24 Hours!"**

The email threatens immediate account closure unless you click a link to "verify your identity."

Is this likely a phishing attempt?
    `,
    order: 3,
    points: 10,
    question: {
      type: QuestionType.TRUE_FALSE,
      correctAnswer: true,
      explanation: `
**Correct!** Creating urgency and fear is a common phishing tactic.

**Red Flags:**
- ✗ Urgent/threatening language
- ✗ Immediate action required
- ✗ Consequences for not acting
- ✗ Generic greetings ("Dear Customer")

**Legitimate companies:**
- ✓ Give adequate notice for account changes
- ✓ Provide multiple contact methods
- ✓ Never threaten immediate closures
- ✓ Use your actual name in correspondence
      `
    }
  },

  {
    id: 'phish-task1',
    type: SimulationStepType.TASK,
    title: 'Analyze a Suspicious Email',
    content: `
## Task: Email Analysis

You've received the following email. Identify ALL red flags:

---
**From:** support@paypa1-secure.com  
**Subject:** Unusual Activity Detected  
**To:** Undisclosed Recipients

Dear Valued User,

We have detected unusual activity on your PayPal account. Your account has been temporarily limited.

To restore full access, please verify your information immediately by clicking below:

[Verify Account Now]

Failure to verify within 48 hours will result in permanent account suspension.

Thank you for your cooperation,  
PayPal Security Team  
*This is an automated message, please do not reply*

---

**Your task:** List at least 3 red flags you notice in this email.
    `,
    order: 4,
    points: 15,
    task: {
      instructions: 'Identify security concerns in the email',
      validationCriteria: [
        'Identified suspicious domain (paypa1 instead of paypal)',
        'Noticed urgency/threat tactics',
        'Recognized generic greeting',
        'Identified suspicious link request'
      ],
      hints: [
        'Look carefully at the sender\'s email address',
        'Check for spelling variations in the domain',
        'Consider the tone and urgency of the message'
      ]
    }
  },

  {
    id: 'phish-q3',
    type: SimulationStepType.QUESTION,
    title: 'Link Safety',
    content: `
## Question 3: Identifying Safe Links

You hover over a link in an email that displays the text "www.microsoft.com" but the actual URL shown is:

**"http://micr0s0ft-update.ru/login"**

Should you click this link?
    `,
    order: 5,
    points: 10,
    question: {
      type: QuestionType.TRUE_FALSE,
      correctAnswer: false,
      explanation: `
**Correct!** Never click this link. This is a classic phishing technique called "link masking."

**Red Flags:**
- Display text doesn't match actual URL
- Uses zero "0" instead of letter "o"
- Different domain (.ru instead of .com)
- HTTP instead of HTTPS
- Suspicious subdomain (micr0s0ft-update)

**Best Practice:**
Always hover over links to see the real destination before clicking.
      `
    }
  },

  {
    id: 'phish-q4',
    type: SimulationStepType.QUESTION,
    title: 'Attachment Safety',
    content: `
## Question 4: Dangerous Attachments

You receive an email with an attachment named: **"invoice_2024.pdf.exe"**

What type of file is this really?
    `,
    order: 6,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'A PDF document',
        'An executable program',
        'A compressed file',
        'An image file'
      ],
      correctAnswer: 1,
      explanation: `
**Correct!** This is an executable (.exe) file disguised as a PDF.

**Key Point:**
The REAL file extension is always the LAST one: **.exe**

**Dangerous Extensions:**
- .exe - Executable programs
- .scr - Screen saver (can run code)
- .bat - Batch file
- .cmd - Command file
- .vbs - Visual Basic Script
- .js - JavaScript file

**Never open unexpected attachments, especially with these extensions!**
      `
    }
  },

  {
    id: 'phish-q5',
    type: SimulationStepType.QUESTION,
    title: 'Reporting Procedures',
    content: `
## Question 5: Taking Action

You've identified a phishing email in your inbox. What should you do first?
    `,
    order: 7,
    points: 10,
    question: {
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        'Delete it immediately',
        'Report it to IT security/IT department',
        'Warn colleagues via reply-all',
        'Mark as spam only'
      ],
      correctAnswer: 1,
      explanation: `
**Correct!** Always report phishing attempts to IT security first.

**Proper Response Steps:**
1. **Report** to IT security immediately
2. **Do not** click any links or attachments
3. **Do not** reply to the email
4. **Do not** forward it (except to IT)
5. **Delete** after IT confirms receipt

**Why Report?**
- Helps IT block similar attacks
- Protects other employees
- Allows tracking of attack patterns
- May prevent larger breach
      `
    }
  },

  {
    id: 'phish-assessment',
    type: SimulationStepType.ASSESSMENT,
    title: 'Final Assessment',
    content: `
## Congratulations! 

You've completed the Phishing Detection 101 training.

**What You've Learned:**
- ✓ How to identify suspicious sender addresses
- ✓ Recognizing urgency and threat tactics
- ✓ Analyzing email links and attachments
- ✓ Proper reporting procedures

**Remember the Golden Rules:**
1. **Stop** - Don't click anything suspicious
2. **Think** - Does this make sense?
3. **Report** - Contact IT security

**Next Steps:**
- Practice with our advanced phishing scenarios
- Set up email filters
- Enable two-factor authentication
- Stay updated on latest phishing techniques

Stay vigilant!
    `,
    order: 8,
    points: 5
  }
]

export default phishingDetection101
