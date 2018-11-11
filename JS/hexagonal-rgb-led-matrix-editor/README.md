## Hexagonal LEDs matrix playground

`yarn start` to start.

## Working Demo page

Demo page is [over here](http://soswow.github.io/Various-JS-and-Python/JS/hexagonal-rgb-led-matrix-editor/build/).
The workflow is the following:
1. Specify overall size of you grid (one that would fit all the pixels)
2. Switch to "Strip enum mode"
3. Start selecting pixels in the order of your strip. From first to last.
4. Press "Leave only selected as active"
5. Press "Stringify state"
6. Copy the text somewhere. Next time you can paste it in and press "Parse state"
7. Choose your animation. Like "Matrix rain Mode"

Try this state:
```json
{
"rows":4,
"columns":9,
"isVerticalPattern":true,
"activeKeys":[null,true,null,null,null,null,null,true,null,true,true,true,true,null,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,null,null,null,true,true,true],
"stipIndexToGrid":[14,15,7,17,26,35,34,25,16,24,33,23,22,12,11,1,9,18,27,28,19,10,20,29,21]
}
```
  
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

