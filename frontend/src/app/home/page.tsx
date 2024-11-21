import { Avatar, Button, Card, CardContent, CardHeader, Chip, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import { AuthService } from "../../services/auth-service";
import { toast } from "react-toastify";


function HomePage() {
  const navigate = useNavigate();
  const { user, setUser, setFactorId, factorId } = useAuth();
  const [qrCode, setQrCode] = useState<string>('')
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [hasVerified, setHasVerified] = useState<boolean>(false);
  const [verifiedCode, setVerifiedCode] = useState<string>('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadFactor();
  }, []);

  const loadFactor = async () => {
    AuthService.mfa.getFactorId()
      .then(result => {
        if (result.factorID) {
          setHasVerified(true);
          setFactorId(result.factorID);
        }
      })
      .catch(error => {
        toast.error(String(error));
      });
  }

  const handleConfigure = async () => {
    AuthService.mfa.configure()
      .then(result => {
        if (result) {
          setFactorId(result.id);

          if (result.totp) {
            const { qr_code } = result.totp;
            setQrCode(qr_code);
            setOpenDialog(true);
          }
        }
      })
      .catch(error => {
        toast.error(String(error));
      });
  }

  const handleVerify = async () => {

    setLoading(true);

    AuthService.mfa.verifyCode(factorId, verifiedCode)
      .then(result => {
        if (result.user && result.user.factors) {
          if (result.user.factors[0].status == 'verified') {
            toast.success('Auntenticação Dois Fatores Habilitada');
            setHasVerified(true);
            setOpenDialog(false);
          }
        }
      })
      .catch(() => {
        toast.error('Código inválido!');
      })
      .finally(() => {
        setLoading(false)
      })

  }

  const handleRemove = async () => {
    AuthService.mfa.remove(factorId)
      .then(result => {
        if (result) setHasVerified(false);
      })
      .catch(error => {
        toast.error(String(error))
      });
  }

  const handleSignOut = () => {
    AuthService.signOut()
      .then(() => {
        setUser(null);
        navigate('/auth/sign-in', { replace: true })
      })
      .catch(error => {
        toast.error(String(error));
      });
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
        <CardHeader
          avatar={
            <Avatar alt={user?.name}></Avatar>
          }
          action={
            <Tooltip title="Fazer logout">
              <IconButton
                onClick={handleSignOut}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          }
          title={user?.name}
          subheader={user?.email}
        />
        <CardContent
          sx={{
            padding: '4rem',
            width: '30rem'
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              marginBottom: '1rem'
            }}
          >
            Autenticação Dois Passos
          </Typography>
          <TableContainer component={Paper}>
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
                    {hasVerified ? (
                      <Chip color="primary" label="Verificado" />
                    ) : (
                      <Chip label="Não Verificado" />
                    )}

                  </TableCell>
                  <TableCell align="center">
                    {hasVerified ? (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleRemove}
                      >
                        Remover
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={handleConfigure}
                      >
                        Configurar
                      </Button>
                    )}
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
              onChange={event => setVerifiedCode(event.target.value)}
            />
          <LoadingButton
            variant="contained"
            loading={loading}
            size="small"
              onClick={handleVerify}
          >
            Verificar
          </LoadingButton>
          </Stack>
        </DialogContent>
      </Dialog>

    </Stack>
  )
}

export default HomePage;