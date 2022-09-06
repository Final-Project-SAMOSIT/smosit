import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

export function rawStringToHtml(raw: string) {
  try {
    const object = JSON?.parse(raw || "");

    return draftToHtml(convertToRaw(convertFromRaw(object)));
  } catch (err) {
    return draftToHtml(convertToRaw(ContentState.createFromText(raw)));
  }
}
