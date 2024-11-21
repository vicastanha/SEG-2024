import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { AuthService } from "../../../services/auth-service";
function SignTwoFactorPage() {
  const navigate = useNavigate();
  const {factorId, setUser} = useAuth();
  //State - Loading
  const [loading, setLoading] = useState(false)
  const [verifiedCode, setVerifiedCode] = useState<string>('');
  const handleVerifyCode = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    AuthService.mfa.verifyCode(factorId, verifiedCode)
      .then(result => {
        setUser({
          uid: result.user.id,
          email: result.user.email || '',
          name: result.user.user_metadata?.name,                     
        })
        navigate('/', {replace: true})
      })
      .catch(()=> {
        toast.error('Codigo Inválido')
      })
      .finally(() => {
        setLoading(false);
      })
  }
  return (
    <form onSubmit={handleVerifyCode}>
      <Stack
        direction="column"
        alignItems="center"
        gap={1}
      >
        <Typography 
          variant="h5"
        >
          Autenticação 2 Fatores
        </Typography>
        <TextField
          id="verified-code"
          size="small"
          variant="outlined"
          onChange={event => setVerifiedCode(event.target.value)}
        />
        <LoadingButton 
          type="submit"
          variant="contained"
          size="large"
          loading={loading}
          sx={{
            marginTop: '2rem'
          }}
        >
          Verificar
        </LoadingButton>
      </Stack>
    </form>
  )
}
export default SignTwoFactorPage;