import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom';
import "./ForgetPassword.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from '../../Redux/slices/userSlice';
import { forgetPassword } from '../../Redux/slices/profileSlice';

const ForgetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true)
    const { user } = useSelector((state) => state.user);

    const { error, isUpdated } = useSelector((state) => state.profile);


    const forgetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

     
        myForm.set("email", email);

        dispatch(forgetPassword(myForm));
        console.log(`Forget password Link has been sent Successfully on email ${email}`)
    }

    useEffect(() => {
        if (user) {
            setLoading(false);
          }
        if (isUpdated) {
            console.log("isUpdatedValue",isUpdated)
            navigate("/reset")
            dispatch(forgetPassword());
            setLoading(false)

        }
    }, [ error, user, isUpdated]);

    const handleCancel = () =>{
        navigate("/login")
    }


  return (
    <Fragment>
    {/* <MetaData title="Update Profile" /> */}
    <div className="forgetPasswordContainer">
      <div className="forgetPasswordBox">
        <h2 className="forgetPasswordHeading">Forget Password</h2>

        <form
          className="forgetPasswordForm"
          encType="multipart/form-data"
          onSubmit={forgetPasswordSubmit}
        >
         
          <div className="forgetPasswordEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Submit"
            className="forgetPasswordBtn"
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

export default ForgetPassword
