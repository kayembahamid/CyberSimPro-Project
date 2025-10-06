/**
 * Email Service
 * Handles all email notifications for the platform
 * Uses Resend or SMTP for email delivery
 */

interface EmailOptions {
  to: string
  subject: string
  html: string
}

/**
 * Send email using configured email service
 */
async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    // TODO: Implement actual email sending with Resend or SendGrid
    // For now, just log
    console.log(`[EMAIL] To: ${to}, Subject: ${subject}`);
    console.log(`[EMAIL] Content: ${html.substring(0, 100)}...`);
    
    // Simulate success
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

/**
 * Send training assignment email to employee
 */
export async function sendTrainingAssignment(employee: {
  email: string
  name: string
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
        .module { background: #f7f7f7; padding: 15px; border-radius: 8px; margin: 10px 0; }
        .button { background: #3B82F6; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎮 Time to Level Up Your Security Skills!</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 18px;">Hi ${employee.name},</p>
          
          <p>Your company has enrolled you in CyberSim Pro's interactive cybersecurity training. Complete 4 quick modules (5 minutes each) to earn your security badges!</p>
          
          <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Training Modules:</h3>
            <div class="module">🕵️ <strong>Phishing Detective</strong> - Spot fake emails</div>
            <div class="module">🛡️ <strong>Password Guardian</strong> - Create unbreakable passwords</div>
            <div class="module">🦠 <strong>Malware Defender</strong> - Stop infections</div>
            <div class="module">🎭 <strong>Social Engineering</strong> - Detect manipulation</div>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.APP_URL || 'http://localhost:3001'}/dashboard/training" class="button">
              Start Training Now
            </a>
          </div>
          
          <div style="color: #666; font-size: 14px; margin-top: 20px;">
            ⏱️ <strong>Total time:</strong> ~20 minutes<br>
            🏆 <strong>Earn badges:</strong> Gold, Silver, Bronze<br>
            📊 <strong>Track your progress:</strong> See results in real-time
          </div>
        </div>
        
        <div class="footer">
          <p>This training was assigned by your organization to improve cybersecurity awareness.</p>
          <p>Questions? Contact your IT department or reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: employee.email,
    subject: '🎮 Your Cybersecurity Training is Ready!',
    html
  });
}

/**
 * Send reminder email to employees who haven't completed training
 */
