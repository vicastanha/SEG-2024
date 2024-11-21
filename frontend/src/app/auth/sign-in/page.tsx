import { LoadingButton } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Traco } from "../../components/ui/traco";
import { ICredential } from "../../../@libs/types";
import { AuthService } from "../../../services/auth-service";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";


function SignInPage() {
  const navigate = useNavigate();

  const { setUser, setFactorId } = useAuth();

  //State - Loading
  const [loading, setLoading] = useState(false)

  const [credential, setCredential] = useState<ICredential>({
    username: '',
    password: ''
  });

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    AuthService.signIn(credential)
      .then(result => {

        const currentUser = {
            uid: result.user.id,
            email: result.user.email || '',
            name: result.user.user_metadata?.name
        };

        AuthService.mfa.getFactorId()
          .then(result => {
            if (result.factorID) {
              setFactorId(result.factorID);
              navigate('/auth/two-factor', { replace: true  })
            } else {
              setUser(currentUser)
              navigate('/', { replace: true  })
            }
          })
        
      })
      .catch(() => {
        toast.error('Credencial inválida');
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form onSubmit={handleSignIn}>
      <Stack
        direction="column"
        alignItems="center"
        gap={1}
      >
        <Typography 
          variant="h5"
        >
          Faça o Login
        </Typography>
        <Typography 
          variant="subtitle1"
          sx={{
            marginBottom: '2rem'
          }}
        >
          Já tem uma conta?
        </Typography>

        <TextField 
          label="Usuário"
          required
          fullWidth
          value={credential.username}
          onChange={event => setCredential({ ...credential, username: (event.target as HTMLInputElement).value })} />

        <TextField 
          label="Senha"
          required
          fullWidth
          type="password"
          value={credential.password}
          onChange={event => setCredential({ ...credential, password: (event.target as HTMLInputElement).value })} />

        <LoadingButton 
          type="submit"
          variant="contained"
          size="large"
          loading={loading}
          sx={{
            marginTop: '2rem'
          }}
        >
          Acessar
        </LoadingButton>

        <Stack
          justifyContent="space-between"
          direction="row"
          sx={{
            width: '100%',
            margin: '1.2rem 0'
          }}
        >
          <Traco />
          <Typography 
            component="h5"
            sx={{
              margin: '0 8px'
            }}
          >
            OU
          </Typography>
          <Traco />
        </Stack>

        <Typography 
          variant="h5"
        >
          Crie uma Conta
        </Typography>
        <Typography 
          variant="subtitle1"
        >
          Ainda não tem uma conta?
        </Typography>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/auth/sign-up')}
          sx={{
            marginTop: '2rem'
          }}
        >
          Criar Conta
        </Button>
      </Stack>
    </form>
  )
}

export default SignInPage;