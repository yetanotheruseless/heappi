# Engine patches

`heappi.wasm` is built from [stencil-hq/dquickts](https://github.com/stencil-hq/dquickts) at commit `f9a3efa` with these seven patches applied in order:

```bash
git clone https://github.com/stencil-hq/dquickts.git && cd dquickts
git checkout f9a3efa
git am ../heappi/engine/patches/*.patch
make check            # the engine's test suite, including the chained-checkpoint hosts
```

Then `WASI_SDK=/path/to/wasi-sdk-25 ENGINE=../dquickts ./engine/build.sh` from the heappi directory. What the patches add: chained checkpoints (deltas against a base), fast-array elements written before properties, a base that does not pin its cells plus tombstones, two test hosts, the wasm32-wasi build, folds relative to an anchor layer, and applying chained checkpoints onto a live runtime.

## AnyAlignment fork

`heappi.wasm` on this branch is built from the lab's fork,
[yetanotheruseless/dquickts](https://github.com/yetanotheruseless/dquickts), branch
`heappi-patches-master` (commit `2738278`): upstream `stencil-hq/dquickts` master at
`b51e92c` with the same seven patches rebased on top (`git am -3`, no conflicts;
`make test-snapshot` and this repo's `npm test` both pass). Branch `heappi-patches`
there (tag `heappi-patches-v0`) is the original `f9a3efa` baseline with the patches
applied verbatim. Rebuild with:

```bash
ENGINE=../dquickts WASI_SDK=/path/to/wasi-sdk-25 ./engine/build.sh
```