export async function sendReminderEmail(employee: {
  email: string
  name: string
  progress: number
  daysOverdue: number
}): Promise<boolean> {
  const urgency = employee.daysOverdue > 7 ? '🚨 Final Reminder' : '⏰ Reminder';
  const message = employee.daysOverdue > 7 
    ? 'This is your final reminder to complete your cybersecurity training.'
    : 'Just a friendly reminder to complete your cybersecurity training.';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: ${employee.daysOverdue > 7 ? '#EF4444' : '#3B82F6'}; padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { padding: 40px; }
        .progress-bar { background: #e5e7eb; height: 20px; border-radius: 10px; overflow: hidden; margin: 20px 0; }
        .progress-fill { background: #3B82F6; height: 100%; transition: width 0.3s; }
        .button { background: #3B82F6; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${urgency}: Complete Your Training</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 18px;">Hi ${employee.name},</p>
          
          <p>${message}</p>
          
          <p><strong>Your Progress: ${employee.progress}%</strong></p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${employee.progress}%"></div>
          </div>
          
          <p>You're ${100 - employee.progress}% away from completing your training and earning your badge!</p>
          
          <div style="text-align: center;">
            <a href="${process.env.APP_URL || 'http://localhost:3001'}/dashboard/training" class="button">
              Continue Training
            </a>
          </div>
          
          ${employee.daysOverdue > 7 ? `
            <div style="background: #FEE2E2; border-left: 4px solid #EF4444; padding: 15px; margin: 20px 0;">
              <strong style="color: #991B1B;">⚠️ Action Required:</strong>
              <p style="margin: 5px 0 0 0; color: #991B1B;">Please complete your training within the next 48 hours.</p>
            </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p>Need help? Contact your IT department.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: employee.email,
    subject: `${urgency}: Complete Your Cybersecurity Training`,
    html
  });
}

/**
 * Send completion certificate to employee
 */
export async function sendCompletionCertificate(employee: {
  email: string
  name: string
  score: number
  badge: 'GOLD' | 'SILVER' | 'BRONZE'
  completedAt: string
}): Promise<boolean> {
  const badgeInfo = {
    GOLD: { emoji: '🏆', color: '#F59E0B', text: 'Gold' },
    SILVER: { emoji: '🥈', color: '#9CA3AF', text: 'Silver' },
    BRONZE: { emoji: '🥉', color: '#D97706', text: 'Bronze' }
  };

  const badge = badgeInfo[employee.badge];

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 32px; }
        .content { padding: 40px; text-align: center; }
        .badge { font-size: 80px; margin: 20px 0; }
        .certificate { border: 3px solid ${badge.color}; padding: 30px; border-radius: 12px; margin: 20px 0; background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%); }
        .button { background: #10B981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Training Complete!</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 20px;"><strong>Congratulations, ${employee.name}!</strong></p>
          
          <div class="badge">${badge.emoji}</div>
          
          <div class="certificate">
            <h2 style="color: ${badge.color}; margin: 0 0 10px 0;">
              ${badge.text} Badge Earned
            </h2>
            <p style="font-size: 18px; margin: 10px 0;">
              <strong>Final Score: ${employee.score} points</strong>
            </p>
            <p style="color: #666; font-size: 14px;">
              Completed on ${new Date(employee.completedAt).toLocaleDateString()}
            </p>
          </div>
          
          <p>You've successfully completed all cybersecurity training modules and demonstrated strong security awareness!</p>
          
          <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What You've Mastered:</h3>
            <p style="text-align: left; margin: 5px 0;">✓ Identifying phishing attempts</p>
            <p style="text-align: left; margin: 5px 0;">✓ Creating strong passwords</p>
            <p style="text-align: left; margin: 5px 0;">✓ Defending against malware</p>
            <p style="text-align: left; margin: 5px 0;">✓ Spotting social engineering</p>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.APP_URL || 'http://localhost:3001'}/dashboard/training" class="button">
              View Certificate
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            🔒 Keep practicing these skills to keep your organization secure!
          </p>
        </div>
        
        <div class="footer">
          <p>Share your achievement on LinkedIn and help others stay cyber-safe!</p>
          <p style="margin-top: 10px;">
            <a href="#" style="color: #3B82F6; text-decoration: none;">Share on LinkedIn →</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: employee.email,
    subject: `${badge.emoji} ${badge.text} Badge Earned! Training Complete`,
    html
  });
}

/**
 * Send admin notification about training status
 */
export async function sendAdminReport(admin: {
  email: string
  companyName: string
  stats: {
    totalEmployees: number
    completed: number
    inProgress: number
    notStarted: number
  }
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: #1F2937; padding: 40px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { padding: 40px; }
        .stat { background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center; }
        .button { background: #3B82F6; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Weekly Training Report - ${admin.companyName}</h1>
        </div>
        
        <div class="content">
          <p>Here's your weekly training progress summary:</p>
          
          <div class="stat">
            <span><strong>Total Employees:</strong></span>
            <span style="font-size: 24px; font-weight: bold;">${admin.stats.totalEmployees}</span>
          </div>
          
          <div class="stat">
            <span><strong>✓ Completed:</strong></span>
            <span style="font-size: 24px; font-weight: bold; color: #10B981;">${admin.stats.completed}</span>
          </div>
          
          <div class="stat">
            <span><strong>⏳ In Progress:</strong></span>
            <span style="font-size: 24px; font-weight: bold; color: #F59E0B;">${admin.stats.inProgress}</span>
          </div>
          
          <div class="stat">
            <span><strong>⏰ Not Started:</strong></span>
            <span style="font-size: 24px; font-weight: bold; color: #EF4444;">${admin.stats.notStarted}</span>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.APP_URL || 'http://localhost:3001'}/dashboard/admin/employees" class="button">
              View Full Report
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p>CyberSim Pro - Protecting your organization through training</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: admin.email,
    subject: `📊 Weekly Training Report - ${admin.companyName}`,
    html
  });
}

export default {
  sendTrainingAssignment,
  sendReminderEmail,
  sendCompletionCertificate,
  sendAdminReport
};
