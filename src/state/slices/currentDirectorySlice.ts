import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DirectoryContent } from "../../types";
import { RootState } from "../store";
import _ from "lodash";

export interface CurrentDirectoryState {
  contents: DirectoryContent[];
  currentSelectedIdx?: number;
}

const initialState: CurrentDirectoryState = { contents: [] };

export const currentDirectorySlice = createSlice({
  name: "contextMenu",
  initialState,
  reducers: {
    updateDirectoryContents: (
      state,
      action: PayloadAction<DirectoryContent[]>
    ) => {
      state.contents = action.payload;
    },

    selectContentIdx: (state, action: PayloadAction<number>) => {
      state.currentSelectedIdx = action.payload;
    },
    unselectDirectoryContents: (state) => {
      state.currentSelectedIdx = undefined;
    },
  },
});

export const {
  updateDirectoryContents,
  unselectDirectoryContents,
  selectContentIdx,
} = currentDirectorySlice.actions;
export const selectDirectoryContents = (state: RootState) =>
  state.currentDirectory.contents;
export const selectCurrentSelectedContentIdx = (state: RootState) =>
  state.currentDirectory.currentSelectedIdx;
export default currentDirectorySlice.reducer;
