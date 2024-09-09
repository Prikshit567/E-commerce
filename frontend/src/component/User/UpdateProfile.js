import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom';
import "./UpdateProfile.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from '../../Redux/slices/userSlice';
import { updateProfile, updateProfileReset } from '../../Redux/slices/profileSlice';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState("./Profile.png");
    const [profilePreview, setProfilePreview] = useState("./Profile.png");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true)

    const { user } = useSelector((state) => state.user);

    const { error, isUpdated } = useSelector((state) => state.profile);



    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("profile", profile);

        dispatch(updateProfile(myForm));
        console.log("Profile Updated form Submitted Successfully")
        console.log("url",user.profile.url)
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setProfilePreview(user.profile.url);
            setLoading(false);
          }
        if (isUpdated) {
            console.log("isUpdatedValue",isUpdated)
            dispatch(loadUser());
            navigate("/account")
            dispatch(updateProfileReset());
            setLoading(false)

        }
    }, [ error, user, isUpdated]);


    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilePreview(reader.result);
                setProfile(reader.result)
            }
        };  
        reader.readAsDataURL(e.target.files[0]);
    };

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
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <PersonOutlineIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
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
  
                  <div id="updateProfileImage">
                    <img src={profilePreview} alt="Profile Preview" />
                    <input
                      type="file"
                      name="profile"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
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

export default UpdateProfile
