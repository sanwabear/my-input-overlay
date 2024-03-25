var TARGET_PLAYER = location.pathname.endsWith('2.html') ? 2 : 1;

var KEYCODES_1 = {
  0x0039: ["VC_C", "C"], // ["VC_SPACE", "SPACE"], 

  //  Cursor Key Zone Begin
  0x0e48: ["VC_UP", "ARROW UP"],
  0x0e4b: ["VC_LEFT", "ARROW LEFT"],
  0x0e4d: ["VC_RIGHT", "ARROW RIGHT"],
  0x0e50: ["VC_DOWN", "ARROW DOWN"],
  /* libuihook values */
  0xe048: ["VC_UP", "ARROW UP"],
  0xe04b: ["VC_LEFT", "ARROW LEFT"],
  0xe04d: ["VC_RIGHT", "ARROW RIGHT"],
  0xe050: ["VC_DOWN", "ARROW DOWN"],
  /* https://github.com/univrsal/input-overlay/issues/174 */
  0xee48: ["VC_UP", "ARROW UP"], // 0x0e48
  0xee4b: ["VC_LEFT", "ARROW LEFT"], // 0x0e4b

  0xee4d: ["VC_RIGHT", "ARROW RIGHT"], // 0x0e4d
  0xee50: ["VC_DOWN", "ARROW DOWN"], // 0x0e50

  0x002a: ["VC_D", "D"], // ["VC_SHIFT_L", "L SHIFT"],
  0x001d: ["VC_A", "A"], // ["VC_CONTROL_L", "L CTRL"],
  0x0038: ["VC_B", "B"], // ["VC_ALT_L", "L ALT"], // Option or Alt Key
};
var KEYICONS_1 = {
  // Arrow Keys
  0x0e48: document.getElementById("SVG_VC_UP"), // ARROW UP
  0x0e4b: document.getElementById("SVG_VC_LEFT"), // ARROW LEFT
  0x0e4d: document.getElementById("SVG_VC_RIGHT"), // ARROW RIGHT
  0x0e50: document.getElementById("SVG_VC_DOWN"), // ARROW DOWN
  /* libuihook values */
  0xe048: document.getElementById("SVG_VC_UP"), // ARROW UP
  0xe04b: document.getElementById("SVG_VC_LEFT"), // ARROW LEFT
  0xe04d: document.getElementById("SVG_VC_RIGHT"), // ARROW RIGHT
  0xe050: document.getElementById("SVG_VC_DOWN"), // ARROW DOWN
  /* https://github.com/univrsal/input-overlay/issues/174 */
  0xee48: document.getElementById("SVG_VC_UP"), // ARROW UP
  0xee4b: document.getElementById("SVG_VC_LEFT"), // ARROW LEFT
  0xee4d: document.getElementById("SVG_VC_RIGHT"), // ARROW RIGHT
  0xee50: document.getElementById("SVG_VC_DOWN"), // ARROW DOWN
};
var ARROW_BITS_1 = {
  // Arrow Keys
  0x0e48: 0x01, // ARROW UP
  0x0e4b: 0x04, // ARROW LEFT
  0x0e4d: 0x08, // ARROW RIGHT
  0x0e50: 0x02, // ARROW DOWN
  /* libuihook values */
  0xe048: 0x01, // ARROW UP
  0xe04b: 0x04, // ARROW LEFT
  0xe04d: 0x08, // ARROW RIGHT
  0xe050: 0x02, // ARROW DOWN
  /* https://github.com/univrsal/input-overlay/issues/174 */
  0xee48: 0x01, // ARROW UP
  0xee4b: 0x04, // ARROW LEFT
  0xee4d: 0x08, // ARROW RIGHT
  0xee50: 0x02, // ARROW DOWN
};
var KEYCODES_2 = {
  0x001e: ["VC_A", "A"], // a
  0x0020: ["VC_D", "D"], // left
  0x0021: ["VC_F", "F"], // down
  0x0022: ["VC_G", "G"], // right
  0x0010: ["VC_C", "C"], // c
  0x0013: ["VC_R", "R"], // up
  0x001f: ["VC_B", "B"], // b
  0x0011: ["VC_D", "D"], // d
};
var KEYICONS_2 = {
  0x0013: document.getElementById("SVG_VC_UP"), // ARROW UP
  0x0020: document.getElementById("SVG_VC_LEFT"), // ARROW LEFT
  0x0022: document.getElementById("SVG_VC_RIGHT"), // ARROW RIGHT
  0x0021: document.getElementById("SVG_VC_DOWN"), // ARROW DOWN
};
var ARROW_BITS_2 = {
  0x0013: 0x01, // ARROW UP
  0x0020: 0x04, // ARROW LEFT
  0x0022: 0x08, // ARROW RIGHT
  0x0021: 0x02, // ARROW DOWN
};

