import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  fade,
  List,
  ListItem, ListItemAvatar,
  ListItemText,
  OutlinedInput,
  OutlinedInputProps,
  Paper,
  Popper,
  styled,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { AnimatePresence } from "framer-motion";
import { SlideDown } from "../../shared/animation/slide-down";
import { Product } from "../store/Product";
import debounce from "lodash/debounce";
import { productSearchAPI } from "../store/store.service";
import { Subscription } from "rxjs";
import {IMAGE_MAP} from "../store/product-images";

export const ProductSearch = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const subscription = useRef<Subscription>();

  const search = useCallback(
    debounce((query: string) => {
      subscription.current?.unsubscribe();

      if (!query) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      subscription.current = productSearchAPI(query).subscribe(
        (products) => {
          setResults(products);
          setIsLoading(false);
        },
        undefined,
        () => {
          setIsLoading(false);
        },
      );

      return () => {
        subscription.current?.unsubscribe();
      };
    }, 300),
    [],
  );

  const clearSearch = () => {
    setResults([]);
    setQuery("");
  };

  useEffect(() => {
    search(query);
  }, [query]);

  return (
    <>
      <SearchInput
        color="secondary"
        startAdornment={
          <Box paddingRight={1}>
            <Search />
          </Box>
        }
        endAdornment={<Box minWidth="23px">{isLoading && <CircularProgress size={22} color={"primary"} />}</Box>}
        placeholder="Search store"
        margin="dense"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={setAnchorEl}
      />

      {anchorEl && (
        <Popper
          open={true}
          anchorEl={anchorEl}
          placement={"bottom-start"}
          modifiers={{
            offset: {
              enabled: true,
            },
          }}
        >
          <AnimatePresence>
            {results.length && (
              <SlideDown>
                <ClickAwayListener onClickAway={clearSearch}>
                  <Box minWidth={250}>
                    <Paper elevation={1}>
                      <List>
                        {results.map((p) => (
                          <ListItem button key={p.itemId}>
                            <ListItemAvatar>
                              <img src={IMAGE_MAP[p.name]}/>
                            </ListItemAvatar>
                            <ListItemText>{p.name}</ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Box>
                </ClickAwayListener>
              </SlideDown>
            )}
          </AnimatePresence>
        </Popper>
      )}
    </>
  );
};

const SearchInput = styled(forwardRef((props: OutlinedInputProps, ref: any) => <OutlinedInput {...props} ref={ref} />))(
  ({ theme }) => ({
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    color: "inherit",
  }),
);
