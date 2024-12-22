import { createEffect, createSignal } from "solid-js";

const alphabet = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=:;<>,\"";
const randomChar = () => alphabet[Math.floor(Math.random() * alphabet.length)];

function sleep(ms: number) {
  return new Promise(_ => setTimeout(_, ms));
}

function range(length: number) {
  return [...Array(length).keys()];
}

const options = {
  duration: 50,
  revealDuration: 80,
  initialRandomDuration: 300
} as const;

export function EncryptedText(props: {text: string, id?: string}) {
  const [animatedText, setAnimatedText] = createSignal("");
  const randomText = () => props.text.split("").map(randomChar).join("");

  createEffect(async () => {
    setAnimatedText(randomText());

    const end = Date.now() + options.initialRandomDuration;
    while (Date.now() < end) {
      await sleep(options.duration);
      setAnimatedText(randomText());
    }

    for (const i of range(props.text.length)) {
      await sleep(options.revealDuration);
      setAnimatedText(prev => {
        const revealed = props.text.slice(0, i + 1);
        const encrypted = prev.slice(i + 1).split("").map(randomChar).join("");
        return `${revealed}${encrypted}`
      })
    }
  });

  return <div data-part="encrypted-text" {...props} class="relative inline-block">{animatedText()}</div>
}
