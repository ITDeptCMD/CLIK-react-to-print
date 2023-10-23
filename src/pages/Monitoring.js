import React, { useState, useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import logo from '../assets/clik-logo.png'
import axios from 'axios'
import XMLParser from 'react-xml-parser'
import moment from 'moment';
import { rupiah } from '../utils/functions';
import userData from '../assets/userData.json'
import Table from '../components/Table';
import { Link } from 'react-router-dom';

const Monitoring = () => {
    const [name, setName] = useState("");
    const [ktp_number, setKtpNumber] = useState("");
    const [gender, setGender] = useState("L");
    const [birth_date, setBirthDate] = useState(moment().format("YYYY-MM-DD"));
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [zipcode, setZipcode] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    //const [responseData, setResponseData] = useState(null);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState({});
    const [commonDatas, setCommonDatas] = useState([]);
    const [grantedCredits, setGrantedCredits] = useState([]);
    const [creditDatas, setCreditDatas] = useState([]);
    const [cellPhoneNumbers, setCellPhoneNumbers] = useState([]);
    const [contractNumbers, setContractNumbers] = useState([]);
    const [addressNumbers, setAddressNumbers] = useState([]);
    const [addressHistoryNumbers, setAddressHistoryNumbers] = useState([]);
    const [occupationHistoryElements, setOccupationHistoryElements] = useState([]);
    //const [occupationHistoryElements2, setOccupationHistoryElements2] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const labels = ['Credit / Financing', 'Bond / Securities', 'Irrevocable LC', 'Bank Guarantee', 'Other Facilities'];
    const url = process.env.REACT_APP_CLIK_BE_URL;

    const xmlData =
     `<soapenv:Envelope xmlns:urn="urn:cbs-messagegatewaysoap:2015-01-01" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Header/>
  <soapenv:Body xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
     <urn:MGRequest>
        <urn:Message Idempotence="unique" TimeStamp="2018-11-26T14:42:47.662197+01:00" Id="767676" GroupId="55657" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
           <urn:Credential Id="XOLI3937" Password="GE80H131k$" Domain=""/>
        </urn:Message>
        <urn:Product Id="CB_ME_Product" Version="" ServiceId="CBG" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
           <cb:CB_ME_ProductInput xmlns:cb="urn:crif-creditbureau:v1">
              <cb:Subject>
                 <cb:Individual DebtorGroupCodeInd="S14" Gender="${gender}" MarriageStatus="2" EducationalStatusCode="04">
             <cb:IndividualName NameAsId="${name}" FullName="${name}" MothersName="" />
             <cb:BirthData BirthDate="${birth_date}" BirthPlace="" />
             <cb:Address Address="${address}" SubDistrict="" District="" City="${city}" PostalCode="${zipcode}" Country="ID"/>
             <cb:IdentificationCode IdentityType="1" IdentityNumber="${ktp_number}" />
             <cb:ID NPWP="" />
             <cb:Contact PhoneNumber="" CellphoneNumber="${phone_number}" EmailAddress="" />
             <cb:EmploymentData JobCode="008" Workplace="Olihalus Medan" CodeOfBusiness="112000" WorkplaceAddress="Mega Kuningan Medan" /> 
           </cb:Individual>
              </cb:Subject>
              <cb:Purpose PurposeCode="10"/>
           </cb:CB_ME_ProductInput>
        </urn:Product>
     </urn:MGRequest>
  </soapenv:Body></soapenv:Envelope>`
           

//     `<soapenv:Envelope xmlns:urn="urn:cbs-messagegatewaysoap:2015-01-01" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
//   <soapenv:Header/>
//   <soapenv:Body xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//      <urn:MGRequest>
//         <urn:Message Idempotence="unique" TimeStamp="2018-11-26T14:42:47.662197+01:00" Id="767676" GroupId="55657" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
//            <urn:Credential Id="XOLI3937" Password="GE80H131k$" Domain=""/>
//         </urn:Message>
//         <urn:Product Id="CB_ME_Product" Version="" ServiceId="CBG" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
//            <cb:CB_ME_ProductInput xmlns:cb="urn:crif-creditbureau:v1">
//               <cb:Subject>
//                  <cb:Individual DebtorGroupCodeInd="S14" Gender="P" MarriageStatus="2" EducationalStatusCode="04">
//              <cb:IndividualName NameAsId="WENI" FullName="WENI" MothersName="" />
//              <cb:BirthData BirthDate="1962-05-15" BirthPlace="Tebing Tinggi" />
//              <cb:Address Address="JL SEPAKAT LK III" SubDistrict="" District="" City="3391" PostalCode="20612" Country="ID"/>
//              <cb:IdentificationCode IdentityType="1" IdentityNumber="1276045505620002" />
//              <cb:ID NPWP="" />
//              <cb:Contact PhoneNumber="" CellphoneNumber="081274327765" EmailAddress="" />
//              <cb:EmploymentData JobCode="008" Workplace="Olihalus Jakarta" CodeOfBusiness="112000" WorkplaceAddress="Mega Kuningan Jakarta" /> 
//            </cb:Individual>
//               </cb:Subject>
//               <cb:Purpose PurposeCode="10"/>
//            </cb:CB_ME_ProductInput>
//         </urn:Product>
//      </urn:MGRequest>
//   </soapenv:Body>
// </soapenv:Envelope>`

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        setLoading(true);

        axios.post(`${url}/clik`, xmlData, {
            headers: {
                'Content-Type': 'text/xml',
                'SOAPAction': 'https://uat-a2a.cbclik.com/Service.svc?singleWsdl/POST'
            },
        })
            .then(response => {
                //setResponseData(response.data);
                setError(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
      axios.post('http://192.168.188.92:18892/Featurex/Ajax/list_dropdown', { "Function" : "Daftar_119_208_408_kabupaten" })
        .then(response => {
          const citiesData = response.data.success;
          const transformedCities = Object.entries(citiesData).map(([key, value]) => ({
            id: key,
            name: value
          }));
          setCities(transformedCities);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    }, []);

    const handleCityChange = (e) => {
      setCity(e.target.value); // Set the selected city ID
    };
    
    const responseData = 
    `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <MGResponse xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
            <MessageResponse GroupId="55657" Id="767676" TimeStamp="2018-11-26T20:42:47.662197+07:00" Idempotence="unique" ExpirationTimeStamp="2023-11-01T07:39:12.757435Z" ResultLanguage="en-US" ResultCode="S" ResultDescription="Success.">
                <CredentialsResponse Domain="" Id="XOLI3937" Password="********" ResultLanguage="en-US" ResultCode="S" ResultDescription="Success."/>
            </MessageResponse>
            <ProductResponse ServiceId="CBG" Id="CB_ME_Product" Version="CB_ME_Product.2023-08-24.001" ResultLanguage="en-US" ResultCode="S" ResultDescription="Success.">
                <cb:CB_ME_ProductOutput xmlns:cb="urn:crif-creditbureau:v1">
                    <cb:MessageId CBSMessageId="767676"/>
                    <cb:EnquiredData>
                        <cb:Subject>
                            <cb:Individual Gender="L" GenderDesc="Male" MarriageStatus="2" MarriageStatusDesc="SINGLE">
                                <cb:IndividualName NameAsId="ALFRED ANTHON" FullName="ALFRED ANTHON"/>
                                <cb:BirthData Date="1989-06-06"/>
                                <cb:Address>
                                    <cb:Address Address="JL. GAPERTA UJUNG" City="3396" PostalCode="20125" Country="ID"/>
                                    <cb:AddressDesc CityDesc="Kota Medan" CountryDesc="INDONESIA"/>
                                </cb:Address>
                                <cb:IdentificationCode>
                                    <cb:IdentificationCode IdentityType="1" IdentityNumber="1271030606890004"/>
                                    <cb:IdentificationCodeDesc IdentityTypeDesc="ID CARD"/>
                                </cb:IdentificationCode>
                                <cb:ID/>
                                <cb:Contact CellphoneNumber="085373467362"/>
                                <cb:EmploymentData>
                                    <cb:EmploymentData Workplace="OLIHALUS MEDAN" WorkplaceAddress="MEGA KUNINGAN MEDAN"/></cb:EmploymentData>
                            </cb:Individual>
                        </cb:Subject>
                    </cb:EnquiredData>
                    <cb:CreditReport>
                        <cb:MatchedSubject ReferenceNo="1" CBSubjectCode="800725013" FlagMatched="1">
                            <cb:Individual Resident="S14" ResidentDesc="Yes" Gender="L" GenderDesc="Male" MarriageStatus="2" MarriageStatusDesc="SINGLE" EducationalStatusCode="04" EducationalStatusCodeDesc="Bachelor Degree" LastUpdateDate="2023-09-30">
                                <cb:IndividualName NameAsId="ALFRED ANTHON SITOMPUL" FullName="ALFRED ANTHON SITOMPUL" MothersName="PUNIA TOBING"/>
                                <cb:BirthData Date="1989-06-06" Place="MEDAN"/>
                                <cb:AddressHistory FlagCurrent="1" LastUpdateDate="2023-09-30">
                                    <cb:Address Address="JL. GAPERTA UJUNG KOMPLEK TOSIRO BLOK. D LK VII" SubDistrict="TANJUNG GUSTA MEDAN" District="MEDAN HELVETIA" City="8306" PostalCode="20125" Country="ID"/>
                                    <cb:AddressDesc CityDesc="Kab. Halmahera Selatan" CountryDesc="INDONESIA"/>
                                </cb:AddressHistory>
                                <cb:AddressHistory FlagCurrent="0" LastUpdateDate="2023-05-31">
                                    <cb:Address Address="JL GAPERTA UJUNG KOMPLEK TOSIRO BLOK D LK VII NO 8" SubDistrict="TANJUNG GUSTA" District="MEDAN HELVETIA" City="3396" PostalCode="20125" Country="ID"/>
                                    <cb:AddressDesc CityDesc="Kota Medan" CountryDesc="INDONESIA"/>
                                </cb:AddressHistory>
                                <cb:AddressHistory FlagCurrent="0" LastUpdateDate="2022-08-31">
                                    <cb:Address Address="JL GAPERTA UJUNG KOMPLEK TOSIRO BLOK D LK VII NO 8 0 20125" SubDistrict="TANJUNG GUSTA" District="MEDAN HELVETIA" City="3301" PostalCode="20352" Country="ID"/>
                                    <cb:AddressDesc CityDesc="Kab. Deli Serdang" CountryDesc="INDONESIA"/>
                                </cb:AddressHistory>
                                <cb:AddressHistory FlagCurrent="0" LastUpdateDate="2022-01-31">
                                    <cb:Address Address="KOMP TOSIRO INDAH BLOK D NO 8 TANJUNG GUSTA" SubDistrict="BLOKDNO8TANJUNGGUSTA" District="MEDANHELVETIA" City="3396" PostalCode="20125" Country="ID"/>
                                    <cb:AddressDesc CityDesc="Kota Medan" CountryDesc="INDONESIA"/>
                                </cb:AddressHistory>
                                <cb:AddressHistory FlagCurrent="0" LastUpdateDate="2020-07-31">
                                    <cb:Address Address="JL GAPERTA UJUNG KOMPLEK TOSIRO BLOK D LK VII NO 8 TANJUNG GUSTA MEDAN HELVETIA KOTA MEDAN 20125" SubDistrict="TANJUNG GUSTA" District="MEDAN HELVETIA" City="3302" PostalCode="20125" Country="ID"/>
                                    <cb:AddressDesc CityDesc="Kab. Langkat" CountryDesc="INDONESIA"/>
                                </cb:AddressHistory>
                                <cb:IdentificationCode LastUpdateDate="2023-09-30">
                                    <cb:IdentificationCode IdentityType="1" IdentityNumber="1271030606890004"/>
                                    <cb:IdentificationCodeDesc IdentityTypeDesc="ID CARD"/>
                                </cb:IdentificationCode>
                                <cb:ID NPWP="440822815124000" LastUpdateDate="2023-09-30"/>
                                <cb:ContactHistory FlagCurrent="1" LastUpdateDate="2023-09-30">
                                    <cb:Contacts PhoneNumber="0" CellphoneNumber="085373467362" EmailAddress="ALFREDANTHON@GMAIL.COM"/>
                                </cb:ContactHistory>
                                <cb:ContactHistory FlagCurrent="0" LastUpdateDate="2022-08-31">
                                    <cb:Contacts PhoneNumber="061999999" CellphoneNumber="08126582332"/>
                                </cb:ContactHistory>
                                <cb:ContactHistory FlagCurrent="0" LastUpdateDate="2022-01-31">
                                    <cb:Contacts PhoneNumber="085373467362"/>
                                </cb:ContactHistory>
                                <cb:ContactHistory FlagCurrent="0" LastUpdateDate="2021-12-31">
                                    <cb:Contacts PhoneNumber="08126582332"/>
                                </cb:ContactHistory>
                                <cb:EmploymentDataHistory FlagCurrent="1" LastUpdateDate="2023-09-30">
                                    <cb:EmploymentData OccupationCode="099" Workplace="CAPELLAMULTIDANAPT" EmployerSector="009000" WorkplaceAddress="PT KAPELA MULTIDANAJL NIBUNG RAYA NO 144-148PETISAH TENGAH MEDAN PETISAH"/>
                                    <cb:EmploymentDataDesc OccupationDesc="Others" EmployerSectorDesc="NOT OTHER BUSINESS FIELDS"/>
                                </cb:EmploymentDataHistory>
                                <cb:EmploymentDataHistory FlagCurrent="0" LastUpdateDate="2022-04-30">
                                    <cb:EmploymentData OccupationCode="014" Workplace="PT CAPELLA" EmployerSector="004190" WorkplaceAddress="NA"/>
                                    <cb:EmploymentDataDesc OccupationDesc="Police" EmployerSectorDesc="HOUSEHOLD FOR MULTIPURPOSES"/>
                                </cb:EmploymentDataHistory>
                                <cb:EmploymentDataHistory FlagCurrent="0" LastUpdateDate="2021-12-31">
                                    <cb:EmploymentData OccupationCode="013" Workplace="PT CAPELLA" EmployerSector="651000" WorkplaceAddress="NA"/>
                                    <cb:EmploymentDataDesc OccupationDesc="Entrepreneur" EmployerSectorDesc="Intermediate Monetary (Bank)"/>
                                </cb:EmploymentDataHistory>
                                <cb:EmploymentDataHistory FlagCurrent="0" LastUpdateDate="2020-07-31">
                                    <cb:EmploymentData OccupationCode="005" Workplace="NA" EmployerSector="009000" WorkplaceAddress="PT BANK BRI TBK JL YOS SUDARSO NO 154 DAN 630 KEL PULAU BRAYAN MEDAN BRT MEDAN INDONESIA"/>
                                    <cb:EmploymentDataDesc OccupationDesc="General Administration" EmployerSectorDesc="NOT OTHER BUSINESS FIELDS"/>
                                </cb:EmploymentDataHistory>
                            </cb:Individual>
                        </cb:MatchedSubject>
                        <cb:ContractsHistory>
                            <cb:AggregatedData ContractsNumber="13" ReportingProvidersNumber="9" TotalCreditLimit="89911000" TotalPotentialExposure="46084477" TotalDebitBalance="46084477" TotalOverdue="0" Currency="IDR" CurrencyDesc="Indonesian Rupiah"/>
                            <cb:Credit>
                                <cb:NumbersSummary Requested="0" Active="5" Refused="0" Renounced="0" Closed="8"/>
                                <cb:AmountsSummary ContractsCounter="5" CreditLimit="71911000" DebitBalance="46084477" Overdue="0"/>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="422551301" ProviderTypeCode="0102" ProviderTypeCodeDesc="Islamic Banks (Unit Usaha Syariah - Syariah Business Unit)" ProviderCode="022" ProviderCodeDesc="PT Bank CIMB Niaga Syariah (UUS)" ReferenceDate="2023-09-30" ContractPhase="AC" ContractPhaseDesc="Active" Role="B" RoleDesc="Borrower" ContractTypeCode="P05" ContractTypeCodeDesc="Credit Card" StartDate="2022-03-15" DueDate="2027-03-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="100" CodeAgreementCreditDesc="Qardh" FrequencyOfCredit="0" StartDateOfCredit="2022-03-15" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3301" CityCodeDesc="Kab. Deli Serdang" ProjectValue="0" InterestRate="1.75" TypeOfInterestRate="5" TypeOfInterestRateDesc="Ujrah" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="12100000" CreditLimit="12100000" CurrentMonthRealization="5109000" Penalty="0" DebitBalance="10269211" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2023-09-30"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="10269211" CurrentMonthRealization="5109000" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="8934220" CurrentMonthRealization="5115470" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="7624837" CurrentMonthRealization="519000" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="7939824" CurrentMonthRealization="475000" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="8412244" CurrentMonthRealization="19999705" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2419119" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="3389505" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="4445409" CurrentMonthRealization="6678880" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2433180" CurrentMonthRealization="572880" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2485300" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="3123800" CurrentMonthRealization="4100000" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="1699500" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="1982750" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2266000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2549250" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2832500" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="3115750" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="F01792570" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="002" ProviderCodeDesc="PT Bank Rakyat Indonesia (Persero) Tbk" ReferenceDate="2023-09-30" ContractPhase="AC" ContractPhaseDesc="Active" Role="B" RoleDesc="Borrower" ContractTypeCode="P05" ContractTypeCodeDesc="Credit Card" StartDate="2013-07-16" DueDate="2027-07-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" FrequencyOfCredit="0" StartDateOfCredit="2013-07-16" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="004190" EconomicSectorCodeDesc="HOUSEHOLD FOR MULTIPURPOSES" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="21" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="6000000" CreditLimit="6000000" CurrentMonthRealization="0" Penalty="0" DebitBalance="5642766" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="625419" MaxOverduePaymentsNumber="0" MaxDaysPastDue="238" MaxDaysPastDueDate="2017-10-31" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2023-09-30"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="5642766" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="5511696" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="5544225" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="5901231" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="5671068" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="5387606" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="4881008" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="4452391" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="3983697" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="4019330" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="3364628" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="3806713" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2754651" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2675576" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="1553416" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="1421216" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="1028053" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="1918539" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="930954" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="838029" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="771423" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="628453" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="552783" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="619267" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="F00934342" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="261210" ProviderCodeDesc="PT Capella Multidana" ReferenceDate="2023-08-31" ContractPhase="AC" ContractPhaseDesc="Active" Role="B" RoleDesc="Borrower" ContractTypeCode="P04" ContractTypeCodeDesc="Credit to Non-MSMEs through other institutions by executing" ProviderContractNo="007403085751MDN0819M" StartDate="2019-08-21" DueDate="2024-07-30" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" OriginalAgreementNumber="007403085751MDN0819M" OriginalAgreementDate="2019-08-21" FinalAgreementNumber="007403085751MDN0819M" FinalAgreementDate="2019-08-21" FrequencyOfCredit="0" StartDateOfCredit="2019-08-21" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="451000" EconomicSectorCodeDesc="CAR TRADE" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="14.51" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="135300000" CreditLimit="29711000" CurrentMonthRealization="0" Penalty="0" DebitBalance="27663500" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2023-08-31"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="27663500" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="30001674" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="32311909" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="34594539" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="36849894" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="39078300" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="41280078" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="43455547" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="45605022" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="47728813" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="49827226" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="51900565" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="53949130" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="55973217" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="57973118" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="59949122" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="61901515" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="63830579" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="65736592" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="67619830" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="69480565" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="71319066" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="73135599" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="74930426" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="1" TotalCollateralValue="121770000"/>
                                        <cb:GrantedCollaterals>
                                            <cb:AttributeData ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="261210" ProviderCodeDesc="PT Capella Multidana" ReferenceDate="2021-03-31"/>
                                            <cb:GrantedCollateral CollateralNumber="MHBJ2CH2FKJ033385" CollateralStatusCode="1" CollateralStatusDesc="Available" CollateralTypeCode="189" CollateralTypeDesc="Motorcycle" BindTypeCode="03" BindTypeDesc="Fiduciare" BindDate="2019-08-21" CollateralOwnerName="ALFRED ANTHON SITOMPUL" ProofOfOwnership="BPKB NO MHBJ2CH2FKJ033385" CollateralValueNJOP="121770000" CollateralValueReporter="121770000" CollateralAssessmentDateReporter="2019-08-31" CollateralValueIndependentAssessors="0" CommonCollateralStatus="T" CommonCollateralStatusDesc="No" CommonCollateralPercentage="0" JointAccountCreditStatus="T" JointAccountCreditStatusDesc="No" Insured="Y" InsuredDesc="Yes"/>
                                            <cb:CollateralAddress>
                                                <cb:Address Address="JL GAPERTA UJUNG KOMPLEK TOSIRO BLOK D NO 8 MEDAN" City="3396"/>
                                                <cb:AddressDesc CityDesc="Kota Medan"/>
                                            </cb:CollateralAddress>
                                        </cb:GrantedCollaterals>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="022544655" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="022" ProviderCodeDesc="PT Bank CIMB Niaga Tbk" ReferenceDate="2023-08-31" ContractPhase="AC" ContractPhaseDesc="Active" Role="B" RoleDesc="Borrower" ContractTypeCode="P05" ContractTypeCodeDesc="Credit Card" StartDate="2022-03-15" DueDate="2026-03-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" FrequencyOfCredit="0" StartDateOfCredit="2022-03-15" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3301" CityCodeDesc="Kab. Deli Serdang" ProjectValue="0" InterestRate="1.75" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="12100000" CreditLimit="12100000" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2023-08-31"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="918313468" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="542" ProviderCodeDesc="PT Bank Jago Tbk d/h Bank Artos Indonesia" ReferenceDate="2022-04-30" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="P02" ContractTypeCodeDesc="Credit to third parties through other agencies by channeling" StartDate="2021-12-21" DueDate="2022-04-03" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2022-04-04"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" OriginalAgreementNumber="J20211222040100023" OriginalAgreementDate="2021-12-21" FinalAgreementNumber="J20211222040100023" FinalAgreementDate="2021-12-21" FrequencyOfCredit="0" StartDateOfCredit="2021-12-21" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="004190" EconomicSectorCodeDesc="HOUSEHOLD FOR MULTIPURPOSES" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="13.5" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="152700" CreditLimit="0" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2022-04-30"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="51470" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="102368" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="152700" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="152700" CurrentMonthRealization="152700" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="Q18336235" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251890" ProviderCodeDesc="PT Atome Finance Indonesia" ReferenceDate="2022-04-30" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="P99" ContractTypeCodeDesc="Others" StartDate="2021-11-26" DueDate="2022-06-03" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2022-04-06"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" OriginalAgreementNumber="L61A08D0B1F66E1000697B11D" OriginalAgreementDate="2021-11-26" FinalAgreementNumber="L61A08D0B1F66E1000697B11D" FinalAgreementDate="2021-11-26" FrequencyOfCredit="0" StartDateOfCredit="2021-11-26" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="0" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="939700" CreditLimit="0" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2022-04-30"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="469485" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="626085" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="626085" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="783085" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="11"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="1" TotalCollateralValue="0"/>
                                        <cb:GrantedCollaterals>
                                            <cb:AttributeData ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251890" ProviderCodeDesc="PT Atome Finance Indonesia" ReferenceDate="2022-01-31"/>
                                            <cb:GrantedCollateral CollateralNumber="L61A08D0B1F66E1000697B11D" CollateralStatusCode="2" CollateralStatusDesc="Indent" CollateralTypeCode="275" CollateralTypeDesc="Other Gurantees" CollateralOwnerName="ALFRED ANTHON SITOMPUL" ProofOfOwnership="L61A08D0B1F66E1000697B11D" CollateralValueNJOP="0" CollateralValueReporter="0" CollateralValueIndependentAssessors="0" CommonCollateralStatus="T" CommonCollateralStatusDesc="No" CommonCollateralPercentage="0" JointAccountCreditStatus="T" JointAccountCreditStatusDesc="No" Insured="T" InsuredDesc="No"/>
                                            <cb:CollateralAddress>
                                                <cb:Address Address="JL GAPERTA UJUNG KOMPLEK TOSIRO INDAH BLOK D" City="3396"/>
                                                <cb:AddressDesc CityDesc="Kota Medan"/>
                                            </cb:CollateralAddress>
                                        </cb:GrantedCollaterals>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="418345136" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251890" ProviderCodeDesc="PT Atome Finance Indonesia" ReferenceDate="2022-04-30" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="P99" ContractTypeCodeDesc="Others" StartDate="2021-12-21" DueDate="2022-04-03" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2022-04-02"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" OriginalAgreementNumber="L61C1BE3D8C5D1C0001BC37F3" OriginalAgreementDate="2021-12-21" FinalAgreementNumber="L61C1BE3D8C5D1C0001BC37F3" FinalAgreementDate="2021-12-21" FrequencyOfCredit="0" StartDateOfCredit="2021-12-21" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="0" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="152700" CreditLimit="0" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2022-04-30"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="50900" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="101800" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="101800" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="152700" CurrentMonthRealization="152700" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="1" TotalCollateralValue="0"/>
                                        <cb:GrantedCollaterals>
                                            <cb:AttributeData ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251890" ProviderCodeDesc="PT Atome Finance Indonesia" ReferenceDate="2022-01-31"/>
                                            <cb:GrantedCollateral CollateralNumber="L61C1BE3D8C5D1C0001BC37F3" CollateralStatusCode="2" CollateralStatusDesc="Indent" CollateralTypeCode="275" CollateralTypeDesc="Other Gurantees" CollateralOwnerName="ALFRED ANTHON SITOMPUL" ProofOfOwnership="L61C1BE3D8C5D1C0001BC37F3" CollateralValueNJOP="0" CollateralValueReporter="0" CollateralValueIndependentAssessors="0" CommonCollateralStatus="T" CommonCollateralStatusDesc="No" CommonCollateralPercentage="0" JointAccountCreditStatus="T" JointAccountCreditStatusDesc="No" Insured="T" InsuredDesc="No"/>
                                            <cb:CollateralAddress>
                                                <cb:Address Address="JL GAPERTA UJUNG KOMPLEK TOSIRO INDAH BLOK D" City="3396"/>
                                                <cb:AddressDesc CityDesc="Kota Medan"/>
                                            </cb:CollateralAddress>
                                        </cb:GrantedCollaterals>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="D18342926" ProviderTypeCode="0201" ProviderTypeCodeDesc="Financing Company" ProviderCode="251890" ProviderCodeDesc="PT Atome Finance Indonesia" ReferenceDate="2022-01-31" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="P99" ContractTypeCodeDesc="Others" StartDate="2021-10-31" DueDate="2022-02-03" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2022-01-30"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" OriginalAgreementNumber="L617E4B5A4E4A400006C32869" OriginalAgreementDate="2021-10-31" FinalAgreementNumber="L617E4B5A4E4A400006C32869" FinalAgreementDate="2021-10-31" FrequencyOfCredit="0" StartDateOfCredit="2021-10-31" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="0" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="549300" CreditLimit="0" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2022-01-31"/>
                                    <cb:CreditProfile ReferenceYear="2022" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="183100" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="11"/>
                                    <cb:CreditProfile ReferenceYear="2021" ReferenceMonth="10"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="G06038979" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="087" ProviderCodeDesc="PT Bank HSBC Indonesia" ReferenceDate="2020-11-30" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="30" ContractTypeCodeDesc="Credit Card" StartDate="2014-08-26" DueDate="2024-10-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2020-11-30" Information="CRD"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="00" CodeAgreementCreditDesc="Conventional" FrequencyOfCredit="0" StartDateOfCredit="2014-08-26" DebtorCategoryCode="99" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="0394" CityCodeDesc="Wil. Kota Jakarta Selatan" ProjectValue="0" InterestRate="0" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="001" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="5000000" CreditLimit="5000000" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2020-11-30"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="300000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2020" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="9"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="8"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="7"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="6"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="5"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="4"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="3"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="2"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="1"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="12"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="L01967121" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="087" ProviderCodeDesc="PT Bank HSBC Indonesia" ReferenceDate="2019-10-31" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="30" ContractTypeCodeDesc="Credit Card" StartDate="2014-08-26" DueDate="2019-08-26" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2019-10-31" Information="CARD-CB3"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="00" CodeAgreementCreditDesc="Conventional" FrequencyOfCredit="0" StartDateOfCredit="2014-08-26" DebtorCategoryCode="99" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="0394" CityCodeDesc="Wil. Kota Jakarta Selatan" ProjectValue="0" InterestRate="26.95" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="001" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="5000000" CreditLimit="5000000" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2019-10-31"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="500000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="500000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="R03906190" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="426" ProviderCodeDesc="PT Bank Mega Tbk" ReferenceDate="2019-06-30" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="30" ContractTypeCodeDesc="Credit Card" StartDate="2014-10-06" DueDate="2019-10-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2019-06-21" Information="CC_1271030606890004"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="00" CodeAgreementCreditDesc="Conventional" FrequencyOfCredit="0" StartDateOfCredit="2014-10-06" DebtorCategoryCode="99" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="26.95" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="001" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="5000000" CreditLimit="5000000" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2019-06-30"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="9"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="8"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="7"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="503906414" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="426" ProviderCodeDesc="PT Bank Mega Tbk" ReferenceDate="2019-06-30" ContractPhase="CL" ContractPhaseDesc="Closed" Role="B" RoleDesc="Borrower" ContractTypeCode="30" ContractTypeCodeDesc="Credit Card" StartDate="2014-02-06" DueDate="2019-02-28" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="02" ContractStatusDesc="Paid off" ContractStatusDate="2019-06-21" Information="CC_1271030606890004"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="00" CodeAgreementCreditDesc="Conventional" FrequencyOfCredit="0" StartDateOfCredit="2014-02-06" DebtorCategoryCode="99" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="26.95" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="001" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="3000000" CreditLimit="3000000" CurrentMonthRealization="0" Penalty="0" DebitBalance="0" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2019-06-30"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="02" ContractStatusDesc="Paid off"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="400000" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2019" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="8" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="7" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="6" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="5" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="4" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="3" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="2" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2018" ReferenceMonth="1" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="12" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="11" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="10" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="0" CurrentMonthRealization="0" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="9"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="8"/>
                                    <cb:CreditProfile ReferenceYear="2017" ReferenceMonth="7"/>
                                    <cb:Collaterals>
                                        <cb:CollateralsSummary CollateralsCounter="0" TotalCollateralValue="0"/>
                                    </cb:Collaterals>
                                    <cb:Guarantors>
                                        <cb:GuarantorsSummary GuarantorsCounter="0"/>
                                    </cb:Guarantors>
                                </cb:GrantedCredit>
                                <cb:GrantedCredit>
                                    <cb:JoinAccountNumber SubjectSequenceMember=""/>
                                    <cb:CommonData ReferenceNo="1" CBContractCode="R45309137" ProviderTypeCode="0101" ProviderTypeCodeDesc="Conventional Commercial Bank" ProviderCode="008" ProviderCodeDesc="PT Bank Mandiri (Persero) Tbk" ReferenceDate="2023-09-30" ContractPhase="AC" ContractPhaseDesc="Active" Role="B" RoleDesc="Borrower" ContractTypeCode="P05" ContractTypeCodeDesc="Credit Card" StartDate="2023-09-08" DueDate="2028-12-31" CurrencyCode="IDR" CurrencyCodeDesc="Indonesian Rupiah" PastDueStausCode="1" PastDueStausDesc="Current" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
                                    <cb:GrantedCredit CodeCharacteristicCredit="9" CodeCharacteristicCreditDesc="Others" CodeAgreementCredit="000" CodeAgreementCreditDesc="Conventional" FrequencyOfCredit="0" StartDateOfCredit="2023-09-08" DebtorCategoryCode="NU" DebtorCategoryCodeDesc="Not a Debtor of Micro, Small and Medium Enterprises" UsageTypeCode="3" UsageTypeCodeDesc="Consumption" UsageOrientationCode="3" UsageOrientationCodeDesc="Other" EconomicSectorCode="009000" EconomicSectorCodeDesc="NOT OTHER BUSINESS FIELDS" CityCode="3396" CityCodeDesc="Kota Medan" ProjectValue="0" InterestRate="21" TypeOfInterestRate="1" TypeOfInterestRateDesc="Fixed Interest Rates" FinancigProgram="10" FinancigProgramDesc="Non Government Program Loans" InitialCreditLimit="12000000" CreditLimit="12000000" CurrentMonthRealization="2509000" Penalty="0" DebitBalance="2509000" ValueInOriginalCurrency="0" PrincipalOverdueAmount="0" InterestOverdueAmount="0" DaysPastDue="0" OverduePaymentsNumber="0" FrequencyOfRestructuring="0"/>
                                    <cb:Maximum MaxOverduePaymentsAmount="0" MaxOverduePaymentsNumber="0" MaxDaysPastDue="0" WorstStatusCode="1" WorstStatusDesc="Current" WorstStatusDate="2023-09-30"/>
                                    <cb:CreditProfile ReferenceYear="2023" ReferenceMonth="9" DaysPastDue="0" Overdue="0" OverduePaymentsNumber="0" QualityCode="1" QualityCodeDesc="Current" DebitBalance="2509000" CurrentMonthRealization="2509000" ContractStatusCode="00" ContractStatusDesc="Active Facilities"/>
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
                        <cb:FootPrints Count1Month="1" Count3Months="1" Count6Months="1" Count12Months="1">
                            <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process" EnquiryTypeCode="CB_ME" EnquiryTypeDesc="Monitoring Enquiry" EnquiryDate="2023-10-03" InstituteCode="261210" InstituteDesc="PT Capella Multidana"/>
                        </cb:FootPrints>
                    </cb:CreditReport>
                    <cb:CBScore>
                        <cb:CBSGlocal>
                            <cb:ScoreData ScoreRaw="551" ScoreRange="Gi">
                                <cb:ScoreMessage Code="19" Description="Medium-Low Risk"/>
                            </cb:ScoreData>
                        </cb:CBSGlocal>
                    </cb:CBScore>
                </cb:CB_ME_ProductOutput>
            </ProductResponse>
        </MGResponse>
    </s:Body>
</s:Envelope>`

useEffect(() => {
    if (responseData) {
      const parser = new XMLParser().parseFromString(responseData);
      const updatedData = {
        //customerData
        cbSubjectCode: parser.getElementsByTagName('cb:MatchedSubject')[0].attributes.CBSubjectCode || '-',
        lastUpdatedDate: parser.getElementsByTagName('cb:Individual')[1].attributes.LastUpdateDate || '-',
        resident: parser.getElementsByTagName('cb:Individual')[1].attributes.ResidentDesc || '-',
        nameAsId: parser.getElementsByTagName('cb:IndividualName')[0].attributes.NameAsId || '-',
        motherName: parser.getElementsByTagName('cb:IndividualName')[1].attributes.MothersName || '-',
        gender: parser.getElementsByTagName('cb:Individual')[0].attributes.GenderDesc || '-',
        dateOfBirth: parser.getElementsByTagName('cb:BirthData')[0].attributes.Date || '-',
        placeOfBirth: parser.getElementsByTagName('cb:BirthData')[0].attributes.Place || '-',
        maritalStatus: parser.getElementsByTagName('cb:Individual')[0].attributes.MarriageStatusDesc || '-',
        educationalStatus: parser.getElementsByTagName('cb:Individual')[1].attributes.EducationalStatusCodeDesc || '-',
        //occupationData
        // occupation: parser.getElementsByTagName('cb:EmploymentDataDesc')[0].attributes.OccupationDesc || '-',
        // workplace: parser.getElementsByTagName('cb:EmploymentData')[1].attributes.Workplace || '-',
        // employeeSector: parser.getElementsByTagName('cb:EmploymentDataDesc')[0].attributes.EmployerSectorDesc || '-',
        // workplaceAddress: parser.getElementsByTagName('cb:EmploymentData')[1].attributes.WorkplaceAddress || '-',
        // lastUpdatedDate: parser.getElementsByTagName('cb:EmploymentDataHistory')[0].attributes.LastUpdateDate || '-',
        //scoreData
        scoreRaw: parser.getElementsByTagName('cb:ScoreData')[0]?.attributes?.ScoreRaw || '-',
        scoreRange: parser.getElementsByTagName('cb:ScoreData')[0]?.attributes?.ScoreRange?.charAt(0) || '-',
        scoreMessage: parser.getElementsByTagName('cb:ScoreMessage')[0]?.attributes?.Description || '-',
        //scoreExclusion: parser.getElementsByTagName('cb:ExclusionRule')[0].attributes.Description || '-',
        //keyValueData
        contractNumber: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.ContractsNumber || '-',
        reportingNumber: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.ReportingProvidersNumber || '-',
        totalCreditLimit: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalCreditLimit || '-',
        totalPotentialExposure: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalPotentialExposure || '-',
        debitBalance: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalDebitBalance || '-',
        overdue: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.TotalOverdue || '-',
        currency: parser.getElementsByTagName('cb:AggregatedData')[0].attributes.CurrencyDesc || '-',
        iddData: parser.getElementsByTagName('cb:IdentificationCode')[1].attributes.IdentityNumber || '-'
    };
    setData(updatedData);
    //contactNumbers
    const phoneNumbers = parser.getElementsByTagName('cb:Contacts');
    const updatedPhoneNumbers = phoneNumbers.map(data => data.attributes || {});
    setCellPhoneNumbers(updatedPhoneNumbers);
    //addressNumbers
    const addressElements = parser.getElementsByTagName('cb:Address');
    const updatedAddressElements = Array.from(addressElements).slice(2, -1).map(data => data.attributes || {});
    setAddressNumbers(updatedAddressElements);
    //addressNumbers
    const addressHistoryElements = parser.getElementsByTagName('cb:AddressHistory');
    const updatedAddressHistoryElements = addressHistoryElements.map(data => data.attributes.LastUpdateDate || {});
    setAddressHistoryNumbers(updatedAddressHistoryElements);
    //occupationNumbers
    const occupationHistoryElement = parser.getElementsByTagName('cb:EmploymentDataDesc');
    const updatedOccupationHistoryElements = occupationHistoryElement.slice(1).map(data => data.attributes || {});
    setOccupationHistoryElements(updatedOccupationHistoryElements)
    //occupationNumbers
    const occupationHistoryElement2 = parser.getElementsByTagName('cb:EmploymentData');
    const updatedOccupationHistoryElements2 = occupationHistoryElement2.slice(3).map(data => data.attributes || {});
    setOccupationHistoryElements(updatedOccupationHistoryElements2)
    const combinedData = updatedOccupationHistoryElements.map((data, index) => ({
      data1: data,
      data2: updatedOccupationHistoryElements2[index]
    }));
    setCombinedData(combinedData);
    //contractNumbers
    const contractNumbers = parser.getElementsByTagName('cb:NumbersSummary');
    const updatedContractNumbers = contractNumbers.map(data => data.attributes || {});
    setContractNumbers(updatedContractNumbers);
    //commonData
    const commonDataNumbers = parser.getElementsByTagName('cb:CommonData');
    const updatedCommonDatas = commonDataNumbers.map(data => data.attributes || {});
    setCommonDatas(updatedCommonDatas);
    //commonData
    const grantedNumbers = parser.getElementsByTagName('cb:GrantedCredit');
    const updatedGrantedNumbers = grantedNumbers.filter(data => {
    return Object.keys(data.attributes || {}).length > 0;
    });

    const combinedData2 = updatedCommonDatas.map((data, index) => ({
      data1: data,
      data2: updatedGrantedNumbers[index].attributes
    }));
    setGrantedCredits(combinedData2);
    //creditData
    const creditDataNumbers = parser.getElementsByTagName('cb:NotGrantedContract');
    const updatedCreditDatas = creditDataNumbers.map(data => data.attributes || {});
    setCreditDatas(updatedCreditDatas);
    }
  }, [responseData]);
  
    const today = moment().format('YYYY-MM-DD');
    function getBackgroundColorClass(scoreRange) {
        switch (scoreRange) {
            case 'A': return 'bg-red-800';
            case 'B': return 'bg-red-600';
            case 'C': return 'bg-orange-700';
            case 'D': return 'bg-orange-500';
            case 'E': return 'bg-yellow-400';
            case 'F': return 'bg-lime-300';
            case 'G': return 'bg-lime-500';
            case 'H': return 'bg-emerald-500';
            case 'I': return 'bg-emerald-700';
            case 'J': return 'bg-emerald-900';
            default: return '';
        }
    }
    const componenetRef = useRef();
    // console.log(combinedData);
    return (
        <div className="min-h-screen p-6 bg-gray-100 items-center justify-center">
            {/* form */}
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">Data diri</p>
                            <p className="font-medium text-lg my-2">Monitoring Enquiry / Data lama</p>
                            <p>Isi berdasarkan data diri informasi</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="lg:col-span-3">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                    <div className="md:col-span-3">
                                        <label for="full_name">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="email">No KTP</label>
                                        <input
                                            type="number"
                                            name="ktp_number"
                                            id="ktp_number"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={ktp_number}
                                            onChange={(e) => setKtpNumber(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="email">Jenis Kelamin</label>
                                        <select
                                            id="small"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}>
                                            <option value="L">Laki - laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="city">Tanggal Lahir</label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={birth_date}
                                            onChange={(e) => setBirthDate(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-6">
                                        <label for="address">Alamat</label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="address">Kota</label>
                                            <select
                                              name="city"
                                              id="city"
                                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                              value={city}
                                              onChange={handleCityChange}>
                                              <option value="">Select</option>
                                              {cities.map((city) => (
                                                <option key={city.id} value={city.id}>
                                                  {city.name}
                                                </option>
                                              ))}
                                            </select>
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="address">Kode Pos</label>
                                        <input
                                            type="text"
                                            name="zipcode"
                                            id="zipcode"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={zipcode}
                                            onChange={(e) => setZipcode(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label for="phone_number">No Telp</label>
                                        <input
                                            type="text"
                                            name="phpnenumber"
                                            id="phpnenumber"
                                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={phone_number}
                                            onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>

                                    <div className="md:col-span-4 text-right">
                                        <div className="inline-flex items-end mt-2">
                                            <button
                                                disabled={isButtonDisabled}
                                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isButtonDisabled ? 'cursor-not-allowed' : ''}`}
                                            >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* table */}
            <div className='container max-w-screen-lg mx-auto flex justify-between'>
        {isLoading && <div>Loading...</div>}

        {isError ? <div style={{ color: 'red' }}>Error occurred!</div> : <div style={{ color: 'green' }}>Success!</div>}

        <Link to="/">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">New Enquiry</button>
        </Link>
    </div>

            <div className='container max-w-screen-lg mx-auto'>
                <Table userData={userData} />
            </div>
            {/* response */}
            {responseData && (
        <div className="container max-w-screen-lg mx-auto">
          <div className="bg-white p-2 rounded shadow-md">
            {/* Print Button */}
            <div>
              <ReactToPrint
                trigger={() => {
                  return (
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      Print this PDF
                    </button>
                  );
                }}
                content={() => componenetRef.current}
                documentTitle="CONFIDENTIAL"
                pageStyle="print"
              />
            </div>
            <div ref={componenetRef}>
              {/* logo */}
              <div className="mx-5 flex justify-between">
                <div>
                  <img src={logo} width={160} />
                </div>
                <div>
                  <ul className="list-none">
                    <li>
                      <b>PT. Clik</b>
                    </li>
                    <li>Cyber 2 Tower 18th Floor</li>
                    <li>Jl. H.R Rasuna Said Blok X-5 no 13</li>
                    <li>Jakarta - 12950</li>
                    <li>Indonesia</li>
                    <li>Telephone: +62 21 57998243</li>
                    <li>Fax: +62 21 5799 8244</li>
                  </ul>
                </div>
              </div>
              {/* Subject Data */}
              <div className="p-4">
                <h2 className="mb-2 text-lg">CREDIT REPORT</h2>
                <h3 className="my-8 text-lg">{data.nameAsId}</h3>
                <p>
                  Request Date: <b>{today}</b>
                </p>
                <div className="bg-slate-100 p-1 my-4 rounded-full">
                  <h2 className="mb-2 text-lg">SUBJECT</h2>
                </div>
                <div>
                  <h4 className="text-title">Subject Data</h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <ul className="col-4">
                  <li className="mb-2">
                    <span>CB Subject Code</span>
                    <b>{data.cbSubjectCode}</b>
                  </li>
                  <li className="mb-2">
                    <span>Name As ID</span>
                    <b>{data.nameAsId}</b>
                  </li>
                  <li className="mb-2">
                    <span>Date of Birth</span>
                    <b>{moment(data.dateOfBirth).format("YYYY/MM/DD")}</b>
                  </li>
                  <li className="mb-2">
                    <span>Provider Subject No</span>
                    <b>-</b>
                  </li>
                  <li className="mb-2">
                    <span>Full Name</span>
                    <b>{data.nameAsId}</b>
                  </li>
                  <li className="mb-2">
                    <span>Place of Birth</span>
                    <b>{data.placeOfBirth}</b>
                  </li>
                  <li className="mb-2">
                    <span>Last Update Date</span>
                    <b>{data.lastUpdatedDate}</b>
                  </li>
                  <li className="mb-2">
                    <span>Mother's Name</span>
                    <b>{data.motherName}</b>
                  </li>
                  <li className="mb-2">
                    <span>Marital Status</span>
                    <b>{data.maritalStatus}</b>
                  </li>
                  <li className="mb-2">
                    <span>Resident</span>
                    <b>{data.resident}</b>
                  </li>
                  <li className="mb-2">
                    <span>Gender</span>
                    <b>{data.gender}</b>
                  </li>
                  <li className="mb-2">
                    <span>Educational Status</span>
                    <b>{data.educationalStatus}</b>
                  </li>
                </ul>
              </div>
              {/* Address Data */}
              <div className="p-4">
                <div>
                  <h4 className="text-title">Addresses</h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <ul className="col-2">
                  {addressNumbers.map((addressNumber, index) => (
                    <li key={index} className="flex flex-col">
                      <div className="border-b-2 border-grey-200 my-3">
                        <div className="flex justify-between">
                          <div>
                            {index === 0
                              ? "Current - Address"
                              : index === 1
                              ? "History - Addresses"
                              : ""}
                          </div>
                          {index === 0 || index === 1 ? (
                            <div>Last Updated</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          {addressNumber.Address}, {addressNumber.SubDistrict},{" "}
                          {addressNumber.District}, {addressNumber.PostalCode},{" "}
                          {addressNumber.Country}
                        </div>
                        <div className="ml-auto">
                          {addressHistoryNumbers[index] && (
                            <span>{addressHistoryNumbers[index]}</span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* ID Data */}
              <div className="p-4">
                <div>
                  <h4 className="text-title">Identification Documents</h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <ul className="max-w-md space-y-1 list-disc list-inside">
                  <li>
                    ID CARD: <b>{data.iddData}</b>
                  </li>
                </ul>
              </div>
              {/* Contacts Data */}
              <div className="p-4">
                <div>
                  <h4 className="text-title">Contacts</h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <ul>
                  {cellPhoneNumbers.map((cellPhoneNumber, index) => (
                    <li key={index} className="flex flex-col">
                      <div className="border-b-2 border-grey-200 my-3">
                        {index === 0
                          ? "Current - Contact"
                          : index === 1
                          ? "History - Contacts"
                          : ""}
                      </div>
                      <ul className="col-4">
                        <li className="mb-2">
                          <span>Phone Number</span>
                          <b>{cellPhoneNumber.PhoneNumber}</b>
                        </li>
                        <li className="mb-2">
                          <span>Cell Phone Number</span>
                          <b>{cellPhoneNumber.CellphoneNumber}</b>
                        </li>
                        <li className="mb-2">
                          <span>Email Address</span>
                          <b>{cellPhoneNumber.EmailAddress}</b>
                        </li>
                        <li className="mb-2">
                          <span>Last Updated</span>
                          <b>-</b>
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Employee Data */}
              <div className="p-4">
                <div>
                  <h4 className="text-title">Employment Data</h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <table className="w-full table-fixed">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-sm">WorkPlace</th>
                      <th className="px-4 py-2 text-sm">Address</th>
                      <th className="px-4 py-2 text-sm">Occupation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinedData.map((data, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-1">{data.data2.Workplace}</td>
                        <td className="px-4 py-1">{data.data2.WorkplaceAddress}</td>
                        <td className="px-4 py-1">{data.data1.OccupationDesc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    
              </div>
              {/* Score Data */}
              <div className="p-4">
                <div className="bg-slate-100 p-1 mt-10 mb-4 rounded-full">
                  <h2 className="text-lg">CB Score</h2>
                </div>
                <ul className="col-3">
                  <li className="mb-2">
                    <span>Score</span>
                    <b>{data.scoreRaw}</b>
                  </li>
                  <li className="mb-2">
                    <span>Risk Grade</span>
                    <b>{data.scoreRange}</b>
                  </li>
                  <li className="mb-2">
                    <span></span>
                    <b
                      className={`p-6 ${getBackgroundColorClass(
                        data.scoreRange
                      )}`}
                    >
                      {data.scoreMessage === null ? data.scoreMessage : data.scoreExclusion}
                    </b>
                  </li>
                </ul>
                <p className='text-center font-bold'>Medium-Low Risk</p>
              </div>
              {/* Key Values Data */}
              <div className="p-4">
                <div className="bg-slate-100 p-1 mt-10 mb-4 rounded-full">
                  <h2 className="text-lg">CONTRACTS SUMMARY</h2>
                </div>
                <div>
                  <h4 className="text-title">Key Values</h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <ul className="col-4">
                  <li className="mb-2">
                    <span>Contract Number</span>
                    <b>{data.contractNumber}</b>
                  </li>
                  <li className="mb-2">
                    <span>Total Debit Balance</span>
                    <b>{rupiah(data.debitBalance)}</b>
                  </li>
                  <li className="mb-2">
                    <span>Reporting Providers Number</span>
                    <b>{data.reportingNumber}</b>
                  </li>
                  <li className="mb-2">
                    <span>Total Overdue</span>
                    <b>{rupiah(data.overdue)}</b>
                  </li>
                  <li className="mb-2">
                    <span>Total Credit Limit</span>
                    <b>{rupiah(data.totalCreditLimit)}</b>
                  </li>
                  <li className="mb-2">
                    <span>Currency</span>
                    <b>{data.currency}</b>
                  </li>
                  <li className="mb-2">
                    <span>Total Potential Exposure</span>
                    <b>{rupiah(data.totalPotentialExposure)}</b>
                  </li>
                </ul>
              </div>
              {/* Contract Category Data */}
              <div className="p-4">
                <div>
                  <h4 className="text-title">Summary by Category and Phase</h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
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
                        <td className="px-4 py-1 text-center">
                          {contractNumber.Requested}
                        </td>
                        <td className="px-4 py-1 text-center">
                          {contractNumber.Refused}
                        </td>
                        <td className="px-4 py-1 text-center">
                          {contractNumber.Renounced}
                        </td>
                        <td className="px-4 py-1 text-center">
                          {contractNumber.Active}
                        </td>
                        <td className="px-4 py-1 text-center">
                          {contractNumber.Closed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Credit Details Data */}
              <div className="p-4">
                <h1 className="font-bold text-lg">Credit / Financing</h1>
                <div>
                  <h4 className="text-title">
                    Credit / Financing Detail (Requested, Renounced and Refused)
                  </h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 text-sm">No</th>
                      <th className="px-2 py-2 text-sm">CB Contract Code</th>
                      <th className="px-2 py-2 text-sm">Contract Type</th>
                      <th className="px-2 py-2 text-sm">Contract Phase</th>
                      <th className="px-2 py-2 text-sm">Role</th>
                      <th className="px-2 py-2 text-sm">Provider Type</th>
                      <th className="px-2 py-2 text-sm">Provider</th>
                      <th className="px-2 py-2 text-sm">
                        Contract Requested Date
                      </th>
                      <th className="px-2 py-2 text-sm">Last Update Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditDatas.map((creditData, index) => (
                      <tr key={index} className="border-b">
                        <td>{index + 1}</td>
                        <td className="text-center text-sm">
                          {creditData.CBContractCode}
                        </td>
                        <td className="text-center text-sm">
                          {creditData.ContractTypeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {creditData.ContractPhaseDesc}
                        </td>
                        <td className="text-center text-sm">
                          {creditData.RoleDesc}
                        </td>
                        <td className="text-center text-sm">
                          {creditData.ProviderTypeCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {creditData.ProviderCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {creditData.ContractRequestDate}
                        </td>
                        <td className="text-center text-sm">
                          {creditData.LastUpdateDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Credit Details Data 2*/}
              <div className="p-4">
                <div>
                  <h4 className="text-title">
                    Credit / Financing Detail (Active, Closed, Closed in
                    Advanced)
                  </h4>
                  <div className="border-t-2 border-gray-300 my-2"></div>
                </div>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-2 py-2 text-sm">No</th>
                      <th className="px-2 py-2 text-sm">CB Contract Code</th>
                      {/* <th className="px-2 py-2 text-sm">
                        Provider Contract Number
                      </th> */}
                      <th className="px-2 py-2 text-sm">Contract Type</th>
                      <th className="px-2 py-2 text-sm">Contract Phase</th>
                      <th className="px-2 py-2 text-sm">Role</th>
                      <th className="px-2 py-2 text-sm">Start Date</th>
                      <th className="px-2 py-2 text-sm">Due Date</th>
                      {/* <th className="px-2 py-2 text-sm">Collaterals Counter</th>
                      <th className="px-2 py-2 text-sm">
                        Total Collateral Value
                      </th>
                      <th className="px-2 py-2 text-sm">Guarantors Counter</th> */}
                      <th className="px-2 py-2 text-sm">Provider Type</th>
                      <th className="px-2 py-2 text-sm">Provider</th>
                      <th className="px-2 py-2 text-sm">Debit Balance</th>
                      <th className="px-2 py-2 text-sm">Last Update Date</th>
                      {/* <th className="px-2 py-2 text-sm">
                        Linked Subjects List
                      </th>
                      <th className="px-2 py-2 text-sm">Note</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {grantedCredits.map((data, index) => (
                      <tr key={index} className="border-b">
                        <td>{index + 1}</td>
                        <td className="text-center text-sm">
                          {data.data1.CBContractCode}
                        </td>
                        {/* <td className="text-center text-sm">-</td> */}
                        <td className="text-center text-sm">
                          {data.data1.ContractTypeCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {data.data1.ContractPhaseDesc}
                        </td>
                        <td className="text-center text-sm">
                          {data.data1.RoleDesc}
                        </td>
                        <td className="text-center text-sm">
                          {data.data1.StartDate}
                        </td>
                        <td className="text-center text-sm">
                          {data.data1.DueDate}
                        </td>
                        {/* <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">-</td> */}
                        <td className="text-center text-sm">
                          {data.data1.ProviderTypeCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {data.data1.ProviderCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {data.data2.DebitBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </td>
                        <td className="text-center text-sm">
                          {data.data1.ReferenceDate}
                        </td>
                        {/* <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">-</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>

    )
}

export default Monitoring
