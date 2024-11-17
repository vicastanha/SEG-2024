import { Card, CardContent, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
function SignLayout() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        backgroundColor: '#faf9f8'
      }}
    >
      <Card>
        <CardContent
          sx={{            
            padding: '4rem',            
            width: '20rem'
          }}
        >
          <Outlet />
        </CardContent>
      </Card>
    </Stack>
  )
}
export default SignLayout;