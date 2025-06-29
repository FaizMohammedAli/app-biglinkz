import React from "react";
import {
  Typography,
  Avatar,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import {
  MdEmail,
  MdPublic,
  MdLocationOn,
  MdFlag,
  MdCategory,
} from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import EditIcon from "@mui/icons-material/Edit";

export const DisplayBusinessProfile = ({
  business,
  setEdit,
}: {
  business: any;
  setEdit: (val: boolean) => void;
}) => {
  const {
    name,
    email,
    website,
    insta_id,
    city,
    state,
    country,
    category,
    active,
    total,
    past,
  } = business;

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-300 p-4 mt-8">
      <Card className="max-w-lg rounded-2xl shadow-2xl bg-white p-6 w-[100%]">
        <CardContent>
          <div className="p-2 text-base font-medium w-full flex justify-end items-start">
            <EditIcon
              onClick={() => setEdit(true)}
              className="hover:cursor-pointer  text-blue-800 hover:text-blue-600"
            />
          </div>
          {/* Name and Category Centered */}
          <div className="text-center mb-4">
            <Typography variant="h4" className="font-bold text-gray-800">
              {name}
            </Typography>
            <Typography variant="body1" className="text-gray-500">
              {category}
            </Typography>
          </div>

          {/* Divider */}
          <hr className="border-gray-300 my-4" />

          {/* Two-Column Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column: Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MdEmail className="w-5 h-5 mr-2 text-purple-600" />
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </div>

              <div className="flex items-center text-gray-600">
                <MdPublic className="w-5 h-5 mr-2 text-blue-600" />
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {website}
                </a>
              </div>

              <div className="flex items-center text-gray-600">
                <FaInstagram className="w-5 h-5 mr-2 text-pink-500" />
                <a
                  href={`https://instagram.com/${insta_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @{insta_id}
                </a>
              </div>

              <div className="flex items-center text-gray-600">
                <MdLocationOn className="w-5 h-5 mr-2 text-green-500" />
                {city}, {state}, {country}
              </div>
            </div>

            {/* Right Column: Campaign Stats */}
            <div className="space-y-3 text-center">
              <Typography className="p-2 bg-green-600 rounded-lg font-medium text-white">
                Total Campaigns {total}
              </Typography>
              <Typography className="p-2 bg-blue-600 rounded-lg font-medium text-white">
                Ongoing Campaigns {active}
              </Typography>
              <Typography className="p-2 bg-gray-600 rounded-lg font-medium text-white">
                Past Campaigns {past}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
