import { GitHubCheck } from '../github/check'
import { Reporter } from './reporter'
import { ReportResult } from '../model/report-result'

const FAIL_SUMMARY = 'KubeLinter - Manifests found that are not valid!'
const SUCCESS_SUMMARY = 'KubeLinter - No invalid manifests!'
const REPORT_CONTENT_TRUNCATED =
  '**Note: Report truncated due to character limit constraints!**'

const MAX_CHECK_BODY_SIZE = 65535

export class CheckReporter implements Reporter {
  maxSize = MAX_CHECK_BODY_SIZE

  private static getSummary(summary: string, truncated: boolean): string {
    const result = truncated
      ? [summary, '', REPORT_CONTENT_TRUNCATED]
      : [summary]
    return result.join('\n')
  }

  constructor(private readonly gitHubCheck: GitHubCheck) {}

  async report(data: ReportResult): Promise<void> {
    if (data.failed) {
      await this.gitHubCheck.fail(
        CheckReporter.getSummary(FAIL_SUMMARY, data.truncated),
        data.report
      )
    } else {
      await this.gitHubCheck.pass(
        CheckReporter.getSummary(SUCCESS_SUMMARY, data.truncated),
        data.report
      )
    }
  }
}
