import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function NavigationBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Faker-File-UI
        </Typography>
        <Button color="inherit">
          <Link href="https://github.com/barseghyanartur/faker-file-ui" color="inherit">
            Source Code
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="https://github.com/barseghyanartur/faker-file-api" color="inherit">
            Faker-File API
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="https://github.com/barseghyanartur/faker-file" color="inherit">
            Faker-File
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
