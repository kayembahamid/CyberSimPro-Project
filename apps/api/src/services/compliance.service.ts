import { complianceFrameworks, ComplianceControl } from '../data/compliance-frameworks'

interface UserComplianceStatus {
  userId: string
  completedModules: string[]
  totalTrainingHours: number
  certificationsEarned: number
}

interface ComplianceReport {
  framework: string
  generatedAt: string
  overallCompliance: number
  controlsCovered: number
  totalControls: number
  criticalGaps: ComplianceControl[]
  satisfiedControls: ComplianceControl[]
  gaps: ComplianceControl[]
  recommendations: string[]
}

interface GapAnalysis {
  control: ComplianceControl
  status: 'satisfied' | 'partial' | 'gap'
  coveredBy: string[]
  missingTraining: string[]
}

export class ComplianceService {
  // Generate compliance report for a framework
  generateReport(
    framework: 'NIST' | 'ISO27001' | 'CIS',
    userStatus: UserComplianceStatus
  ): ComplianceReport {
    const controls = complianceFrameworks.filter(c => c.framework === framework)
    const analysis = this.analyzeCompliance(controls, userStatus.completedModules)
    
    const satisfied = analysis.filter(a => a.status === 'satisfied')
    const gaps = analysis.filter(a => a.status === 'gap')
    const criticalGaps = gaps.filter(g => g.control.priority === 'critical')
    
    const overallCompliance = (satisfied.length / controls.length) * 100
    
    return {
      framework,
      generatedAt: new Date().toISOString(),
      overallCompliance: Math.round(overallCompliance),
      controlsCovered: satisfied.length,
      totalControls: controls.length,
      criticalGaps: criticalGaps.map(g => g.control),
      satisfiedControls: satisfied.map(s => s.control),
      gaps: gaps.map(g => g.control),
      recommendations: this.generateRecommendations(analysis, userStatus)
    }
  }

  // Analyze compliance status for controls
  private analyzeCompliance(
    controls: ComplianceControl[],
    completedModules: string[]
  ): GapAnalysis[] {
    return controls.map(control => {
      const coveredBy = control.trainingModules.filter(m => 
        completedModules.includes(m)
      )
      
      const missingTraining = control.trainingModules.filter(m => 
        !completedModules.includes(m)
      )
      
      let status: 'satisfied' | 'partial' | 'gap'
      if (coveredBy.length === control.trainingModules.length) {
        status = 'satisfied'
      } else if (coveredBy.length > 0) {
        status = 'partial'
      } else {
        status = 'gap'
      }
      
      return {
        control,
        status,
        coveredBy,
        missingTraining
      }
    })
  }

  // Generate recommendations based on gaps
  private generateRecommendations(
    analysis: GapAnalysis[],
    userStatus: UserComplianceStatus
  ): string[] {
    const recommendations: string[] = []
    
    // Critical gaps
    const criticalGaps = analysis.filter(a => 
      a.status === 'gap' && a.control.priority === 'critical'
    )
    if (criticalGaps.length > 0) {
      recommendations.push(
        `Address ${criticalGaps.length} critical compliance gaps immediately`
      )
    }
    
    // Missing training
    const allMissingModules = new Set<string>()
    analysis.forEach(a => {
      a.missingTraining.forEach(m => allMissingModules.add(m))
    })
    
    if (allMissingModules.size > 0) {
      recommendations.push(
        `Complete ${allMissingModules.size} additional training modules to improve coverage`
      )
    }
    
    // Training hours
    if (userStatus.totalTrainingHours < 10) {
      recommendations.push(
        'Increase training time to meet minimum compliance requirements'
      )
    }
    
    // Certifications
    if (userStatus.certificationsEarned === 0) {
      recommendations.push(
        'Earn certifications to demonstrate competency'
      )
    }
    
    return recommendations
  }

  // Get gap analysis for all frameworks
  getGapAnalysis(userStatus: UserComplianceStatus) {
    const frameworks = ['NIST', 'ISO27001', 'CIS'] as const
    
    return frameworks.map(framework => ({
      framework,
      report: this.generateReport(framework, userStatus)
    }))
  }

  // Get controls covered by a specific module
  getControlsCoveredByModule(moduleId: string): ComplianceControl[] {
    return complianceFrameworks.filter(c => 
      c.trainingModules.includes(moduleId)
    )
  }

  // Get priority summary across all frameworks
  getPrioritySummary(userStatus: UserComplianceStatus) {
    const allControls = complianceFrameworks
    const analysis = this.analyzeCompliance(allControls, userStatus.completedModules)
    
    const bySeverity = {
      critical: {
        total: allControls.filter(c => c.priority === 'critical').length,
        satisfied: analysis.filter(a => 
          a.control.priority === 'critical' && a.status === 'satisfied'
        ).length
      },
      high: {
        total: allControls.filter(c => c.priority === 'high').length,
        satisfied: analysis.filter(a => 
          a.control.priority === 'high' && a.status === 'satisfied'
        ).length
      },
      medium: {
        total: allControls.filter(c => c.priority === 'medium').length,
        satisfied: analysis.filter(a => 
          a.control.priority === 'medium' && a.status === 'satisfied'
        ).length
      }
    }
    
    return bySeverity
  }

  // Generate audit trail
  generateAuditTrail(userStatus: UserComplianceStatus) {
    return {
      timestamp: new Date().toISOString(),
      userId: userStatus.userId,
      completedModules: userStatus.completedModules.length,
      totalTrainingHours: userStatus.totalTrainingHours,
      certificationsEarned: userStatus.certificationsEarned,
      frameworks: {
        nist: this.generateReport('NIST', userStatus).overallCompliance,
        iso27001: this.generateReport('ISO27001', userStatus).overallCompliance,
        cis: this.generateReport('CIS', userStatus).overallCompliance
      },
      nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
    }
  }

  // Export report as structured data
  exportReport(framework: 'NIST' | 'ISO27001' | 'CIS', userStatus: UserComplianceStatus) {
    const report = this.generateReport(framework, userStatus)
    
    return {
      reportId: `${framework}-${Date.now()}`,
      generatedAt: report.generatedAt,
      framework: report.framework,
      user: {
        id: userStatus.userId,
        completedModules: userStatus.completedModules,
        trainingHours: userStatus.totalTrainingHours,
        certifications: userStatus.certificationsEarned
      },
      compliance: {
        overall: report.overallCompliance,
        controlsCovered: report.controlsCovered,
        totalControls: report.totalControls
      },
      gaps: {
        total: report.gaps.length,
        critical: report.criticalGaps.length,
        details: report.gaps.map(g => ({
          control: g.control,
          category: g.category,
          description: g.description,
          requiredTraining: g.trainingModules
        }))
      },
      recommendations: report.recommendations,
      signature: {
        timestamp: new Date().toISOString(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      }
    }
  }
}

export const complianceService = new ComplianceService()
