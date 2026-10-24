# Installing Frost

Frost installs with one command on macOS, Linux and Windows. Each release includes its own runtime, so there's nothing else to install first.

## Supported systems

| System | Processors |
| --- | --- |
| macOS | Apple silicon (`arm64`) and Intel (`amd64`) |
| Linux | `amd64` and `arm64` |
| Windows | `amd64` and `arm64` |

There's no package for 32-bit ARM, like older Raspberry Pi systems. On Windows, WSL installs the Linux package.

## The installer

On macOS or Linux, run this in a terminal:

```sh
curl -fsSL https://getfro.st/install.sh | sh
```

On Windows, run this in PowerShell:

```powershell
irm https://getfro.st/install.ps1 | iex
```

The installer:

1. Downloads the latest release for your system.
2. Checks the release's signature and the download's checksum, and stops if either is wrong.
3. Installs Frost in your user profile, and puts a `frost` launcher in a folder on your `PATH`.

On macOS and Linux, it needs `curl` or `wget`, `ssh-keygen` from OpenSSH 8.1 or newer, and `sha256sum` or `shasum` for verification. On Windows, it needs Windows PowerShell 5.1, which comes with Windows 10 and 11, or PowerShell 7. It checks the signature with the runtime inside the release, once Windows confirms the OpenJS Foundation signed that runtime.

On macOS and Linux, the launcher goes in `/usr/local/bin` if you can write to it, and in `~/.local/bin` otherwise. If that folder isn't on your `PATH` yet, the installer prints the line that adds it. On Windows, the launcher goes in `%LocalAppData%\frost\bin`, and the installer adds that folder to your `PATH`. Terminals that were already open need restarting before they find `frost`.

The `curl` installer also works in Git Bash on Windows. There it needs `cygpath`, which Git Bash provides, extracts with `unzip` or PowerShell, and puts the launcher in `~/bin`.

When it's done, run `frost init` to set up your first backup. See [Setting up Frost](#setting-up).

## Installer options

| Variable | Does |
| --- | --- |
| `FROST_INSTALL_DIR` | Puts the launcher in this folder instead. The Windows installer leaves your `PATH` alone for it |
| `FROST_VERSION` | Installs this release, like `v0.1.0`, instead of the latest |

For example, on macOS or Linux:

```sh
curl -fsSL https://getfro.st/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

On Windows, set the variable first, in the same PowerShell window:

```powershell
$env:FROST_VERSION = 'v0.1.0'; irm https://getfro.st/install.ps1 | iex
```

Changing the launcher folder doesn't move Frost itself. [Files and folders](#files-and-folders) lists where everything goes.

## With npm or pnpm

If you already have Node.js 22 or newer, you can install Frost with npm:

```sh
npm install -g getfrost
```

Or with pnpm:

```sh
pnpm add -g getfrost
```

The package is called `getfrost`, and the command it gives you is `frost`. The first time you run `frost`, it downloads the release for your system, checks its signature and checksum like the installer does, and installs it in your user profile. Then it runs your command. After that, every `frost` command goes straight to the installed Frost, which keeps itself up to date.

With pnpm, run `pnpm setup` first if you haven't before, so pnpm's global commands are on your `PATH`.

## Installing by hand

1. Download the archive for your system from the [latest release](https://github.com/whatithasisandalwayswillbe/frost/releases/latest). Archive names look like `frost_0.1.0_linux_amd64.tar.gz`, with `.zip` on Windows.
2. Verify the download before you run anything from it, as shown under "Verifying a download" below.
3. Extract it into a new, empty folder.
4. Inside the extracted folder, run the bundled installer and give it the folder for the launcher.

On macOS or Linux:

```sh
./runtime/bin/node install.mjs "$PWD" "$HOME/.local/bin"
```

On Windows, in PowerShell:

```powershell
.\runtime\bin\node.exe .\install.mjs "$PWD" "$env:LOCALAPPDATA\frost\bin"
```

Then add the launcher folder to your `PATH` if it isn't there already. On Windows, `frost.cmd` works in Command Prompt and PowerShell, and `frost` works in Git Bash.

To run an extracted package without installing it, use its `frost` launcher (`frost.cmd` on Windows) directly, and keep all of its files together.

## Verifying a download

The installer does this for you. To check an archive yourself, download it with `checksums.txt` and `checksums.txt.sig` from the same release, and [`release-signing.pub`](https://github.com/whatithasisandalwayswillbe/frost/blob/main/install/release-signing.pub) from the repository. Set `archive` to the archive's file name, then run:

```sh
(
  set -e
  archive='frost_X.Y.Z_linux_amd64.tar.gz'
  printf 'frost-release %s\n' "$(cat release-signing.pub)" > allowed_signers
  ssh-keygen -Y verify -f allowed_signers -I frost-release -n file -s checksums.txt.sig < checksums.txt
  selected_checksum=$(awk -v archive="$archive" '$2 == archive { line = $0; count++ } END { if (count != 1) exit 1; print line }' checksums.txt)
  printf '%s\n' "$selected_checksum" | shasum -a 256 -c -
)
```

The commands stop if the signature is wrong or the signed list doesn't contain exactly one entry for your archive. The first check should print `Good "file" signature`, and the second should print `OK` after your archive's name. If either doesn't, don't install it.
