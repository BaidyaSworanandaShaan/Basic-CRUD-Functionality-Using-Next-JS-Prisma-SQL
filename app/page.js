import Link from "next/link";
import { Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        gap: 2, // Adds spacing between buttons
      }}
    >
      <Link href="/blogs" passHref>
        <Button
          variant="contained"
          color="primary"
          sx={{ paddingX: 6, paddingY: 2 }}
        >
          VIEW BLOGS
        </Button>
      </Link>
      <Link href="/blogs/add" passHref>
        <Button
          variant="contained"
          color="primary"
          sx={{ paddingX: 6, paddingY: 2 }}
        >
          ADD NEW BLOGS
        </Button>
      </Link>
    </Box>
  );
}
