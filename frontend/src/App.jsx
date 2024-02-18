import './App.css'
import Routing from './Routing'
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId="763426279287-h00bd19f2l8i1ve8i19i7nngf2gj1han.apps.googleusercontent.com">    
        <Routing/>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
