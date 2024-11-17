import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function HomePage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [qrCode, setQrCode] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [factorId, setFactorId] = useState<string>('');
  const [hasVerified, setHasVerified] = useState<boolean>(false);
  const [verifiedCode, setVerifiedCode] = useState<string>('');


  useEffect(() => {
    loadFactor();
  }, []);

  const loadFactor = async () => {

  }

  const handleConfigure = async () => {

  }

  const handleVerify = async () => {

  }

  const handleRemove = async () => {

  }

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
            width: '30rem'
          }}
        >
          <Typography
            variant="h6"
            component="p"
            textAlign="center"
          >
            Seja bem vindo, {user?.name}
          </Typography>

          <TableContainer component={Paper}
            sx={{ marginTop: '2rem' }}>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Tipo</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    App Autenticador
                  </TableCell>
                  <TableCell align="center">

                    {/* TO-DO: Implementar aqui */}

                  </TableCell>
                  <TableCell align="center">
                    {/* TO-DO: Implementar aqui */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog}>
        <DialogTitle>Ler QRCode</DialogTitle>
        <DialogContent>
          <img src={qrCode} />
          <Stack
            direction="column"
            justifyContent="center"
            gap={1}
          >
            <TextField
              size="small"
              variant="outlined"
            />

            <Button
              variant="contained"
              size="small"
              onClick={handleVerify}
            >
              Verificar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default HomePage;