// =============================================================================
// ==                             Convert Hex                                 ==
// =============================================================================
/**
 * Converts a color from Hex to RGB.
 *
 * @param {string} hex The hex string representation of the color.
 * @return {[number]} The R, G, B values respectively.
 */
export const convertHexToRGB = (hex) => {
  if (hex[0] !== '#') {
    throw new Error(`Improperly formatted hex-string! String: ${hex}`);
  }
  let r = 0;
  let g = 0;
  let b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);

    // 6 digits
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
};

/**
 * Converts a color from Hex to HSL.
 *
 * @param {string} hex The hex string representation of the color.
 * @return {[number]} The H, S, L values respectively.
 */
export const convertHexToHSL = (hex) => convertRGBToHSL(convertHexToRGB(hex));

/**
 * Converts a color from Hex to HSV/HSB.
 *
 * @param {string} hex The hex string representation of the color.
 * @return {[number]} The H, S, V/B values respectively.
 */
export const convertHexToHSV = (hex) => convertHSLToHSV(convertHexToHSL(hex));

// =============================================================================
// ==                             Convert RGB                                 ==
// =============================================================================

/**
 * Converts a color from RGB to its CSS color function.
 *
 * @param {[number]} rgb The R, G, B values respectively.
 * @return {string} The RGB CSS color function string.
 */
export const convertRGBToCSSString = (rgb) => {
  if (rgb.length !== 3) {
    throw new Error(`Malformed RGB array! Array: ${rgb}`);
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

/**
 * Converts a color from RGB to Hex.
 *
 * @param {[number]} rgb The R, G, B values respectively.
 * @returns {string} The hex string representation of the color.
 */
export const convertRGBToHex = (rgb) => {
  if (rgb.length !== 3) {
    throw new Error(`Malformed RGB array! Array: ${rgb}`);
  }
  let r = rgb[0].toString(16);
  let g = rgb[1].toString(16);
  let b = rgb[2].toString(16);
  r = r.length !== 1 ? r : `0${r[0]}`;
  g = g.length !== 1 ? g : `0${g[0]}`;
  b = b.length !== 1 ? b : `0${b[0]}`;
  return `#${r}${g}${b}`;
};

/**
 * Converts a color from RGB to HSL.
 *
 * @param {[number]} rgb The R, G, B values respectively.
 * @return {[number]} The H, S, L values respectively.
 */
export const convertRGBToHSL = (rgb) => {
  if (rgb.length !== 3) {
    throw new Error(`Malformed RGB array! Array: ${rgb}`);
  }
  // Make r, g, and b fractions of 1
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  // Find greatest and smallest channel values
  const colorMin = Math.min(r, g, b);
  const colorMax = Math.max(r, g, b);
  const delta = colorMax - colorMin;
  let h = 0;

  // Calculate hue
  // No difference
  if (delta === 0) h = 0;
  // Red is max
  else if (colorMax === r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (colorMax === g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h *= 60;

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  let l = (colorMax + colorMin) / 2;

  // Calculate saturation
  let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(3);
  l = +(l * 100).toFixed(3);

  return [Math.round(h), Math.round(s), Math.round(l)];
};

/**
 * Converts a color from RGB to HSV.
 *
 * @param {[number]} rgb The R, G, B values respectively.
 * @return {[number]} The H, S, V/B values respectively.
 */
export const convertRGBToHSV = (rgb) => convertHSLToHSV(convertRGBToHSL(rgb));

// =============================================================================
// ==                             Convert HSL                                 ==
// =============================================================================

/**
 * Converts a color from HSL to its CSS color function.
 *
 * @param {[number]} hsl The H, S, L values respectively.
 * @return {string} The HSL CSS color function string.
 */
export const convertHSLToCSSString = (hsl) => {
  if (hsl.length !== 3) {
    throw new Error(`Malformed HSL array! Array: ${hsl}`);
  }
  return `hsl(${hsl[0]}, ${hsl[1]}, ${hsl[2]})`;
};

/**
 * Converts a color from HSL to Hex.
 *
 * @param {[number]} hsl The H, S, L values respectively.
 * @returns {string} The hex string representation of the color.
 */
export const convertHSLToHex = (hsl) => convertRGBToHex(convertHSLToRGB(hsl));

/**
 * Converts a color from HSL to RGB.
 *
 * @param {[number]} hsl The H, S, L values respectively.
 * @return {[number]} The R, G, B values respectively.
 */
export const convertHSLToRGB = (hsl) => {
  if (hsl.length !== 3) {
    throw new Error(`Malformed HSL array! Array: ${hsl}`);
  }
  // Must be fractions of 1
  const h = hsl[0];
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
};

/**
 * Converts a color from HSL to HSV/HSB.
 *
 * @param {[number]} hsl The H, S, L values respectively.
 * @return {[number]} The H, S, V/B values respectively.
 */
export const convertHSLToHSV = (hsl) => {
  if (hsl.length !== 3) {
    throw new Error(`Malformed HSL array! Array: ${hsl}`);
  }
  const t =
    (hsl[1] / 100) * (hsl[2] / 100 < 0.5 ? hsl[2] / 100 : 1 - hsl[2] / 100);
  const v = hsl[2] / 100 + t;
  const s = hsl[2] / 100 > 0 ? (2 * t) / v : hsl[1] / 100;
  return [hsl[0], Math.round(100 * s), Math.round(100 * v)];
};

// =============================================================================
// ==                             Convert HSV                                 ==
// =============================================================================

/**
 * Converts a color from HSV/HSB to Hex.
 *
 * @param {[number]} hsv The H, S, V/B values respectively.
 * @returns {string} The hex string representation of the color.
 */
export const convertHSVToHex = (hsv) => convertRGBToHex(convertHSVToRGB(hsv));

/**
 * Converts a color from HSV/HSB to RGB.
 *
 * @param {[number]} hsv The H, S, V/B values respectively.
 * @return {[number]} The R, G, B values respectively.
 */
export const convertHSVToRGB = (hsv) => convertHSLToRGB(convertHSVToHSL(hsv));

/**
 * Converts a color from HSV/HSB to HSL.
 *
 * @param {[number]} hsv The H, S, V/B values respectively.
 * @return {[number]} The H, S, L values respectively.
 */
export const convertHSVToHSL = (hsv) => {
  if (hsv.length !== 3) {
    throw new Error(`Malformed HSV array! Array: ${hsv}`);
  }
  const l = ((2 - hsv[1] / 100) * (hsv[2] / 100)) / 2;
  return [
    hsv[0],
    Math.round(
      100 *
        (l && l < 1
          ? ((hsv[1] / 100) * hsv[2]) / 100 / (l < 0.5 ? l * 2 : 2 - l * 2)
          : hsv[1] / 100),
    ),
    Math.round(100 * l),
  ];
};
