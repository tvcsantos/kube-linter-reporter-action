export interface KubeLinterResult {
  Reports: ReportsProperties[]
}

export interface ReportsProperties {
  Diagnostic: DiagnosticProperties
  Check: string
  Remediation: string
  Object: ObjectProperties
}

export interface DiagnosticProperties {
  Message: string
}

export interface ObjectProperties {
  Metadata: MetadataProperties
  K8sObject: K8sObjectProperties
}

export interface MetadataProperties {
  FilePath: string
}

export interface K8sObjectProperties {
  Namespace: string
  Name: string
  GroupVersionKind: GroupVersionKindProperties
}

export interface GroupVersionKindProperties {
  Group: string
  Version: string
  Kind: string
}
