import * as React from "react";
import { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { useDragStore } from "@/stores/useDragStore";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchAppBar = () => {
  const { filterTodo } = useDragStore();
  const [inputValue, setInputValue] = React.useState("");

  const debouncedSearch = React.useCallback(
    debounce((nextValue) => {
      console.log("value", nextValue);
      filterTodo(nextValue);

      // initialMutation.mutate(nextValue);
    }, 1000),
    [], // Will be created only once initially
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setInputValue(nextValue);
    debouncedSearch(nextValue);
  };

  // useEffect(() => {debouncedSearch;}, [inputValue]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Filter"
        inputProps={{ "aria-label": "search" }}
        value={inputValue}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default SearchAppBar;
