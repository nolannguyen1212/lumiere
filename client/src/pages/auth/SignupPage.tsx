import { Button, Grid, Link as MuiLink, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../../api/auth";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Gender, UserSignupPayload } from "../../type";

const genderOptions: { value: Gender; label: string }[] = [
  { value: "M", label: "Male" },
  { value: "FM", label: "Female" },
  { value: "N", label: "None" },
];

const emptyForm: UserSignupPayload = {
  username: "",
  email: "",
  password: "",
  password_confirm: "",
  firstname: "",
  lastname: "",
  date_of_birth: "",
  gender: "",
  phone: "",
};

export const SignupPage = () => {
  const [form, setForm] = useState<UserSignupPayload>(emptyForm);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedUp) {
      navigate("/login");
    }
  }, [isSignedUp, navigate]);

  const updateField = <K extends keyof UserSignupPayload>(field: K, value: UserSignupPayload[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await signup(form);
      setIsSignedUp(true);
      toast.success("Successfully Registered!");
    } catch {
      toast.error("Something bad happened!");
    }
  };

  if (isSignedUp) {
    return null;
  }

  return (
    <AuthLayout
      eyebrow="Join Us"
      title="Create your account"
      quote="Book your table, save your favorite dishes, and check out faster on your next visit."
    >
      <Typography variant="overline" color="secondary.dark">
        Account
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Sign Up
      </Typography>
      <Stack component="form" id="signup-form" onSubmit={handleSubmit} spacing={2.5}>
        <TextField
          label="Username"
          value={form.username}
          onChange={(event) => updateField("username", event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          fullWidth
        />

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="First Name"
              value={form.firstname}
              onChange={(event) => updateField("firstname", event.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Last Name"
              value={form.lastname}
              onChange={(event) => updateField("lastname", event.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Date Of Birth"
              value={form.date_of_birth}
              onChange={(event) => updateField("date_of_birth", event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Gender"
              value={form.gender}
              onChange={(event) => updateField("gender", event.target.value as Gender)}
              required
              fullWidth
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <TextField
          label="Phone"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          required
          fullWidth
        />

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Confirm password"
              type="password"
              value={form.password_confirm}
              onChange={(event) => updateField("password_confirm", event.target.value)}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        <Button id="signup" type="submit" variant="contained" size="large" fullWidth>
          Create account
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Already registered?{" "}
        <MuiLink component={Link} to="/login" underline="hover" sx={{ fontWeight: 700 }}>
          Sign In
        </MuiLink>
      </Typography>
    </AuthLayout>
  );
};
