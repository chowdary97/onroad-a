import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Firebase from 'firebase';

const AnyReactComponent = ({ text }) => <div style={{ display: "flex", height: '30px', width: '30px', justifyContent: "center", alignItems: "center" }} >
  <div style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }} >
    <div style={{ height: '20px', width: '20px', borderRadius: '50px', backgroundColor: '#367dd5' }} >{text}</div>
  </div>
</div>;

const firebaseConfig = {
  apiKey: "AIzaSyDSaYuHlpFznfk_nhTcitcoGG-8QUGK1ec",
  authDomain: "onroad3-e593b.firebaseapp.com",
  databaseURL: "https://onroad3-e593b-default-rtdb.firebaseio.com",
  projectId: "onroad3-e593b",
  storageBucket: "onroad3-e593b.appspot.com",
  messagingSenderId: "587064425563",
  appId: "1:587064425563:web:99aac8f9a9a8b7cae9137e",
  measurementId: "G-5VFLZ6SK9T"
}

Firebase.initializeApp(firebaseConfig);

const App = () => {



  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('cid');
  console.log(id);

  useEffect(() => {

    Firebase.database()
      .ref('/users/7351NO6cQdNTu57wNLQeyD4srf63/')
      .on('value', snapshot => {
        const data = snapshot.val();
        console.log(data.latitude);
        setLat(data.latitude);
        setLng(data.longitude);
      });
  })

  if (lat === 0 && lng === 0) {

    return (
      <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor: "green" }} >
        <h>Please Wait ... </h>
      </div>
    );
  } else {
    return (

      <div style={{ height: '100vh', width: '100%', backgroundColor: 'yellow' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBqFuNz0gvqEjI0ymFGFX6r3Vwpir91dVk' }}
          defaultCenter={{ lat: lat, lng: lng }}
          defaultZoom={15}
        >
          {/* <div style={{height:'15vh',width:'5hh',backgroundColor:'green'}} >hello</div> */}
          <AnyReactComponent
            lat={lat}
            lng={lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }


}
export default App;