/**
 * Keycodes from: https://github.com/kwhat/libuiohook/blob/1.2/include/uiohook.h
 * [0] -> libuiohook key
 * [1] -> optional alias
 *
 * Comment out keys that you don't want to show
 */
var KEYCODES = TARGET_PLAYER == 1 ? KEYCODES_1 : KEYCODES_2;

// #region Keys with Icons

/* Init SVG Icons */
document
  .querySelectorAll("#icons-container svg")
  .forEach((i) => i.classList.add("icon-sm"));
document
  .querySelectorAll("#icons-container svg path")
  .forEach((p) => p.setAttribute("fill", "currentColor"));

/**
 * For Keys to replace with Icons
 * Key: libuihook keycode
 * Value: <svg> icon element
 */
var KEYICONS = TARGET_PLAYER == 1 ? KEYICONS_1 : KEYICONS_2;

var ARROW_BITS = TARGET_PLAYER == 1 ? ARROW_BITS_1 : ARROW_BITS_2;

var ARROWICONS = new Map([
  [0x0C,  null], //
  [0x03,  null], //

  [0x05,  document.getElementById("SVG_VC_UP_LEFT")],   // ARROW UP + LEFT
  [0x09,  document.getElementById("SVG_VC_UP_RIGHT")],  // ARROW UP + RIGHT

  [0x06,  document.getElementById("SVG_VC_DOWN_RIGHT")], // ARROW DOWN + RIGHT
  [0x0A,  document.getElementById("SVG_VC_DOWN_LEFT")],  // ARROW DOWN + LEFT

  [0x01,  document.getElementById("SVG_VC_UP")],   // ARROW UP
  [0x04,  document.getElementById("SVG_VC_LEFT")], // ARROW LEFT
  [0x08,  document.getElementById("SVG_VC_RIGHT")],// ARROW RIGHT
  [0x02,  document.getElementById("SVG_VC_DOWN")], // ARROW DOWN
]);

// #endregion

// #region Mouse codes

/**
 * Encoding helpers to avoid mistakes from typing different values among
 * different usages of them.
 */
var MOUSEENCODE = {
  flag: 1 << 16, // Mouse code flag
  wheel: 1 << 4, // Wheel scroll flag
  wheel_rot: 1 << 3, // Wheel rotation flag
  wheel_y: 3, // Vertical wheel direction
  wheel_x: 4, // Horizontal wheel direction
  mask: 0xffff, // Bit mask to remove mouse code flag
  btn_start: 8, // Bit flag of first known button
  btn_end: 14, // Bit flag of last known button
};

/**
 * key: encoded mouse code
 * value: key label
 *
 * Comment out keys that you don't want to show
 */
var MOUSECODES = new Map([
]);

// #endregion

/**
 * This will either return an HTML string (icon)
 * Or a plain string (libuiohook key name)
 *
 * @param {string} keycode - keycode from libuiohook
 *
 * @returns {string} Inline innerHTML equivalent of key
 */
function getKeyHTML(keycode) {
  if (keycode & MOUSEENCODE.flag) // Is this a mouse code?
  {
    var mouse = MOUSECODES.get(keycode & MOUSEENCODE.mask);
    if (!!mouse) {
      return mouse;
    }

    return "";
  }

  var key = KEYCODES[keycode];

  if (!!key) {
    var icon = KEYICONS[keycode];

    if (!!icon) {
      return icon.cloneNode(true).outerHTML;
    } else {
      // return alias if present
      return key[1] !== "" ? key[1] : key[0];
    }
  } else {
    return "";
  }
}

