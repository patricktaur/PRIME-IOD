import { UserRoles } from '@app/core/authentication/credentials.enums';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IMIResourcesDataService {
  constructor() {}

  fteAllocationValues: any = [
    { value: '0.0', id: 0.0 },
    { value: '0.05', id: 0.05 },
    { value: '0.10', id: 0.1 },
    { value: '0.15', id: 0.15 },
    { value: '0.2', id: 0.2 },
    { value: '0.25', id: 0.25 },
    { value: '0.3', id: 0.3 },
    { value: '0.35', id: 0.35 },
    { value: '0.4', id: 0.4 },
    { value: '0.45', id: 0.45 },
    { value: '0.5', id: 0.5 },
    { value: '0.55', id: 0.55 },
    { value: '0.6', id: 0.6 },
    { value: '0.65', id: 0.65 },
    { value: '0.7', id: '0.7' },
    { value: '0.75', id: 0.75 },
    { value: '0.8', id: 0.8 },
    { value: '0.85', id: 0.85 },
    { value: '0.9', id: 0.9 },
    { value: '0.95', id: 0.95 },
    { value: '1', id: 1 }
  ];

  resourceRoles = [
    { recId: UserRoles.IMI_PD_PM, description: 'IMI PD' },
    { recId: UserRoles.IMI_TPM, description: 'IMI TPM' },
    { recId: UserRoles.IMI_PM, description: 'IMI PM' },
    { recId: UserRoles.IMI_CDPL, description: 'IMI CDPL' },
    { recId: UserRoles.IMI_CDP, description: 'IMI CDP' },
    { recId: UserRoles.CDMS_Lead, description: 'CDMS Lead' }
  ];
}

/*
Source:
C:\Development\p816-prism-v2\Site\UserControls\Study_Resources_Edit.ascx
Private Sub FillRoleDropdown()
With ddlFilterRole
            .Items.Clear()
            .Items.Add(New ListItem("-All-", "-1"))
            .Items.Add(New ListItem("DM Director", clsCommon.PrmUserRolesPID.DMPM_Manager))
            .Items.Add(New ListItem("DM Oversight", clsCommon.PrmUserRolesPID.DMPM_OverSight))
            .Items.Add(New ListItem("DMPM", clsCommon.PrmRoles.DMPM))
            .Items.Add(New ListItem("DMPM Support", clsCommon.PrmUserRolesPID.DMPM_Support))
            .Items.Add(New ListItem("CDL", clsCommon.PrmRoles.CDL))
            '.Items.Add(New ListItem("CDL Support", clsCommon.PrmUserRolesPID.CDL_Support))
            .Items.Add(New ListItem("CDMS Lead", clsCommon.PrmRoles.CDMS_Lead))
            .Items.Add(New ListItem("CPDL ClinicalProgramming  ", clsCommon.PrmRoles.CDPL_ClinicalProgramming))
            .Items.Add(New ListItem("CPDL SDTM Programming  ", clsCommon.PrmRoles.CDPL_SDTMProgramming))
            '.Items.Add(New ListItem("CDS Listing Lead", clsCommon.PrmRoles.CDPL))
            '.Items.Add(New ListItem("CDS SDTM Lead", clsCommon.PrmRoles.CDS_SDTM_Lead))
            .Items.Add(New ListItem("CDC", clsCommon.PrmRoles.CDC))
            .Items.Add(New ListItem("Coding Specialist", clsCommon.PrmUserRolesPID.Coding_Specialist))
            .Items.Add(New ListItem("Coding Manager", clsCommon.PrmUserRolesPID.Coding_Manager))
            .Items.Add(New ListItem("Set Up CDL", clsCommon.PrmUserRolesPID.Set_Up_CDL))
            .Items.Add(New ListItem("Unblinded DMPM", clsCommon.PrmUserRolesPID.Unblinded_DMPM))
            .Items.Add(New ListItem("Unblinded CDL", clsCommon.PrmUserRolesPID.Unblinded_CDL))
            .Items.Add(New ListItem("Unblinded Clinical Programming", clsCommon.PrmUserRolesPID.Unblinded_Clinical_Programmer))
            .Items.Add(New ListItem("Second Unblinded Clinical Programming", clsCommon.PrmUserRolesPID.Second_Unblinded_Clinical_Programmer))
        End With


        Assignment type: hardcoded in V1:

        With ddlEditFTEAllocation
            .Items.Clear()
            .Items.Add(New ListItem("-Select-", "-1"))
            .Items.Add(New ListItem("0.0", 0.0))
            .Items.Add(New ListItem("0.05", 0.05))
            .Items.Add(New ListItem("0.10", 0.1))
            .Items.Add(New ListItem("0.15", 0.15))
            .Items.Add(New ListItem("0.2", 0.2))
            .Items.Add(New ListItem("0.25", 0.25))
            .Items.Add(New ListItem("0.3", 0.3))
            .Items.Add(New ListItem("0.35", 0.35))
            .Items.Add(New ListItem("0.4", 0.4))
            .Items.Add(New ListItem("0.45", 0.45))
            .Items.Add(New ListItem("0.5", 0.5))
            .Items.Add(New ListItem("0.55", 0.55))
            .Items.Add(New ListItem("0.6", 0.6))
            .Items.Add(New ListItem("0.65", 0.65))
            .Items.Add(New ListItem("0.7", 0.7))
            .Items.Add(New ListItem("0.75", 0.75))
            .Items.Add(New ListItem("0.8", 0.8))
            .Items.Add(New ListItem("0.85", 0.85))
            .Items.Add(New ListItem("0.9", 0.9))
            .Items.Add(New ListItem("0.95", 0.95))
            .Items.Add(New ListItem("1", 1))
*/
