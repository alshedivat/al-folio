# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    load_lexer 'shell.rb'

    class Powershell < Shell
      title 'powershell'
      desc 'powershell'
      tag 'powershell'
      aliases 'posh'
      filenames '*.ps1', '*.psm1', '*.psd1'
      mimetypes 'text/x-powershell'

      ATTRIBUTES = %w(
        CmdletBinding ConfirmImpact DefaultParameterSetName HelpURI SupportsPaging
        SupportsShouldProcess PositionalBinding
      ).join('|')

      KEYWORDS = %w(
        Begin Exit Process Break Filter Return Catch Finally Sequence Class For
        Switch Continue ForEach Throw Data From Trap Define Function Try Do If
        Until DynamicParam In Using Else InlineScript Var ElseIf Parallel While
        End Param Workflow
      ).join('|')

      KEYWORDS_TYPE = %w(
        bool byte char decimal double float int long object sbyte
        short string uint ulong ushort
      ).join('|')

      OPERATORS = %w(
        -split -isplit -csplit -join -is -isnot -as -eq -ieq -ceq -ne -ine
        -cne -gt -igt -cgt -ge -ige -cge -lt -ilt -clt -le -ile -cle -like
        -ilike -clike -notlike -inotlike -cnotlike -match -imatch -cmatch
        -notmatch -inotmatch -cnotmatch -contains -icontains -ccontains
        -notcontains -inotcontains -cnotcontains -replace -ireplace
        -creplace -band -bor -bxor -and -or -xor \. & = \+= -= \*= \/= %=
      ).join('|')

      BUILTINS = %w(
        Add-ProvisionedAppxPackage Add-WindowsFeature Apply-WindowsUnattend 
        Begin-WebCommitDelay Disable-PhysicalDiskIndication 
        Disable-StorageDiagnosticLog Enable-PhysicalDiskIndication 
        Enable-StorageDiagnosticLog End-WebCommitDelay Expand-IscsiVirtualDisk 
        Flush-Volume Get-DiskSNV Get-PhysicalDiskSNV Get-ProvisionedAppxPackage 
        Get-StorageEnclosureSNV Initialize-Volume Move-SmbClient 
        Remove-ProvisionedAppxPackage Remove-WindowsFeature Write-FileSystemCache 
        Add-BCDataCacheExtension Add-DnsClientNrptRule Add-DtcClusterTMMapping 
        Add-EtwTraceProvider Add-InitiatorIdToMaskingSet Add-MpPreference 
        Add-NetEventNetworkAdapter Add-NetEventPacketCaptureProvider 
        Add-NetEventProvider Add-NetEventVFPProvider Add-NetEventVmNetworkAdapter 
        Add-NetEventVmSwitch Add-NetEventVmSwitchProvider 
        Add-NetEventWFPCaptureProvider Add-NetIPHttpsCertBinding Add-NetLbfoTeamMember 
        Add-NetLbfoTeamNic Add-NetNatExternalAddress Add-NetNatStaticMapping 
        Add-NetSwitchTeamMember Add-OdbcDsn Add-PartitionAccessPath Add-PhysicalDisk 
        Add-Printer Add-PrinterDriver Add-PrinterPort Add-RDServer Add-RDSessionHost 
        Add-RDVirtualDesktopToCollection Add-TargetPortToMaskingSet 
        Add-VirtualDiskToMaskingSet Add-VpnConnection Add-VpnConnectionRoute 
        Add-VpnConnectionTriggerApplication Add-VpnConnectionTriggerDnsConfiguration 
        Add-VpnConnectionTriggerTrustedNetwork Block-FileShareAccess 
        Block-SmbShareAccess Clear-AssignedAccess Clear-BCCache Clear-Disk 
        Clear-DnsClientCache Clear-FileStorageTier Clear-PcsvDeviceLog 
        Clear-StorageDiagnosticInfo Close-SmbOpenFile Close-SmbSession Compress-Archive 
        Configuration Connect-IscsiTarget Connect-VirtualDisk ConvertFrom-SddlString 
        Copy-NetFirewallRule Copy-NetIPsecMainModeCryptoSet Copy-NetIPsecMainModeRule 
        Copy-NetIPsecPhase1AuthSet Copy-NetIPsecPhase2AuthSet 
        Copy-NetIPsecQuickModeCryptoSet Copy-NetIPsecRule Debug-FileShare 
        Debug-MMAppPrelaunch Debug-StorageSubSystem Debug-Volume Disable-BC 
        Disable-BCDowngrading Disable-BCServeOnBattery 
        Disable-DAManualEntryPointSelection Disable-DscDebug Disable-MMAgent 
        Disable-NetAdapter Disable-NetAdapterBinding Disable-NetAdapterChecksumOffload 
        Disable-NetAdapterEncapsulatedPacketTaskOffload Disable-NetAdapterIPsecOffload 
        Disable-NetAdapterLso Disable-NetAdapterPacketDirect 
        Disable-NetAdapterPowerManagement Disable-NetAdapterQos Disable-NetAdapterRdma 
        Disable-NetAdapterRsc Disable-NetAdapterRss Disable-NetAdapterSriov 
        Disable-NetAdapterVmq Disable-NetDnsTransitionConfiguration 
        Disable-NetFirewallRule Disable-NetIPHttpsProfile Disable-NetIPsecMainModeRule 
        Disable-NetIPsecRule Disable-NetNatTransitionConfiguration 
        Disable-NetworkSwitchEthernetPort Disable-NetworkSwitchFeature 
        Disable-NetworkSwitchVlan Disable-OdbcPerfCounter 
        Disable-PhysicalDiskIdentification Disable-PnpDevice Disable-PSTrace 
        Disable-PSWSManCombinedTrace Disable-RDVirtualDesktopADMachineAccountReuse 
        Disable-ScheduledTask Disable-ServerManagerStandardUserRemoting 
        Disable-SmbDelegation Disable-StorageEnclosureIdentification 
        Disable-StorageHighAvailability Disable-StorageMaintenanceMode Disable-Ual 
        Disable-WdacBidTrace Disable-WSManTrace Disconnect-IscsiTarget 
        Disconnect-NfsSession Disconnect-RDUser Disconnect-VirtualDisk 
        Dismount-DiskImage Enable-BCDistributed Enable-BCDowngrading 
        Enable-BCHostedClient Enable-BCHostedServer Enable-BCLocal 
        Enable-BCServeOnBattery Enable-DAManualEntryPointSelection Enable-DscDebug 
        Enable-MMAgent Enable-NetAdapter Enable-NetAdapterBinding 
        Enable-NetAdapterChecksumOffload Enable-NetAdapterEncapsulatedPacketTaskOffload 
        Enable-NetAdapterIPsecOffload Enable-NetAdapterLso 
        Enable-NetAdapterPacketDirect Enable-NetAdapterPowerManagement 
        Enable-NetAdapterQos Enable-NetAdapterRdma Enable-NetAdapterRsc 
        Enable-NetAdapterRss Enable-NetAdapterSriov Enable-NetAdapterVmq 
        Enable-NetDnsTransitionConfiguration Enable-NetFirewallRule 
        Enable-NetIPHttpsProfile Enable-NetIPsecMainModeRule Enable-NetIPsecRule 
        Enable-NetNatTransitionConfiguration Enable-NetworkSwitchEthernetPort 
        Enable-NetworkSwitchFeature Enable-NetworkSwitchVlan Enable-OdbcPerfCounter 
        Enable-PhysicalDiskIdentification Enable-PnpDevice Enable-PSTrace 
        Enable-PSWSManCombinedTrace Enable-RDVirtualDesktopADMachineAccountReuse 
        Enable-ScheduledTask Enable-ServerManagerStandardUserRemoting 
        Enable-SmbDelegation Enable-StorageEnclosureIdentification 
        Enable-StorageHighAvailability Enable-StorageMaintenanceMode Enable-Ual 
        Enable-WdacBidTrace Enable-WSManTrace Expand-Archive Export-BCCachePackage 
        Export-BCSecretKey Export-IscsiTargetServerConfiguration 
        Export-ODataEndpointProxy Export-RDPersonalSessionDesktopAssignment 
        Export-RDPersonalVirtualDesktopAssignment Export-ScheduledTask 
        Find-NetIPsecRule Find-NetRoute Format-Hex Format-Volume Get-AppBackgroundTask 
        Get-AppvVirtualProcess Get-AppxLastError Get-AppxLog Get-AssignedAccess 
        Get-AutologgerConfig Get-BCClientConfiguration Get-BCContentServerConfiguration 
        Get-BCDataCache Get-BCDataCacheExtension Get-BCHashCache 
        Get-BCHostedCacheServerConfiguration Get-BCNetworkConfiguration Get-BCStatus 
        Get-ClusteredScheduledTask Get-DAClientExperienceConfiguration 
        Get-DAConnectionStatus Get-DAEntryPointTableItem Get-DedupProperties Get-Disk 
        Get-DiskImage Get-DiskStorageNodeView Get-DisplayResolution Get-DnsClient 
        Get-DnsClientCache Get-DnsClientGlobalSetting Get-DnsClientNrptGlobal 
        Get-DnsClientNrptPolicy Get-DnsClientNrptRule Get-DnsClientServerAddress 
        Get-DscConfiguration Get-DscConfigurationStatus 
        Get-DscLocalConfigurationManager Get-DscResource Get-Dtc 
        Get-DtcAdvancedHostSetting Get-DtcAdvancedSetting Get-DtcClusterDefault 
        Get-DtcClusterTMMapping Get-DtcDefault Get-DtcLog Get-DtcNetworkSetting 
        Get-DtcTransaction Get-DtcTransactionsStatistics 
        Get-DtcTransactionsTraceSession Get-DtcTransactionsTraceSetting 
        Get-EtwTraceProvider Get-EtwTraceSession Get-FileHash Get-FileIntegrity 
        Get-FileShare Get-FileShareAccessControlEntry Get-FileStorageTier 
        Get-InitiatorId Get-InitiatorPort Get-IscsiConnection Get-IscsiSession 
        Get-IscsiTarget Get-IscsiTargetPortal Get-IseSnippet Get-LogProperties 
        Get-MaskingSet Get-MMAgent Get-MpComputerStatus Get-MpPreference Get-MpThreat 
        Get-MpThreatCatalog Get-MpThreatDetection Get-NCSIPolicyConfiguration 
        Get-Net6to4Configuration Get-NetAdapter Get-NetAdapterAdvancedProperty 
        Get-NetAdapterBinding Get-NetAdapterChecksumOffload 
        Get-NetAdapterEncapsulatedPacketTaskOffload Get-NetAdapterHardwareInfo 
        Get-NetAdapterIPsecOffload Get-NetAdapterLso Get-NetAdapterPacketDirect 
        Get-NetAdapterPowerManagement Get-NetAdapterQos Get-NetAdapterRdma 
        Get-NetAdapterRsc Get-NetAdapterRss Get-NetAdapterSriov Get-NetAdapterSriovVf 
        Get-NetAdapterStatistics Get-NetAdapterVmq Get-NetAdapterVMQQueue 
        Get-NetAdapterVPort Get-NetCompartment Get-NetConnectionProfile 
        Get-NetDnsTransitionConfiguration Get-NetDnsTransitionMonitoring 
        Get-NetEventNetworkAdapter Get-NetEventPacketCaptureProvider 
        Get-NetEventProvider Get-NetEventSession Get-NetEventVFPProvider 
        Get-NetEventVmNetworkAdapter Get-NetEventVmSwitch Get-NetEventVmSwitchProvider 
        Get-NetEventWFPCaptureProvider Get-NetFirewallAddressFilter 
        Get-NetFirewallApplicationFilter Get-NetFirewallInterfaceFilter 
        Get-NetFirewallInterfaceTypeFilter Get-NetFirewallPortFilter 
        Get-NetFirewallProfile Get-NetFirewallRule Get-NetFirewallSecurityFilter 
        Get-NetFirewallServiceFilter Get-NetFirewallSetting Get-NetIPAddress 
        Get-NetIPConfiguration Get-NetIPHttpsConfiguration Get-NetIPHttpsState 
        Get-NetIPInterface Get-NetIPsecDospSetting Get-NetIPsecMainModeCryptoSet 
        Get-NetIPsecMainModeRule Get-NetIPsecMainModeSA Get-NetIPsecPhase1AuthSet 
        Get-NetIPsecPhase2AuthSet Get-NetIPsecQuickModeCryptoSet 
        Get-NetIPsecQuickModeSA Get-NetIPsecRule Get-NetIPv4Protocol 
        Get-NetIPv6Protocol Get-NetIsatapConfiguration Get-NetLbfoTeam 
        Get-NetLbfoTeamMember Get-NetLbfoTeamNic Get-NetNat Get-NetNatExternalAddress 
        Get-NetNatGlobal Get-NetNatSession Get-NetNatStaticMapping 
        Get-NetNatTransitionConfiguration Get-NetNatTransitionMonitoring 
        Get-NetNeighbor Get-NetOffloadGlobalSetting Get-NetPrefixPolicy 
        Get-NetQosPolicy Get-NetRoute Get-NetSwitchTeam Get-NetSwitchTeamMember 
        Get-NetTCPConnection Get-NetTCPSetting Get-NetTeredoConfiguration 
        Get-NetTeredoState Get-NetTransportFilter Get-NetUDPEndpoint Get-NetUDPSetting 
        Get-NetworkSwitchEthernetPort Get-NetworkSwitchFeature 
        Get-NetworkSwitchGlobalData Get-NetworkSwitchVlan Get-NfsClientConfiguration 
        Get-NfsClientgroup Get-NfsClientLock Get-NfsMappingStore Get-NfsMountedClient 
        Get-NfsNetgroupStore Get-NfsOpenFile Get-NfsServerConfiguration Get-NfsSession 
        Get-NfsShare Get-NfsSharePermission Get-NfsStatistics Get-OdbcDriver 
        Get-OdbcDsn Get-OdbcPerfCounter Get-OffloadDataTransferSetting Get-Partition 
        Get-PartitionSupportedSize Get-PcsvDevice Get-PcsvDeviceLog Get-PhysicalDisk 
        Get-PhysicalDiskStorageNodeView Get-PhysicalExtent 
        Get-PhysicalExtentAssociation Get-PlatformIdentifier Get-PnpDevice 
        Get-PnpDeviceProperty Get-PrintConfiguration Get-Printer Get-PrinterDriver 
        Get-PrinterPort Get-PrinterProperty Get-PrintJob Get-RDAvailableApp 
        Get-RDCertificate Get-RDConnectionBrokerHighAvailability 
        Get-RDDeploymentGatewayConfiguration Get-RDFileTypeAssociation 
        Get-RDLicenseConfiguration Get-RDPersonalSessionDesktopAssignment 
        Get-RDPersonalVirtualDesktopAssignment 
        Get-RDPersonalVirtualDesktopPatchSchedule Get-RDRemoteApp Get-RDRemoteDesktop 
        Get-RDServer Get-RDSessionCollection Get-RDSessionCollectionConfiguration 
        Get-RDSessionHost Get-RDUserSession Get-RDVirtualDesktop 
        Get-RDVirtualDesktopCollection Get-RDVirtualDesktopCollectionConfiguration 
        Get-RDVirtualDesktopCollectionJobStatus Get-RDVirtualDesktopConcurrency 
        Get-RDVirtualDesktopIdleCount Get-RDVirtualDesktopTemplateExportPath 
        Get-RDWorkspace Get-ResiliencySetting Get-ScheduledTask Get-ScheduledTaskInfo 
        Get-SilComputer Get-SilComputerIdentity Get-SilData Get-SilLogging 
        Get-SilSoftware Get-SilUalAccess Get-SilWindowsUpdate Get-SmbBandWidthLimit 
        Get-SmbClientConfiguration Get-SmbClientNetworkInterface Get-SmbConnection 
        Get-SmbDelegation Get-SmbMapping Get-SmbMultichannelConnection 
        Get-SmbMultichannelConstraint Get-SmbOpenFile Get-SmbServerConfiguration 
        Get-SmbServerNetworkInterface Get-SmbSession Get-SmbShare Get-SmbShareAccess 
        Get-SmbWitnessClient Get-SMCounterSample Get-SMPerformanceCollector 
        Get-SMServerBpaResult Get-SMServerClusterName Get-SMServerEvent 
        Get-SMServerFeature Get-SMServerInventory Get-SMServerService Get-StartApps 
        Get-StorageAdvancedProperty Get-StorageDiagnosticInfo Get-StorageEnclosure 
        Get-StorageEnclosureStorageNodeView Get-StorageEnclosureVendorData 
        Get-StorageFaultDomain Get-StorageFileServer Get-StorageFirmwareInformation 
        Get-StorageHealthAction Get-StorageHealthReport Get-StorageHealthSetting 
        Get-StorageJob Get-StorageNode Get-StoragePool Get-StorageProvider 
        Get-StorageReliabilityCounter Get-StorageSetting Get-StorageSubSystem 
        Get-StorageTier Get-StorageTierSupportedSize Get-SupportedClusterSizes 
        Get-SupportedFileSystems Get-TargetPort Get-TargetPortal Get-Ual 
        Get-UalDailyAccess Get-UalDailyDeviceAccess Get-UalDailyUserAccess 
        Get-UalDeviceAccess Get-UalDns Get-UalHyperV Get-UalOverview 
        Get-UalServerDevice Get-UalServerUser Get-UalSystemId Get-UalUserAccess 
        Get-VirtualDisk Get-VirtualDiskSupportedSize Get-Volume 
        Get-VolumeCorruptionCount Get-VolumeScrubPolicy Get-VpnConnection 
        Get-VpnConnectionTrigger Get-WdacBidTrace Get-WindowsFeature 
        Get-WindowsUpdateLog Grant-FileShareAccess Grant-NfsSharePermission 
        Grant-RDOUAccess Grant-SmbShareAccess Hide-VirtualDisk Import-BCCachePackage 
        Import-BCSecretKey Import-IscsiTargetServerConfiguration Import-IseSnippet 
        Import-PowerShellDataFile Import-RDPersonalSessionDesktopAssignment 
        Import-RDPersonalVirtualDesktopAssignment Initialize-Disk Install-Dtc 
        Install-WindowsFeature Invoke-AsWorkflow Invoke-RDUserLogoff Mount-DiskImage 
        Move-RDVirtualDesktop Move-SmbWitnessClient New-AutologgerConfig 
        New-DAEntryPointTableItem New-DscChecksum New-EapConfiguration 
        New-EtwTraceSession New-FileShare New-Guid New-IscsiTargetPortal New-IseSnippet 
        New-MaskingSet New-NetAdapterAdvancedProperty New-NetEventSession 
        New-NetFirewallRule New-NetIPAddress New-NetIPHttpsConfiguration 
        New-NetIPsecDospSetting New-NetIPsecMainModeCryptoSet New-NetIPsecMainModeRule 
        New-NetIPsecPhase1AuthSet New-NetIPsecPhase2AuthSet 
        New-NetIPsecQuickModeCryptoSet New-NetIPsecRule New-NetLbfoTeam New-NetNat 
        New-NetNatTransitionConfiguration New-NetNeighbor New-NetQosPolicy New-NetRoute 
        New-NetSwitchTeam New-NetTransportFilter New-NetworkSwitchVlan 
        New-NfsClientgroup New-NfsShare New-Partition New-PSWorkflowSession 
        New-RDCertificate New-RDPersonalVirtualDesktopPatchSchedule New-RDRemoteApp 
        New-RDSessionCollection New-RDSessionDeployment New-RDVirtualDesktopCollection 
        New-RDVirtualDesktopDeployment New-ScheduledTask New-ScheduledTaskAction 
        New-ScheduledTaskPrincipal New-ScheduledTaskSettingsSet 
        New-ScheduledTaskTrigger New-SmbMapping New-SmbMultichannelConstraint 
        New-SmbShare New-StorageFileServer New-StoragePool 
        New-StorageSubsystemVirtualDisk New-StorageTier New-TemporaryFile 
        New-VirtualDisk New-VirtualDiskClone New-VirtualDiskSnapshot New-Volume 
        New-VpnServerAddress Open-NetGPO Optimize-StoragePool Optimize-Volume 
        Publish-BCFileContent Publish-BCWebContent Publish-SilData Read-PrinterNfcTag 
        Register-ClusteredScheduledTask Register-DnsClient Register-IscsiSession 
        Register-ScheduledTask Register-StorageSubsystem Remove-AutologgerConfig 
        Remove-BCDataCacheExtension Remove-DAEntryPointTableItem 
        Remove-DnsClientNrptRule Remove-DscConfigurationDocument 
        Remove-DtcClusterTMMapping Remove-EtwTraceProvider Remove-EtwTraceSession 
        Remove-FileShare Remove-InitiatorId Remove-InitiatorIdFromMaskingSet 
        Remove-IscsiTargetPortal Remove-MaskingSet Remove-MpPreference Remove-MpThreat 
        Remove-NetAdapterAdvancedProperty Remove-NetEventNetworkAdapter 
        Remove-NetEventPacketCaptureProvider Remove-NetEventProvider 
        Remove-NetEventSession Remove-NetEventVFPProvider 
        Remove-NetEventVmNetworkAdapter Remove-NetEventVmSwitch 
        Remove-NetEventVmSwitchProvider Remove-NetEventWFPCaptureProvider 
        Remove-NetFirewallRule Remove-NetIPAddress Remove-NetIPHttpsCertBinding 
        Remove-NetIPHttpsConfiguration Remove-NetIPsecDospSetting 
        Remove-NetIPsecMainModeCryptoSet Remove-NetIPsecMainModeRule 
        Remove-NetIPsecMainModeSA Remove-NetIPsecPhase1AuthSet 
        Remove-NetIPsecPhase2AuthSet Remove-NetIPsecQuickModeCryptoSet 
        Remove-NetIPsecQuickModeSA Remove-NetIPsecRule Remove-NetLbfoTeam 
        Remove-NetLbfoTeamMember Remove-NetLbfoTeamNic Remove-NetNat 
        Remove-NetNatExternalAddress Remove-NetNatStaticMapping 
        Remove-NetNatTransitionConfiguration Remove-NetNeighbor Remove-NetQosPolicy 
        Remove-NetRoute Remove-NetSwitchTeam Remove-NetSwitchTeamMember 
        Remove-NetTransportFilter Remove-NetworkSwitchEthernetPortIPAddress 
        Remove-NetworkSwitchVlan Remove-NfsClientgroup Remove-NfsShare Remove-OdbcDsn 
        Remove-Partition Remove-PartitionAccessPath Remove-PhysicalDisk Remove-Printer 
        Remove-PrinterDriver Remove-PrinterPort Remove-PrintJob 
        Remove-RDDatabaseConnectionString Remove-RDPersonalSessionDesktopAssignment 
        Remove-RDPersonalVirtualDesktopAssignment 
        Remove-RDPersonalVirtualDesktopPatchSchedule Remove-RDRemoteApp Remove-RDServer 
        Remove-RDSessionCollection Remove-RDSessionHost 
        Remove-RDVirtualDesktopCollection Remove-RDVirtualDesktopFromCollection 
        Remove-SmbBandwidthLimit Remove-SmbMapping Remove-SmbMultichannelConstraint 
        Remove-SmbShare Remove-SMServerPerformanceLog Remove-StorageFileServer 
        Remove-StorageHealthSetting Remove-StoragePool Remove-StorageTier 
        Remove-TargetPortFromMaskingSet Remove-VirtualDisk 
        Remove-VirtualDiskFromMaskingSet Remove-VpnConnection Remove-VpnConnectionRoute 
        Remove-VpnConnectionTriggerApplication 
        Remove-VpnConnectionTriggerDnsConfiguration 
        Remove-VpnConnectionTriggerTrustedNetwork Rename-DAEntryPointTableItem 
        Rename-MaskingSet Rename-NetAdapter Rename-NetFirewallRule 
        Rename-NetIPHttpsConfiguration Rename-NetIPsecMainModeCryptoSet 
        Rename-NetIPsecMainModeRule Rename-NetIPsecPhase1AuthSet 
        Rename-NetIPsecPhase2AuthSet Rename-NetIPsecQuickModeCryptoSet 
        Rename-NetIPsecRule Rename-NetLbfoTeam Rename-NetSwitchTeam 
        Rename-NfsClientgroup Rename-Printer Repair-FileIntegrity Repair-VirtualDisk 
        Repair-Volume Reset-BC Reset-DAClientExperienceConfiguration 
        Reset-DAEntryPointTableItem Reset-DtcLog Reset-NCSIPolicyConfiguration 
        Reset-Net6to4Configuration Reset-NetAdapterAdvancedProperty 
        Reset-NetDnsTransitionConfiguration Reset-NetIPHttpsConfiguration 
        Reset-NetIsatapConfiguration Reset-NetTeredoConfiguration Reset-NfsStatistics 
        Reset-PhysicalDisk Reset-StorageReliabilityCounter Resize-Partition 
        Resize-StorageTier Resize-VirtualDisk Resolve-NfsMappedIdentity 
        Restart-NetAdapter Restart-PcsvDevice Restart-PrintJob Restore-DscConfiguration 
        Restore-NetworkSwitchConfiguration Resume-PrintJob Revoke-FileShareAccess 
        Revoke-NfsClientLock Revoke-NfsMountedClient Revoke-NfsOpenFile 
        Revoke-NfsSharePermission Revoke-SmbShareAccess Save-NetGPO 
        Save-NetworkSwitchConfiguration Send-EtwTraceSession Send-RDUserMessage 
        Set-AssignedAccess Set-AutologgerConfig Set-BCAuthentication Set-BCCache 
        Set-BCDataCacheEntryMaxAge Set-BCMinSMBLatency Set-BCSecretKey 
        Set-ClusteredScheduledTask Set-DAClientExperienceConfiguration 
        Set-DAEntryPointTableItem Set-Disk Set-DisplayResolution Set-DnsClient 
        Set-DnsClientGlobalSetting Set-DnsClientNrptGlobal Set-DnsClientNrptRule 
        Set-DnsClientServerAddress Set-DtcAdvancedHostSetting Set-DtcAdvancedSetting 
        Set-DtcClusterDefault Set-DtcClusterTMMapping Set-DtcDefault Set-DtcLog 
        Set-DtcNetworkSetting Set-DtcTransaction Set-DtcTransactionsTraceSession 
        Set-DtcTransactionsTraceSetting Set-EtwTraceProvider Set-EtwTraceSession 
        Set-FileIntegrity Set-FileShare Set-FileStorageTier Set-InitiatorPort 
        Set-IscsiChapSecret Set-LogProperties Set-MMAgent Set-MpPreference 
        Set-NCSIPolicyConfiguration Set-Net6to4Configuration Set-NetAdapter 
        Set-NetAdapterAdvancedProperty Set-NetAdapterBinding 
        Set-NetAdapterChecksumOffload Set-NetAdapterEncapsulatedPacketTaskOffload 
        Set-NetAdapterIPsecOffload Set-NetAdapterLso Set-NetAdapterPacketDirect 
        Set-NetAdapterPowerManagement Set-NetAdapterQos Set-NetAdapterRdma 
        Set-NetAdapterRsc Set-NetAdapterRss Set-NetAdapterSriov Set-NetAdapterVmq 
        Set-NetConnectionProfile Set-NetDnsTransitionConfiguration 
        Set-NetEventPacketCaptureProvider Set-NetEventProvider Set-NetEventSession 
        Set-NetEventVFPProvider Set-NetEventVmSwitchProvider 
        Set-NetEventWFPCaptureProvider Set-NetFirewallAddressFilter 
        Set-NetFirewallApplicationFilter Set-NetFirewallInterfaceFilter 
        Set-NetFirewallInterfaceTypeFilter Set-NetFirewallPortFilter 
        Set-NetFirewallProfile Set-NetFirewallRule Set-NetFirewallSecurityFilter 
        Set-NetFirewallServiceFilter Set-NetFirewallSetting Set-NetIPAddress 
        Set-NetIPHttpsConfiguration Set-NetIPInterface Set-NetIPsecDospSetting 
        Set-NetIPsecMainModeCryptoSet Set-NetIPsecMainModeRule 
        Set-NetIPsecPhase1AuthSet Set-NetIPsecPhase2AuthSet 
        Set-NetIPsecQuickModeCryptoSet Set-NetIPsecRule Set-NetIPv4Protocol 
        Set-NetIPv6Protocol Set-NetIsatapConfiguration Set-NetLbfoTeam 
        Set-NetLbfoTeamMember Set-NetLbfoTeamNic Set-NetNat Set-NetNatGlobal 
        Set-NetNatTransitionConfiguration Set-NetNeighbor Set-NetOffloadGlobalSetting 
        Set-NetQosPolicy Set-NetRoute Set-NetTCPSetting Set-NetTeredoConfiguration 
        Set-NetUDPSetting Set-NetworkSwitchEthernetPortIPAddress 
        Set-NetworkSwitchPortMode Set-NetworkSwitchPortProperty 
        Set-NetworkSwitchVlanProperty Set-NfsClientConfiguration Set-NfsClientgroup 
        Set-NfsMappingStore Set-NfsNetgroupStore Set-NfsServerConfiguration 
        Set-NfsShare Set-OdbcDriver Set-OdbcDsn Set-Partition 
        Set-PcsvDeviceBootConfiguration Set-PcsvDeviceNetworkConfiguration 
        Set-PcsvDeviceUserPassword Set-PhysicalDisk Set-PrintConfiguration Set-Printer 
        Set-PrinterProperty Set-RDActiveManagementServer Set-RDCertificate 
        Set-RDClientAccessName Set-RDConnectionBrokerHighAvailability 
        Set-RDDatabaseConnectionString Set-RDDeploymentGatewayConfiguration 
        Set-RDFileTypeAssociation Set-RDLicenseConfiguration 
        Set-RDPersonalSessionDesktopAssignment Set-RDPersonalVirtualDesktopAssignment 
        Set-RDPersonalVirtualDesktopPatchSchedule Set-RDRemoteApp Set-RDRemoteDesktop 
        Set-RDSessionCollectionConfiguration Set-RDSessionHost 
        Set-RDVirtualDesktopCollectionConfiguration Set-RDVirtualDesktopConcurrency 
        Set-RDVirtualDesktopIdleCount Set-RDVirtualDesktopTemplateExportPath 
        Set-RDWorkspace Set-ResiliencySetting Set-ScheduledTask Set-SilLogging 
        Set-SmbBandwidthLimit Set-SmbClientConfiguration Set-SmbPathAcl 
        Set-SmbServerConfiguration Set-SmbShare Set-StorageFileServer 
        Set-StorageHealthSetting Set-StoragePool Set-StorageProvider Set-StorageSetting 
        Set-StorageSubSystem Set-StorageTier Set-VirtualDisk Set-Volume 
        Set-VolumeScrubPolicy Set-VpnConnection Set-VpnConnectionIPsecConfiguration 
        Set-VpnConnectionProxy Set-VpnConnectionTriggerDnsConfiguration 
        Set-VpnConnectionTriggerTrustedNetwork Show-NetFirewallRule Show-NetIPsecRule 
        Show-VirtualDisk Start-AppBackgroundTask Start-AppvVirtualProcess 
        Start-AutologgerConfig Start-Dtc Start-DtcTransactionsTraceSession Start-MpScan 
        Start-MpWDOScan Start-NetEventSession Start-PcsvDevice Start-ScheduledTask 
        Start-SilLogging Start-SMPerformanceCollector Start-StorageDiagnosticLog 
        Start-Trace Stop-DscConfiguration Stop-Dtc Stop-DtcTransactionsTraceSession 
        Stop-NetEventSession Stop-PcsvDevice Stop-RDVirtualDesktopCollectionJob 
        Stop-ScheduledTask Stop-SilLogging Stop-SMPerformanceCollector 
        Stop-StorageDiagnosticLog Stop-StorageJob Stop-Trace Suspend-PrintJob 
        Sync-NetIPsecRule Test-Dtc Test-NetConnection Test-NfsMappingStore 
        Test-RDOUAccess Test-RDVirtualDesktopADMachineAccountReuse 
        Unblock-FileShareAccess Unblock-SmbShareAccess Uninstall-Dtc 
        Uninstall-WindowsFeature Unregister-AppBackgroundTask 
        Unregister-ClusteredScheduledTask Unregister-IscsiSession 
        Unregister-ScheduledTask Unregister-StorageSubsystem Update-Disk 
        Update-DscConfiguration Update-HostStorageCache Update-IscsiTarget 
        Update-IscsiTargetPortal Update-MpSignature Update-NetIPsecRule 
        Update-RDVirtualDesktopCollection Update-SmbMultichannelConnection 
        Update-StorageFirmware Update-StoragePool Update-StorageProviderCache 
        Write-DtcTransactionsTraceSession Write-PrinterNfcTag Write-VolumeCache 
        Add-ADCentralAccessPolicyMember Add-ADComputerServiceAccount 
        Add-ADDomainControllerPasswordReplicationPolicy 
        Add-ADFineGrainedPasswordPolicySubject Add-ADGroupMember 
        Add-ADPrincipalGroupMembership Add-ADResourcePropertyListMember 
        Add-AppvClientConnectionGroup Add-AppvClientPackage Add-AppvPublishingServer 
        Add-AppxPackage Add-AppxProvisionedPackage Add-AppxVolume Add-BitsFile 
        Add-CertificateEnrollmentPolicyServer Add-ClusteriSCSITargetServerRole 
        Add-Computer Add-Content Add-IscsiVirtualDiskTargetMapping Add-JobTrigger 
        Add-KdsRootKey Add-LocalGroupMember Add-Member Add-SignerRule Add-Type 
        Add-WebConfiguration Add-WebConfigurationLock Add-WebConfigurationProperty 
        Add-WindowsCapability Add-WindowsDriver Add-WindowsImage Add-WindowsPackage 
        Backup-AuditPolicy Backup-SecurityPolicy Backup-WebConfiguration 
        Checkpoint-Computer Checkpoint-IscsiVirtualDisk Clear-ADAccountExpiration 
        Clear-ADClaimTransformLink Clear-Content Clear-EventLog 
        Clear-IISCentralCertProvider Clear-IISConfigCollection Clear-Item 
        Clear-ItemProperty Clear-KdsCache Clear-RecycleBin Clear-Tpm 
        Clear-UevAppxPackage Clear-UevConfiguration Clear-Variable 
        Clear-WebCentralCertProvider Clear-WebConfiguration 
        Clear-WebRequestTracingSetting Clear-WebRequestTracingSettings 
        Clear-WindowsCorruptMountPoint Compare-Object Complete-BitsTransfer 
        Complete-DtcDiagnosticTransaction Complete-Transaction Confirm-SecureBootUEFI 
        Connect-WSMan ConvertFrom-CIPolicy ConvertFrom-Csv ConvertFrom-Json 
        ConvertFrom-SecureString ConvertFrom-String ConvertFrom-StringData 
        Convert-IscsiVirtualDisk Convert-Path Convert-String ConvertTo-Csv 
        ConvertTo-Html ConvertTo-Json ConvertTo-SecureString ConvertTo-TpmOwnerAuth 
        ConvertTo-WebApplication ConvertTo-Xml Copy-Item Copy-ItemProperty 
        Debug-Process Debug-Runspace Disable-ADAccount Disable-ADOptionalFeature 
        Disable-AppBackgroundTaskDiagnosticLog Disable-Appv 
        Disable-AppvClientConnectionGroup Disable-ComputerRestore 
        Disable-IISCentralCertProvider Disable-IISSharedConfig Disable-JobTrigger 
        Disable-LocalUser Disable-PSBreakpoint Disable-RunspaceDebug 
        Disable-ScheduledJob Disable-TlsCipherSuite Disable-TlsEccCurve 
        Disable-TlsSessionTicketKey Disable-TpmAutoProvisioning Disable-Uev 
        Disable-UevAppxPackage Disable-UevTemplate Disable-WebCentralCertProvider 
        Disable-WebGlobalModule Disable-WebRequestTracing Disable-WindowsErrorReporting 
        Disable-WindowsOptionalFeature Disable-WSManCredSSP Disconnect-WSMan 
        Dismount-AppxVolume Dismount-IscsiVirtualDiskSnapshot Dismount-WindowsImage 
        Edit-CIPolicyRule Enable-ADAccount Enable-ADOptionalFeature 
        Enable-AppBackgroundTaskDiagnosticLog Enable-Appv 
        Enable-AppvClientConnectionGroup Enable-ComputerRestore 
        Enable-IISCentralCertProvider Enable-IISSharedConfig Enable-JobTrigger 
        Enable-LocalUser Enable-PSBreakpoint Enable-RunspaceDebug Enable-ScheduledJob 
        Enable-TlsCipherSuite Enable-TlsEccCurve Enable-TlsSessionTicketKey 
        Enable-TpmAutoProvisioning Enable-Uev Enable-UevAppxPackage Enable-UevTemplate 
        Enable-WebCentralCertProvider Enable-WebGlobalModule Enable-WebRequestTracing 
        Enable-WindowsErrorReporting Enable-WindowsOptionalFeature Enable-WSManCredSSP 
        Expand-WindowsCustomDataImage Expand-WindowsImage Export-Alias 
        Export-BinaryMiLog Export-Certificate Export-Clixml Export-Counter Export-Csv 
        Export-FormatData Export-IISConfiguration Export-IscsiVirtualDiskSnapshot 
        Export-PfxCertificate Export-PSSession Export-StartLayout 
        Export-TlsSessionTicketKey Export-UevConfiguration Export-UevPackage 
        Export-WindowsDriver Export-WindowsImage Format-Custom Format-List 
        Format-SecureBootUEFI Format-Table Format-Wide Get-Acl 
        Get-ADAccountAuthorizationGroup Get-ADAccountResultantPasswordReplicationPolicy 
        Get-ADAuthenticationPolicy Get-ADAuthenticationPolicySilo 
        Get-ADCentralAccessPolicy Get-ADCentralAccessRule Get-ADClaimTransformPolicy 
        Get-ADClaimType Get-ADComputer Get-ADComputerServiceAccount 
        Get-ADDCCloningExcludedApplicationList Get-ADDefaultDomainPasswordPolicy 
        Get-ADDomain Get-ADDomainController 
        Get-ADDomainControllerPasswordReplicationPolicy 
        Get-ADDomainControllerPasswordReplicationPolicyUsage 
        Get-ADFineGrainedPasswordPolicy Get-ADFineGrainedPasswordPolicySubject 
        Get-ADForest Get-ADGroup Get-ADGroupMember Get-ADObject Get-ADOptionalFeature 
        Get-ADOrganizationalUnit Get-ADPrincipalGroupMembership 
        Get-ADReplicationAttributeMetadata Get-ADReplicationConnection 
        Get-ADReplicationFailure Get-ADReplicationPartnerMetadata 
        Get-ADReplicationQueueOperation Get-ADReplicationSite Get-ADReplicationSiteLink 
        Get-ADReplicationSiteLinkBridge Get-ADReplicationSubnet 
        Get-ADReplicationUpToDatenessVectorTable Get-ADResourceProperty 
        Get-ADResourcePropertyList Get-ADResourcePropertyValueType Get-ADRootDSE 
        Get-ADServiceAccount Get-ADTrust Get-ADUser Get-ADUserResultantPasswordPolicy 
        Get-Alias Get-AppLockerFileInformation Get-AppLockerPolicy 
        Get-AppvClientApplication Get-AppvClientConfiguration 
        Get-AppvClientConnectionGroup Get-AppvClientMode Get-AppvClientPackage 
        Get-AppvPublishingServer Get-AppvStatus Get-AppxDefaultVolume Get-AppxPackage 
        Get-AppxPackageManifest Get-AppxProvisionedPackage Get-AppxVolume 
        Get-AuthenticodeSignature Get-BitsTransfer Get-BpaModel Get-BpaResult 
        Get-Certificate Get-CertificateAutoEnrollmentPolicy 
        Get-CertificateEnrollmentPolicyServer Get-CertificateNotificationTask 
        Get-ChildItem Get-CimAssociatedInstance Get-CimClass Get-CimInstance 
        Get-CimSession Get-CIPolicy Get-CIPolicyIdInfo Get-CIPolicyInfo Get-Clipboard 
        Get-CmsMessage Get-ComputerInfo Get-ComputerRestorePoint Get-Content 
        Get-ControlPanelItem Get-Counter Get-Credential Get-Culture Get-DAPolicyChange 
        Get-Date Get-Event Get-EventLog Get-EventSubscriber Get-ExecutionPolicy 
        Get-FormatData Get-Host Get-HotFix Get-IISAppPool Get-IISCentralCertProvider 
        Get-IISConfigAttributeValue Get-IISConfigCollection 
        Get-IISConfigCollectionElement Get-IISConfigElement Get-IISConfigSection 
        Get-IISServerManager Get-IISSharedConfig Get-IISSite Get-IscsiServerTarget 
        Get-IscsiTargetServerSetting Get-IscsiVirtualDisk Get-IscsiVirtualDiskSnapshot 
        Get-Item Get-ItemProperty Get-ItemPropertyValue Get-JobTrigger 
        Get-KdsConfiguration Get-KdsRootKey Get-LocalGroup Get-LocalGroupMember 
        Get-LocalUser Get-Location Get-Member Get-NfsMappedIdentity Get-NfsNetgroup 
        Get-PfxCertificate Get-PfxData Get-Process Get-PSBreakpoint Get-PSCallStack 
        Get-PSDrive Get-PSProvider Get-Random Get-Runspace Get-RunspaceDebug 
        Get-ScheduledJob Get-ScheduledJobOption Get-SecureBootPolicy Get-SecureBootUEFI 
        Get-Service Get-SystemDriver Get-TimeZone Get-TlsCipherSuite Get-TlsEccCurve 
        Get-Tpm Get-TpmEndorsementKeyInfo Get-TpmSupportedFeature Get-TraceSource 
        Get-Transaction Get-TroubleshootingPack Get-TypeData Get-UevAppxPackage 
        Get-UevConfiguration Get-UevStatus Get-UevTemplate Get-UevTemplateProgram 
        Get-UICulture Get-Unique Get-Variable Get-WebAppDomain Get-WebApplication 
        Get-WebAppPoolState Get-WebBinding Get-WebCentralCertProvider Get-WebConfigFile 
        Get-WebConfiguration Get-WebConfigurationBackup Get-WebConfigurationLocation 
        Get-WebConfigurationLock Get-WebConfigurationProperty Get-WebFilePath 
        Get-WebGlobalModule Get-WebHandler Get-WebItemState Get-WebManagedModule 
        Get-WebRequest Get-Website Get-WebsiteState Get-WebURL Get-WebVirtualDirectory 
        Get-WheaMemoryPolicy Get-WIMBootEntry 
        Get-WinAcceptLanguageFromLanguageListOptOut 
        Get-WinCultureFromLanguageListOptOut Get-WinDefaultInputMethodOverride 
        Get-WindowsCapability Get-WindowsDeveloperLicense Get-WindowsDriver 
        Get-WindowsEdition Get-WindowsErrorReporting Get-WindowsImage 
        Get-WindowsImageContent Get-WindowsOptionalFeature Get-WindowsPackage 
        Get-WindowsSearchSetting Get-WinEvent Get-WinHomeLocation 
        Get-WinLanguageBarOption Get-WinSystemLocale Get-WinUILanguageOverride 
        Get-WinUserLanguageList Get-WmiObject Get-WSManCredSSP Get-WSManInstance 
        Grant-ADAuthenticationPolicySiloAccess Group-Object Import-Alias 
        Import-BinaryMiLog Import-Certificate Import-Clixml Import-Counter Import-Csv 
        Import-IscsiVirtualDisk Import-LocalizedData Import-PfxCertificate 
        Import-PSSession Import-StartLayout Import-TpmOwnerAuth Import-UevConfiguration 
        Initialize-Tpm Install-ADServiceAccount Install-NfsMappingStore Invoke-BpaModel 
        Invoke-CimMethod Invoke-CommandInDesktopPackage Invoke-DscResource 
        Invoke-Expression Invoke-Item Invoke-RestMethod Invoke-TroubleshootingPack 
        Invoke-WebRequest Invoke-WmiMethod Invoke-WSManAction 
        Join-DtcDiagnosticResourceManager Join-Path Limit-EventLog Measure-Command 
        Measure-Object Merge-CIPolicy Mount-AppvClientConnectionGroup 
        Mount-AppvClientPackage Mount-AppxVolume Mount-IscsiVirtualDiskSnapshot 
        Mount-WindowsImage Move-ADDirectoryServer 
        Move-ADDirectoryServerOperationMasterRole Move-ADObject Move-AppxPackage 
        Move-Item Move-ItemProperty New-ADAuthenticationPolicy 
        New-ADAuthenticationPolicySilo New-ADCentralAccessPolicy 
        New-ADCentralAccessRule New-ADClaimTransformPolicy New-ADClaimType 
        New-ADComputer New-ADDCCloneConfigFile New-ADFineGrainedPasswordPolicy 
        New-ADGroup New-ADObject New-ADOrganizationalUnit New-ADReplicationSite 
        New-ADReplicationSiteLink New-ADReplicationSiteLinkBridge 
        New-ADReplicationSubnet New-ADResourceProperty New-ADResourcePropertyList 
        New-ADServiceAccount New-ADUser New-Alias New-AppLockerPolicy 
        New-CertificateNotificationTask New-CimInstance New-CimSession 
        New-CimSessionOption New-CIPolicy New-CIPolicyRule New-DtcDiagnosticTransaction 
        New-Event New-EventLog New-FileCatalog New-IISConfigCollectionElement 
        New-IISSite New-IscsiServerTarget New-IscsiVirtualDisk New-Item 
        New-ItemProperty New-JobTrigger New-LocalGroup New-LocalUser 
        New-NetIPsecAuthProposal New-NetIPsecMainModeCryptoProposal 
        New-NetIPsecQuickModeCryptoProposal New-NfsMappedIdentity New-NfsNetgroup 
        New-Object New-PSDrive New-PSWorkflowExecutionOption New-ScheduledJobOption 
        New-SelfSignedCertificate New-Service New-TimeSpan New-TlsSessionTicketKey 
        New-Variable New-WebApplication New-WebAppPool New-WebBinding New-WebFtpSite 
        New-WebGlobalModule New-WebHandler New-WebManagedModule New-WebServiceProxy 
        New-Website New-WebVirtualDirectory New-WindowsCustomImage New-WindowsImage 
        New-WinEvent New-WinUserLanguageList New-WSManInstance New-WSManSessionOption 
        Optimize-WindowsImage Out-File Out-GridView Out-Printer Out-String Pop-Location 
        Protect-CmsMessage Publish-AppvClientPackage Publish-DscConfiguration 
        Push-Location Read-Host Receive-DtcDiagnosticTransaction 
        Register-CimIndicationEvent Register-EngineEvent Register-ObjectEvent 
        Register-ScheduledJob Register-UevTemplate Register-WmiEvent 
        Remove-ADAuthenticationPolicy Remove-ADAuthenticationPolicySilo 
        Remove-ADCentralAccessPolicy Remove-ADCentralAccessPolicyMember 
        Remove-ADCentralAccessRule Remove-ADClaimTransformPolicy Remove-ADClaimType 
        Remove-ADComputer Remove-ADComputerServiceAccount 
        Remove-ADDomainControllerPasswordReplicationPolicy 
        Remove-ADFineGrainedPasswordPolicy Remove-ADFineGrainedPasswordPolicySubject 
        Remove-ADGroup Remove-ADGroupMember Remove-ADObject Remove-ADOrganizationalUnit 
        Remove-ADPrincipalGroupMembership Remove-ADReplicationSite 
        Remove-ADReplicationSiteLink Remove-ADReplicationSiteLinkBridge 
        Remove-ADReplicationSubnet Remove-ADResourceProperty 
        Remove-ADResourcePropertyList Remove-ADResourcePropertyListMember 
        Remove-ADServiceAccount Remove-ADUser Remove-AppvClientConnectionGroup 
        Remove-AppvClientPackage Remove-AppvPublishingServer Remove-AppxPackage 
        Remove-AppxProvisionedPackage Remove-AppxVolume Remove-BitsTransfer 
        Remove-CertificateEnrollmentPolicyServer Remove-CertificateNotificationTask 
        Remove-CimInstance Remove-CimSession Remove-CIPolicyRule Remove-Computer 
        Remove-Event Remove-EventLog Remove-IISConfigAttribute 
        Remove-IISConfigCollectionElement Remove-IISConfigElement Remove-IISSite 
        Remove-IscsiServerTarget Remove-IscsiVirtualDisk 
        Remove-IscsiVirtualDiskSnapshot Remove-IscsiVirtualDiskTargetMapping 
        Remove-Item Remove-ItemProperty Remove-JobTrigger Remove-LocalGroup 
        Remove-LocalGroupMember Remove-LocalUser Remove-NfsMappedIdentity 
        Remove-NfsNetgroup Remove-PSBreakpoint Remove-PSDrive Remove-TypeData 
        Remove-Variable Remove-WebApplication Remove-WebAppPool Remove-WebBinding 
        Remove-WebConfigurationBackup Remove-WebConfigurationLocation 
        Remove-WebConfigurationLock Remove-WebConfigurationProperty 
        Remove-WebGlobalModule Remove-WebHandler Remove-WebManagedModule Remove-Website 
        Remove-WebVirtualDirectory Remove-WindowsCapability Remove-WindowsDriver 
        Remove-WindowsImage Remove-WindowsPackage Remove-WmiObject Remove-WSManInstance 
        Rename-ADObject Rename-Computer Rename-Item Rename-ItemProperty 
        Rename-LocalGroup Rename-LocalUser Rename-WebConfigurationLocation 
        Repair-AppvClientConnectionGroup Repair-AppvClientPackage 
        Repair-UevTemplateIndex Repair-WindowsImage Reset-ADServiceAccountPassword 
        Reset-ComputerMachinePassword Reset-IISServerManager Resize-IscsiVirtualDisk 
        Resolve-DnsName Resolve-Path Restart-Computer Restart-Service 
        Restart-WebAppPool Restart-WebItem Restore-ADObject Restore-AuditPolicy 
        Restore-Computer Restore-IscsiVirtualDisk Restore-SecurityPolicy 
        Restore-UevBackup Restore-UevUserSetting Restore-WebConfiguration 
        Resume-BitsTransfer Resume-Service Revoke-ADAuthenticationPolicySiloAccess 
        Save-WindowsImage Search-ADAccount Select-Object Select-String 
        Select-WebConfiguration Select-Xml Send-AppvClientReport 
        Send-DtcDiagnosticTransaction Send-MailMessage Set-Acl 
        Set-ADAccountAuthenticationPolicySilo Set-ADAccountControl 
        Set-ADAccountExpiration Set-ADAccountPassword Set-ADAuthenticationPolicy 
        Set-ADAuthenticationPolicySilo Set-ADCentralAccessPolicy 
        Set-ADCentralAccessRule Set-ADClaimTransformLink Set-ADClaimTransformPolicy 
        Set-ADClaimType Set-ADComputer Set-ADDefaultDomainPasswordPolicy Set-ADDomain 
        Set-ADDomainMode Set-ADFineGrainedPasswordPolicy Set-ADForest Set-ADForestMode 
        Set-ADGroup Set-ADObject Set-ADOrganizationalUnit Set-ADReplicationConnection 
        Set-ADReplicationSite Set-ADReplicationSiteLink Set-ADReplicationSiteLinkBridge 
        Set-ADReplicationSubnet Set-ADResourceProperty Set-ADResourcePropertyList 
        Set-ADServiceAccount Set-ADUser Set-Alias Set-AppBackgroundTaskResourcePolicy 
        Set-AppLockerPolicy Set-AppvClientConfiguration Set-AppvClientMode 
        Set-AppvClientPackage Set-AppvPublishingServer Set-AppxDefaultVolume 
        Set-AppXProvisionedDataFile Set-AuthenticodeSignature Set-BitsTransfer 
        Set-BpaResult Set-CertificateAutoEnrollmentPolicy Set-CimInstance 
        Set-CIPolicyIdInfo Set-CIPolicySetting Set-CIPolicyVersion Set-Clipboard 
        Set-Content Set-Culture Set-Date Set-DscLocalConfigurationManager 
        Set-ExecutionPolicy Set-HVCIOptions Set-IISCentralCertProvider 
        Set-IISCentralCertProviderCredential Set-IISConfigAttributeValue 
        Set-IscsiServerTarget Set-IscsiTargetServerSetting Set-IscsiVirtualDisk 
        Set-IscsiVirtualDiskSnapshot Set-Item Set-ItemProperty Set-JobTrigger 
        Set-KdsConfiguration Set-LocalGroup Set-LocalUser Set-Location 
        Set-NfsMappedIdentity Set-NfsNetgroup Set-PSBreakpoint Set-RuleOption 
        Set-ScheduledJob Set-ScheduledJobOption Set-SecureBootUEFI Set-Service 
        Set-TimeZone Set-TpmOwnerAuth Set-TraceSource Set-UevConfiguration 
        Set-UevTemplateProfile Set-Variable Set-WebBinding Set-WebCentralCertProvider 
        Set-WebCentralCertProviderCredential Set-WebConfiguration 
        Set-WebConfigurationProperty Set-WebGlobalModule Set-WebHandler 
        Set-WebManagedModule Set-WheaMemoryPolicy 
        Set-WinAcceptLanguageFromLanguageListOptOut 
        Set-WinCultureFromLanguageListOptOut Set-WinDefaultInputMethodOverride 
        Set-WindowsEdition Set-WindowsProductKey Set-WindowsSearchSetting 
        Set-WinHomeLocation Set-WinLanguageBarOption Set-WinSystemLocale 
        Set-WinUILanguageOverride Set-WinUserLanguageList Set-WmiInstance 
        Set-WSManInstance Set-WSManQuickConfig Show-ADAuthenticationPolicyExpression 
        Show-Command Show-ControlPanelItem Show-EventLog 
        Show-WindowsDeveloperLicenseRegistration Sort-Object Split-Path 
        Split-WindowsImage Start-BitsTransfer Start-DscConfiguration 
        Start-DtcDiagnosticResourceManager Start-IISCommitDelay Start-IISSite 
        Start-Process Start-Service Start-Sleep Start-Transaction Start-Transcript 
        Start-WebAppPool Start-WebCommitDelay Start-WebItem Start-Website 
        Stop-AppvClientConnectionGroup Stop-AppvClientPackage Stop-Computer 
        Stop-DtcDiagnosticResourceManager Stop-IISCommitDelay Stop-IISSite 
        Stop-IscsiVirtualDiskOperation Stop-Process Stop-Service Stop-Transcript 
        Stop-WebAppPool Stop-WebCommitDelay Stop-WebItem Stop-Website 
        Suspend-BitsTransfer Suspend-Service Switch-Certificate Sync-ADObject 
        Sync-AppvPublishingServer Tee-Object Test-ADServiceAccount Test-AppLockerPolicy 
        Test-Certificate Test-ComputerSecureChannel Test-Connection 
        Test-DscConfiguration Test-FileCatalog Test-KdsRootKey Test-NfsMappedIdentity 
        Test-Path Test-UevTemplate Test-WSMan Trace-Command Unblock-File Unblock-Tpm 
        Undo-DtcDiagnosticTransaction Undo-Transaction Uninstall-ADServiceAccount 
        Unlock-ADAccount Unprotect-CmsMessage Unpublish-AppvClientPackage 
        Unregister-Event Unregister-ScheduledJob Unregister-UevTemplate 
        Unregister-WindowsDeveloperLicense Update-FormatData Update-List 
        Update-TypeData Update-UevTemplate Update-WIMBootEntry Use-Transaction 
        Use-WindowsUnattend Wait-Debugger Wait-Event Wait-Process Write-Debug 
        Write-Error Write-EventLog Write-Host Write-Information Write-Output 
        Write-Progress Write-Verbose Write-Warning \% \? ac asnp cat cd chdir clc clear 
        clhy cli clp cls clv cnsn compare copy cp cpi cpp curl cvpa dbp del diff dir 
        dnsn ebp echo epal epcsv epsn erase etsn exsn fc fl foreach ft fw gal gbp gc 
        gci gcm gcs gdr ghy gi gjb gl gm gmo gp gps gpv group gsn gsnp gsv gu gv gwmi h 
        history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi iwr kill lp ls man md 
        measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh popd ps pushd 
        pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp rujb rv 
        rvpa rwmi sajb sal saps sasv sbp sc select set shcm si sl sleep sls sort sp 
        spjb spps spsv start sujb sv swmi tee trcm type wget where wjb write
      ).join('|')

      # Override from Shell
      state :interp do
        rule /`$/, Str::Escape # line continuation
        rule /`./, Str::Escape
        rule /\$\(\(/, Keyword, :math
        rule /\$\(/, Keyword, :paren
        rule /\${#?/, Keyword, :curly
        rule /\$#?(\w+|.)/, Name::Variable
      end

      # Override from Shell
      state :double_quotes do
        # NB: "abc$" is literally the string abc$.
        # Here we prevent :interp from interpreting $" as a variable.
        rule /(?:\$#?)?"/, Str::Double, :pop!
        mixin :interp
        rule /[^"`$]+/, Str::Double
      end

      # Override from Shell
      state :data do
        rule /\s+/, Text
        rule /\$?"/, Str::Double, :double_quotes
        rule /\$'/, Str::Single, :ansi_string

        rule /'/, Str::Single, :single_quotes

        rule /\*/, Keyword

        rule /;/, Text
        rule /[^=\*\s{}()$"'`<]+/, Text
        rule /\d+(?= |\Z)/, Num
        rule /</, Text
        mixin :interp
      end

      prepend :basic do
        rule %r(<#[\s,\S]*?#>)m, Comment::Multiline
        rule /#.*$/, Comment::Single
        rule /\b(#{OPERATORS})\s*\b/i, Operator
        rule /\b(#{ATTRIBUTES})\s*\b/i, Name::Attribute
        rule /\b(#{KEYWORDS})\s*\b/i, Keyword
        rule /\b(#{KEYWORDS_TYPE})\s*\b/i, Keyword::Type
        rule /\bcase\b/, Keyword, :case
        rule /\b(#{BUILTINS})\s*\b(?!\.)/i, Name::Builtin
      end
    end
  end
end
