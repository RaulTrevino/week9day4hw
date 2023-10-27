import {Route, Routes, Link, useNavigate} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CharacterLookup from './components/GOT';
import Layout from './components/navbar';


function App() {
 
  return (

    
    <div >
     <h1 className="text-3xl font-bold underline">

     </h1>
    <AuthContextProvider> 
    <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='account' element={(<Layout><ProtectedRoute><Account/></ProtectedRoute></Layout>)}/>
        <Route path="characters" element={(<Layout> <CharacterLookup/></Layout> )} />
      
      </Routes>
      
      </AuthContextProvider>
    </div>
  );
}



// 

export default App;
