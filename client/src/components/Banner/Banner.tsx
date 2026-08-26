import { Box, Button, Container, Fade, IconButton, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryPath } from "../../constants/menuCategories";

const AUTO_ADVANCE_MS = 6000;
const SLIDE_HEIGHT = { xs: 480, sm: 560, md: 620 };

interface Slide {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaTo: string;
  image?: string;
}

const slides: Slide[] = [
  {
    eyebrow: "Fine Dining",
    title: "Lumière",
    body: "Modern European cuisine crafted with seasonal ingredients, served in an atmosphere of quiet elegance.",
    ctaLabel: "View Menu",
    ctaTo: "/menu",
    image: "https://images.unsplash.com/photo-1651440204216-548382747b40?w=1600&h=900&fit=crop&auto=format&q=80",
  },
  {
    eyebrow: "For the Table",
    title: "Tasting Menu for Two",
    body: "Five courses built around what's best this week, with wine pairing suggestions. A shared evening, done properly.",
    ctaLabel: "View Combos & Set Menus",
    ctaTo: categoryPath("Combos & Set Menus"),
    image: "https://images.unsplash.com/photo-1663530761401-15eefb544889?w=1600&h=900&fit=crop&auto=format&q=80",
  },
  {
    eyebrow: "Join Us",
    title: "An Evening at Lumière",
    body: "Private dining, weekend tables, or a quiet dinner for two — we recommend booking ahead.",
    ctaLabel: "Reserve a Table",
    image: "https://images.unsplash.com/photo-1760533536461-714a23877e2d?w=1600&h=900&fit=crop&auto=format&q=80",
    ctaTo: "/contact",
  },
];

export const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  const goTo = (nextIndex: number) => setIndex((nextIndex + slides.length) % slides.length);

  return (
    <Box sx={{ position: "relative", height: SLIDE_HEIGHT, bgcolor: "primary.main", overflow: "hidden" }}>
      {slides.map((slide, slideIndex) => (
        <Fade key={slide.title} in={slideIndex === index} timeout={600}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              color: "primary.contrastText",
              backgroundImage: slide.image
                ? `linear-gradient(0deg, rgba(28,22,17,0.75), rgba(28,22,17,0.55)), url(${slide.image})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="overline" sx={{ color: "secondary.main", display: "block", mb: 2 }}>
                  {slide.eyebrow}
                </Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: "2.25rem", md: "3.25rem" }, mb: 3 }}>
                  {slide.title}
                </Typography>
                <Box sx={{ width: 80, height: 2, bgcolor: "secondary.main", mx: "auto", mb: 3 }} />
                <Typography variant="body1" sx={{ mb: 5, opacity: 0.9, maxWidth: 480, mx: "auto" }}>
                  {slide.body}
                </Typography>
                <Button component={Link} to={slide.ctaTo} variant="contained" color="secondary" size="large">
                  {slide.ctaLabel}
                </Button>
              </Box>
            </Container>
          </Box>
        </Fade>
      ))}

      <IconButton
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        sx={{ position: "absolute", top: "50%", left: { xs: 4, sm: 16 }, transform: "translateY(-50%)", color: "#fff" }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        sx={{ position: "absolute", top: "50%", right: { xs: 4, sm: 16 }, transform: "translateY(-50%)", color: "#fff" }}
      >
        <KeyboardArrowRight />
      </IconButton>

      <Box sx={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 1 }}>
        {slides.map((slide, slideIndex) => (
          <Box
            key={slide.title}
            component="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            onClick={() => goTo(slideIndex)}
            sx={{
              width: slideIndex === index ? 20 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              bgcolor: slideIndex === index ? "secondary.main" : "rgba(255,255,255,0.4)",
              transition: "width 0.2s ease, background-color 0.2s ease",
              p: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
