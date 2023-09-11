import React, { useRef } from 'react';
import XMLParser from 'react-xml-parser'
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import { rupiah, splitThousand } from '../utils/functions';

const Monitoring = () => {
  const xmlData = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <MGResponse xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
          <MessageResponse GroupId="55657" Id="767676" TimeStamp="2018-11-26T20:42:47.662197+07:00" Idempotence="unique" ExpirationTimeStamp="2023-09-15T01:15:47.158389Z" ResultLanguage="en-US" ResultCode="S" ResultDescription="Success.">
              <CredentialsResponse Domain="" Id="LYGO4770" Password="********" ResultLanguage="en-US" ResultCode="S" ResultDescription="Success."/>
          </MessageResponse>
          <ProductResponse ServiceId="CBG" Id="CB_ME_Product" Version="CB_ME_Product.2023-08-24.001" ResultLanguage="en-US" ResultCode="S" ResultDescription="Success.">
              <cb:CB_ME_ProductOutput xmlns:cb="urn:crif-creditbureau:v1">
                  <cb:MessageId CBSMessageId="767676"/>
                  <cb:EnquiredData>
                      <cb:Subject>
                          <cb:Individual Gender="P" GenderDesc="Female" MarriageStatus="2" MarriageStatusDesc="SINGLE">
                              <cb:IndividualName NameAsId="ROSA UTARI"/>
                              <cb:BirthData Date="1995-08-15" Place="BANDUNG"/>
                              <cb:Address>
                                  <cb:Address Address="JL KYAI HAJI BASRI"/></cb:Address>
                              <cb:IdentificationCode>
                                  <cb:IdentificationCode IdentityType="1" IdentityNumber="3179895738878787"/>
                                  <cb:IdentificationCodeDesc IdentityTypeDesc="ID CARD"/>
                              </cb:IdentificationCode>
                              <cb:ID/>
                              <cb:Contact CellphoneNumber="0898553289"/>
                          </cb:Individual>
                      </cb:Subject>
                  </cb:EnquiredData>
                  <cb:CreditReport>
                      <cb:MatchedSubject ReferenceNo="1" CBSubjectCode="H02381468" FlagMatched="1">
                          <cb:Individual Resident="S14" ResidentDesc="Yes" Gender="P" GenderDesc="Female" MarriageStatus="2" MarriageStatusDesc="SINGLE" EducationalStatusCode="04" EducationalStatusCodeDesc="Bachelor Degree" LastUpdateDate="2023-04-18">
                              <cb:IndividualName NameAsId="ROSA UTARI" MothersName="NOVI"/>
                              <cb:BirthData Date="1995-08-15" Place="SEMARANG"/>
                              <cb:AddressHistory FlagCurrent="1" LastUpdateDate="2023-04-18">
                                  <cb:Address Address="JL KYAI HAJI BASRI" SubDistrict="GAMBIR" District="GAMBIR" City="0391" PostalCode="19580" Country="ID"/>
                                  <cb:AddressDesc CityDesc="Wil. Kota Jakarta Pusat" CountryDesc="INDONESIA"/>
                              </cb:AddressHistory>
                              <cb:AddressHistory FlagCurrent="0" LastUpdateDate="2022-05-01">
                                  <cb:Address Address="JL KEBANGSAAN NO 01 PADANG" SubDistrict="KOTO BARU" District="KOTO TUO" City="0394" PostalCode="19780" Country="ID"/>
                                  <cb:AddressDesc CityDesc="Wil. Kota Jakarta Selatan" CountryDesc="INDONESIA"/>
                              </cb:AddressHistory>
                              <cb:AddressHistory FlagCurrent="0" LastUpdateDate="2019-11-22">
                                  <cb:Address Address="JL KYAI HAJI BASRI" SubDistrict="GAMBIR" District="GAMBIR" City="0198" PostalCode="19580" Country="ID"/>
                                  <cb:AddressDesc CityDesc="Kota Bekasi" CountryDesc="INDONESIA"/>
                              </cb:AddressHistory>
                              <cb:AddressHistory FlagCurrent="0" LastUpdateDate="2019-11-22">
                                  <cb:Address Address="1" SubDistrict="1" District="1" City="0103" PostalCode="1" Country="ID"/>
                                  <cb:AddressDesc CityDesc="Kab. Purwakarta" CountryDesc="INDONESIA"/>
                              </cb:AddressHistory>
                              <cb:IdentificationCode LastUpdateDate="2023-04-18">
                                  <cb:IdentificationCode IdentityType="1" IdentityNumber="3179895738878787"/>
                                  <cb:IdentificationCodeDesc IdentityTypeDesc="ID CARD"/>
                              </cb:IdentificationCode>
                              <cb:ID/>
                              <cb:ContactHistory FlagCurrent="1" LastUpdateDate="2023-04-18">
                                  <cb:Contacts PhoneNumber="89853289" CellphoneNumber="89853289" EmailAddress="ROSAUTARI@GMAIL.COM"/>
                              </cb:ContactHistory>
                              <cb:ContactHistory FlagCurrent="0" LastUpdateDate="2023-04-17">
                                  <cb:Contacts PhoneNumber="089853289" CellphoneNumber="089853289" EmailAddress="PUTRI@YMAIL.COM"/>
                              </cb:ContactHistory>
                              <cb:ContactHistory FlagCurrent="0" LastUpdateDate="2022-05-01">
                                  <cb:Contacts CellphoneNumber="0878787881"/>
                              </cb:ContactHistory>
                              <cb:ContactHistory FlagCurrent="0" LastUpdateDate="2019-11-22">
                                  <cb:Contacts CellphoneNumber="0898553289"/>
                              </cb:ContactHistory>
                              <cb:ContactHistory FlagCurrent="0" LastUpdateDate="2019-11-22">
                                  <cb:Contacts CellphoneNumber="088809887772"/>
                              </cb:ContactHistory>
                              <cb:EmploymentDataHistory FlagCurrent="1" LastUpdateDate="2022-08-31">
                                  <cb:EmploymentData OccupationCode="009" Workplace="JAKARTA" EmployerSector="P00000" WorkplaceAddress="JL. SETIABUDI"/>
                                  <cb:EmploymentDataDesc OccupationDesc="Teachers/Lecturers" EmployerSectorDesc="EDUCATION"/>
                              </cb:EmploymentDataHistory>
                              <cb:EmploymentDataHistory FlagCurrent="0" LastUpdateDate="2019-11-22">
                                  <cb:EmploymentData Workplace="OLIHALUS JAKARTA" WorkplaceAddress="MEGA KUNINGAN JAKARTA"/>
                                  <cb:EmploymentDataDesc/>
                              </cb:EmploymentDataHistory>
                          </cb:Individual>
                      </cb:MatchedSubject>
                      <cb:ContractsHistory>
                          <cb:AggregatedData ContractsNumber="28" ReportingProvidersNumber="10" TotalCreditLimit="870000000" TotalPotentialExposure="1515300006" TotalDebitBalance="745000000" TotalOverdue="3500000" Currency="IDR" CurrencyDesc="Indonesian Rupiah"/>
                          <cb:Credit>
                              <cb:NumbersSummary Requested="24" Active="2" Refused="2" Renounced="0" Closed="0"/>
                              <cb:AmountsSummary ContractsCounter="2" CreditLimit="870000000" DebitBalance="745000000" Overdue="3500000"/>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="904206513" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="261210" ProviderCodeDesc="PT Capella Multidana" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-09-05" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/>
                                  <cb:LinkedSubject CBSubjectCode="R02378802" Name="HUGO TANIADY" Role="B" RoleDesc="Borrower"/>
                              </cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="Q04209108" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251670" ProviderCodeDesc="PT Akulaku Finance Indonesia" ContractRequestDate="2020-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-08-24" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="D04209483" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="1001" ProviderTypeCodeDesc="General Business Company" ProviderCode="10099" ProviderCodeDesc="Test UAT 2023 NonFI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-08-24" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="A04208285" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251670" ProviderCodeDesc="PT Akulaku Finance Indonesia" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-08-24" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="004205953" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251670" ProviderCodeDesc="PT Akulaku Finance Indonesia" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-08-24" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="F04209298" ContractType="P03" ContractTypeDesc="Credit to MSMEs through other executing agencies" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="1002" ProviderTypeCodeDesc="Non Financial Institution - E Commerce" ProviderCode="100216" ProviderCodeDesc="PT MULTIDAYA TEKNOLOGI NUSANTARA (EFISHERY)" ContractRequestDate="2023-04-18" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-04-18" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="T04210144" ContractType="N99" ContractTypeDesc="Others" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="1002" ProviderTypeCodeDesc="Non Financial Institution - E Commerce" ProviderCode="100216" ProviderCodeDesc="PT MULTIDAYA TEKNOLOGI NUSANTARA (EFISHERY)" ContractRequestDate="2023-04-17" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-04-17" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="50000000"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="904205932" ContractType="P03" ContractTypeDesc="Credit to MSMEs through other executing agencies" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="1002" ProviderTypeCodeDesc="Non Financial Institution - E Commerce" ProviderCode="100216" ProviderCodeDesc="PT MULTIDAYA TEKNOLOGI NUSANTARA (EFISHERY)" ContractRequestDate="2023-04-17" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-04-17" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="500000000"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="604208573" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="1001" ProviderTypeCodeDesc="General Business Company" ProviderCode="100169" ProviderCodeDesc="PT Charged Tech Indonesia" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-04-13" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="304207741" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-04-11" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="704211220" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-04-11" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="P04207775" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-03-29" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="D04208849" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-03-29" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="F04209242" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-03-29" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="P04207767" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251670" ProviderCodeDesc="PT Akulaku Finance Indonesia" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-03-27" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/>
                                  <cb:LinkedSubject CBSubjectCode="D02381648" Name="ROSA UTARI" Role="B" RoleDesc="Borrower"/>
                                  <cb:LinkedSubject CBSubjectCode="T02380561" Name="ROSA UTARI" Role="B" RoleDesc="Borrower"/>
                                  <cb:LinkedSubject CBSubjectCode="102381117" Name="ROSA UTARI" Role="B" RoleDesc="Borrower"/>
                                  <cb:LinkedSubject CBSubjectCode="Q02376102" Name="AGUNG INDRA MAULANA" Role="B" RoleDesc="Borrower"/>
                                  <cb:LinkedSubject CBSubjectCode="N02378389" Name="ROSA UTARI" Role="B" RoleDesc="Borrower"/>
                              </cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="504205547" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="1001" ProviderTypeCodeDesc="General Business Company" ProviderCode="100169" ProviderCodeDesc="PT Charged Tech Indonesia" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-03-08" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="J04208129" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-02-27" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="004205200" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="1001" ProviderTypeCodeDesc="General Business Company" ProviderCode="10099" ProviderCodeDesc="Test UAT 2023 NonFI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-02-17" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="704211038" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RF" ContractPhaseDesc="Refused" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-02-14" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="504205466" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RF" ContractPhaseDesc="Refused" Role="B" RoleDesc="Borrower" ProviderTypeCode="1001" ProviderTypeCodeDesc="General Business Company" ProviderCode="10099" ProviderCodeDesc="Test UAT 2023 NonFI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-02-14" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="B04206159" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-02-14" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="304207551" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-02-14" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="I04206962" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="99999" ProviderCodeDesc="Test UAT 2023 FI" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2023-02-14" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="504205334" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="002" ProviderCodeDesc="PT Bank Rakyat Indonesia (Persero) Tbk" ContractRequestDate="2022-05-04" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2022-12-21" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="150003"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="O04206818" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0909" ProviderTypeCodeDesc="Non Financial Services Institution" ProviderCode="9999" ProviderCodeDesc="NORA PROVIDER" ContractRequestDate="2022-05-04" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2022-12-21" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="150003"/></cb:NotGrantedCredit>
                              <cb:NotGrantedCredit>
                                  <cb:NotGrantedContract CBContractCode="L04209283" ContractType="P05" ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested" Role="B" RoleDesc="Borrower" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="008" ProviderCodeDesc="PT Bank Mandiri (Persero) Tbk" ContractRequestDate="2020-10-10" DueDate="2023-10-10" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah" LastUpdateDate="2022-11-27" ReferenceNo="1"/>
                                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24" OriginalAgreementDate="2020-10-29"/></cb:NotGrantedCredit>
                              <cb:GrantedCredit>
                                  <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                  <cb:CommonData ReferenceNo="1" CBContractCode="P04207213" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="041" ProviderCodeDesc="HSBC" ReferenceDate="2022-07-31" ContractPhase="AC" ContractPhaseDesc="Active" Role="B" RoleDesc="Borrower" ContractTypeCode="P01" ContractTypeCodeDesc="Loans for joint financing (Syndication)" StartDate="2020-08-01" DueDate="2025-12-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="2" PastDueStausDesc="In Special Attention (DPD 1-89)" ContractStatusCode="00" ContractStatusDesc="Active Facilities" ContractStatusDate="2022-07-01"/>
                                  <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" OriginalAgreementNumber="2787878799" OriginalAgreementDate="2020-08-01" FinalAgreementNumber="287878787598" FinalAgreementDate="2023-05-30" FrequencyOfCredit="0" StartDateOfCredit="2020-01-01" DebtorCategoryCode="UT" DebtorCategoryCodeDesc="Debtor SMEs - Medium" UsageTypeCode="1" UsageTypeCodeDesc="Working capital" UsageOrientationCode="1" UsageOrientationCodeDesc="Export" EconomicSectorCode="P00000" EconomicSectorCodeDesc="EDUCATION" CityCode="0394" CityCodeDesc="Wil. Kota Jakarta Selatan" ProjectValue="750000000" InterestRate="20" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="750000000" CreditLimit="750000000" CurrentMonthRealization="0" Penalty="0" DebitBalance="650000000" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="1500000" DaysPastDue="67" OverduePaymentsNumber="3" FrequencyOfRestructuring="0" BadCreditDate="2022-07-31" BadCreditCauseCode="99" BadCreditCauseDesc="Others"/>
                                  <cb:Maximum MaxOverduePaymentsAmount="2500000" MaxOverduePaymentsNumber="5" MaxOverduePaymentsNumberDate="2021-01-31" MaxDaysPastDue="149" MaxDaysPastDueDate="2021-01-31" WorstStatusCode="4" WorstStatusDesc="Doubtful (DPD 120-179)" WorstStatusDate="2021-01-31"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="7" DaysPastDue="67" Overdue="1500000" OverduePaymentsNumber="3" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="650000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="6" DaysPastDue="36" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="650000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="5" DaysPastDue="96" Overdue="500000" OverduePaymentsNumber="4" QualityCode="3" QualityCodeDesc="Substandard (Not Current)(DPD 90-119)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="670000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="65" Overdue="1500000" OverduePaymentsNumber="3" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="670000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="35" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="670000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="2" DaysPastDue="4" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="670000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="98" Overdue="2000000" OverduePaymentsNumber="4" QualityCode="3" QualityCodeDesc="Substandard (Not Current)(DPD 90-119)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="695000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="67" Overdue="1500000" OverduePaymentsNumber="3" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="695000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="11" DaysPastDue="36" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="695000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="10" DaysPastDue="6" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="695000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="695000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="8" DaysPastDue="37" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="700000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="7" DaysPastDue="6" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="700000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="6" DaysPastDue="65" Overdue="1500000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="715000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="5" DaysPastDue="36" Overdue="1000000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="715000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="4" DaysPastDue="5" Overdue="500000" OverduePaymentsNumber="0" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="715000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="715000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="2" DaysPastDue="6" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="720000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="1" DaysPastDue="149" Overdue="2500000" OverduePaymentsNumber="5" QualityCode="4" QualityCodeDesc="Doubtful (DPD 120-179)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="745000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="12" DaysPastDue="96" Overdue="2000000" OverduePaymentsNumber="4" QualityCode="3" QualityCodeDesc="Substandard (Not Current)(DPD 90-119)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="745000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="11" DaysPastDue="66" Overdue="1500000" OverduePaymentsNumber="3" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="745000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="10" DaysPastDue="36" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="745000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="9" DaysPastDue="5" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="745000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="750000000" CurrentMonthRealization="750000000" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:Collaterals>
                                      <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                  </cb:Collaterals>
                                  <cb:Guarantors>
                                      <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                  </cb:Guarantors>
                              </cb:GrantedCredit>
                              <cb:GrantedCredit>
                                  <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                  <cb:CommonData ReferenceNo="1" CBContractCode="N04205749" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="002" ProviderCodeDesc="PT Bank Rakyat Indonesia (Persero) Tbk" ReferenceDate="2022-07-31" ContractPhase="AC" ContractPhaseDesc="Active" Role="B" RoleDesc="Borrower" ContractTypeCode="P01" ContractTypeCodeDesc="Loans for joint financing (Syndication)" StartDate="2020-08-01" DueDate="2023-12-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="3" PastDueStausDesc="Substandard (Not Current)(DPD 90-119)" ContractStatusCode="00" ContractStatusDesc="Active Facilities" ContractStatusDate="2022-07-01"/>
                                  <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" OriginalAgreementNumber="2787878799" OriginalAgreementDate="2020-08-01" FinalAgreementNumber="287878787598" FinalAgreementDate="2023-05-30" FrequencyOfCredit="0" StartDateOfCredit="2020-01-01" DebtorCategoryCode="UT" DebtorCategoryCodeDesc="Debtor SMEs - Medium" UsageTypeCode="1" UsageTypeCodeDesc="Working capital" UsageOrientationCode="1" UsageOrientationCodeDesc="Export" EconomicSectorCode="P00000" EconomicSectorCodeDesc="EDUCATION" CityCode="0394" CityCodeDesc="Wil. Kota Jakarta Selatan" ProjectValue="120000000" InterestRate="20" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="120000000" CreditLimit="120000000" CurrentMonthRealization="0" Penalty="0" DebitBalance="95000000" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="2000000" DaysPastDue="95" OverduePaymentsNumber="4" FrequencyOfRestructuring="0" BadCreditDate="2022-07-01" BadCreditCauseCode="99" BadCreditCauseDesc="Others"/>
                                  <cb:Maximum MaxOverduePaymentsAmount="3000000" MaxOverduePaymentsNumber="6" MaxOverduePaymentsNumberDate="2021-02-28" MaxDaysPastDue="179" MaxDaysPastDueDate="2021-02-28" WorstStatusCode="4" WorstStatusDesc="Doubtful (DPD 120-179)" WorstStatusDate="2022-02-28"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="7" DaysPastDue="95" Overdue="2000000" OverduePaymentsNumber="4" QualityCode="3" QualityCodeDesc="Substandard (Not Current)(DPD 90-119)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="95000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="6" DaysPastDue="79" Overdue="1500000" OverduePaymentsNumber="3" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="95000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="5" DaysPastDue="60" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="95000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="20" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="95000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="95000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="2" DaysPastDue="125" Overdue="3000000" OverduePaymentsNumber="5" QualityCode="4" QualityCodeDesc="Doubtful (DPD 120-179)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="100000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="110" Overdue="2000000" OverduePaymentsNumber="4" QualityCode="3" QualityCodeDesc="Substandard (Not Current)(DPD 90-119)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="105000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="89" Overdue="1500000" OverduePaymentsNumber="3" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="105000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="11" DaysPastDue="60" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="105000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="10" DaysPastDue="31" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="105000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="105000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="8" DaysPastDue="110" Overdue="3000000" OverduePaymentsNumber="4" QualityCode="4" QualityCodeDesc="Doubtful (DPD 120-179)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="110000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="7" DaysPastDue="89" Overdue="2000000" OverduePaymentsNumber="3" QualityCode="3" QualityCodeDesc="Substandard (Not Current)(DPD 90-119)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="110000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="6" DaysPastDue="60" Overdue="1500000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="110000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="5" DaysPastDue="30" Overdue="1000000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="110000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="4" DaysPastDue="0" Overdue="500000" OverduePaymentsNumber="0" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" DebitBalance="110000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="110000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="2" DaysPastDue="179" Overdue="3000000" OverduePaymentsNumber="6" QualityCode="4" QualityCodeDesc="Doubtful (DPD 120-179)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="115000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="1" DaysPastDue="149" Overdue="2500000" OverduePaymentsNumber="5" QualityCode="4" QualityCodeDesc="Doubtful (DPD 120-179)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="115000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="12" DaysPastDue="119" Overdue="2000000" OverduePaymentsNumber="4" QualityCode="3" QualityCodeDesc="Substandard (Not Current)(DPD 90-119)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="115000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="11" DaysPastDue="90" Overdue="1500000" OverduePaymentsNumber="3" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="115000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="10" DaysPastDue="60" Overdue="1000000" OverduePaymentsNumber="2" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="115000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="9" DaysPastDue="30" Overdue="500000" OverduePaymentsNumber="1" QualityCode="2" QualityCodeDesc="In Special Attention (DPD 1-89)" BadCreditCauseCode="99" BadCreditCauseDesc="Others" DebitBalance="115000000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="120000000" CurrentMonthRealization="120000000" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                  <cb:Collaterals>
                                      <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                  </cb:Collaterals>
                                  <cb:Guarantors>
                                      <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                  </cb:Guarantors>
                              </cb:GrantedCredit>
                          </cb:Credit>
                          <cb:Bond>
                              <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0"/>
                              <cb:AmountsSummary ContractsCounter="0" DebitBalance="0" Overdue="0"/>
                          </cb:Bond>
                          <cb:LetterOfCredit>
                              <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0"/>
                              <cb:AmountsSummary ContractsCounter="0" CreditLimit="0" DebitBalance="0"/>
                          </cb:LetterOfCredit>
                          <cb:Guarantee>
                              <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0"/>
                              <cb:AmountsSummary ContractsCounter="0" CreditLimit="0" DebitBalance="0"/>
                          </cb:Guarantee>
                          <cb:OtherFacilities>
                              <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0"/>
                              <cb:AmountsSummary ContractsCounter="0" DebitBalance="0" Overdue="0"/>
                          </cb:OtherFacilities>
                      </cb:ContractsHistory>
                      <cb:FootPrints Count1Month="19" Count3Months="27" Count6Months="40" Count12Months="62">
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-09-06" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-09-06" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-09-05" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-09-05" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-09-05" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-09-05" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-09-05" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_NAE" EnquiryTypeDesc="New Application Enquiry" EnquiryDate="2023-09-05" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-08-28" InstituteCode="251670" InstituteDesc="PT Akulaku Finance Indonesia"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-08-24" InstituteCode="251670" InstituteDesc="PT Akulaku Finance Indonesia"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_NAE" EnquiryTypeDesc="New Application Enquiry" EnquiryDate="2023-08-24" InstituteCode="251670" InstituteDesc="PT Akulaku Finance Indonesia"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_NAE" EnquiryTypeDesc="New Application Enquiry" EnquiryDate="2023-08-24" InstituteCode="251670" InstituteDesc="PT Akulaku Finance Indonesia"/>
                          <cb:FootPrint PurposeCode="22" PurposeCodeDesc="Compliance with laws and regulations" EnquiryTypeCode="CB_NAE" EnquiryTypeDesc="New Application Enquiry" EnquiryDate="2023-08-24" InstituteCode="10099" InstituteDesc="Test UAT 2023 NonFI"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_NAE" EnquiryTypeDesc="New Application Enquiry" EnquiryDate="2023-08-24" InstituteCode="251670" InstituteDesc="PT Akulaku Finance Indonesia"/>
                          <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-08-24" InstituteCode="251670" InstituteDesc="PT Akulaku Finance Indonesia"/>
                      </cb:FootPrints>
                  </cb:CreditReport>
                  <cb:CBScore>
                      <cb:CBSGlocal>
                          <cb:ScoreData ScoreRaw="470" ScoreRange="Di">
                              <cb:ScoreMessage Code="21" Description="High Risk"/>
                          </cb:ScoreData>
                      </cb:CBSGlocal>
                  </cb:CBScore>
              </cb:CB_ME_ProductOutput>
          </ProductResponse>
      </MGResponse>
  </s:Body>
</s:Envelope>`;
const today = moment().format('YYYY-MM-DD');
const parser = new XMLParser().parseFromString(xmlData);
const customerData = {
    cbSubjectCode: parser.getElementsByTagName('cb:MatchedSubject')[0].attributes.CBSubjectCode,
    lastUpdatedDate: parser.getElementsByTagName('cb:Individual')[1].attributes.LastUpdateDate,
    resident: parser.getElementsByTagName('cb:Individual')[1].attributes.ResidentDesc,
    nameAsId: parser.getElementsByTagName('cb:IndividualName')[0].attributes.NameAsId,
    motherName: parser.getElementsByTagName('cb:IndividualName')[1].attributes.MothersName,
    gender: parser.getElementsByTagName('cb:Individual')[0].attributes.GenderDesc,
    dateOfBirth: parser.getElementsByTagName('cb:BirthData')[0].attributes.Date,
    placeOfBirth: parser.getElementsByTagName('cb:BirthData')[0].attributes.Place,
    maritalStatus: parser.getElementsByTagName('cb:Individual')[0].attributes.MarriageStatusDesc,
    educationalStatus: parser.getElementsByTagName('cb:Individual')[1].attributes.EducationalStatusCodeDesc,
}

const occupationData = {
    occupation: parser.getElementsByTagName('cb:EmploymentDataDesc')[0].attributes.OccupationDesc,
    workplace: parser.getElementsByTagName('cb:EmploymentData')[1].attributes.Workplace,
    employeeSector: parser.getElementsByTagName('cb:EmploymentDataDesc')[0].attributes.EmployerSectorDesc,
    workplaceAddress: parser.getElementsByTagName('cb:EmploymentData')[1].attributes.WorkplaceAddress,
    lastUpdatedDate: parser.getElementsByTagName('cb:EmploymentDataHistory')[0].attributes.LastUpdateDate
}

const scoreData = {
    scoreRaw: parser.getElementsByTagName('cb:ScoreData')[0].attributes.ScoreRaw,
    scoreRange: parser.getElementsByTagName('cb:ScoreData')[0].attributes.ScoreRange.charAt(0)
}

const keyvalueData = {
    contractNumber: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.ContractsNumber,
    reportingNumber: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.ReportingProvidersNumber,
    totalCreditLimit: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalCreditLimit,
    totalPotentialExposure: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalPotentialExposure,
    debitBalance: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalDebitBalance,
    overdue: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalOverdue,
    currency: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.CurrencyDesc,
}

const addressHistory = parser.getElementsByTagName('cb:AddressHistory');
const addressHistoryNumbers = [];
for (let i = 0; i < addressHistory.length -1; i++) {
  const addressHistoryNumber = addressHistory[i].attributes.LastUpdateDate;
  addressHistoryNumbers.push(addressHistoryNumber);
}

const addressElements = parser.getElementsByTagName('cb:Address');
const addressNumbers = [];
for (let i = 2; i < addressElements.length - 1; i++) {
  const addressNumber = addressElements[i].attributes;
  addressNumbers.push(addressNumber);
}

const iddData = parser.getElementsByTagName('cb:IdentificationCode')[1].attributes.IdentityNumber

const contactsElements = parser.getElementsByTagName('cb:Contacts');
const cellPhoneNumbers = [];
for (let i = 0; i < contactsElements.length; i++) {
  const cellPhoneNumber = contactsElements[i].attributes.CellphoneNumber;
  cellPhoneNumbers.push(cellPhoneNumber);
}

const labels = ['Credit / Financing', 'Bond / Securities', 'Irrevocable LC', 'Bank Guarantee', 'Other Facilities'];
const contractCategories = parser.getElementsByTagName('cb:NumbersSummary');
const contractNumbers = []
for (let i = 0; i < contractCategories.length; i++) {
    const contractNumber = contractCategories[i].attributes;
    contractNumbers.push(contractNumber);
  }

const creditNumbers = parser.getElementsByTagName('cb:NotGrantedContract');
const creditDetails = []
for (let i = 0; i < creditNumbers.length; i++) {
    const creditDetail = creditNumbers[i].attributes;
    creditDetails.push(creditDetail);
}

const commonDataNumbers = parser.getElementsByTagName('cb:CommonData');
const commonDatas = []
for (let i = 0; i < commonDataNumbers.length; i++) {
    const commonData = commonDataNumbers[i].attributes;
    commonDatas.push(commonData);
}

const componenetRef = useRef();
  

  return (
   <>
   <div>
    <ReactToPrint
    trigger={() => {
        return <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Print this PDF</button>
    }}
    content={() => componenetRef.current}
    documentTitle='Click PDF'
    pageStyle="print" />
   </div>
   <div ref={componenetRef}>
    {/* Subject Data */}
    <div className="p-4">
        <h2 className="mb-2 text-lg">CREDIT REPORT</h2>
        <h3 className="my-8 text-lg">{customerData.nameAsId}</h3>
        <p>Request Date: <b>{today}</b></p>
        <h2 className="mb-2 text-lg">SUBJECT</h2>
        <div>
            <h4 className='text-title'>Subject Data</h4>
            <div className="border-t-2 border-gray-300 my-2"></div>
        </div>
        <ul className="col-4">
        <li className="mb-2">
            <span>CB Subject Code</span>
            <b>{customerData.cbSubjectCode}</b>
        </li>
        <li className="mb-2">
            <span>Name As ID</span>
            <b>{customerData.nameAsId}</b>
        </li>
        <li className="mb-2">
            <span>Date of Birth</span>
            <b>{moment(customerData.dateOfBirth).format('YYYY/MM/DD')}</b>
        </li>
        <li className="mb-2">
            <span>Provider Subject No</span>
            <b>-</b>
        </li>
        <li className="mb-2">
            <span>Full Name</span>
            <b>{customerData.nameAsId}</b>
        </li>
        <li className="mb-2">
            <span>Place of Birth</span>
            <b>{customerData.placeOfBirth}</b>
        </li>
        <li className="mb-2">
            <span>Last Update Date</span>
            <b>{customerData.lastUpdatedDate}</b>
        </li>
        <li className="mb-2">
            <span>Mother's Name</span>
            <b>{customerData.motherName}</b>
        </li>
        <li className="mb-2">
            <span>Marital Status</span>
            <b>{customerData.maritalStatus}</b>
        </li>
        <li className="mb-2">
            <span>Resident</span>
            <b>{customerData.resident}</b>
        </li>
        <li className="mb-2">
            <span>Gender</span>
            <b>{customerData.gender}</b>
        </li>
        <li className="mb-2">
            <span>Educational Status</span>
            <b>{customerData.educationalStatus}</b>
        </li>
        </ul>
    </div>
    {/* Address Data */}
    <div className="p-4">
        <div>
            <h4 className='text-title'>Addresses</h4>
            <div className="border-t-2 border-gray-300 my-2"></div>
        </div>
        <ul className="col-2">
  {addressNumbers.map((addressNumber, index) => (
    <li key={index} className="flex flex-col items-start">
      <div className="border-b-2 border-black mb-2">
        {index === 0 ? 'Current' : 'History'}
      </div>
      <div>
        {addressNumber.Address}
      </div>
      <div>
        {addressHistoryNumbers[index] && (
          <span>
            {addressHistoryNumbers[index]}
          </span>
        )}
      </div>
    </li>
  ))}
</ul>


    </div>
    {/* ID Data */}
    <div className="p-4">
    <div>
            <h4 className='text-title'>Identification Documents</h4>
            <div className="border-t-2 border-gray-300 my-2"></div>
        </div>
        <ul className="max-w-md space-y-1 list-disc list-inside">
            <li>ID CARD: <b>{iddData}</b></li>
        </ul>
    </div>
    {/* Contacts Data */}
    <div className="p-4">
    <div>
    <h4 className='text-title'>Contacts</h4>
    <div className="border-t-2 border-gray-300 my-2"></div>
        </div>
        <ul className="max-w-md space-y-1 list-disc list-inside">
        {cellPhoneNumbers.map((phoneNumber, index) => (
          <li key={index}>
            {index === 0 ? 'Current: ' : 'History: '}
            {phoneNumber}
          </li>
        ))}
      </ul>
    </div>
    {/* Employee Data */}
    <div className="p-4">
    <div>
        <h4 className='text-title'>Employment Data</h4>
        <div className="border-t-2 border-gray-300 my-2"></div>
    </div>
    <ul className="col-5">
    <li className="mb-2">
        <span>Occupation</span>
        <b>{occupationData.occupation}</b>
    </li>
    <li className="mb-2">
        <span>Work Place</span>
        <b>{occupationData.workplace}</b>
    </li>
    <li className="mb-2">
        <span>Employee Sector</span>
        <b>{occupationData.employeeSector}</b>
    </li>
    <li className="mb-2">
        <span>Work Place Address</span>
        <b>{occupationData.workplaceAddress}</b>
    </li>
    <li className="mb-2">
        <span>Last Update Date</span>
        <b>{occupationData.lastUpdatedDate}</b>
    </li>
    </ul>
    </div>
    {/* Score Data */}
    <div className="p-4">
    <h2 className="mb-2 text-lg mt-10">CB Score</h2>
        <ul className="max-w-md space-y-1 list-disc list-inside">
          <li>Score: {scoreData.scoreRaw}</li>
          <li>Risk Grade: {scoreData.scoreRange}</li>
      </ul>
    </div>
    {/* Key Values Data */}
    <div className="p-4">
    <h2 className="mb-2 text-lg mt-10">CONTRACTS SUMMARY</h2>
    <div>
        <h4 className='text-title'>Key Values</h4>
        <div class="h-0.5 bg-gray-500 my-2"></div>
    </div>
    <ul className="col-4">
    <li className="mb-2">
        <span>Contract Number</span>
        <b>{keyvalueData.contractNumber}</b>
    </li>
    <li className="mb-2">
        <span>Total Debit Balance</span>
        <b>{rupiah(keyvalueData.debitBalance)}</b>
    </li>
    <li className="mb-2">
        <span>Reporting Providers Number</span>
        <b>{keyvalueData.reportingNumber}</b>
    </li>
    <li className="mb-2">
        <span>Total Overdue</span>
        <b>{rupiah(keyvalueData.overdue)}</b>
    </li>
    <li className="mb-2">
        <span>Total Credit Limit</span>
        <b>{rupiah(keyvalueData.totalCreditLimit)}</b>
    </li>
    <li className="mb-2">
        <span>Currency</span>
        <b>{keyvalueData.currency}</b>
    </li>
    <li className="mb-2">
        <span>Total Potential Exposure</span>
        <b>{rupiah(keyvalueData.totalPotentialExposure)}</b>
    </li>
    </ul>
    </div>
    {/* Contract Category Data */}     
    <div className="p-4">
    <div>
    <h4 className='text-title'>Summary by Category and Phase</h4>
    <div class="h-0.5 bg-gray-500 my-2"></div>
    </div>
    <table className="w-full table-fixed">
    <thead>
      <tr>
        <th className="px-4 py-2 text-sm">Contract Category</th>
        <th className="px-4 py-2 text-sm">Requested</th>
        <th className="px-4 py-2 text-sm">Refused</th>
        <th className="px-4 py-2 text-sm">Renounced</th>
        <th className="px-4 py-2 text-sm">Active</th>
        <th className="px-4 py-2 text-sm">Closed</th>
      </tr>
    </thead>
    <tbody>
        {contractNumbers.map((contractNumber, index) => (
           <tr key={index} className="border-b">
           <td className="px-4 py-1">{labels[index]}</td>
           <td className="px-4 py-1 text-center">{contractNumber.Requested}</td>
           <td className="px-4 py-1 text-center">{contractNumber.Refused}</td>
           <td className="px-4 py-1 text-center">{contractNumber.Renounced}</td>
           <td className="px-4 py-1 text-center">{contractNumber.Active}</td>
           <td className="px-4 py-1 text-center">{contractNumber.Closed}</td>
         </tr>
        ))}
    </tbody>
  </table>
  </div>

  {/* Credit Details Data */}     
  <div className="p-4">
    <h1 className='font-bold text-lg'>Credit / Financing</h1>
    <div>
        <h4 className='text-title'>Credit / Financing Detail (Requested, Renounced and Refused)</h4>
        <div class="h-0.5 bg-gray-500 my-2"></div>
    </div>
    <table className="table-auto">
    <thead>
      <tr>
        <th className="px-2 py-2 text-sm">No</th>
        <th className="px-2 py-2 text-sm">CB Contract Code</th>
        <th className="px-2 py-2 text-sm">Provider Contract Number</th>
        <th className="px-2 py-2 text-sm">Contract Type</th>
        <th className="px-2 py-2 text-sm">Contract Phase</th>
        <th className="px-2 py-2 text-sm">Role</th>
        <th className="px-2 py-2 text-sm">Provider Type</th>
        <th className="px-2 py-2 text-sm">Provider</th>
        <th className="px-2 py-2 text-sm">Contract Requested Date</th>
        <th className="px-2 py-2 text-sm">Last Update Date</th>
        <th className="px-2 py-2 text-sm">Linked Subjects List</th>
        <th className="px-2 py-2 text-sm">Note</th>
      </tr>
    </thead>
    <tbody>
        {creditDetails.map((creditDetail, index) => (
           <tr key={index} className="border-b">
            <td>{index + 1}</td>
            <td className='text-center text-sm'>{creditDetail.CBContractCode}</td>
            <td className='text-center text-sm'>-</td>
            <td className='text-center text-sm'>{creditDetail.ContractTypeDesc}</td>
            <td className='text-center text-sm'>{creditDetail.ContractPhaseDesc}</td>
            <td className='text-center text-sm'>{creditDetail.RoleDesc}</td>
            <td className='text-center text-sm'>{creditDetail.ProviderTypeCodeDesc}</td>
            <td className='text-center text-sm'>{creditDetail.ProviderCodeDesc}</td>
            <td className='text-center text-sm'>{creditDetail.ContractRequestDate}</td>
            <td className='text-center text-sm'>{creditDetail.LastUpdateDate}</td>
            <td className='text-center text-sm'>-</td>
            <td className='text-center text-sm'>-</td>

          </tr>
        ))}
    </tbody>
  </table>
  </div>

  {/* Credit Details Data 2*/}     
  <div className="p-4">
  <div>
        <h4 className='text-title'>Credit / Financing Detail (Active, Closed, Closed in Advanced)</h4>
        <div class="h-0.5 bg-gray-500 my-2"></div>
    </div>
    <table className="table-auto">
    <thead>
      <tr>
        <th className="px-2 py-2 text-sm">No</th>
        <th className="px-2 py-2 text-sm">CB Contract Code</th>
        <th className="px-2 py-2 text-sm">Provider Contract Number</th>
        <th className="px-2 py-2 text-sm">Contract Type</th>
        <th className="px-2 py-2 text-sm">Contract Phase</th>
        <th className="px-2 py-2 text-sm">Role</th>
        <th className="px-2 py-2 text-sm">Start Date</th>
        <th className="px-2 py-2 text-sm">Due Date</th>
        <th className="px-2 py-2 text-sm">Collaterals Counter</th>
        <th className="px-2 py-2 text-sm">Total Collateral Value</th>
        <th className="px-2 py-2 text-sm">Guarantors Counter</th>
        <th className="px-2 py-2 text-sm">Provider Type</th>
        <th className="px-2 py-2 text-sm">Provider</th>
        <th className="px-2 py-2 text-sm">Last Update Date</th>
        <th className="px-2 py-2 text-sm">Linked Subjects List</th>
        <th className="px-2 py-2 text-sm">Note</th>
      </tr>
    </thead>
    <tbody>
        {commonDatas.map((commonData, index) => (
          <tr key={index} className="border-b">
            <td>{index + 1}</td>
            <td className='text-center text-sm'>{commonData.CBContractCode}</td>
            <td className='text-center text-sm'>-</td>
            <td className='text-center text-sm'>{commonData.ContractTypeCodeDesc}</td>
            <td className='text-center text-sm'>{commonData.ContractPhaseDesc}</td>
            <td className='text-center text-sm'>{commonData.RoleDesc}</td>
            <td className='text-center text-sm'>{commonData.StartDate}</td>
            <td className='text-center text-sm'>{commonData.DueDate}</td>
            <td className='text-center text-sm'>-</td>
            <td className='text-center text-sm'>-</td>
            <td className='text-center text-sm'>-</td>
            <td className='text-center text-sm'>{commonData.ProviderTypeCodeDesc}</td>
            <td className='text-center text-sm'>{commonData.ProviderCodeDesc}</td>
            <td className='text-center text-sm'>{commonData.ReferenceDate}</td>
            <td className='text-center text-sm'>-</td>
            <td className='text-center text-sm'>-</td>
          </tr>
        ))}
    </tbody>
  </table>
  </div>
   </div>

   </>
  );
};

export default Monitoring;
