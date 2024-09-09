import React, { Fragment, useState, useRef, useEffect } from 'react'
import Loader from '../Loader/Loader'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./LoginSignUp.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import {useDispatch, useSelector} from "react-redux"
import { loginUser, registerUser } from '../../Redux/slices/userSlice';

const LoginSignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const[loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });
    const [profile, setProfile] = useState("./Profile.png");
    const [profilePreview, setProfilePreview] = useState("./Profile.png");

    const{ name, email, password} = user;

    const {loading, error, isAuthenticated} = useSelector((state)=>state.user);

    const loginTab =useRef();
    const registerTab = useRef();
    const switcherTab = useRef();

    const loginSubmit = (e) =>{
        e.preventDefault()
        dispatch(loginUser(loginEmail, loginPassword));
        console.log(loginEmail )
        console.log("Login form Submitted Successfully")
    }
    const signUpSubmit = (e) =>{
        e.preventDefault();
        const myForm = new FormData();
        
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("profile", profile);

        dispatch(registerUser(myForm));
        console.log("SignUp form Submitted Successfully")
    }
  
    const registerDataChange = (e) =>{
        if(e.target.name === "profile"){
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setProfilePreview(reader.result);
                    setProfile(reader.result)
                }
            };
                reader.readAsDataURL(e.target.files[0]);
                }
        else{
            setUser({...user , [e.target.name]:[e.target.value]})
        }
    } 
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    // console.log("redirect",redirect)
    // const redirect = new URLSearchParams(location.search).get('redirect') || '/account'; 

    useEffect(() => {
       if(isAuthenticated){
        navigate(redirect)
       }
      },[isAuthenticated, navigate, redirect]);

    const switchTabs = (e , tab) =>{
        if (tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        };
        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft");
        }

    }
  return (
    <Fragment>
        <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={(e)=>switchTabs(e,"login")} >LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")} >SignUp</p>
                    </div>
                    <button ref={switcherTab} ></button>
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit} >
                    <div className='loginEmail'>
                        <MailOutlineIcon/>
                        <input
                        type='email'
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword' >
                    <LockOpenIcon/>
                        <input 
                        type='password'
                        placeholder='password'
                        required
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/reset" > Forget password </Link>
                    <input className='loginBtn'  type='submit' value="Login" />
                </form>
                <form className='signUpForm' ref={registerTab}  encType="multipart/form-data" onSubmit={signUpSubmit} >
                    <div className='signUpName'>
                        <PersonOutlineIcon/>
                        <input 
                        type='text'
                        placeholder='Name'
                        required
                        name='name'
                        value={name}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div className='signUpEmail'>
                    <MailOutlineIcon/>
                        <input 
                        type='email'
                        placeholder='Email'
                        required
                        name='email'
                        value={email}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div className='signUpPassword'>
                        <LockIcon/>
                        <input 
                        type='password'
                        placeholder='Password'
                        required
                        name='password'
                        value={password}
                        onChange={registerDataChange}
                        />
                    </div>
                    <div id='registerImage' >
                        <img src={profilePreview} alt='Profile Preview' />
                        <input 
                        type='file'
                        name='profile'
                        accept="image/*"
                        onChange={registerDataChange}
                        />
                    </div>
                    <input type="submit" value="Register" className="signUpBtn" />
                </form>

            </div>
        </div>
    </Fragment>
  )
}

export default LoginSignUp
