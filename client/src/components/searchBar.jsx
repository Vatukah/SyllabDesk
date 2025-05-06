import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TextField, Button, Box } from "@mui/material";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (topic) params.append("topic", topic);
    navigate(`api/search?${params.toString()}`);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      px={1}
      bgcolor={"Background"}
      sx={{
      
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        maxWidth: "700px",
        margin: "0 auto",
      }}
      flexGrow={1}
    >
      <input
        type="text"
        placeholder="Search course..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 14px",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
        }}
      />
      
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ borderRadius: "8px", textTransform: "none", paddingX: 3 }}
      >
        Search
      </Button>
    </Box>
  );
}
