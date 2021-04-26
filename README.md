# New Relic Apdex Board - Code Challange

New Relci Apdex Board is a application that provides a dashboard of hosted applications

## Usage

### Install 
```
npm i
```

### Run application
```
npm run serve
```

### Build 
```
npm run build
```

### Test
```
npm run test
```

## Sorting algorithm 

The used sorting algorithm relies on the fact that the apdex is an integer positive number. 
- First, all the applications with the same apdex are grouped (using Frequency counter)
- The output from the first step is in the following format
```
{
    apdex3: [app1, app2 ...etc],
    apdex1: [app3, app5 ...ech],
    ...etc
}
```
- Then sorting the keys from the output above will give a sorted array 
- The complexity is **O(n + 100) ~ O(n)**
