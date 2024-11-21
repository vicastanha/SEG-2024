import { LoadingButton } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Traco } from "../../components/ui/traco";
import { IUser } from "../../../@libs/types";
import { AuthService } from "../../../services/auth-service";
import { toast } from "react-toastify";

function SignUpPage() {
  const navigate = useNavigate();

  //State - Loading
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    AuthService.signUp(user)
      .then(() => {
        toast.success('Conta criada com sucesso!')
        navigate('/auth/sign-in')
      })
      .catch(error => {
        toast.error(String(error))
      })
      .finally(() => {
        setLoading(false)
      });   
  }

  return (
    <form onSubmit={handleSignUp}>
      <Stack
        direction="column"
        alignItems="center"
        gap={1}
      >
        <Typography 
          variant="h5"
        >
          Crie uma Conta
        </Typography>
        <Typography 
          variant="subtitle1"
          sx={{
            marginBottom: '2rem'
          }}
        >
          Ainda não tem uma conta?
        </Typography>

        <TextField 
          label="Nome Completo"
          required
          fullWidth
          value={user.name}
          onChange={event => setUser({ ...user, name: (event.target as HTMLInputElement).value })} />


        <TextField 
          label="E-mail"
          type="email"
          required
          fullWidth
          value={user.email}
          onChange={event => setUser({ ...user, email: (event.target as HTMLInputElement).value })} />

        <TextField 
          label="Senha"
          required
          fullWidth
          type="password"
          value={user.password}
          onChange={event => setUser({ ...user, password: (event.target as HTMLInputElement).value })} />

        <LoadingButton 
          type="submit"
          variant="contained"
          size="large"
          loading={loading}
          sx={{
            marginTop: '2rem'
          }}
        >
          Criar Conta
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
          Faça o Login
        </Typography>
        <Typography 
          variant="subtitle1"
        >
          Já tem uma conta?
        </Typography>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/auth/sign-in')}
          sx={{
            marginTop: '2rem'
          }}
        >
          Acessar a Conta
        </Button>
      </Stack>
    </form>
  )
}

export default SignUpPage;