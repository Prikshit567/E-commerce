import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom';
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from '../../Redux/slices/userSlice';
import { updatePassword, updatePasswordReset } from '../../Redux/slices/profileSlice';
import LockIcon from '@mui/icons-material/Lock';


const UpdatePassowrd = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const { user } = useSelector((state) => state.user);

    const { error, isUpdated } = useSelector((state) => state.profile);



    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

      
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
        console.log("Profile Updated form Submitted Successfully")
    }

    useEffect(() => {
      if(user){
        setLoading(false);

      }
        if (isUpdated) {
            console.log("isUpdatedValue",isUpdated)
            dispatch(loadUser());
            navigate("/account")
            dispatch(updatePasswordReset());
            setLoading(false)
        }
    }, [ error, isUpdated]);

    const handleCancel = () =>{
        navigate("/")
    }

  return (
    <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {/* <MetaData title="Update Profile" /> */}
            <div className="updatePasswordContainer">
              <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading">Update Profile</h2>
  
                <form
                  className="updatePasswordForm"
                  encType="multipart/form-data"
                  onSubmit={updatePasswordSubmit}
                >
                   <div className='signUpPassword'>
                        <LockIcon/>
                        <input 
                        type='password'
                        placeholder='Old Password'
                        required
                        name='oldPassword'
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className='signUpPassword'>
                        <LockIcon/>
                        <input 
                        type='password'
                        placeholder='New Password'
                        required
                        name='newPassword'
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
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
                    className="updatePasswordBtn"
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
        )}
      </Fragment>
    );
  };


export default UpdatePassowrd