// #region DOM Utils

/**
 * Gets a {Set} of keycodes, wraps each item in span.key, joins them by
 * a + (separator), and adds a repeat counter.
 *
 * @returns {HTMLElement} <p> element of key combination
 */
function getKeyCombinationElement() {
  try {
    var arrows = Array.from(_historyCurrentlyPressed)
      .filter((keycode) => ARROW_BITS[keycode])
      .reduce((arrows, keycode) => arrows |= ARROW_BITS[keycode], 0)
    var innerHTMLofArrows = []
    for (let arrowbit of ARROWICONS.keys()) {
      if ((arrows & arrowbit) == arrowbit) {
        if (ARROWICONS.get(arrowbit)) {
          innerHTMLofArrows.push(ARROWICONS.get(arrowbit).cloneNode(true).outerHTML)
        }
        arrows -= arrowbit
      }
    }
    if (innerHTMLofArrows.length == 0) {
      innerHTMLofArrows.push("N")
    }

    var innerHTMLofKeys = Array.from(_historyCurrentlyPressed)
      .filter((keycode) => !KEYICONS[keycode])
      // Convert each keycode into its HTML representation
      .map((keycode) => getKeyHTML(keycode))
      // Filter out non-existing keys in KEYCODES
      .filter((html) => html !== "")
      .sort();

    // Build innerHTML for the key combination
    var innerHTMLOfKeyCombination = innerHTMLofArrows.concat(innerHTMLofKeys)
      .map(
        (innerHTML) =>
          createElementWithClass("span", innerHTML, ["key"]).outerHTML
      )
      .join(
        createElementWithClass("span", SEPARATOR, ["separator"]).outerHTML
      );

    // Display repetition counter if 2 or higher
    //if (_repeatCount > 1) {
    //  innerHTMLOfKeyCombination +=
    //    createElementWithClass("span", _repeatCount, ["repeat"]).outerHTML;
    //}

    return createElementWithClass("p", innerHTMLOfKeyCombination, [
      "key-combination",
    ]);
  } catch (e) {
    console.error(e);
    return "";
  }
}

/**
 * Wraps an HTML string of a key with span
 *
 * @returns {HTMLElement} HTML Element created with classes
 */
function createElementWithClass(element, innerHTML = "", classList = []) {
  var el = document.createElement(element);
  el.innerHTML = innerHTML;
  el.classList.add(...classList);
  return el;
}

// #endregion

// #region ----- YOU CAN CHANGE THESE VALUES -----

/**
 * Max count of history shown. Lower = better performance.
 * @type {number}
 */
var HISTORY_MAX = 24;
/**
 * Enable / Disable timeout for key combinations
 * @type {boolean}
 */
var HISTORY_TIMEOUT_ACTIVE = false;
/**
 * Time delay in ms before the key is hidden.
 * @type {number}
 */
var HISTORY_TIMEOUT = 3500;
/**
 * Align history to top of source when true and add newer keys to top.
 * @type {boolean}
 */
var HISTORY_TOP_ALIGN = false;
/**
 * Separator between keys
 * @type {string}
 */
var SEPARATOR = "";
/**
 * When true, only display initial press of a key. I.e., held keys won't
 * be added to history as multiple presses.
 * @type {boolean}
 */
var ONLY_INITIAL_PRESS = true;
/**
 * Only count inputs as repeated if the interval between presses in ms
 * is less than this value
 * @type {number}
 */
var REPEAT_TIMEOUT = 1500;

// #endregion

// Vertical align setup
if (!HISTORY_TOP_ALIGN)
{
  document.body.classList.add(["bottom-align"]);
}

