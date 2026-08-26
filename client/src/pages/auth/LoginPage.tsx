import { Button, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../api/auth";
import { useLogin } from "../../hooks/useLogin";
import { AuthLayout } from "../../components/auth/AuthLayout";

export const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const [, setCookie] = useCookies(["access-token", "refresh-token", "isLoggedIn"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const { access_token, refresh_token } = await login({ email, password });
      setCookie("access-token", access_token, { path: "/", secure: true });
      setCookie("refresh-token", refresh_token, { path: "/", secure: true });
      setCookie("isLoggedIn", true, { path: "/", secure: true });
      toast.success("Logged In!");
      setIsLoggedIn(true);
      navigate("/");
    } catch {
      toast.error("Your Email Or Password is Incorrect!");
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <AuthLayout
      eyebrow="Fine Dining"
      title="Welcome back"
      quote="Sign in to manage your reservations, favorite dishes, and past orders at Lumière."
    >
      <Typography variant="overline" color="secondary.dark">
        Account
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Sign In
      </Typography>
      <Stack component="form" id="login-form" onSubmit={handleSubmit} spacing={2.5}>
        <TextField name="email" label="Email" type="email" required fullWidth />
        <TextField name="password" label="Password" type="password" required fullWidth />
        <Button id="login" type="submit" variant="contained" size="large" fullWidth>
          Log in
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Not registered?{" "}
        <MuiLink component={Link} to="/signup" underline="hover" sx={{ fontWeight: 700 }}>
          Create an account
        </MuiLink>
      </Typography>
    </AuthLayout>
  );
};
