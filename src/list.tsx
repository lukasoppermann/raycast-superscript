import { showToast, Clipboard, Toast, showHUD } from "@raycast/api";
const superscript = require('superscript-text')

interface CommandProps {
  char: string;
}

import { getPreferenceValues } from "@raycast/api";
interface Preferences {
  paste: boolean;
  copy: boolean;
}

export default async function Command(props: { arguments: CommandProps }) {
  const { paste: pasteInApp, copy: copyToClipboard } = getPreferenceValues<Preferences>();
  const { char } = props.arguments
  const superChar = superscript(char)

  if (superChar) {

    if (pasteInApp === true) {
      await Clipboard.paste(superChar)
    }

    if (copyToClipboard === true) {
      await Clipboard.copy(superChar)
    }
    
    await showHUD(`${superChar} copied to clipboard`);
  } else {
    await showToast({
      style: Toast.Style.Failure,
      title: `Couldn't find superscript of ${char}`,
    });
  }
}