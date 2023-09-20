import React, { useState, useEffect, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import logo from "../assets/clik-logo.png";
import axios from "axios";
import XMLParser from "react-xml-parser";
import moment from "moment";
import { rupiah } from "../utils/functions";

const Home = () => {
  const [name, setName] = useState("");
  const [ktp_number, setKtpNumber] = useState("");
  const [gender, setGender] = useState("L");
  const [birth_date, setBirthDate] = useState(moment().format("YYYY-MM-DD"));
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState({});
  const [commonDatas, setCommonDatas] = useState([]);
  const [creditDatas, setCreditDatas] = useState([]);
  const [cellPhoneNumbers, setCellPhoneNumbers] = useState([]);
  const [contractNumbers, setContractNumbers] = useState([]);
  const [addressNumbers, setAddressNumbers] = useState([]);
  const [addressHistoryNumbers, setAddressHistoryNumbers] = useState([]);
  const labels = ['Credit / Financing', 'Bond / Securities', 'Irrevocable LC', 'Bank Guarantee', 'Other Facilities'];
  const url = process.env.REACT_APP_CLIK_BE_URL;

  const xmlData = `<soapenv:Envelope xmlns:urn="urn:cbs-messagegatewaysoap:2015-01-01" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header/>
      <soapenv:Body xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
         <urn:MGRequest>
            <urn:Message Idempotence="unique" TimeStamp="2018-11-26T14:42:47.662197+01:00" Id="767676" GroupId="55657" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
               <urn:Credential Id="LYGO4770" Password="-@6hKQ1?xu" Domain=""/>
            </urn:Message>
            <urn:Product Id="CB_ME_Product" Version="" ServiceId="CBG" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
               <cb:CB_ME_ProductInput xmlns:cb="urn:crif-creditbureau:v1">
                  <cb:Subject>
                     <cb:Individual DebtorGroupCodeInd="S14" Gender="${gender}" MarriageStatus="2" EducationalStatusCode="04">
                        <cb:IndividualName NameAsId="${name}" FullName="${name}" MothersName="" />
                 <cb:BirthData BirthDate="${birth_date}" BirthPlace="Bandung" />
                        <cb:Address Address="${address}" SubDistrict="" District="" City="" PostalCode="" Country=""/>
               <cb:IdentificationCode IdentityType="1" IdentityNumber="${ktp_number}" />
                        <cb:ID NPWP=""/>
                        <cb:Contact PhoneNumber="" CellphoneNumber="${phone_number}" EmailAddress=""/>
                     </cb:Individual>
                  </cb:Subject>
                  <cb:Purpose PurposeCode="10"/>
               </cb:CB_ME_ProductInput>
            </urn:Product>
         </urn:MGRequest>
      </soapenv:Body>
    </soapenv:Envelope>`;

  //     `<soapenv:Envelope xmlns:urn="urn:cbs-messagegatewaysoap:2015-01-01" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  // <soapenv:Header/>
  // <soapenv:Body xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  //    <urn:MGRequest>
  //       <urn:Message Idempotence="unique" TimeStamp="2018-11-26T14:42:47.662197+01:00" Id="767676" GroupId="55657" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
  //          <urn:Credential Id="LYGO4770" Password="-@6hKQ1?xu" Domain=""/>
  //       </urn:Message>
  //       <urn:Product Id="CB_ME_Product" Version="" ServiceId="CBG" xmlns="urn:cbs-messagegatewaysoap:2015-01-01">
  //          <cb:CB_ME_ProductInput xmlns:cb="urn:crif-creditbureau:v1">
  //             <cb:Subject>
  //                <cb:Individual DebtorGroupCodeInd="S14" Gender="P" MarriageStatus="2" EducationalStatusCode="04">
  //                   <cb:IndividualName NameAsId="ROSA UTARI" FullName="ROSA UTARI" MothersName="" />
  //            <cb:BirthData BirthDate="1995-08-15" BirthPlace="Bandung" />
  //                   <cb:Address Address="JL KYAI HAJI BASRI" SubDistrict="" District="" City="" PostalCode="" Country=""/>
  //          <cb:IdentificationCode IdentityType="1" IdentityNumber="3179895738878787" />
  //                   <cb:ID NPWP=""/>
  //                   <cb:Contact PhoneNumber="" CellphoneNumber="0898553289" EmailAddress=""/>
  //                </cb:Individual>
  //             </cb:Subject>
  //             <cb:Purpose PurposeCode="10"/>
  //          </cb:CB_ME_ProductInput>
  //       </urn:Product>
  //    </urn:MGRequest>
  // </soapenv:Body>
  // </soapenv:Envelope>`

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
        occupation: parser.getElementsByTagName('cb:EmploymentDataDesc')[0].attributes.OccupationDesc || '-',
        workplace: parser.getElementsByTagName('cb:EmploymentData')[1].attributes.Workplace || '-',
        employeeSector: parser.getElementsByTagName('cb:EmploymentDataDesc')[0].attributes.EmployerSectorDesc || '-',
        workplaceAddress: parser.getElementsByTagName('cb:EmploymentData')[1].attributes.WorkplaceAddress || '-',
        lastUpdatedDate: parser.getElementsByTagName('cb:EmploymentDataHistory')[0].attributes.LastUpdateDate || '-',
        //scoreData
        scoreRaw: parser.getElementsByTagName('cb:ScoreData')[0]?.attributes?.ScoreRaw || '-',
        scoreRange: parser.getElementsByTagName('cb:ScoreData')[0]?.attributes?.ScoreRange?.charAt(0) || '-',
        scoreMessage: parser.getElementsByTagName('cb:ScoreMessage')[0]?.attributes?.Description || '-',
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
    //contractNumbers
    const contractNumbers = parser.getElementsByTagName('cb:NumbersSummary');
    const updatedContractNumbers = contractNumbers.map(data => data.attributes || {});
    setContractNumbers(updatedContractNumbers);
    //commonData
    const commonDataNumbers = parser.getElementsByTagName('cb:CommonData');
    const updatedCommonDatas = commonDataNumbers.map(data => data.attributes || {});
    setCommonDatas(updatedCommonDatas);
    //creditData
    const creditDataNumbers = parser.getElementsByTagName('cb:NotGrantedContract');
    const updatedCreditDatas = creditDataNumbers.map(data => data.attributes || {});
    setCreditDatas(updatedCreditDatas);
    }
  }, [responseData]);
  const today = moment().format("YYYY-MM-DD");
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
                      name="date"
                      id="date"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={birth_date}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
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
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label for="phone_number">No Telp</label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={phone_number}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
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
      <div className='container max-w-screen-lg mx-auto flex justify-between'>
        {isLoading && <div>Loading...</div>}

        {isError ? <div style={{ color: 'red' }}>Error occurred!</div> : <div style={{ color: 'green' }}>Success!</div>}

        <a href="/monitoring-enquiry">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Monitoring List</button>
        </a>
    </div>
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
                <ul className="col-5">
                  <li className="mb-2">
                    <span>Occupation</span>
                    <b>{data.occupation}</b>
                  </li>
                  <li className="mb-2">
                    <span>Work Place</span>
                    <b>{data.workplace}</b>
                  </li>
                  <li className="mb-2">
                    <span>Employee Sector</span>
                    <b>{data.employeeSector}</b>
                  </li>
                  <li className="mb-2">
                    <span>Work Place Address</span>
                    <b>{data.workplaceAddress}</b>
                  </li>
                  <li className="mb-2">
                    <span>Last Update Date</span>
                    <b>{data.lastUpdatedDate}</b>
                  </li>
                </ul>
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
                      {data.scoreMessage}
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
                      <th className="px-2 py-2 text-sm">
                        Provider Contract Number
                      </th>
                      <th className="px-2 py-2 text-sm">Contract Type</th>
                      <th className="px-2 py-2 text-sm">Contract Phase</th>
                      <th className="px-2 py-2 text-sm">Role</th>
                      <th className="px-2 py-2 text-sm">Provider Type</th>
                      <th className="px-2 py-2 text-sm">Provider</th>
                      <th className="px-2 py-2 text-sm">
                        Contract Requested Date
                      </th>
                      <th className="px-2 py-2 text-sm">Last Update Date</th>
                      <th className="px-2 py-2 text-sm">
                        Linked Subjects List
                      </th>
                      <th className="px-2 py-2 text-sm">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditDatas.map((creditData, index) => (
                      <tr key={index} className="border-b">
                        <td>{index + 1}</td>
                        <td className="text-center text-sm">
                          {creditData.CBContractCode}
                        </td>
                        <td className="text-center text-sm">-</td>
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
                        <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">-</td>
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
                      <th className="px-2 py-2 text-sm">
                        Provider Contract Number
                      </th>
                      <th className="px-2 py-2 text-sm">Contract Type</th>
                      <th className="px-2 py-2 text-sm">Contract Phase</th>
                      <th className="px-2 py-2 text-sm">Role</th>
                      <th className="px-2 py-2 text-sm">Start Date</th>
                      <th className="px-2 py-2 text-sm">Due Date</th>
                      <th className="px-2 py-2 text-sm">Collaterals Counter</th>
                      <th className="px-2 py-2 text-sm">
                        Total Collateral Value
                      </th>
                      <th className="px-2 py-2 text-sm">Guarantors Counter</th>
                      <th className="px-2 py-2 text-sm">Provider Type</th>
                      <th className="px-2 py-2 text-sm">Provider</th>
                      <th className="px-2 py-2 text-sm">Last Update Date</th>
                      <th className="px-2 py-2 text-sm">
                        Linked Subjects List
                      </th>
                      <th className="px-2 py-2 text-sm">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonDatas.map((commonData, index) => (
                      <tr key={index} className="border-b">
                        <td>{index + 1}</td>
                        <td className="text-center text-sm">
                          {commonData.CBContractCode}
                        </td>
                        <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">
                          {commonData.ContractTypeCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {commonData.ContractPhaseDesc}
                        </td>
                        <td className="text-center text-sm">
                          {commonData.RoleDesc}
                        </td>
                        <td className="text-center text-sm">
                          {commonData.StartDate}
                        </td>
                        <td className="text-center text-sm">
                          {commonData.DueDate}
                        </td>
                        <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">
                          {commonData.ProviderTypeCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {commonData.ProviderCodeDesc}
                        </td>
                        <td className="text-center text-sm">
                          {commonData.ReferenceDate}
                        </td>
                        <td className="text-center text-sm">-</td>
                        <td className="text-center text-sm">-</td>
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
