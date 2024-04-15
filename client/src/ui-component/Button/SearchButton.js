import React, { useState } from "react";
import { Fab, TextField, Box } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"; // Corrected import
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = () => {
    if (startDate && endDate) {
      navigate(
        `/search?start_date=${format(
          startDate,
          "yyyy-MM-dd"
        )}&end_date=${format(endDate, "yyyy-MM-dd")}`
      );
    }
  };

  const disableInvalidDates = (date, isStartDate) => {
    if (isStartDate) {
      return endDate && date > endDate;
    } else {
      return startDate && date < startDate;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {" "}
      {/* Corrected Adapter */}
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
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  shouldDisableDate={(date) => disableInvalidDates(date, true)}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  shouldDisableDate={(date) => disableInvalidDates(date, false)}
                  sx={{
                    marginLeft: 1,
                  }}
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
    </LocalizationProvider>
  );
};

export default SearchButton;
