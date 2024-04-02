import React, { useState } from "react";
import { Fab, TextField, Box } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = () => {
    if (search) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
      <Fab color="primary" onClick={handleClick}>
        <Add />
      </Fab>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            style={{ position: "fixed", bottom: 70, right: 16 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 1,
                borderRadius: 1,
                backgroundColor: "white",
              }}>
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                placeholder="Search..."
              />
              <Fab
                color="primary"
                size="small"
                onClick={handleSearch}
                style={{ marginLeft: 8 }}>
                <Search />
              </Fab>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchButton;
