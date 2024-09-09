import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
import { useNavigate,useParams } from 'react-router-dom';
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from '../../Redux/slices/userSlice';
import { resetPassword, updatePasswordReset } from '../../Redux/slices/profileSlice';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {
    const {token} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

   
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const { user } = useSelector((state) => state.user);

    const { error, success } = useSelector((state) => state.profile);

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
        console.log("Password Changed Successfully")
        navigate('/login')
    }


    useEffect(() => {
        if(success){
          setLoading(false);
          navigate("/login")
  
        }
         
      }, [ success]);
  
      const handleCancel = () =>{
          navigate("/login")
      }
  
  return (
    <Fragment>
            {/* <MetaData title="Update Profile" /> */}
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Profile</h2>
  
                <form
                  className="resetPasswordForm"
                  encType="multipart/form-data"
                  onSubmit={resetPasswordSubmit}
                >
                    <div className='signUpPassword'>
                        <LockIcon/>
                        <input 
                        type='password'
                        placeholder='New Password'
                        required
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div className='signUpPassword'>
                        <LockIcon/>
                        <input 
                        type='password'
                        placeholder='Confirm Password'
                        required
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>
                 
  
                 
                  <input
                    type="submit"
                    value="Change"
                    className="resetPasswordBtn"
                  />
                   <input
                    type="submit"
                    value="Cancel"
                    className="cancelBtn"
                    onSubmit={handleCancel}
                  />
                </form>
              </div>
            </div>
          </Fragment>
  )
}

export default ResetPassword