// History
var _historyDiv = document.getElementById("history");
var _historyCurrentlyPressed = new Set();
var _historyLastPressed = new Set();
var _hideLastTimeoutID = undefined;
var _hideLastTimeoutElement = null;
var _repeatCount = 1;
var _repeatTimeoutID = undefined;
var _mouseButtonsMask = 0;

function onKeyEvent(data) {
  if (data.event_type === "key_typed")
    return;

  // Interpret mouse events
  if (data.event_type.startsWith("mouse")) {
    //// Ignore mouse movement and click events
    //if (
    //  data.event_type === "mouse_moved" ||
    //  data.event_type === "mouse_clicked" ||
    //  data.event_type === "mouse_dragged"
    //  )
    //  return;
    //
    //// Encode mouse data
    //var mouse_code_base = MOUSEENCODE.flag; // Bit flag for mouse codes
    //
    //if (data.event_type === "mouse_wheel") {
    //  mouse_code_base |= MOUSEENCODE.wheel; // Wheel flag
    //  mouse_code_base |= data.direction; // Vertical = 3, horizontal = 4
    //  mouse_code_base |= MOUSEENCODE.wheel_rot * (data.rotation > 0); // data.rotation is -1 or 1
    //
    //  updateUI(mouse_code_base, true);
    //  // Wheel events don't have a "pressed" state, so "release" them after displaying
    //  updateUI(mouse_code_base, false);
    //} else if (
    //    data.event_type === "mouse_pressed" ||
    //    data.event_type === "mouse_released"
    //  ) {
    //  if (data.button === 4 && data.event_type === "mouse_pressed")
    //    data.mask = (data.mask ^ 4096) | 2048;
    //
    //  var diff = _mouseButtonsMask ^ data.mask;
    //  _mouseButtonsMask = data.mask;
    //
    //  // Iterate over the known button flags to update the pressed state
    //  // of the ones that just changed (multiple is possible, but rare)
    //  for (var bit = MOUSEENCODE.btn_start; bit <= MOUSEENCODE.btn_end; ++bit) {
    //    var mask = 1 << bit;
    //    if (diff & mask) {
    //      var mouse_code = mouse_code_base | mask;
    //      updateUI(mouse_code, _mouseButtonsMask & mask);
    //    }
    //  }
    //}
    //
    return;
  }

  // Keyboard event
  if (!!KEYCODES[data.keycode]) { // Prevents white space from unassigned keycodes
    updateUI(data.keycode, data.event_type === "key_pressed");
  }
}

function getLatestChild() {
  return HISTORY_TOP_ALIGN
    ? _historyDiv.firstElementChild
    : _historyDiv.lastElementChild;
}

