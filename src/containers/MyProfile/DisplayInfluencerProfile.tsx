import React from "react";
import { Typography, Avatar, Button, Paper, Box, Divider } from "@mui/material";
import {
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaUserTag,
} from "react-icons/fa";
import EditIcon from "@mui/icons-material/Edit";

export const DisplayInfluencerProfile = ({ user, setEdit }: {user:any, setEdit:any}) => {
  console.log("Profile data", user);
  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-200 p-6 mt-5">
      <Paper
        elevation={6}
        className="flex flex-col p-8 rounded-2xl shadow-xl bg-white max-w-3xl w-[50%]"
      >
        <div>
          {" "}
          <div className="p-2 text-base font-medium w-full flex justify-end items-start">
            <EditIcon
              onClick={() => setEdit(true)}
              className="hover:cursor-pointer  text-blue-800 hover:text-blue-600"
            />
          </div>
        </div>
        <Box className="flex items-center justify-center gap-6">
          <Avatar
            className="w-32 h-32 border-4 border-primary-main shadow-md"
            src={`data:image/png;base64,${user.profile}`}
            alt="Profile Picture"
          />
          <Box className="flex flex-col gap-2">
            <Typography variant="h5" className="font-bold text-primary-dark">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography
              variant="subtitle1"
              className=" flex gap-2 items-center text-gray-600 "
            >
              <img
                src="https://ik.imagekit.io/varsh0506/Internship/instagram.png?updatedAt=1726943292562"
                alt="insta icon"
                className="w-5 h-5"
              />
              {user.insta_id}
            </Typography>
            <Typography className="font-medium text-primary-dark text-lg">
              {user.bio}
            </Typography>
            <Typography variant="body2" className="text-gray-700 mt-1">
              <span className="font-bold">Category :</span> {user.category}
            </Typography>
          </Box>
        </Box>

        <Divider className="my-4" />
        <div className="flex justify-evenly p-2">
          <Box className="grid grid-cols-1 justify-center gap-4 text-sm text-gray-700">
            <Typography>
              <FaPhoneAlt className="inline mr-2 text-green-600 text-xl" />
              {user.phone_number ? user.phone_number : "Phone not available"}
            </Typography>
            <Typography>
              <FaMapMarkerAlt className="inline mr-2 text-red-600 text-xl" />{" "}
              {user.city}, {user.state}
            </Typography>
            <Typography>
              <FaGlobe className="inline mr-2 text-blue-600 text-xl" />{" "}
              {user.country}
            </Typography>
          </Box>
          <Box className="grid grid-cols-1 justify-center text-center gap-4 text-sm text-gray-700">
            <Typography className="p-2 bg-green-600 rounded-lg font-medium text-white">
              Accepted Campaigns{" "}
              {user.accepted ? user.accepted : "No campaigns accepted"}
            </Typography>
            <Typography className="p-2 bg-blue-600 rounded-lg font-medium text-white">
              Ongoing Campaigns{" "}
              {user.ongoing ? user.ongoing : "No Live campaigns"}
            </Typography>
            <Typography className="p-2 bg-gray-600 rounded-lg font-medium text-white">
              Past Campaigns {user.past ? user.past : "No Past Campaigns"}
            </Typography>
          </Box>
        </div>
      </Paper>
    </Box>
  );
};
