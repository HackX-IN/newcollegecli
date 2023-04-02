import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import About from './Component/About/About';
import AdminCourses from './Component/Admin/Admin Courses/AdminCourses';
import CreateCourse from './Component/Admin/CreateCourse/CreateCourse';
import Dashboard from './Component/Admin/DashBoard/Dashboard';
import Users from './Component/Admin/Users/Users';
import Forgetpass from './Component/Auth/Forgetpass';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import ResetLink from './Component/Auth/ResetLink';
import Contact from './Component/Contact/Contact';
import CoursePage from './Component/Coursepage/CoursePage';
import Courses from './Component/Courses/Courses';
import { Home } from './Component/Home/Home';
import Footer from './Component/Layout/footer/Footer';
import Header from './Component/Layout/Header/Header';
import NotFound from './Component/Layout/NotFound';
import PaymentFail from './Component/Payment/PaymentFail';
import PaymentSuccess from './Component/Payment/PaymentSuccess';
import Subscribe from './Component/Payment/Subscribe';
import ChangePassword from './Component/Profile/ChangePassword';
import Prodile from './Component/Profile/Prodile';
import UpdateProfile from './Component/Profile/UpdateProfile';
import Request from './Component/Request/Request';
import toast,{Toaster} from 'react-hot-toast';
import { loadUser } from './redux/actions/userAction';
import {ProtectedRoute} from 'protected-route-react'
import Loader from './Component/Layout/Loader';


function App() {
  window.addEventListener("contextmenu",(e)=>{
    e.preventDefault()
  })


  const { isAuthenticated , user,message,error,loading}=useSelector( state=> state.user)

  const dispatch=useDispatch()
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }

    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }


  },[dispatch,error,message]);
  

  useEffect(() => {

    dispatch(loadUser());

    
  }, [dispatch])
  


  return (
  <Router>
    {
      loading?(<Loader/>)
      :(
        <>
        <Header isAuthenticated={isAuthenticated} user={user}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/course' element={<Courses/>}/>
      <Route path='/course/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
        <CoursePage user={user}/>
      </ProtectedRoute>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
        <Prodile user={user}/>
      </ProtectedRoute>}/>
      <Route path='/changepassword' element={<ProtectedRoute  isAuthenticated={isAuthenticated}>
        <ChangePassword/>
      </ProtectedRoute>}/>
      <Route path='/updateprofile' element={<ProtectedRoute  isAuthenticated={isAuthenticated}>
        <UpdateProfile user={user}/>
      </ProtectedRoute>}/>
      <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
        <Login/>
      </ProtectedRoute>}/>
      <Route path='/signup' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
        <Register/>
      </ProtectedRoute>}/>
      <Route path='/forgetpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
        <Forgetpass/>
      </ProtectedRoute>}/>
      <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
        <ResetLink/>
      </ProtectedRoute>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/request' element={<Request/>}/>
      <Route path='/subscribe' element={<ProtectedRoute  isAuthenticated={isAuthenticated}>
        <Subscribe user={user}/>
      </ProtectedRoute>}/>
      <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
      <Route path='/paymentfail' element={<PaymentFail/>}/>
      <Route path='*' element={<NotFound/>}/>

      {/*Admin Routes*/}
      
      <Route path='/admin/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} 
      adminRoute={true} isAdmin={user && user.role==="admin"}>
        <Dashboard/>
      </ProtectedRoute>}/> 
      <Route path='/admin/createcourses' element={<ProtectedRoute isAuthenticated={isAuthenticated} 
      adminRoute={true} isAdmin={user && user.role==="admin"}>
        <CreateCourse/>
      </ProtectedRoute>}/> 
      <Route path='/admin/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} 
      adminRoute={true} isAdmin={user && user.role==="admin"}>
        <Users/>
      </ProtectedRoute>}/> 
      <Route path='/admin/courses' element={<ProtectedRoute isAuthenticated={isAuthenticated} 
      adminRoute={true} isAdmin={user && user.role==="admin"}>
        <AdminCourses/>
      </ProtectedRoute>}/> 



    </Routes>
    <Footer/>
    <Toaster/>
        </>
      )

    }
    
  </Router>

  );
}

export default App;
