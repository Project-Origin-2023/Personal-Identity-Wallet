import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { LicenseLabel } from './LicenseLabel';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are Project Origin group, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Via Trieste, 63, 35121 Padova PD
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@info.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +39 111 111 1111
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
                Facebook
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
                Instagram
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
                Twitter
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            <LicenseLabel />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}