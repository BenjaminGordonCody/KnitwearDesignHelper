# Scratch
This is loose notes intended for me

## Questions for later
- gauge object determines the no of shaping rows using rounding. Is this going to cause problems?
- gauge object determines st counts without reference to pattern, this needs dealing with
- total st counts can't be worked out unless the distribution of larger/smaller decrease blocks has been decided. ie, much later in project. 
  - Option A: Estimate assuming equal distribution
  - Option B: Do it properly - is there a benefit to this?

## ideas
- at the moment, the visualiser uses a this logic to pick which shaping blocks have a an extra plain row:
``` 
if (blocks < object.blocksWithExtraPlainRow) {
      blocksize = object.standardBlockSize + 2;
    } else {
      blocksize = object.standardBlockSize;
  ```
- if the concat function which combines blocks  takes an optional arguament definingn how blocks are arranged (smooth, rampIn, bell etc) then the function could open with a case-switch which defined a truth function. Then the sorting function would only need to ref that boolean, and not be rewritten. ie
```
Ramp In
if (blocksize > (shorterBlocks/2) || blocksize > totalblocks - shorterBlocks/2)
```
- Would give concentrate your quick shaping at the ends. You could even use floor/ceiling to decide how to split odd numbers of fast shaped blocks.