import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';

export function LicenseLabel(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'GNU GENERAL PUBLIC LICENSE '}
        <Link color="inherit" href="/">
        {import.meta.env.VITE_WEBAPP_NAME}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}