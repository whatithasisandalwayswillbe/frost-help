# Your recovery phrase

Your recovery phrase is your encryption key, written as 24 words. It's the only way to read your backups.

> If you lose the recovery phrase and the computer, your backups are gone. Nobody can recover them: not your storage provider, not Permafrost and not the frost authors.

## Keeping it safe

Setup shows you the phrase when it creates your key. Write it down on paper, or keep it in a password manager you trust, and store it somewhere other than the computer you're backing up.

A copy also lives on your computer, in the `key` file in frost's config folder, so scheduled backups can run without you. Only your user can read it. Anyone who can read that file, or run programs as you, can read your backups, so use full-disk encryption and a screen lock.

To read your backups, someone needs both the phrase and access to your storage. Keep your storage keys private as well.

## Show it

```sh
frost key show
```

frost warns you first, and only shows the phrase after you type `show`. Make sure nobody's looking at your screen and you're not sharing it.

## Check your copy

```sh
frost key verify
```

Type the phrase you wrote down. frost tells you whether it's a valid phrase, whether it matches the key on this computer, and whether it opens your backups. It never prints the phrase. Check your copy now and then.

## Use it on another computer

`frost init` asks for the phrase when it connects to storage that already has your backups. To put it on a computer directly:

```sh
frost key import
```

If storage is set up, frost first checks that the phrase opens it. If a different key is already on the computer, frost asks before replacing it. Backups made with the old key need the old phrase to restore.

See [Recovering on a new computer](#new-computer) for the full steps.

## Typing the phrase

Type all 24 words in order, separated by spaces. Capital letters don't matter. The words come from the standard BIP39 English list of 2,048 words, so frost can tell you when one is misspelled:

| frost says | It means |
| --- | --- |
| that's 23 words, a recovery phrase has 24 | A word is missing or extra |
| word 5, "hapy", isn't a recovery phrase word | That word is misspelled |
| all the words are real, but they don't make a valid phrase | Two words are swapped, or one is a different real word |
| that's a valid phrase, but not the one for these backups | The phrase belongs to another set of backups |

## The key fingerprint

The fingerprint is a short ID, like `6f154dc10058`, that names your key without revealing it. `frost status` shows it, and the snapshot browser shows it when you press `[v]`. Two computers with the same fingerprint have the same key.

## Changing your key

frost can't change the key of backups you already have. If someone else may have seen your phrase, they can read those backups for as long as they can reach your storage, so change your storage keys and keep them private.
