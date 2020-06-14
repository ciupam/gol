!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n={};function i(e){return s(e)||u(e)||a(e)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(e,t){if(e){if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}function u(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function s(e){if(Array.isArray(e))return l(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t,r){return t&&c(e.prototype,t),r&&c(e,r),e}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e,t,r){var n=t.get(e);if(!n)throw new TypeError("attempted to set private field on non-instance");if(n.set)n.set.call(e,r);else{if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=r}return r}function p(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}r.r(n),r.d(n,"getDifference",(function(){return k})),r.d(n,"waitSomeTime",(function(){return T})),r.d(n,"initSharedGrid",(function(){return j})),r.d(n,"setNextShareState",(function(){return I})),r.d(n,"calcNextState",(function(){return M}));var v=function(){function e(){f(this,e),g.set(this,{writable:!0,value:void 0}),b.set(this,{writable:!0,value:void 0}),m.set(this,{writable:!0,value:void 0}),w.set(this,{writable:!0,value:void 0}),A.set(this,{writable:!0,value:void 0})}return h(e,[{key:"initSharedGrid",value:function(e,t,r,n,i){if(!(e instanceof SharedArrayBuffer&&t instanceof SharedArrayBuffer&&r instanceof SharedArrayBuffer))throw new TypeError("SharedGrid.constructor requires instance of SharedArrayBuffer as first, second and third argument");y(this,w,n),y(this,A,i),y(this,g,new Int8Array(e)),y(this,b,new Int8Array(t)),y(this,m,new Int8Array(r))}},{key:"gridToWrite",value:function(){return Atomics.load(p(this,m),0)?p(this,b):p(this,g)}},{key:"gridToDisplay",value:function(){return Atomics.load(p(this,m),0)?p(this,g):p(this,b)}},{key:"clearGrid",value:function(t){for(var r=0;r<p(this,w);r++)for(var n=0;n<p(this,A);n++)this.setCell(t,r,n,e.DEAD_CELL)}},{key:"randomizeGrid",value:function(t){for(var r=0;r<p(this,w);r++)for(var n=0;n<p(this,A);n++)Math.random()>.5?this.setCell(t,r,n,e.DEAD_CELL):this.setCell(t,r,n,e.ALIVE_CELL)}},{key:"getCell",value:function(e,t,r){if(!(e instanceof Int8Array))throw new TypeError("SharedGrid.getCell requires Int8Array as first argument");var n=t>=p(this,w)?0:t<0?p(this,w)-1:t,i=r>=p(this,A)?0:r<0?p(this,A)-1:r;return Atomics.load(e,n*p(this,A)+i)}},{key:"setCell",value:function(e,t,r,n){if(!(e instanceof Int8Array))throw new TypeError("SharedGrid.getCell requires Int8Array as first argument");Atomics.exchange(e,t*p(this,A)+r,n)}},{key:"getCoords",value:function(e){if(e<p(this,A)*p(this,w)){var t=Math.floor(e/p(this,A));return[t,e-t*p(this,A)]}return[0,0]}},{key:"getArrayCell",value:function(e,t){return this.getCell.apply(this,[e].concat(i(this.getCoords(t))))}},{key:"setArrayCell",value:function(e,t,r){this.setCell.apply(this,[e].concat(i(this.getCoords(t)),[r]))}},{key:"getNeighbors",value:function(e,t){for(var r=[],n=-1;n<2;n++)for(var i=-1;i<2;i++)0===n&&0===i||r.push(this.getCell(this.gridToDisplay(),e+n,t+i));return r}},{key:"setNextArrayCellState",value:function(e){this.setNextCellState.apply(this,i(this.getCoords(e)))}},{key:"setNextCellState",value:function(t,r){var n=this.getCell(this.gridToDisplay(),t,r),i=this.getNeighbors(t,r),o=0;i.forEach((function(t){t===e.ALIVE_CELL&&o++}));var a=3===o||n===e.ALIVE_CELL&&2===o?e.ALIVE_CELL:e.DEAD_CELL;this.setCell(this.gridToWrite(),t,r,a)}},{key:"setNextShareState",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p(this,w)*p(this,A);if("number"!=typeof e||"number"!=typeof t||e<0||t<0)throw new TypeError("SharedGrid.setNextShareState should be run with no arguments or with two positive integers");if(e>t){var r=[t,e];e=r[0],t=r[1]}for(var n=e;n<t;n++)this.setNextArrayCellState(n)}},{key:"height",get:function(){return p(this,w)}},{key:"width",get:function(){return p(this,A)}}]),e}(),g=new WeakMap,b=new WeakMap,m=new WeakMap,w=new WeakMap,A=new WeakMap;d(v,"DEAD_CELL",0),d(v,"ALIVE_CELL",1);var S=arguments;function C(e){throw new Error('"'+e+'" is read-only')}var E=new v,L=function(e){if(S.length<1)throw new TypeError("reply - takes at least one argument");for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];self.postMessage({queryMethodListener:e,queryMethodArguments:r})},k=function(e,t){L("printStuff",e-t)},T=function(){setTimeout((function(){L("doAlert",3,"seconds")}),3e3)},j=function(e,t,r,n,i){E.initSharedGrid(e,t,r,n,i),L("printStuff","Shared Grid init done")},I=function(e,t){E.setNextShareState(e,t),L("gridAnswer")},M=function(e,t,r){C("sharedGrid"),E=new v(e,t,r)};function O(e){return G(e)||D(e)||_(e)||x()}function x(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _(e,t){if(e){if("string"==typeof e)return N(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?N(e,t):void 0}}function D(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function G(e){if(Array.isArray(e))return N(e)}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var q=function(e){console.log(e)};self.onmessage=function(e){if(e.data instanceof Object&&e.data.hasOwnProperty("queryMethod")&&e.data.hasOwnProperty("queryArguments")){var t=e.data,r=t.queryMethod,i=t.queryArguments;n[r]&&n[r].apply(n,O(i))}else q(e.data)}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvU2hhcmVkR3JpZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd29ya2Vycy93b3JrZXJVdGlsLmpzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXJzL3dvcmtlci5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIlNoYXJlZEdyaWQiLCJzaGFyZWRBcnJheUJ1ZmZlciIsInNoYXJlZEFycmF5QnVmZmVyVG1wIiwic2hhcmVkRGlzcGxheUZsYWciLCJoZWlnaHQiLCJ3aWR0aCIsIlNoYXJlZEFycmF5QnVmZmVyIiwiVHlwZUVycm9yIiwidGhpcyIsIkludDhBcnJheSIsIkF0b21pY3MiLCJsb2FkIiwiZ3JpZCIsImoiLCJzZXRDZWxsIiwiREVBRF9DRUxMIiwiTWF0aCIsInJhbmRvbSIsIkFMSVZFX0NFTEwiLCJleGNoYW5nZSIsIngiLCJmbG9vciIsImdldENlbGwiLCJnZXRDb29yZHMiLCJuZWlnaGJvcnMiLCJhIiwiYiIsInB1c2giLCJncmlkVG9EaXNwbGF5Iiwic2V0TmV4dENlbGxTdGF0ZSIsImNlbGwiLCJnZXROZWlnaGJvcnMiLCJhbGl2ZSIsImZvckVhY2giLCJncmlkVG9Xcml0ZSIsInNldE5leHRBcnJheUNlbGxTdGF0ZSIsInNoYXJlZEdyaWQiLCJyZXBseSIsInF1ZXJ5TWV0aG9kTGlzdGVuZXIiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJxdWVyeU1ldGhvZEFyZ3VtZW50cyIsInNlbGYiLCJwb3N0TWVzc2FnZSIsImdldERpZmZlcmVuY2UiLCJ3YWl0U29tZVRpbWUiLCJzZXRUaW1lb3V0IiwiaW5pdFNoYXJlZEdyaWQiLCJzZXROZXh0U2hhcmVTdGF0ZSIsImNhbGNOZXh0U3RhdGUiLCJkZWZhdWx0UmVwbHkiLCJtZXNzYWdlIiwiY29uc29sZSIsImV2ZW50IiwicXVlcnlNZXRob2QiLCJxdWVyeUFyZ3VtZW50cyIsIndvcmtlck1ldGhvZHMiXSwibWFwcGluZ3MiOiJhQUNFLElBQUlBLEVBQW1CLEdBR3ZCLFNBQVNDLEVBQW9CQyxHQUc1QixHQUFHRixFQUFpQkUsR0FDbkIsT0FBT0YsRUFBaUJFLEdBQVVDLFFBR25DLElBQUlDLEVBQVNKLEVBQWlCRSxHQUFZLENBQ3pDRyxFQUFHSCxFQUNISSxHQUFHLEVBQ0hILFFBQVMsSUFVVixPQU5BSSxFQUFRTCxHQUFVTSxLQUFLSixFQUFPRCxRQUFTQyxFQUFRQSxFQUFPRCxRQUFTRixHQUcvREcsRUFBT0UsR0FBSSxFQUdKRixFQUFPRCxRQUtmRixFQUFvQlEsRUFBSUYsRUFHeEJOLEVBQW9CUyxFQUFJVixFQUd4QkMsRUFBb0JVLEVBQUksU0FBU1IsRUFBU1MsRUFBTUMsR0FDM0NaLEVBQW9CYSxFQUFFWCxFQUFTUyxJQUNsQ0csT0FBT0MsZUFBZWIsRUFBU1MsRUFBTSxDQUFFSyxZQUFZLEVBQU1DLElBQUtMLEtBS2hFWixFQUFvQmtCLEVBQUksU0FBU2hCLEdBQ1gsb0JBQVhpQixRQUEwQkEsT0FBT0MsYUFDMUNOLE9BQU9DLGVBQWViLEVBQVNpQixPQUFPQyxZQUFhLENBQUVDLE1BQU8sV0FFN0RQLE9BQU9DLGVBQWViLEVBQVMsYUFBYyxDQUFFbUIsT0FBTyxLQVF2RHJCLEVBQW9Cc0IsRUFBSSxTQUFTRCxFQUFPRSxHQUV2QyxHQURVLEVBQVBB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QU02QyxFQUFlLFNBQUNDLEdBQ3BCQyxnQkFHRlYsZUFBaUIsWUFDZixHQUNFVywwQkFDQUEsc0JBREFBLGdCQUVBQSxzQkFIRixrQkFJRSxPQUN3Q0EsRUFEeEMsS0FDUUMsRUFEUixjQUNxQkMsRUFEckIsaUJBRUFDLE1BQThCQSxhQUFhLEVBQTNDQSxTQUVBTixFQUFhRyxFQUFiSCIsImZpbGUiOiIwLmluZGV4Lndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlZEdyaWQge1xuICBzdGF0aWMgREVBRF9DRUxMID0gMDtcbiAgc3RhdGljIEFMSVZFX0NFTEwgPSAxO1xuXG4gIC8vIHNoYXJlZCBhcnJheXNcbiAgI2dyaWQ7XG4gICNncmlkVG1wO1xuICAjaXNHcmlkRGlzcGxheWVkO1xuXG4gICNoZWlnaHQ7XG4gICN3aWR0aDtcblxuICBnZXQgaGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLiNoZWlnaHQ7XG4gIH1cblxuICBnZXQgd2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3dpZHRoO1xuICB9XG5cbiAgaW5pdFNoYXJlZEdyaWQoXG4gICAgc2hhcmVkQXJyYXlCdWZmZXIsXG4gICAgc2hhcmVkQXJyYXlCdWZmZXJUbXAsXG4gICAgc2hhcmVkRGlzcGxheUZsYWcsXG4gICAgaGVpZ2h0LFxuICAgIHdpZHRoXG4gICkge1xuICAgIGlmIChcbiAgICAgICEoXG4gICAgICAgIHNoYXJlZEFycmF5QnVmZmVyIGluc3RhbmNlb2YgU2hhcmVkQXJyYXlCdWZmZXIgJiZcbiAgICAgICAgc2hhcmVkQXJyYXlCdWZmZXJUbXAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlciAmJlxuICAgICAgICBzaGFyZWREaXNwbGF5RmxhZyBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyXG4gICAgICApXG4gICAgKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCJTaGFyZWRHcmlkLmNvbnN0cnVjdG9yIHJlcXVpcmVzIGluc3RhbmNlIG9mIFNoYXJlZEFycmF5QnVmZmVyIGFzIGZpcnN0LCBzZWNvbmQgYW5kIHRoaXJkIGFyZ3VtZW50XCJcbiAgICAgICk7XG4gICAgdGhpcy4jaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuI3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy4jZ3JpZCA9IG5ldyBJbnQ4QXJyYXkoc2hhcmVkQXJyYXlCdWZmZXIpO1xuICAgIHRoaXMuI2dyaWRUbXAgPSBuZXcgSW50OEFycmF5KHNoYXJlZEFycmF5QnVmZmVyVG1wKTtcbiAgICB0aGlzLiNpc0dyaWREaXNwbGF5ZWQgPSBuZXcgSW50OEFycmF5KHNoYXJlZERpc3BsYXlGbGFnKTtcbiAgfVxuXG4gIGdyaWRUb1dyaXRlKCkge1xuICAgIHJldHVybiAhIUF0b21pY3MubG9hZCh0aGlzLiNpc0dyaWREaXNwbGF5ZWQsIDApXG4gICAgICA/IHRoaXMuI2dyaWRUbXBcbiAgICAgIDogdGhpcy4jZ3JpZDtcbiAgfVxuXG4gIGdyaWRUb0Rpc3BsYXkoKSB7XG4gICAgcmV0dXJuICEhQXRvbWljcy5sb2FkKHRoaXMuI2lzR3JpZERpc3BsYXllZCwgMClcbiAgICAgID8gdGhpcy4jZ3JpZFxuICAgICAgOiB0aGlzLiNncmlkVG1wO1xuICB9XG5cbiAgY2xlYXJHcmlkKGdyaWQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuI2hlaWdodDsgaSsrKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLiN3aWR0aDsgaisrKVxuICAgICAgICB0aGlzLnNldENlbGwoZ3JpZCwgaSwgaiwgU2hhcmVkR3JpZC5ERUFEX0NFTEwpO1xuICB9XG5cbiAgcmFuZG9taXplR3JpZChncmlkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLiNoZWlnaHQ7IGkrKylcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy4jd2lkdGg7IGorKylcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgICAgICB0aGlzLnNldENlbGwoZ3JpZCwgaSwgaiwgU2hhcmVkR3JpZC5ERUFEX0NFTEwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0Q2VsbChncmlkLCBpLCBqLCBTaGFyZWRHcmlkLkFMSVZFX0NFTEwpO1xuICAgICAgICB9XG4gIH1cblxuICBnZXRDZWxsKGdyaWQsIGksIGopIHtcbiAgICBpZiAoIShncmlkIGluc3RhbmNlb2YgSW50OEFycmF5KSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIFwiU2hhcmVkR3JpZC5nZXRDZWxsIHJlcXVpcmVzIEludDhBcnJheSBhcyBmaXJzdCBhcmd1bWVudFwiXG4gICAgICApO1xuICAgIGNvbnN0IG0gPSBpID49IHRoaXMuI2hlaWdodCA/IDAgOiBpIDwgMCA/IHRoaXMuI2hlaWdodCAtIDEgOiBpO1xuICAgIGNvbnN0IG4gPSBqID49IHRoaXMuI3dpZHRoID8gMCA6IGogPCAwID8gdGhpcy4jd2lkdGggLSAxIDogajtcbiAgICByZXR1cm4gQXRvbWljcy5sb2FkKGdyaWQsIG0gKiB0aGlzLiN3aWR0aCArIG4pO1xuICB9XG5cbiAgc2V0Q2VsbChncmlkLCBpLCBqLCB2YWx1ZSkge1xuICAgIGlmICghKGdyaWQgaW5zdGFuY2VvZiBJbnQ4QXJyYXkpKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCJTaGFyZWRHcmlkLmdldENlbGwgcmVxdWlyZXMgSW50OEFycmF5IGFzIGZpcnN0IGFyZ3VtZW50XCJcbiAgICAgICk7XG4gICAgQXRvbWljcy5leGNoYW5nZShncmlkLCBpICogdGhpcy4jd2lkdGggKyBqLCB2YWx1ZSk7XG4gIH1cblxuICBnZXRDb29yZHMoeCkge1xuICAgIGlmICh4IDwgdGhpcy4jd2lkdGggKiB0aGlzLiNoZWlnaHQpIHtcbiAgICAgIGxldCBpID0gTWF0aC5mbG9vcih4IC8gdGhpcy4jd2lkdGgpO1xuICAgICAgbGV0IGogPSB4IC0gaSAqIHRoaXMuI3dpZHRoO1xuICAgICAgcmV0dXJuIFtpLCBqXTtcbiAgICB9XG4gICAgcmV0dXJuIFswLCAwXTtcbiAgfVxuXG4gIGdldEFycmF5Q2VsbChncmlkLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbChncmlkLCAuLi50aGlzLmdldENvb3Jkcyh4KSk7XG4gIH1cblxuICBzZXRBcnJheUNlbGwoZ3JpZCwgeCwgdmFsdWUpIHtcbiAgICB0aGlzLnNldENlbGwoZ3JpZCwgLi4udGhpcy5nZXRDb29yZHMoeCksIHZhbHVlKTtcbiAgfVxuXG4gIGdldE5laWdoYm9ycyhpLCBqKSB7XG4gICAgY29uc3QgbmVpZ2hib3JzID0gW107XG4gICAgZm9yIChsZXQgYSA9IC0xOyBhIDwgMjsgYSsrKVxuICAgICAgZm9yIChsZXQgYiA9IC0xOyBiIDwgMjsgYisrKVxuICAgICAgICBpZiAoYSAhPT0gMCB8fCBiICE9PSAwKVxuICAgICAgICAgIG5laWdoYm9ycy5wdXNoKHRoaXMuZ2V0Q2VsbCh0aGlzLmdyaWRUb0Rpc3BsYXkoKSwgaSArIGEsIGogKyBiKSk7XG4gICAgcmV0dXJuIG5laWdoYm9ycztcbiAgfVxuXG4gIHNldE5leHRBcnJheUNlbGxTdGF0ZSh4KSB7XG4gICAgdGhpcy5zZXROZXh0Q2VsbFN0YXRlKC4uLnRoaXMuZ2V0Q29vcmRzKHgpKTtcbiAgfVxuXG4gIHNldE5leHRDZWxsU3RhdGUoaSwgaikge1xuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGwodGhpcy5ncmlkVG9EaXNwbGF5KCksIGksIGopO1xuICAgIGNvbnN0IG5laWdoYm9ycyA9IHRoaXMuZ2V0TmVpZ2hib3JzKGksIGopO1xuICAgIGxldCBhbGl2ZSA9IDA7XG5cbiAgICBuZWlnaGJvcnMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgaWYgKGMgPT09IFNoYXJlZEdyaWQuQUxJVkVfQ0VMTCkgYWxpdmUrKztcbiAgICB9KTtcblxuICAgIGNvbnN0IHZhbHVlID1cbiAgICAgIGFsaXZlID09PSAzXG4gICAgICAgID8gU2hhcmVkR3JpZC5BTElWRV9DRUxMXG4gICAgICAgIDogY2VsbCA9PT0gU2hhcmVkR3JpZC5BTElWRV9DRUxMICYmIGFsaXZlID09PSAyXG4gICAgICAgID8gU2hhcmVkR3JpZC5BTElWRV9DRUxMXG4gICAgICAgIDogU2hhcmVkR3JpZC5ERUFEX0NFTEw7XG5cbiAgICB0aGlzLnNldENlbGwodGhpcy5ncmlkVG9Xcml0ZSgpLCBpLCBqLCB2YWx1ZSk7XG4gIH1cblxuICBzZXROZXh0U2hhcmVTdGF0ZShhID0gMCwgYiA9IHRoaXMuI2hlaWdodCAqIHRoaXMuI3dpZHRoKSB7XG4gICAgaWYgKHR5cGVvZiBhICE9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBiICE9PSBcIm51bWJlclwiIHx8IGEgPCAwIHx8IGIgPCAwKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgXCJTaGFyZWRHcmlkLnNldE5leHRTaGFyZVN0YXRlIHNob3VsZCBiZSBydW4gd2l0aCBubyBhcmd1bWVudHMgb3Igd2l0aCB0d28gcG9zaXRpdmUgaW50ZWdlcnNcIlxuICAgICAgKTtcblxuICAgIGlmIChhID4gYikgW2EsIGJdID0gW2IsIGFdO1xuXG4gICAgZm9yIChsZXQgeCA9IGE7IHggPCBiOyB4KyspIHRoaXMuc2V0TmV4dEFycmF5Q2VsbFN0YXRlKHgpO1xuICB9XG59XG4iLCJpbXBvcnQgU2hhcmVkR3JpZCBmcm9tIFwibW9kdWxlcy9TaGFyZWRHcmlkXCI7XG5cbmNvbnN0IHNoYXJlZEdyaWQgPSBuZXcgU2hhcmVkR3JpZCgpO1xuXG5jb25zdCByZXBseSA9IChxdWVyeU1ldGhvZExpc3RlbmVyLCAuLi5xdWVyeU1ldGhvZEFyZ3VtZW50cykgPT4ge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInJlcGx5IC0gdGFrZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50XCIpO1xuXG4gIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgIHF1ZXJ5TWV0aG9kTGlzdGVuZXIsXG4gICAgcXVlcnlNZXRob2RBcmd1bWVudHMsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldERpZmZlcmVuY2UgPSAoYSwgYikgPT4ge1xuICByZXBseShcInByaW50U3R1ZmZcIiwgYSAtIGIpO1xufTtcblxuZXhwb3J0IGNvbnN0IHdhaXRTb21lVGltZSA9ICgpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVwbHkoXCJkb0FsZXJ0XCIsIDMsIFwic2Vjb25kc1wiKTtcbiAgfSwgMzAwMCk7XG59O1xuXG5leHBvcnQgY29uc3QgaW5pdFNoYXJlZEdyaWQgPSAoXG4gIHNoYXJlZEFycmF5QnVmZmVyLFxuICBzaGFyZWRBcnJheUJ1ZmZlclRtcCxcbiAgc2hhcmVkRGlzcGxheUZsYWcsXG4gIGhlaWdodCxcbiAgd2lkdGhcbikgPT4ge1xuICBzaGFyZWRHcmlkLmluaXRTaGFyZWRHcmlkKFxuICAgIHNoYXJlZEFycmF5QnVmZmVyLFxuICAgIHNoYXJlZEFycmF5QnVmZmVyVG1wLFxuICAgIHNoYXJlZERpc3BsYXlGbGFnLFxuICAgIGhlaWdodCxcbiAgICB3aWR0aFxuICApO1xuICByZXBseShcInByaW50U3R1ZmZcIiwgXCJTaGFyZWQgR3JpZCBpbml0IGRvbmVcIik7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0TmV4dFNoYXJlU3RhdGUgPSAoYSwgYikgPT4ge1xuICBzaGFyZWRHcmlkLnNldE5leHRTaGFyZVN0YXRlKGEsIGIpO1xuICByZXBseShcImdyaWRBbnN3ZXJcIik7XG59O1xuXG5leHBvcnQgY29uc3QgY2FsY05leHRTdGF0ZSA9IChzaGFyZWRBcnJheUJ1ZmZlciwgaGVpZ2h0LCB3aWR0aCkgPT4ge1xuICBzaGFyZWRHcmlkID0gbmV3IFNoYXJlZEdyaWQoc2hhcmVkQXJyYXlCdWZmZXIsIGhlaWdodCwgd2lkdGgpO1xufTtcbiIsImltcG9ydCAqIGFzIHdvcmtlck1ldGhvZHMgZnJvbSBcIi4vd29ya2VyVXRpbFwiO1xuXG5jb25zdCBkZWZhdWx0UmVwbHkgPSAobWVzc2FnZSkgPT4ge1xuICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbn07XG5cbnNlbGYub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gIGlmIChcbiAgICBldmVudC5kYXRhIGluc3RhbmNlb2YgT2JqZWN0ICYmXG4gICAgZXZlbnQuZGF0YS5oYXNPd25Qcm9wZXJ0eShcInF1ZXJ5TWV0aG9kXCIpICYmXG4gICAgZXZlbnQuZGF0YS5oYXNPd25Qcm9wZXJ0eShcInF1ZXJ5QXJndW1lbnRzXCIpXG4gICkge1xuICAgIGNvbnN0IHsgcXVlcnlNZXRob2QsIHF1ZXJ5QXJndW1lbnRzIH0gPSBldmVudC5kYXRhO1xuICAgIHdvcmtlck1ldGhvZHNbcXVlcnlNZXRob2RdICYmIHdvcmtlck1ldGhvZHNbcXVlcnlNZXRob2RdKC4uLnF1ZXJ5QXJndW1lbnRzKTtcbiAgfSBlbHNlIHtcbiAgICBkZWZhdWx0UmVwbHkoZXZlbnQuZGF0YSk7XG4gIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9