export enum UserRoles {
  DMPM = 201,
  CDL = 202,
  CDMS_Lead = 203,
  CDPL = 204, // previous : CDS_Listing_Lead = 204
  CDS_SDTM_Lead = 205,
  CDC = 206,

  Viewers = 207,

  CDS_Programmer = 208,

  Operations_Lead = 209,

  CDPL_ClinicalProgramming = 210,
  CDPL_SDTMProgramming = 211,

  Admin = 1801,
  Sub_Admin = 1802,
  DMPM_Manager = 1803, //DMPM-Dir
  CDMS_Manager = 1804,
  QR = 1805,
  LL = 1806,
  CDS_Manager = 1807,

  Viewrs = 1808, //Found in Prism

  DMPM_Support = 1809,

  Coding_Specialist = 1810,

  CDL_Support = 1811,
  Clarity_Team = 1812,

  IMI_TPM = 1813,

  IMI_PM = 1814,
  IMI_CDPL = 1815,

  IMI_CDP = 1816,
  CDS_Validation = 1817,

  Coding_Manager = 1818,

  CDMS_Programmer = 1819,

  DMPM_OverSight = 1820,
  // DM_Oversight = 1820,
  IMI_PD_PM = 1821, //also known as IMI-PD

  IMI_R_and_A_Programmer = 1822,

  Analytics_Development_Lead = 1823,
  Set_Up_CDL = 1824,
  Unblinded_DMPM = 1825,
  Unblinded_CDL = 1826,
  Unblinded_Clinical_Programmer = 1827,
  Second_Unblinded_Clinical_Programmer = 1828,
  Report_Request = 1829,
  //Not added to db tblParam:
  CRM_Central_Monitor = 1830,
  CRM_Clinical_Data_Analyst = 1831,
  CRM_Clinical_Data_Analyst_Sr = 1832,
  CRM_Clinical_Risk_Manager = 1833,
  CRM_Clinical_Risk_Manager_Sr = 1834,
  CRM_Director_Sr = 1835,
  Maintenance_Programmer = 1836,
  Maintenance_Programmer_Backup = 1837,
  External_Vendor_Lead_Primary = 1838, //PR # 1410 - 26Jan 2023 - PDMPM and  CDLs
  External_Vendor_Lead_Backup = 1839, //PR # 1410 - 26Jan 2023 - PDMPM and  CDLs
  eDMA=1843
}