function updateUI(keycode, isPressing) {
  var latestChild = getLatestChild();

  if (isPressing) {
    // Is this an already pressed key?
    if (_historyCurrentlyPressed.has(keycode)
        // Are we ignoring key repetition?
        && ONLY_INITIAL_PRESS) {
      return;
    }

    //resetRepeatTimeout();

    // Update pressed keys state while comparing with previously pressed ones
    // to detect repetition and combinations

    var wasEmpty = _historyCurrentlyPressed.size == 0;
    var wasSameKeys = false; //compareSets(_historyCurrentlyPressed, _historyLastPressed);
    _historyCurrentlyPressed.add(keycode); // Register new pressed key
    var isRepeated = false; //compareSets(_historyCurrentlyPressed, _historyLastPressed);

    // Are we adding to previously pressed keys?
    // _repeatCount is used to add a new grouping of keys if the previously pressed
    // ones had been released and pressed more than once, so we don't replace the
    // repeat counter with the new combination. This allows things like double shift
    // then shift+a to be displayed separately
    var isCombination = !wasEmpty && wasSameKeys && !isRepeated && _repeatCount == 1;

    if (isRepeated) {
      ++_repeatCount;
    } else {
      // Store current combination so we can detect future repeated presses
      _historyLastPressed = new Set(_historyCurrentlyPressed);
      _repeatCount = 1; // Reset repetitions counter
    }

    var combinationElement = getKeyCombinationElement();

    // If it's a new group of keys, add as new element
    if (!isCombination && !isRepeated) {
      // Fade out elements that were kept because a key was still pressed
      startRemovingLast();

      if (HISTORY_TOP_ALIGN) {
        _historyDiv.insertBefore(combinationElement, _historyDiv.firstChild);
      } else {
        _historyDiv.appendChild(combinationElement);

        // Scroll down
        scrollTo({
          top: document.body.scrollHeight,
        });
      }

      // Remove oldest element
      if (_historyDiv.children.length > HISTORY_MAX) {
        if (HISTORY_TOP_ALIGN)
          _historyDiv.lastElementChild.remove();
        else
          _historyDiv.firstElementChild.remove();
      }
    }
    // Starting key combination or repeating previous ones: set last item text
    else {
      latestChild.innerHTML = combinationElement.innerHTML;
      cancelRemoveLast(); // Unhide or cancel hiding of last element
    }
  }
  // If releasing a key
  else {
    // Update current keys state
    _historyCurrentlyPressed.delete(keycode);

    var combinationElement = getKeyCombinationElement();

    // If it's a new group of keys, add as new element
    if (!isCombination && !isRepeated) {
      // Fade out elements that were kept because a key was still pressed
      startRemovingLast();

      if (HISTORY_TOP_ALIGN) {
        _historyDiv.insertBefore(combinationElement, _historyDiv.firstChild);
      } else {
        _historyDiv.appendChild(combinationElement);

        // Scroll down
        scrollTo({
          top: document.body.scrollHeight,
        });
      }

      // Remove oldest element
      if (_historyDiv.children.length > HISTORY_MAX) {
        if (HISTORY_TOP_ALIGN)
          _historyDiv.lastElementChild.remove();
        else
          _historyDiv.firstElementChild.remove();
      }
    }
    // Starting key combination or repeating previous ones: set last item text
    else {
      latestChild.innerHTML = combinationElement.innerHTML;
      cancelRemoveLast(); // Unhide or cancel hiding of last element
    }


    // Fade element out if no more held keys left
    if (_historyCurrentlyPressed.size == 0) {
      startRemovingLast();
    }
  }
}

function startRemovingLast() {
  if (HISTORY_TIMEOUT_ACTIVE) {
    // Add removing class of last key combination
    var elementToHide = getLatestChild();
    if (!elementToHide || elementToHide.classList.contains("hidden"))
      return; // History is empty or element is already hidden

    // Store info for if we need to cancel hiding later
    _hideLastTimeoutElement = elementToHide;
    _hideLastTimeoutID = setTimeout(() => {
      elementToHide.classList.add("hidden");
    }, HISTORY_TIMEOUT);
  }
}

function cancelRemoveLast() {
  if (HISTORY_TIMEOUT_ACTIVE) {
    var elementToUnhide = getLatestChild();
    if (!elementToUnhide ||
        _hideLastTimeoutElement != elementToUnhide)
      return; // History is empty or last element is not setup to hide

    // Unhide if already hidden
    elementToUnhide.classList.remove("hidden");
    // Cancel hide timeout
    clearTimeout(_hideLastTimeoutID);
  }
}

function resetRepeatTimeout() {
  if (_repeatTimeoutID !== undefined) {
    clearTimeout(_repeatTimeoutID);
  }
  _repeatTimeoutID = setTimeout(() => {
    _repeatTimeoutID = undefined;
    _historyLastPressed.clear();
  }, REPEAT_TIMEOUT);
}

function compareSets(a, b) { 
  return a.size === b.size &&
  [...a].every((elem) => b.has(elem));
}

function on_data(e) {
  // Since data is in string, parse first
  var data = JSON.parse(e.data);

  // Show for browser source
  onKeyEvent(data);
}

function start_websocket() {
  var ws = new WebSocket("ws://localhost:16899/");

  ws.onmessage = on_data;

  ws.onerror = (e) => {
    console.log("WebSocket error: ");
    console.error(e);
  };

  ws.onclose = () => {
    // connection closed, discard old websocket and create a new one in 2s
    ws = null;
    setTimeout(start_websocket, 2000);
  };
}

start_websocket();
