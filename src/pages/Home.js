import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';

const Home = () => {
  const [name, setName] = useState('');
  const [ktp_number, setKtpNumber] = useState('');
  const [gender, setGender] = useState('L');
  const [birth_date, setBirthDate] = useState(moment().format('YYYY-MM-DD'));
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [responseData, setResponseData] = useState(null);

  const headers = {
    'Content-Type': 'text/xml',
    'Access-Control-Allow-Origin': '*'
  };

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
                 <cb:Individual DebtorGroupCodeInd="S14" Gender=${gender} MarriageStatus="2" EducationalStatusCode="04">
                    <cb:IndividualName NameAsId=${name} FullName="" MothersName="" />
             <cb:BirthData BirthDate=${birth_date} BirthPlace="" />
                    <cb:Address Address=${address} SubDistrict="" District="" City="" PostalCode="" Country=""/>
           <cb:IdentificationCode IdentityType="1" IdentityNumber=${ktp_number} />
                    <cb:ID NPWP=""/>
                    <cb:Contact PhoneNumber="" CellphoneNumber=${phone_number} EmailAddress=""/>
                 </cb:Individual>
              </cb:Subject>
              <cb:Purpose PurposeCode="10"/>
           </cb:CB_ME_ProductInput>
        </urn:Product>
     </urn:MGRequest>
  </soapenv:Body>
</soapenv:Envelope>`
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://uat-a2a.cbclik.com/Service.svc?singleWsdl', xmlData, { headers })
      .then(response => {
        setResponseData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
      });
  };
  
  return (
  <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Data diri</p>
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
                    onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="md:col-span-3">
                  <label for="email">No KTP</label>
                  <input 
                    type="number" 
                    name="ktp_number" 
                    id="ktp_number" 
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                    value={ktp_number} 
                    onChange={(e) => setKtpNumber(e.target.value)}/>
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
                    onChange={(e) => setBirthDate(e.target.value)}/>
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

                <div className="md:col-span-2">
                  <label for="phone_number">No Telp</label>
                  <input 
                    type="text" 
                    name="zipcode" 
                    id="zipcode" 
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                    value={phone_number} 
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
        
                <div className="md:col-span-4 text-right">
                  <div className="inline-flex items-end mt-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  </div>
                </div>
              </div>
            </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  
  )
}

export default Home
