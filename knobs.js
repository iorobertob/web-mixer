// TODO: add input label for screenreaders

// KnobInput class

class KnobInput {
  constructor(containerElement, options) {
    if (!options) {
      options = {};
    }
    
    // settings
    var step = options.step || 'any';
    var min = typeof options.min === 'number' ? options.min : 0;
    var max = typeof options.max === 'number' ? options.max : 1;
    this.initial = typeof options.initial === 'number' ? options.initial : 0.5 * (min + max);
    this.visualElementClass = options.visualElementClass || 'knob-input__visual';
    this.dragResistance = typeof options.dragResistance === 'number' ? options.dragResistance : 300;
    this.dragResistance /= max-min;
    this.wheelResistance = typeof options.wheelResistance === 'number' ? options.wheelResistance : 4000;
    this.wheelResistance /= max-min;
    this.setupVisualContext = typeof options.visualContext === 'function' ? options.visualContext : KnobInput.setupRotationContext(0, 360);
    this.updateVisuals = typeof options.updateVisuals === 'function' ? options.updateVisuals : KnobInput.rotationUpdateFunction;
    
    // setup input
    var rangeInput = document.createElement('input');
    rangeInput.type = 'range';
    rangeInput.step = step;
    rangeInput.min = min;
    rangeInput.max = max;
    rangeInput.value = this.initial;
    containerElement.appendChild(rangeInput);
    
    // elements
    this._container = containerElement;
    this._container.classList.add('knob-input');
    this._input = rangeInput;
    this._input.classList.add('knob-input__input');
    this._visualElement = this._container.querySelector(`.${this.visualElementClass}`);
    this._visualElement.classList.add('knob-input__visual');
    
    // visual context
    this._visualContext = { element: this._visualElement };
    this.setupVisualContext.apply(this._visualContext);
    this.updateVisuals = this.updateVisuals.bind(this._visualContext);
    
    // internals
    this._activeDrag = false;
    
    // define event listeners
    // have to store bound versions of handlers so they can be removed later
    this._handlers = {
      inputChange: this.handleInputChange.bind(this),
      touchStart: this.handleTouchStart.bind(this),
      touchMove: this.handleTouchMove.bind(this),
      touchEnd: this.handleTouchEnd.bind(this),
      touchCancel: this.handleTouchCancel.bind(this),
      mouseDown: this.handleMouseDown.bind(this),
      mouseMove: this.handleMouseMove.bind(this),
      mouseUp: this.handleMouseUp.bind(this),
      mouseWheel: this.handleMouseWheel.bind(this),
      doubleClick: this.handleDoubleClick.bind(this),
      focus: this.handleFocus.bind(this),
      blur: this.handleBlur.bind(this),
    };
    // add listeners
    this._input.addEventListener('change', this._handlers.inputChange);
    this._input.addEventListener('touchstart', this._handlers.touchStart);
    this._input.addEventListener('mousedown', this._handlers.mouseDown);
    this._input.addEventListener('wheel', this._handlers.mouseWheel);
    this._input.addEventListener('dblclick', this._handlers.doubleClick);
    this._input.addEventListener('focus', this._handlers.focus);
    this._input.addEventListener('blur', this._handlers.blur);
    // init
    this.updateToInputValue();
  }
  
  static setupRotationContext(minRotation, maxRotation) {
    return function() {
      this.minRotation = minRotation;
      this.maxRotation = maxRotation;
    };
  }
  
  static rotationUpdateFunction(norm) {
    this.element.style[transformProp] = `rotate(${this.maxRotation*norm-this.minRotation*(norm-1)}deg)`;
  }
  
  // handlers
  handleInputChange(evt) {
    // console.log('input change');
    this.updateToInputValue();
  }
  
