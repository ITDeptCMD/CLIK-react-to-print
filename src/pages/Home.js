import React, { useState, useEffect, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import logo from "../assets/clik-logo.png";
import axios from "axios";
import XMLParser from "react-xml-parser";
import moment from "moment";
import { rupiah } from "../utils/functions";
import {Link, Route, Routes} from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState("");
  const [ktp_number, setKtpNumber] = useState("");
  const [gender, setGender] = useState("L");
  const [birth_date, setBirthDate] = useState(moment().format("YYYY-MM-DD"));
  const [birth_place, setBirthPlace] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [responseData, setResponseData] = useState(null);
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
  const [combinedData, setCombinedData] = useState([]);
  const labels = ['Credit / Financing', 'Bond / Securities', 'Irrevocable LC', 'Bank Guarantee', 'Other Facilities'];
  const url = process.env.REACT_APP_CLIK_BE_URL;

  const today = moment().format("YYYY-MM-DD");
  const xmlData = 
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:cbs-messagegatewaysoap:2015-01-01">
	<soapenv:Header/>
	<soapenv:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
		<urn:MGRequest xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
			<urn:Message GroupId="2b668cb9-038e-413d-b9c2-dfbc38c4104f" Id="45397ed8-dbd7-4b61-aa0d-b497e88a9548" TimeStamp="2017-04-11T14:42:47.662197+01:00" Idempotence="unique" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
				<urn:Credential Domain="" Id="XOLI3937" Password="GE80H131k$"/>
			</urn:Message>
			<urn:Product ServiceId="CBG" Id="CB_NAE_Product" Version="" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
				<cb:CB_NAE_ProductInput xmlns:cb="urn:crif-creditbureau:v1">
					<cb:Subject SubjectRefDate="${today}">
						<cb:Individual DebtorGroupCodeInd="S14" Gender="${gender}" MarriageStatus="2" EducationalStatusCode="04">
							<cb:IndividualName NameAsId="${name}" FullName="${name}" MothersName="" />
							<cb:BirthData BirthDate="${birth_date}" BirthPlace="${birth_place}" />
							<cb:Address Address="${address}" SubDistrict="${subdistrict}" District="${district}" City="${city}" PostalCode="${zipcode}" Country="ID"/>
							<cb:IdentificationCode IdentityType="1" IdentityNumber="${ktp_number}" />
							<cb:ID NPWP="" />
							<cb:Contact PhoneNumber="${phone_number}" CellphoneNumber="${phone_number}" EmailAddress="" />
							<cb:EmploymentData JobCode="008" Workplace="Olihalus Medan" CodeOfBusiness="112000" WorkplaceAddress="Mega Kuningan Medan" /> 
						</cb:Individual>
					</cb:Subject>
					<cb:Application ContractCategoryCode="F01" ContractTypeCode="P05" ContractPhase="RQ" ContractRequestDate="${today}" Currency="IDR">
						<cb:Credit ApplicationAmount="10000000" DueDate="${today}" OriginalAgreementNumber="24" OriginalAgreementDate="${today}" />
						
					</cb:Application>
					<cb:Link Role="B" />
					<cb:ApplicationCodes ProviderContractNo="" ProviderApplicationNo="20101020" CBContractCode=""/>
					<cb:Purpose PurposeCode="10" />
				</cb:CB_NAE_ProductInput>
			</urn:Product>
		</urn:MGRequest>
	</soapenv:Body>
	</soapenv:Envelope>`

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setLoading(true);

    axios.post(`${url}/clik`, xmlData, {
        headers: {
          "Content-Type": "text/xml",
          // 'SOAPAction': 'https://uat-a2a.cbclik.com/Service.svc?singleWsdl/POST'
        },
      })
      .then((response) => {
        setResponseData(response.data);
        setError(false);
      })
      .catch((error) => {
        console.error("Error:", error);
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

//  const responseData = 
//  `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
//  <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
//    <MGResponse xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
//      <MessageResponse GroupId="2b668cb9-038e-413d-b9c2-dfbc38c4104f" Id="45397ed8-dbd7-4b61-aa0d-b497e88a9548"
//        TimeStamp="2017-04-11T20:42:47.662197+07:00" Idempotence="unique"
//        ExpirationTimeStamp="2023-11-16T08:17:52.010602Z" ResultLanguage="en-US" ResultCode="S"
//        ResultDescription="Success.">
//        <CredentialsResponse Domain="" Id="XOLI3937" Password="********" ResultLanguage="en-US" ResultCode="S"
//          ResultDescription="Success." />
//      </MessageResponse>
//      <ProductResponse ServiceId="CBG" Id="CB_NAE_Product" Version="CB_NAE_Product.2023-08-24.001"
//        ResultLanguage="en-US" ResultCode="S" ResultDescription="Success.">
//        <cb:CB_NAE_ProductOutput xmlns:cb="urn:crif-creditbureau:v1">
//          <cb:MessageId CBSMessageId="45397ed8-dbd7-4b61-aa0d-b497e88a9548" />
//          <cb:EnquiredData SubjectRefDate="2023-11-07">
//            <cb:Subject>
//              <cb:Individual Gender="L" GenderDesc="Male" MarriageStatus="1" MarriageStatusDesc="MARRIED">
//                <cb:IndividualName NameAsId="YUDHA SATRIA SAMOSIR" FullName="YUDHA SATRIA SAMOSIR" />
//                <cb:BirthData Date="1992-01-03" Place="P.SIANTAR" />
//                <cb:Address>
//                  <cb:Address Address="DUSUN I SIDORAME BARAT" SubDistrict="KLUMPANG KEBUN"
//                    District="HAMPARAN PERAK" City="3301" PostalCode="20374" Country="ID" />
//                  <cb:AddressDesc CityDesc="Kab. Deli Serdang" CountryDesc="INDONESIA" />
//                </cb:Address>
//                <cb:IdentificationCode>
//                  <cb:IdentificationCode IdentityType="1" IdentityNumber="1108221307970001" />
//                  <cb:IdentificationCodeDesc IdentityTypeDesc="ID CARD" />
//                </cb:IdentificationCode>
//                <cb:ID />
//                <cb:Contact CellphoneNumber="085377651276" />
//              </cb:Individual>
//            </cb:Subject>
//            <cb:Application ContractTypeCode="P05" ContractPhase="RQ" ContractRequestDate="20231107"
//              Currency="IDR">
//              <cb:Credit ApplicationAmount="10000000" DueDate="2023-11-07" OriginalAgreementNumber="24"
//                OriginalAgreementDate="2023-11-07" />
//            </cb:Application>
//            <cb:ApplicationDesc ContractTypeDesc="Credit Card" ContractPhaseDesc="Requested"
//              CurrencyDesc="Indonesian Rupiah" />
//            <cb:Link Role="B" />
//            <cb:LinkDesc RoleDesc="Borrower" />
//          </cb:EnquiredData>
//          <cb:ApplicationCodes ProviderApplicationNo="20101015" CBContractCode="945929892" />
//          <cb:CreditReport>
//            <cb:MatchedSubject ReferenceNo="1" CBSubjectCode="O06761879" FlagMatched="1">
//              <cb:Individual Gender="L" GenderDesc="Male" MarriageStatus="1" MarriageStatusDesc="MARRIED"
//                LastUpdateDate="2023-11-07">
//                <cb:IndividualName NameAsId="YUDHA SATRIA SAMOSIR" FullName="YUDHA SATRIA SAMOSIR" />
//                <cb:BirthData Date="1992-01-03" Place="P.SIANTAR" />
//                <cb:AddressHistory FlagCurrent="1" LastUpdateDate="2023-11-07">
//                  <cb:Address Address="DUSUN I SIDORAME BARAT" SubDistrict="KLUMPANG KEBUN"
//                    District="HAMPARAN PERAK" City="3301" PostalCode="20374" Country="ID" />
//                  <cb:AddressDesc CityDesc="Kab. Deli Serdang" CountryDesc="INDONESIA" />
//                </cb:AddressHistory>
//                <cb:IdentificationCode LastUpdateDate="2023-11-07">
//                  <cb:IdentificationCode IdentityType="1" IdentityNumber="1108221307970001" />
//                  <cb:IdentificationCodeDesc IdentityTypeDesc="ID CARD" />
//                </cb:IdentificationCode>
//                <cb:ID />
//                <cb:ContactHistory FlagCurrent="1" LastUpdateDate="2023-11-07">
//                  <cb:Contacts CellphoneNumber="085377651276" />
//                </cb:ContactHistory>
//              </cb:Individual>
//            </cb:MatchedSubject>
//            <cb:ContractsHistory>
//              <cb:AggregatedData ContractsNumber="1" ReportingProvidersNumber="1" TotalCreditLimit="0"
//                TotalPotentialExposure="10000000" TotalDebitBalance="0" TotalOverdue="0" Currency="IDR"
//                CurrencyDesc="Indonesian Rupiah" />
//              <cb:Credit>
//                <cb:NumbersSummary Requested="1" Active="0" Refused="0" Renounced="0" Closed="0" />
//                <cb:AmountsSummary ContractsCounter="0" CreditLimit="0" DebitBalance="0" Overdue="0" />
//                <cb:NotGrantedCredit>
//                  <cb:NotGrantedContract CBContractCode="C45920225" ContractType="P05"
//                    ContractTypeDesc="Credit Card" ContractPhase="RQ" ContractPhaseDesc="Requested"
//                    Role="B" RoleDesc="Borrower" ProviderTypeCode="0201"
//                    ProviderTypeCodeDesc="Financing Company" ProviderCode="261210"
//                    ProviderCodeDesc="PT Capella Multidana" ContractRequestDate="2023-11-07"
//                    DueDate="2023-11-07" CurrencyCode="IDR" CurrencyDesc="Indonesian Rupiah"
//                    LastUpdateDate="2023-11-07" ReferenceNo="1" />
//                  <cb:NotGrantedCredit ApplicationAmount="10000000" OriginalAgreementNumber="24"
//                    OriginalAgreementDate="2023-11-07" />
//                  <cb:LinkedSubject CBSubjectCode="S06760185" Name="ANGKIE NAJAR" Role="B"
//                    RoleDesc="Borrower" />
//                </cb:NotGrantedCredit>
//              </cb:Credit>
//              <cb:Bond>
//                <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0" />
//                <cb:AmountsSummary ContractsCounter="0" DebitBalance="0" Overdue="0" />
//              </cb:Bond>
//              <cb:LetterOfCredit>
//                <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0" />
//                <cb:AmountsSummary ContractsCounter="0" CreditLimit="0" DebitBalance="0" />
//              </cb:LetterOfCredit>
//              <cb:Guarantee>
//                <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0" />
//                <cb:AmountsSummary ContractsCounter="0" CreditLimit="0" DebitBalance="0" />
//              </cb:Guarantee>
//              <cb:OtherFacilities>
//                <cb:NumbersSummary Requested="0" Active="0" Refused="0" Renounced="0" Closed="0" />
//                <cb:AmountsSummary ContractsCounter="0" DebitBalance="0" Overdue="0" />
//              </cb:OtherFacilities>
//            </cb:ContractsHistory>
//            <cb:FootPrints Count1Month="1" Count3Months="1" Count6Months="1" Count12Months="1">
//              <cb:FootPrint PurposeCode="10" PurposeCodeDesc="Supporting the loan process"
//                EnquiryTypeCode="CB_NAE" EnquiryTypeDesc="New Application Enquiry"
//                EnquiryDate="2023-11-07" InstituteCode="261210" InstituteDesc="PT Capella Multidana" />
//            </cb:FootPrints>
//          </cb:CreditReport>
//          <cb:CBScore>
//            <cb:CBSGlocal>
//              <cb:ExclusionRule Code="E04" Description="Only Contracts too new to be rate - High Risk" />
//            </cb:CBSGlocal>
//          </cb:CBScore>
//        </cb:CB_NAE_ProductOutput>
//      </ProductResponse>
//    </MGResponse>
//  </s:Body>
// </s:Envelope>`

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
        scoreExclusion: parser.getElementsByTagName('cb:ExclusionRule')[0].attributes.Description || '-',
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
    const updatedAddressElements = Array.from(addressElements).slice(1, -1).map(data => data.attributes || {});
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
  
  function getBackgroundColorClass(scoreRange) {
    switch (scoreRange) {
      case "A":
        return "bg-red-600";
      case "B":
        return "bg-orange-600";
      case "C":
        return "bg-orange-500";
      case "D":
        return "bg-yellow-400";
      case "E":
        return "bg-yellow-400";
      case "F":
        return "bg-lime-300";
      case "G":
        return "bg-lime-500";
      case "H":
        return "bg-emerald-500";
      case "I":
        return "bg-emerald-700";
      case "J":
        return "bg-emerald-900";
      default:
        return "";
    }
  }

  const componenetRef = useRef();
  return (
    <div className="min-h-screen p-6 bg-gray-100 items-center justify-center">
    {/* form */}
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Data diri</p>
              <p className="font-medium text-lg my-2">New Enquiry / Data baru</p>
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
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="email">No KTP</label>
                    <input
                      type="number"
                      name="ktp_number"
                      id="ktp_number"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={ktp_number}
                      onChange={(e) => setKtpNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="email">Jenis Kelamin</label>
                    <select
                      id="small"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="L">Laki - laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                                        <label for="city">Tanggal Lahir</label>
                                        <input
                                            type="date"
                                            name="birth_date"
                                            id="birth_date"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={birth_date}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                            required />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="city">Tempat Lahir</label>
                                        <input
                                            type="text"
                                            name="birth_place"
                                            id="birth_place"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={birth_place}
                                            onChange={(e) => setBirthPlace(e.target.value)}
                                            required />
                                    </div>

                                    <div className="md:col-span-6">
                                        <label for="address">Alamat</label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="address">Kelurahan</label>
                                        <input
                                            type="text"
                                            name="subdistrict"
                                            id="subdistrict"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={subdistrict}
                                            onChange={(e) => setSubDistrict(e.target.value)}
                                            required />
                                    </div>

                                    <div className="md:col-span-3">
                                        <label for="address">Kecamatan</label>
                                        <input
                                            type="text"
                                            name="district"
                                            id="district"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={district}
                                            onChange={(e) => setDistrict(e.target.value)}
                                            required />
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
                                            onChange={(e) => setZipcode(e.target.value)}
                                            required />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label for="phone_number">No Telp</label>
                                        <input
                                            type="text"
                                            name="phpnenumber"
                                            id="phpnenumber"
                                            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            value={phone_number}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required />
                                    </div>

                  <div className="md:col-span-4 text-right">
                    <div className="inline-flex items-end mt-2">
                      <button
                        disabled={isButtonDisabled}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                          isButtonDisabled ? "cursor-not-allowed" : ""
                        }`}
                      >
                        Submit
                      </button>
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

        <Link to="/monitoring-enquiry">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Monitoring List</button>
        </Link>
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
                      className={`p-4 ${getBackgroundColorClass(
                        data.scoreRange
                      )}`}
                    >
                      {data.scoreExclusion}
                      {data.scoreMessage !== null ? data.scoreMessage : data.scoreExclusion}
                    </b>
                  </li>
                </ul>
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
  );
};

export default Home;
