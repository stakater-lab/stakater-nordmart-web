import React, {forwardRef, useMemo, useState} from 'react';
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  fade,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  OutlinedInputProps,
  Paper,
  Popper,
  styled
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {productSearchAPI} from "./store.service";
import {useAPI} from "./useAPI";
import {Subject} from "rxjs";
import {debounceTime, switchMap} from "rxjs/operators";
import {AnimatePresence} from "framer-motion";
import {SlideDown} from "../../shared/animation/slide-down";

export const ProductSearch = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const $query = useMemo(() => new Subject<string>(), []);
  const [query, setQuery] = useState<string>("");
  const search = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(evt.target.value);
    $query.next(evt.target.value);
  };

  const clearInput = () => {
    setQuery("");
    $query.next();
  }

  const $productSearch = useMemo(() => $query.pipe(debounceTime(300), switchMap(q => productSearchAPI(q))), [$query]);
  const [results, isLoading] = useAPI($productSearch, []);

  return (
    <>
      <SearchInput
        color="secondary"
        startAdornment={<Box paddingRight={1}><Search/></Box>}
        endAdornment={<Box minWidth="23px">
          {isLoading && <CircularProgress size={22} color={"primary"}/>}
        </Box>}
        placeholder="Search store"
        margin="dense"
        value={query}
        onChange={search}
        ref={setAnchorEl}
      />

      <Popper open={true} anchorEl={anchorEl} placement={'bottom-start'} modifiers={{
        offset: {
          enabled: true,
        }
      }}>

        <AnimatePresence>
          {results.length && (
            <SlideDown>
              <ClickAwayListener onClickAway={clearInput}>
                <Box minWidth={250}>
                  <Paper elevation={1}>
                    <List>
                      {results.map(p => (
                        <ListItem button key={p.itemId}>
                          <ListItemText>
                            {p.name}
                          </ListItemText>
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
    </>
  );
};

const SearchInput = styled(forwardRef(
  (props: OutlinedInputProps, ref: any) => <OutlinedInput {...props} ref={ref}/>))(({theme}) => ({
  backgroundColor: fade(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
  },
  color: "inherit",
}))
