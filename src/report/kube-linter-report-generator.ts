import { ReportLine } from '../model/report-line'
import { ReportResult } from '../model/report-result'
import { ReportGenerator } from './report-generator'
import { ReportProperties } from './report-properties'
import { noBreak } from '../utils/utils'
import { KubeLinterResult, ReportsProperties } from '../model/kube-linter'
import { TextBuilder } from './text-builder'

const HEADER = (showFilename: boolean): string =>
  `${
    showFilename ? '| Filename ' : ''
  }| Name | Namespace | Kind | Version | Check | Message | Remediation |`
const HEADER_ALIGNMENT = (showFilename: boolean): string =>
  `${showFilename ? '|-' : ''}|-|-|-|-|-|-|-|`
const SUCCESS_COMMENT =
  '# :white_check_mark: KubeLinter - All Kubernetes manifests are valid!'
const FAIL_COMMENT = '# :x: KubeLinter - Invalid Kubernetes manifests found!'

export class KubeLinterReportGenerator
  implements ReportGenerator<KubeLinterResult>
{
  private constructor() {}

  private makeCheckLink(checkName: string): string {
    return `[${noBreak(
      checkName
    )}](https://github.com/stackrox/kube-linter/blob/main/docs/generated/checks.md#${checkName})`
  }

  private makeReportLine(
    line: ReportLine,
    properties: ReportProperties
  ): string {
    const filename = properties.showFilename
      ? `| ${noBreak(line.filename)} `
      : ''
    return `${filename}| ${noBreak(line.name)} | ${noBreak(
      line.namespace
    )} | ${noBreak(line.kind)} | ${noBreak(
      line.version
    )} | ${this.makeCheckLink(line.check)} | ${line.message} | ${
      line.remediation
    } |`
  }

  private addTitleToTextBuilder(textBuilder: TextBuilder): void {
    textBuilder.addLines(FAIL_COMMENT)
  }

  private addHeaderToTextBuilder(
    textBuilder: TextBuilder,
    reportProperties: ReportProperties
  ): void {
    textBuilder.addLines(
      HEADER(reportProperties.showFilename),
      HEADER_ALIGNMENT(reportProperties.showFilename)
    )
  }

  private async addContentToTextBuilder(
    textBuilder: TextBuilder,
    entries: ReportsProperties[],
    reportProperties: ReportProperties
  ): Promise<boolean> {
    let isContentTruncated = false
    for (const entry of entries) {
      const groupVersionKind = entry.Object.K8sObject.GroupVersionKind
      const line: ReportLine = {
        filename: entry.Object.Metadata.FilePath,
        name: entry.Object.K8sObject.Name,
        namespace: entry.Object.K8sObject.Namespace,
        kind: groupVersionKind.Kind,
        version: `${groupVersionKind.Group}/${groupVersionKind.Version}`,
        check: entry.Check,
        message: entry.Diagnostic.Message,
        remediation: entry.Remediation
      }
      const theReportLine = this.makeReportLine(line, reportProperties)
      const addedLines = textBuilder.tryAddLines(theReportLine)
      if (!addedLines) {
        isContentTruncated = true
        break
      }
    }
    return isContentTruncated
  }

  async generateReport(
    reportData: KubeLinterResult,
    properties: ReportProperties
  ): Promise<ReportResult> {
    const reports: ReportsProperties[] = reportData.Reports ?? []

    if (reports.length <= 0) {
      return { report: SUCCESS_COMMENT, failed: false, truncated: false }
    }

    const textBuilder = new TextBuilder(properties.maxSize)

    this.addTitleToTextBuilder(textBuilder)
    this.addHeaderToTextBuilder(textBuilder, properties)
    const result = await this.addContentToTextBuilder(
      textBuilder,
      reports,
      properties
    )

    return { report: textBuilder.build(), failed: true, truncated: result }
  }

  private static instance: KubeLinterReportGenerator | null

  static getInstance(): KubeLinterReportGenerator {
    if (!KubeLinterReportGenerator.instance) {
      KubeLinterReportGenerator.instance = new KubeLinterReportGenerator()
    }
    return KubeLinterReportGenerator.instance
  }
}