  handleTouchStart(evt) {
    // console.log('touch start');
    this.clearDrag();
    evt.preventDefault();
    var touch = evt.changedTouches.item(evt.changedTouches.length - 1);
    this._activeDrag = touch.identifier;
    this.startDrag(touch.clientY);
    // drag update/end listeners
    document.body.addEventListener('touchmove', this._handlers.touchMove);
    document.body.addEventListener('touchend', this._handlers.touchEnd);
    document.body.addEventListener('touchcancel', this._handlers.touchCancel);
  }
  
  handleTouchMove(evt) {
    // console.log('touch move');
    var activeTouch = this.findActiveTouch(evt.changedTouches);
    if (activeTouch) {
      this.updateDrag(activeTouch.clientY);
    } else if (!this.findActiveTouch(evt.touches)) {
      this.clearDrag();
    }
  }
  
  handleTouchEnd(evt) {
    // console.log('touch end');
    var activeTouch = this.findActiveTouch(evt.changedTouches);
    if (activeTouch) {
      this.finalizeDrag(activeTouch.clientY);
    }
  }
  
  handleTouchCancel(evt) {
    // console.log('touch cancel');
    if (this.findActiveTouch(evt.changedTouches)) {
      this.clearDrag();
    }
  }
  
  handleMouseDown(evt) {
    // console.log('mouse down');
    this.clearDrag();
    evt.preventDefault();
    this._activeDrag = true;
    this.startDrag(evt.clientY);
    // drag update/end listeners
    document.body.addEventListener('mousemove', this._handlers.mouseMove);
    document.body.addEventListener('mouseup', this._handlers.mouseUp);
  }
  
  handleMouseMove(evt) {
    console.log('mouse move');
    if (evt.buttons&1) {
      this.updateDrag(evt.clientY);
    } else {
      this.finalizeDrag(evt.clientY);
    }
  }
  
  handleMouseUp(evt) {
    // console.log('mouse up');
    this.finalizeDrag(evt.clientY);
  }
  
  handleMouseWheel(evt) {
    // console.log('mouse wheel');
    this._input.focus();
    this.clearDrag();
    this._prevValue = parseFloat(this._input.value);
    this.updateFromDrag(evt.deltaY, this.wheelResistance);
  }
  
  handleDoubleClick(evt) {
    // console.log('double click');
    this.clearDrag();
    this._input.value = this.initial;
    this.updateToInputValue();
  }
  
  handleFocus(evt) {
    // console.log('focus on');
    this._container.classList.add('focus-active');
  }
  
  handleBlur(evt) {
    // console.log('focus off');
    this._container.classList.remove('focus-active');
  }
  
  // dragging
  startDrag(yPosition) {
    this._dragStartPosition = yPosition;
    this._prevValue = parseFloat(this._input.value);
    
    this._input.focus();
    document.body.classList.add('knob-input__drag-active');
    this._container.classList.add('drag-active');
  }
  
  updateDrag(yPosition) {
    var diff = yPosition - this._dragStartPosition;
    this.updateFromDrag(diff, this.dragResistance);
    this._input.dispatchEvent(new InputEvent('change'));
  }
  
  finalizeDrag(yPosition) {
    var diff = yPosition - this._dragStartPosition;
    this.updateFromDrag(diff, this.dragResistance);
    this.clearDrag();
    this._input.dispatchEvent(new InputEvent('change'));
  }
  
  clearDrag() {
    document.body.classList.remove('knob-input__drag-active');
    this._container.classList.remove('drag-active');
    this._activeDrag = false;
    this._input.dispatchEvent(new InputEvent('change'));
    // clean up event listeners
    document.body.removeEventListener('mousemove', this._handlers.mouseMove);
    document.body.removeEventListener('mouseup', this._handlers.mouseUp);
    document.body.removeEventListener('touchmove', this._handlers.touchMove);
    document.body.removeEventListener('touchend', this._handlers.touchEnd);
    document.body.removeEventListener('touchcancel', this._handlers.touchCancel);
  }
  
  updateToInputValue() {
    var normVal = this.normalizeValue(parseFloat(this._input.value));
    this.updateVisuals(normVal);
  }
  
