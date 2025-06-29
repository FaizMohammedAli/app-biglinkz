//import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
//import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Card, CardContent, CardMedia } from "@mui/material";

export const ViewCampaignMetrics = (props: any) => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        marginLeft: "250px",
      }}
    >
      <Grid
        container
        rowSpacing={4}
        columnSpacing={0}
        sx={{ marginLeft: "50px" }}
      >
        <Grid item xs={6} sm={6} md={6}>
          <Card
            sx={{
              paddingLeft: "20px",
              borderRadius: "8px",
              //boxShadow: 1,
              height: "100%",
              width: "70%",
              display: "flex",
              //flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              //textAlign: "center",
              backgroundColor: "#e4eaf0",
              gap: "10px",
              //background: "linear-gradient(to right, #6B65C7,#D86AB3)",
            }}
            className="hover:shadow-2xl"
          >
            <img
              className="h-14"
              src="https://ik.imagekit.io/varsh0506/Internship/budget.png?updatedAt=1727034847785"
            />
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.dark" }}
                className="font-semibold"
              >
                Budget
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "secondary.dark", fontWeight: "bold" }}
              >
                {props.data.budget}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total budget of the campaign
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Card
            sx={{
              paddingLeft: "20px",
              borderRadius: "8px",
              //boxShadow: 1,
              height: "100%",
              width: "70%",
              display: "flex",
              //flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              //textAlign: "center",
              backgroundColor: "#e4eaf0",
              gap: "10px",
              //background: "linear-gradient(to right, #6B65C7,#D86AB3)",
            }}
            className="hover:shadow-2xl"
          >
            <img
              className="h-14"
              src="https://ik.imagekit.io/varsh0506/Internship/budget.png?updatedAt=1727034847785"
            />
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.dark" }}
                className="font-semibold"
              >
                Target Followers
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "secondary.dark", fontWeight: "bold" }}
              >
                {props.data.target_followers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target Followers of the campaign
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Card
            sx={{
              paddingLeft: "20px",
              borderRadius: "8px",
              //boxShadow: 1,
              height: "100%",
              width: "70%",
              display: "flex",
              //flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              //textAlign: "center",
              backgroundColor: "#e4eaf0",
              gap: "10px",
              //background: "linear-gradient(to right, #6B65C7,#D86AB3)",
            }}
            className="hover:shadow-2xl"
          >
            <img
              className="h-14"
              src="https://ik.imagekit.io/varsh0506/Internship/budget.png?updatedAt=1727034847785"
            />
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.dark" }}
                className="font-semibold"
              >
                Target Reach
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "secondary.dark", fontWeight: "bold" }}
              >
                {props.data.target_reach}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target Reach of the campaign
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Card
            sx={{
              paddingLeft: "20px",
              borderRadius: "8px",
              //boxShadow: 1,
              height: "100%",
              width: "70%",
              display: "flex",
              //flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              //textAlign: "center",
              backgroundColor: "#e4eaf0",
              gap: "10px",
              //background: "linear-gradient(to right, #6B65C7,#D86AB3)",
            }}
            className="hover:shadow-2xl"
          >
            <img
              className="h-14"
              src="https://ik.imagekit.io/varsh0506/Internship/budget.png?updatedAt=1727034847785"
            />
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "primary.dark" }}
                className="font-semibold"
              >
                Budget
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "secondary.dark", fontWeight: "bold" }}
              >
                {props.data.budget}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total budget of the campaign
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
