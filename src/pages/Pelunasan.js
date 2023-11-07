import React from 'react'

function Pelunasan() {
  return (
    <div>
        <h1>Pelunasan</h1>
        <button>Print this table</button>
        <table>
            <tr>
                <td>Logo</td>
                <td>KWITANSI</td>
                <td>
                    <p>No. Kwitansi     : ...........................</p>
                    <p>No. Pelanggan    : ...........................</p>
                    </td>
            </tr>
            {/* <tr>
                <td>Telah terima dari</td>
                <td>KWITANSI</td>
                <td>
                    <p>No. Kwitansi     : ...........................</p>
                    <p>No. Pelanggan    : ...........................</p>
                    </td>
            </tr> */}
            <tr>
                    <td>
                        <p>Kwitansi Nomor</p>
                    </td>
                    <td colspan="4">
                        <p>:</p>
                    </td>
                    <td ></td>
                    <td rowspan="7"></td>
                    <td rowspan="7">
                        <img width="110px;" src=""/>
                    </td>
                </tr>
        </table>
    </div>
  )
}

export default Pelunasan