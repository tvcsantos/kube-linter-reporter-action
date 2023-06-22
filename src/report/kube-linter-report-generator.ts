import * as fs from 'fs/promises'
import {ReportLine} from '../model/report-line'
import {ReportResult} from '../model/report-result'
import {ReportGenerator} from './report-generator'
import {ReportProperties} from './report-properties'
import {noBreak} from '../utils/utils'
import {KubeLinterResult, ReportsProperties} from '../model/kube-linter'

const HEADER = (showFilename: boolean): string =>
  `${
    showFilename ? '| Filename ' : ''
  }| Name | Namespace | Kind | Version | Check | Message | Remediation |`
const HEADER_ALIGNMENT = (showFilename: boolean): string =>
  `${showFilename ? '|-' : ''}|-|-|-|-|-|-|-|`
const FILE_ENCODING = 'utf-8'
const SUCCESS_COMMENT =
  '# :white_check_mark: KubeLinter - All Kubernetes manifests are valid!'
const FAIL_COMMENT = '# :x: KubeLinter - Invalid Kubernetes manifests found!'

export class KubeLinterReportGenerator implements ReportGenerator {
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

  async generateReport(
    path: string,
    properties: ReportProperties
  ): Promise<ReportResult> {
    const result = await fs.readFile(path, FILE_ENCODING)
    const kubeLinterResult = JSON.parse(result) as KubeLinterResult

    const reportTable: string[] = []

    const reports: ReportsProperties[] = kubeLinterResult.Reports ?? []

    if (reports.length <= 0) return {report: SUCCESS_COMMENT, failed: false}

    reportTable.push(FAIL_COMMENT)
    reportTable.push(HEADER(properties.showFilename))
    reportTable.push(HEADER_ALIGNMENT(properties.showFilename))

    for (const report of reports) {
      const groupVersionKind = report.Object.K8sObject.GroupVersionKind
      const line: ReportLine = {
        filename: report.Object.Metadata.FilePath,
        name: report.Object.K8sObject.Name,
        namespace: report.Object.K8sObject.Namespace,
        kind: groupVersionKind.Kind,
        version: `${groupVersionKind.Group}/${groupVersionKind.Version}`,
        check: report.Check,
        message: report.Diagnostic.Message,
        remediation: report.Remediation
      }
      reportTable.push(this.makeReportLine(line, properties))
    }

    return {report: reportTable.join('\n'), failed: true}
  }

  private static instance: KubeLinterReportGenerator | null

  static getInstance(): KubeLinterReportGenerator {
    if (!KubeLinterReportGenerator.instance) {
      KubeLinterReportGenerator.instance = new KubeLinterReportGenerator()
    }
    return KubeLinterReportGenerator.instance
  }
}
