# Installing frost

frost installs with one command on macOS, Linux and Windows. Each release includes its own runtime, so there's nothing else to install first.

## Supported systems

| System | Processors |
| --- | --- |
| macOS | Apple silicon (`arm64`) and Intel (`amd64`) |
| Linux | `amd64` and `arm64` |
| Windows | `amd64` and `arm64` |

There's no package for 32-bit ARM, like older Raspberry Pi systems. On Windows, WSL installs the Linux package.

## The installer

On macOS or Linux, run this in a terminal. On Windows, run it in Git Bash.

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | sh
```

The installer:

1. Downloads the latest release for your system.
2. Checks the release's signature and the download's checksum, and stops if either is wrong.
3. Installs frost in your user profile, and puts a `frost` launcher in a folder on your `PATH`.

It needs `curl` or `wget`, `ssh-keygen` from OpenSSH 8.1 or newer, and `sha256sum` or `shasum` for verification. Extraction uses `tar` on macOS and Linux, and `unzip` or PowerShell on Windows. Git Bash provides `cygpath`, which the Windows installer also needs.

The launcher goes in `/usr/local/bin` if you can write to it, and in `~/.local/bin` otherwise. On Windows it goes in `~/bin`. If that folder isn't on your `PATH` yet, the installer prints the line that adds it.

When it's done, run `frost init` to set up your first backup. See [Setting up frost](#setting-up).

## Installer options

| Variable | Does |
| --- | --- |
| `FROST_INSTALL_DIR` | Puts the launcher in this folder instead |
| `FROST_VERSION` | Installs this release, like `v0.1.0`, instead of the latest |

For example:

```sh
curl -fsSL https://raw.githubusercontent.com/whatithasisandalwayswillbe/frost/main/install/install.sh | FROST_INSTALL_DIR="$HOME/bin" sh
```

Changing the launcher folder doesn't move frost itself. [Files and folders](#files-and-folders) lists where everything goes.

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
