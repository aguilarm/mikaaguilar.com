---
title: "Debouncing and Throttling React Events"
date: 2020-02-09
lastmod: 2020-02-09
description: "Why and how to throttle or debounce events in ReactJS."
draft: false
---

Throttling and debouncing events in React is something that is often overlooked and can usually save you from a significant amount of UI lag or jankiness. Doing either one is relatively simple but easy to implement incorrectly.

I think it may be useful to learn how these work by slowly evolving approaches until we land on a nice simple one.

## What's the Difference?

**Throttling** an event means 'do this at most once every x milliseconds'.\
It's best for something that is going to need to stay updated but might be doing some heavy lifting, like a scroll or mousemove handler. Even adding a 50ms throttle to your handlers can dramatically improve performance without sacrificing fidelity.

**Debouncing** is a little more tricky. A debounced handler will wait x milliseconds after the *last* event is triggered before doing anything. Any events that happen after the first one will reset the timer. Only the final event is sent to the handler.\
The most obvious use case for this is an autocompletion handler for a search input. Debouncing prevents loading results on each keypress and waits until the user has finished typing.

## Naive Approach

The very first thing we might do when trying to add debouncing or throttling to our components may be something like this:

```jsx
import { throttle } from 'lodash';

function Input() {
    const [throttledValue, setThrottledValue] = useState('');
    
    const handleChange = throttle(event => {
        setThrottledValue(event.target.value);
    }, 500)
    
    return (
        <div>
            <div>
                Throttled Value: {throttledValue}
            </div>
            <input onChange={handleChange} />
        </div>
    )
}
```

Then we [load it up](https://codesandbox.io/s/nifty-snow-1hlbr) and - what the heck? This doesnt throttle at all! It's pretty much equivalent to an onChange without any throttle wrapper on it. What gives?

This approach fails in a couple of ways. Most importantly, we're ignoring the fact that
functional components are called again each render. Here, that means we're redefining
`handleChange` every time the input is changed because that triggers another render.\
Ultimately we'll only call each instance of the throttled function once, because it's immediately re-defined next render.

## Less Wrong Approach

So, we're going to need to define our throttled function outside of the component body so that the reference remains the same. That might look something like this:

```jsx {linenos=true,hl_lines=["3-5", "15-17"]}
import { throttle } from 'lodash';

const handleInputChange = throttle((newValue, setValue) => {
    setValue(newValue);
}, 500);

function Input() {
    const [throttledValue, setThrottledValue] = useState('');
    return (
        <div>
            <div>
                Throttled Value: {throttledValue}
            </div>
            <input 
                onChange={event => 
                    handleInputChange(event.target.value, setThrottledValue)
                } 
            />
        </div>
    )
}
```

This time it works. Our value will only update to match the input once every 500 milliseconds, but it's a bit ugly and not super portable. We could stop here, but it sure seems like we could use hooks for this!

## Hooks Approach

It turns out, there already are hooks for this and there have been for quite some time now. Sweet! What's that look like?

```jsx harmony
import { useDebounce } from 'use-debounce';
import { useThrottle } from 'use-throttle';

function Input() {
  const [text, setText] = useState("Hello");
  const debouncedText = useDebounce(text, 1000);
  const throttledText = useThrottle(text, 1000);
  return (
    <div>
      <input
        defaultValue={"Hello"}
        onChange={e => {
          setText(e.target.value);
        }}
      />
      <p>Actual value: {text}</p>
      <p>Debounced value: {debouncedText}</p>
      <p>Throttled value: {throttledText}</p>
    </div>
  );
}
```

Ahh, super simple. This example is pulled directly from the [use-throttle README](https://github.com/bhaskarGyan/use-throttle), and can be played with [here](https://codesandbox.io/s/18yyn08y7).

The entire actual implementation for `use-throttle` is 24 lines:

```jsx harmony
import { useState, useEffect, useRef } from 'react';

export const useThrottle = (value, limit) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(
    () => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));

      return () => {
        clearTimeout(handler);
      };
    },
    [value, limit]
  );

  return throttledValue;
};
```

A nice combination of a couple of the core hooks to create a slim API for consumption on the other end.

### Conclusion

As it turns out, the easiest way to throttle or debounce React events happens to these hooks. 

If you are going to throttle something outside of React, lodash's throttle function nice so you dont have to write your own but you have to make sure you're paying attention to how you're instantiating it.
