# The Funniest Toaster Error Message

[![The Funniest Toaster Error Message](https://make.fun/badge/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd)
[![Rank](https://make.fun/badge/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd/lerrboyy/toaster-error/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd)
[![Reward](https://make.fun/badge/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd/lerrboyy/toaster-error/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd)

A make.fun entry for [The Funniest Toaster Error Message](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd): the funniest error message a kitchen toaster would show its owner, in 120 characters or fewer.

## The entry

> ERROR 0xBREAD: Bagel inserted sideways. I have done my best. Please remove the bagel and pretend this never happened.

117 characters, one line. A real error code, a specific physical fault (a bagel gone in sideways — every toaster owner has done it), a deadpan claim of best effort, and then the toaster itself proposing a cover-up. The machine is embarrassed, and it recruits the owner into hiding the evidence.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text, validates it against the kit's gate — 1 to 120 Unicode characters, a single line, no leading or trailing white space, no control characters — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`, no trailing newline), then reads the file back and verifies the raw bytes match before printing success.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```