  updateFromDrag(dragAmount, resistance) {
    var newVal = this.clampValue(this._prevValue - (dragAmount/resistance));
    this._input.value = newVal;
    this.updateVisuals(this.normalizeValue(newVal));
  }
  
  // utils
  clampValue(val) {
    var min = parseFloat(this._input.min);
    var max = parseFloat(this._input.max);
    return Math.min(Math.max(val, min), max);
  }
  
  normalizeValue(val) {
    var min = parseFloat(this._input.min);
    var max = parseFloat(this._input.max);
    return (val-min)/(max-min);
  }

  findActiveTouch(touchList) {
    var i, len, touch;
    for (i=0, len=touchList.length; i<len; i++)
      if (this._activeDrag === touchList.item(i).identifier)
        return touchList.item(i);
    return null;
  }
  
  // public passthrough methods
  addEventListener() { this._input.addEventListener.apply(this._input, arguments); }
  removeEventListener() { this._input.removeEventListener.apply(this._input, arguments); }
  focus() { this._input.focus.apply(this._input, arguments); }
  blur() { this._input.blur.apply(this._input, arguments); }
  
  // getters/setters
  get value() {
    return parseFloat(this._input.value);
  }
  set value(val) {
    this._input.value = val;
    this.updateToInputValue();
    this._input.dispatchEvent(new Event('change'));
  }
}

// Utils

function getSupportedPropertyName(properties) {
  for (var i = 0; i < properties.length; i++)
    if (typeof document.body.style[properties[i]] !== 'undefined')
      return properties[i];
  return null;
}

