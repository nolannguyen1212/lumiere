import { Chip, Container, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MenuGrid } from "../../components/MenuGrid/MenuGrid";
import { categoryPath, MENU_CATEGORIES } from "../../constants/menuCategories";
import { useSearch } from "../../hooks/useSearch";

export const Menu = () => {
  const { category } = useParams();
  const { searchParams } = useSearch();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        {category ?? "Our Menu"}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", justifyContent: "center", mb: 4, rowGap: 1 }}>
        <Chip
          label="All"
          color={category ? "default" : "secondary"}
          variant={category ? "outlined" : "filled"}
          onClick={() => navigate("/menu")}
        />
        {MENU_CATEGORIES.map((item) => (
          <Chip
            key={item}
            label={item}
            color={category === item ? "secondary" : "default"}
            variant={category === item ? "filled" : "outlined"}
            onClick={() => navigate(categoryPath(item))}
          />
        ))}
      </Stack>
      <MenuGrid pageSize={15} category={category} name={searchParams} />
    </Container>
  );
};
