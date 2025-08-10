import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";

export function createTerminal(): Terminal {
const background = getComputedStyle(document.documentElement)
          .getPropertyValue("--card")
          .trim();
    
        const foreground = getComputedStyle(document.documentElement)
          .getPropertyValue("--foreground")
          .trim();
        const selectionBackground = getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim();
    
        const fontFamily = getComputedStyle(document.documentElement)
          .getPropertyValue("--font-geist-mono")
          .trim();
    
    
        const term = new Terminal({
          disableStdin: true,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          theme: {
            foreground,
            background,
            cursor: background,
            selectionBackground,
          },
        });
        const fitAddon = new FitAddon();
    
        //load Addons
        term.loadAddon(fitAddon);
    
        //Get Element
        const element = document.getElementById("terminal")!;
    
        //Opens element
        term.open(element);
        fitAddon.fit();
    
        //Resizing the Terminal just every 100 milliseconds if needed to maximize performance
        let resizeTimeout: string | number | NodeJS.Timeout | null | undefined =
          null;
        const xterm_resize_ob = new ResizeObserver(function (entries) {
          if (resizeTimeout) {
            clearTimeout(resizeTimeout);
          }
          resizeTimeout = setTimeout(() => {
            try {
              fitAddon && fitAddon.fit();
            } catch (err) {
              console.log(err);
            }
          }, 100);
        });
        xterm_resize_ob.observe(element);
    
        return term;
}