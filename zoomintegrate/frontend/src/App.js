import React from 'react';

import './App.css';
import { ZoomMtg } from '@zoom/meetingsdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  const authEndpoint = 'http://localhost:4000';  // Use const here instead of var
  const sdkKey = 'WWGB7O8DQ0OiIHTc0M4b9w';
  const meetingNumber = '432618253';
  const passWord = '';
  const role = 0;
  const userName = 'React';
  const userEmail = '';
  const registrantToken = '';
  const zakToken = '';
  const leaveUrl = 'http://localhost:3000';

  function getSignature(e) {
    e.preventDefault();

    fetch('http://localhost:4000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            meetingNumber: meetingNumber,
            role: role
        })
    })
    .then(res => res.json())
    .then(response => {
        console.log('Signature received:', response.signature); // Log received signature
        if (response.signature) {
            startMeeting(response.signature);
        } else {
            console.error('No signature received');
        }
    })
    .catch(error => {
        console.error('Error fetching signature:', error);
    });
}

function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
        leaveUrl: leaveUrl,
        patchJsMedia: true,
        leaveOnPageUnload: true,
        success: (success) => {
            console.log('ZoomMtg.init success:', success);

            ZoomMtg.join({
                signature: signature,
                sdkKey: sdkKey,
                meetingNumber: meetingNumber,
                passWord: passWord,
                userName: userName,
                userEmail: userEmail,
                tk: registrantToken,
                zak: zakToken,
                success: (success) => {
                    console.log('ZoomMtg.join success:', success);
                },
                error: (error) => {
                    console.error('ZoomMtg.join error:', error);
                    console.log('Mee');
                }
            });

        },
        error: (error) => {
            console.error('ZoomMtg.init error:', error);
        }
    });
}

  

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
