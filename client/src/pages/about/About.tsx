import { Box, Container, Divider, Typography } from "@mui/material";

const sections = [
  {
    title: "Our Story",
    body: "Lumière opened its doors with a simple idea: that modern European cooking, built on honest seasonal ingredients, deserves a room as considered as the food. Every plate that leaves our kitchen is meant to feel personal, not performative.",
  },
  {
    title: "The Chef",
    body: "Our kitchen is led by a chef trained in classical French technique who spent a decade cooking across Paris and Lyon before bringing that discipline home. The menu changes with the seasons, but the standard for what leaves the pass never does.",
  },
  {
    title: "Careers",
    body: "We're always glad to hear from people who care about craft, whether in the kitchen or the dining room. Send a note and a bit about yourself to careers@lumiere-restaurant.com.",
  },
  {
    title: "Press",
    body: "For interviews, features, or photography requests, reach our team at press@lumiere-restaurant.com.",
  },
];

export const About = () => (
  <Container maxWidth="md" sx={{ py: { xs: 5, sm: 8 } }}>
    <Typography variant="overline" color="secondary.dark">
      About
    </Typography>
    <Typography variant="h3" sx={{ mb: 4 }}>
      About Lumière
    </Typography>
    {sections.map((section, index) => (
      <Box key={section.title} sx={{ mb: index < sections.length - 1 ? 5 : 0 }}>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {section.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {section.body}
        </Typography>
        {index < sections.length - 1 && <Divider sx={{ mt: 5 }} />}
      </Box>
    ))}
  </Container>
);
