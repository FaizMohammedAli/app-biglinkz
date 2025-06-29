import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getPostStats } from "../../store/apiPaths";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const ViewCampaignInfluencers = (props: any) => {
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.data || props.data.length === 0) return;
    // Step 1: Create the URLs object
    const urlsObject = {
      urls: props.data
        .filter((item:any) => item.submission_url) // Filter out null submission_url
        .map((item:any) => item.submission_url), // Extract submission_url
    };

    // Step 2: Fetch likes and comments
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(getPostStats, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(urlsObject),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.status === "success") {
          const apiData = result.data;

          // Step 3: Merge propsData and apiData
          const combinedData = props.data.map((item:any) => {
            const apiItem = apiData.find(
              (api:any) => api.url === item.submission_url
            );
            return {
              ...item,
              likes: apiItem ? apiItem.likes : 0,
              comments: apiItem ? apiItem.comments : 0,
            };
          });

          setMergedData(combinedData);
          console.log("combined data", combinedData);
        } else {
          console.error("Failed to fetch stats:", result);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [props.data, getPostStats]);

  // Calculate total likes and comments
  const totalLikes = mergedData.reduce(
    (sum, item:any) => sum + (item.likes || 0),
    0
  );
  const totalComments = mergedData.reduce(
    (sum, item:any) => sum + (item.comments || 0),
    0
  );

  const formatNumber = (number:any) => {
    return number.toLocaleString();
  };

  const chartData = {
    labels: mergedData.map((item:any) => item.first_name), // Influencer names
    datasets: [
      {
        label: "Likes (in 10,000s)",
        data: mergedData.map((item:any) => item.likes / 10000), // Scale down further
        backgroundColor: "#6B65C7",
        borderColor: "#1E1A67",
        borderWidth: 1,
      },
      {
        label: "Comments (in 10,000s)",
        data: mergedData.map((item:any) => item.comments / 10000), // Scale down further
        backgroundColor: "#D86AB3",
        borderColor: "#8E3278",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, // Add smaller steps for tighter spacing
          maxTicksLimit: 15, // Limit the number of ticks
          callback: (value:any) => `${value}k`, // Adjust the tick labels for scaled values
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="mt-[200px] ml-[200px] text-xl font-semibold">
        Loading influencer list...
      </div>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2, marginLeft: "200px" }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
          color: "#2F289C",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Influencers List
      </Typography>
      {/* Card for Total Likes and Comments */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            marginBottom: 3,
            width: "50%",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography variant="h6" className="font-semibold">
              Overall Statistics
            </Typography>
            <Typography variant="body1">
              Total Likes: <strong>{formatNumber(totalLikes)}</strong>
            </Typography>
            <Typography variant="body1">
              Total Comments: <strong>{formatNumber(totalComments)}</strong>
            </Typography>
          </CardContent>
        </Card>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">First Name</TableCell>
              <TableCell className="font-semibold">Last Name</TableCell>
              <TableCell className="font-semibold">Instagram ID</TableCell>
              <TableCell className="font-semibold">Submission URL</TableCell>
              <TableCell className="font-semibold">Total Likes</TableCell>
              <TableCell className="font-semibold">Total Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mergedData.map((influencer:any, index) => (
              <TableRow key={index}>
                <TableCell>{influencer.first_name}</TableCell>
                <TableCell>{influencer.last_name}</TableCell>
                <TableCell>{influencer.insta_id}</TableCell>
                <TableCell>
                  {influencer.submission_url ? (
                    <a
                      href={influencer.submission_url}
                      target="_blank"
                      rel="noopener noreferrer no-referrer"
                      style={{ textDecoration: "none", color: "blue" }}
                    >
                      View Submission
                    </a>
                  ) : (
                    "Not Yet Submitted"
                  )}
                </TableCell>
                <TableCell>{formatNumber(influencer.likes)}</TableCell>
                <TableCell>{formatNumber(influencer.comments)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Bar
        data={chartData}
        options={chartOptions}
        style={{
          height: "300px",
          maxHeight: "300px",
          width: "500px",
          maxWidth: "500px",
        }}
        className="mx-auto mt-4"
      />
    </Paper>
  );
};