function getTransformProperty() {
  return getSupportedPropertyName([
    'transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform'
  ]);
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Demo Setup - Knobs

var transformProp = getTransformProperty();

var envelopeKnobStartPositions = [0, 40, 75, 85, 20, 55];
var envelopeKnobs = [...document.querySelectorAll('.fl-studio-envelope__knob.envelope-knob')];
var envelopeKnobs = envelopeKnobs.map((el, idx) => new KnobInput(el, {
  visualContext: function() {
    this.indicatorRing = this.element.querySelector('.indicator-ring');
    var ringStyle = getComputedStyle(this.element.querySelector('.indicator-ring-bg'));
    this.r = parseFloat(ringStyle.r) - (parseFloat(ringStyle.strokeWidth) / 2);
    this.indicatorDot = this.element.querySelector('.indicator-dot');
    this.indicatorDot.style[`${transformProp}Origin`] = '20px 20px';
  },
  updateVisuals: function(norm) {
    var theta = Math.PI*2*norm + 0.5*Math.PI;
    var endX = this.r*Math.cos(theta) + 20;
    var endY = this.r*Math.sin(theta) + 20;
    // using 2 arcs rather than flags since one arc collapses if it gets near 360deg
    this.indicatorRing.setAttribute('d',`M20,20l0,${this.r}${norm> 0.5?`A${this.r},${this.r},0,0,1,20,${20-this.r}`:''}A-${this.r},${this.r},0,0,1,${endX},${endY}Z`);
    this.indicatorDot.style[transformProp] = `rotate(${360*norm}deg)`;
  },
  min: 0,
  max: 100,
  initial: envelopeKnobStartPositions[idx],
}));

var tensionKnobStartPositions = [0, 0, -80];
var tensionKnobs = [...document.querySelectorAll('.fl-studio-envelope__knob.tension-knob')];
var tensionKnobs = tensionKnobs.map((el, idx) => new KnobInput(el, {
  visualContext: function() {
    this.indicatorRing = this.element.querySelector('.indicator-ring');
    var ringStyle = getComputedStyle(this.element.querySelector('.indicator-ring-bg'));
    this.r = parseFloat(ringStyle.r) - (parseFloat(ringStyle.strokeWidth) / 2);
  },
  updateVisuals: function(norm) {
    var theta = Math.PI*2*norm + 0.5*Math.PI;
    var endX = this.r*Math.cos(theta) + 20;
    var endY = this.r*Math.sin(theta) + 20;
    this.indicatorRing.setAttribute('d',`M20,20l0,-${this.r}A${this.r},${this.r},0,0,${norm<0.5?0:1},${endX},${endY}Z`);
  },
  min: -100,
  max: 100,
  initial: tensionKnobStartPositions[idx],
}));

// Demo Setup - Envelope Visualization

var container = document.querySelector('.envelope-visualizer');
var enveloperVisualizer = {
  container: container,
  delay: document.getElementById("aux1-1"),
  // attack: container.querySelector('.attack'),
  // hold: container.querySelector('.hold'),
  // decay: container.querySelector('.decay'),
  // release: container.querySelector('.release'),
};

var updateVisualization = debounce(function(evt) {
  var maxPtSeparation = 75;
  var ptDelay = (maxPtSeparation * envelopeKnobs[0].value / 100);
  // var ptAttack = ptDelay + (maxPtSeparation * envelopeKnobs[1].value / 100);
  // var ptHold = ptAttack + (maxPtSeparation * envelopeKnobs[2].value / 100);
  // var ptDecay = ptHold + (maxPtSeparation * envelopeKnobs[3].value / 100) * (100 - envelopeKnobs[4].value) / 100;
  // var ptSustain = 100 - envelopeKnobs[4].value; // y value
  // var ptRelease = ptDecay + (maxPtSeparation * envelopeKnobs[5].value / 100);
  // TODO: better tension visualization
  // var tnAttack = (ptAttack - ptDelay) * tensionKnobs[0].value / 100;
  // var tnDecay = (ptDecay - ptHold) * tensionKnobs[1].value / 100;
  // var tnRelease = (ptRelease - ptDecay) * tensionKnobs[2].value / 100;
  // enveloperVisualizer.shape.setAttribute('d',
  //   `M${ptDelay},100`+
  //   `C${tnAttack<0?ptDelay-tnAttack:ptDelay},100,${tnAttack>0?ptAttack-tnAttack:ptAttack},0,${ptAttack},0`+
  //   `L${ptHold},0`+
  //   `C${tnDecay>0?ptHold+tnDecay:ptHold},0,${tnDecay<0?ptDecay+tnDecay:ptDecay},${ptSustain},${ptDecay},${ptSustain}`+
  //   `C${tnRelease>0?ptDecay+tnRelease:ptDecay},${ptSustain},${tnRelease<0?ptRelease+tnRelease:ptRelease},100,${ptRelease},100`
  // );
  enveloperVisualizer.delay.setAttribute('cx', ptDelay);
  // enveloperVisualizer.attack.setAttribute('cx', ptAttack);
  // enveloperVisualizer.hold.setAttribute('cx', ptHold);
  // enveloperVisualizer.decay.setAttribute('cx', ptDecay);
  // enveloperVisualizer.decay.setAttribute('cy', ptSustain);
  // enveloperVisualizer.release.setAttribute('cx', ptRelease);
}, 10);

envelopeKnobs.concat(tensionKnobs)
  .forEach(knob => { knob.addEventListener('change', updateVisualization); });
updateVisualization();

// var panelElement = document.querySelector('.fl-studio-envelope');
// var panel = {
//   element: panelElement,
//   // originalTransform: getComputedStyle(panelElement)[transformProp],
//   width: panelElement.getBoundingClientRect().width,
//   height: panelElement.getBoundingClientRect().height,
// };
// var resizePanel = () => {
//   var pw = (window.innerWidth - 40) / panel.width;
//   var ph = (window.innerHeight - 40) / panel.height;
//   var size = Math.min(pw, ph);
//   if (size > 1.4) {
//     size -= 0.4;
//   } else if (size > 1) {
//     size = Math.min(size, 1);
//   }
//   // panel.element.style[transformProp] = `${panel.originalTransform} scale(${size})`;
// };
// window.addEventListener('resize', resizePanel);
// resizePanel();
