import {
  convertHexToHSL,
  convertHexToHSV,
  convertHexToRGB,
  convertHSLToCSSString,
  convertHSLToHex,
  convertHSLToHSV,
  convertHSLToRGB,
  convertHSVToHex,
  convertHSVToHSL,
  convertHSVToRGB,
  convertRGBToCSSString,
  convertRGBToHex,
  convertRGBToHSL,
  convertRGBToHSV,
} from '../ColorHelper';

describe('Color Helper', () => {
  describe('Convert Hex', () => {
    describe('convertHexToRGB', () => {
      test('convert hex to rgb black', () => {
        expect(convertHexToRGB('#000000')).toEqual([0, 0, 0]);
      });
      test('convert hex to rgb white', () => {
        expect(convertHexToRGB('#ffffff')).toEqual([255, 255, 255]);
      });
      test('convert hex to rgb blue', () => {
        expect(convertHexToRGB('#0000ff')).toEqual([0, 0, 255]);
      });
      test('convert hex to rgb complex 1', () => {
        expect(convertHexToRGB('#7dffd5')).toEqual([125, 255, 213]);
      });
      test('convert hex to rgb complex 2', () => {
        expect(convertHexToRGB('#7d3e22')).toEqual([125, 62, 34]);
      });
      test('convert hex to rgb complex 3', () => {
        expect(convertHexToRGB('#004b00')).toEqual([0, 75, 0]);
      });
      test('convert hex to rgb complex capital letters', () => {
        expect(convertHexToRGB('#7DFFD5')).toEqual([125, 255, 213]);
      });
      test('fail improper value', () => {
        expect(() => convertHexToRGB('no')).toThrow('');
      });
    });
    describe('convertHexToHSL', () => {
      test('convert hex to hsl black', () => {
        expect(convertHexToHSL('#000000')).toEqual([0, 0, 0]);
      });
      test('convert hex to hsl white', () => {
        expect(convertHexToHSL('#ffffff')).toEqual([0, 0, 100]);
      });
      test('convert hex to hsl blue', () => {
        expect(convertHexToHSL('#0000ff')).toEqual([240, 100, 50]);
      });
      test('convert hex to hsl complex 1', () => {
        expect(convertHexToHSL('#7dffd5')).toEqual([161, 100, 75]);
      });
      test('convert hex to hsl complex 2', () => {
        expect(convertHexToHSL('#7d3e22')).toEqual([18, 57, 31]);
      });
      test('convert hex to hsl complex 3', () => {
        expect(convertHexToHSL('#004b00')).toEqual([120, 100, 15]);
      });
      test('convert hex to rgb complex capital letters', () => {
        expect(convertHexToHSL('#7DFFD5')).toEqual([161, 100, 75]);
      });
      test('fail improper value', () => {
        expect(() => convertHexToHSL('no')).toThrow(
          'Improperly formatted hex-string! String: no',
        );
      });
    });
    describe('convertHexToHSV', () => {
      test('convert hex to hsv black', () => {
        expect(convertHexToHSV('#000000')).toEqual([0, 0, 0]);
      });
      test('convert hex to hsv white', () => {
        expect(convertHexToHSV('#ffffff')).toEqual([0, 0, 100]);
      });
      test('convert hex to hsv blue', () => {
        expect(convertHexToHSV('#0000ff')).toEqual([240, 100, 100]);
      });
      test('convert hex to hsv complex 1', () => {
        expect(convertHexToHSV('#7dffd5')).toEqual([161, 50, 100]);
      });
      test('convert hex to hsv complex 2', () => {
        expect(convertHexToHSV('#7d3e22')).toEqual([18, 73, 49]);
      });
      test('convert hex to hsv complex 3', () => {
        expect(convertHexToHSV('#004b00')).toEqual([120, 100, 30]);
      });
      test('convert hex to hsv complex capital letters', () => {
        expect(convertHexToHSV('#7DFFD5')).toEqual([161, 50, 100]);
      });
      test('fail improper value', () => {
        expect(() => convertHexToHSV('no')).toThrow(
          'Improperly formatted hex-string! String: no',
        );
      });
    });
  });
  describe('Convert RGB', () => {
    describe('convertRGBToCSSString', () => {
      test('convert rgb to css string', () => {
        expect(convertRGBToCSSString([0, 0, 0])).toEqual('rgb(0, 0, 0)');
      });
      test('fail improper value', () => {
        expect(() => convertRGBToCSSString([])).toThrowError(
          'Malformed RGB array! Array: ',
        );
      });
    });
    describe('convertRGBToHex', () => {
      test('convert rgb to hex black', () => {
        expect(convertRGBToHex([0, 0, 0])).toEqual('#000000');
      });
      test('convert rgb to hex white', () => {
        expect(convertRGBToHex([255, 255, 255])).toEqual('#ffffff');
      });
      test('convert rgb to hex blue', () => {
        expect(convertRGBToHex([0, 0, 255])).toEqual('#0000ff');
      });
      test('convert rgb to hex complex 1', () => {
        expect(convertRGBToHex([125, 255, 213])).toEqual('#7dffd5');
      });
      test('convert rgb to hex complex 2', () => {
        expect(convertRGBToHex([125, 62, 34])).toEqual('#7d3e22');
      });
      test('convert rgb to hex complex 3', () => {
        expect(convertRGBToHex([0, 75, 0])).toEqual('#004b00');
      });
      test('fail improper value', () => {
        expect(() => convertRGBToHex([])).toThrowError(
          'Malformed RGB array! Array: ',
        );
      });
    });
    describe('convertRGBToHSL', () => {
      test('convert rgb to hsl black', () => {
        expect(convertRGBToHSL([0, 0, 0])).toEqual([0, 0, 0]);
      });
      test('convert rgb to hsl white', () => {
        expect(convertRGBToHSL([255, 255, 255])).toEqual([0, 0, 100]);
      });
      test('convert rgb to hsl blue', () => {
        expect(convertRGBToHSL([0, 0, 255])).toEqual([240, 100, 50]);
      });
      test('convert rgb to hsl complex 1', () => {
        expect(convertRGBToHSL([125, 255, 213])).toEqual([161, 100, 75]);
      });
      test('convert rgb to hsl complex 2', () => {
        expect(convertRGBToHSL([125, 62, 34])).toEqual([18, 57, 31]);
      });
      test('convert rgb to hsl complex 3', () => {
        expect(convertRGBToHSL([0, 75, 0])).toEqual([120, 100, 15]);
      });
      test('fail improper value', () => {
        expect(() => convertRGBToHSL([])).toThrow('');
      });
    });
    describe('convertRGBToHSV', () => {
      test('convert rgb to hsv black', () => {
        expect(convertRGBToHSV([0, 0, 0])).toEqual([0, 0, 0]);
      });
      test('convert rgb to hsv white', () => {
        expect(convertRGBToHSV([255, 255, 255])).toEqual([0, 0, 100]);
      });
      test('convert rgb to hsv blue', () => {
        expect(convertRGBToHSV([0, 0, 255])).toEqual([240, 100, 100]);
      });
      test('convert rgb to hsv complex 1', () => {
        expect(convertRGBToHSV([125, 255, 213])).toEqual([161, 50, 100]);
      });
      test('convert rgb to hsv complex 2', () => {
        expect(convertRGBToHSV([125, 62, 34])).toEqual([18, 73, 49]);
      });
      test('convert rgb to hsv complex 3', () => {
        expect(convertRGBToHSV([0, 75, 0])).toEqual([120, 100, 30]);
      });
      test('fail improper value', () => {
        expect(() => convertRGBToHSV([])).toThrow('');
      });
    });
  });
  describe('Convert HSL', () => {
    describe('convertHSLToCSSString', () => {
      test('convert hsl to css string', () => {
        expect(convertHSLToCSSString([0, 0, 0])).toEqual('hsl(0, 0, 0)');
      });
      test('fail improper value', () => {
        expect(() => convertHSLToCSSString([])).toThrowError(
          'Malformed HSL array! Array: ',
        );
      });
    });
    describe('convertHSLToHex', () => {
      test('convert hsl to hex black', () => {
        expect(convertHSLToHex([0, 0, 0])).toEqual('#000000');
      });
      test('convert hsl to hex white', () => {
        expect(convertHSLToHex([0, 0, 100])).toEqual('#ffffff');
      });
      test('convert hsl to hex blue', () => {
        expect(convertHSLToHex([240, 100, 50])).toEqual('#0000ff');
      });
      test('convert hsl to hex complex 1', () => {
        expect(convertHSLToHex([160, 100, 75])).toEqual('#80ffd4');
      });
      test('convert hsl to hex complex 2', () => {
        expect(convertHSLToHex([18, 56, 31])).toEqual('#7b3d23');
      });
      test('convert hsl to hex complex 3', () => {
        expect(convertHSLToHex([120, 100, 14])).toEqual('#004700');
      });
      test('fail improper value', () => {
        expect(() => convertHSLToHex([])).toThrow(
          'Malformed HSL array! Array: ',
        );
      });
    });
    describe('convertHSLToRGB', () => {
      test('convert hsl to rgb black', () => {
        expect(convertHSLToRGB([0, 0, 0])).toEqual([0, 0, 0]);
      });
      test('convert hsl to rgb white', () => {
        expect(convertHSLToRGB([0, 0, 100])).toEqual([255, 255, 255]);
      });
      test('convert hsl to rgb blue', () => {
        expect(convertHSLToRGB([240, 100, 50])).toEqual([0, 0, 255]);
      });
      test('convert hsl to rgb complex 1', () => {
        expect(convertHSLToRGB([160, 100, 75])).toEqual([128, 255, 212]);
      });
      test('convert hsl to rgb complex 2', () => {
        expect(convertHSLToRGB([18, 56, 31])).toEqual([123, 61, 35]);
      });
      test('convert hsl to rgb complex 3', () => {
        expect(convertHSLToRGB([120, 100, 14])).toEqual([0, 71, 0]);
      });
      test('fail improper value', () => {
        expect(() => convertHSLToRGB([])).toThrow(
          'Malformed HSL array! Array: ',
        );
      });
    });
    describe('convertHSLToHSV', () => {
      test('convert hsl to hsv black', () => {
        expect(convertHSLToHSV([0, 0, 0])).toEqual([0, 0, 0]);
      });
      test('convert hsl to hsv white', () => {
        expect(convertHSLToHSV([0, 0, 100])).toEqual([0, 0, 100]);
      });
      test('convert hsl to hsv blue', () => {
        expect(convertHSLToHSV([240, 100, 50])).toEqual([240, 100, 100]);
      });
      test('convert hsl to hsv complex 1', () => {
        expect(convertHSLToHSV([160, 100, 75])).toEqual([160, 50, 100]);
      });
      test('convert hsl to hsv complex 2', () => {
        expect(convertHSLToHSV([18, 56, 31])).toEqual([18, 72, 48]);
      });
      test('convert hsl to hsv complex 3', () => {
        expect(convertHSLToHSV([120, 100, 14])).toEqual([120, 100, 28]);
      });
      test('fail improper value', () => {
        expect(() => convertHSLToHSV([])).toThrow(
          'Malformed HSL array! Array: ',
        );
      });
    });
  });
  describe('Convert HSV', () => {
    describe('convertHSVToHex', () => {
      test('convert hsv to hex black', () => {
        expect(convertHSVToHex([0, 0, 0])).toEqual('#000000');
      });
      test('convert hsv to hex white', () => {
        expect(convertHSVToHex([0, 0, 100])).toEqual('#ffffff');
      });
      test('convert hsv to hex blue', () => {
        expect(convertHSVToHex([240, 100, 100])).toEqual('#0000ff');
      });
      test('convert hsv to hex complex 1', () => {
        expect(convertHSVToHex([160, 50, 100])).toEqual('#80ffd4');
      });
      test('convert hsv to hex complex 2', () => {
        expect(convertHSVToHex([18, 72, 49])).toEqual('#7b3d23');
      });
      test('convert hsv to hex complex 3', () => {
        expect(convertHSVToHex([120, 100, 27])).toEqual('#004700');
      });
      test('fail improper value', () => {
        expect(() => convertHSVToHex([])).toThrow(
          'Malformed HSV array! Array: ',
        );
      });
    });
    describe('convertHSVToRGB', () => {
      test('convert hsv to rgb black', () => {
        expect(convertHSVToRGB([0, 0, 0])).toEqual([0, 0, 0]);
      });
      test('convert hsv to rgb white', () => {
        expect(convertHSVToRGB([0, 0, 100])).toEqual([255, 255, 255]);
      });
      test('convert hsv to rgb blue', () => {
        expect(convertHSVToRGB([240, 100, 100])).toEqual([0, 0, 255]);
      });
      test('convert hsv to rgb complex 1', () => {
        expect(convertHSVToRGB([160, 50, 100])).toEqual([128, 255, 212]);
      });
      test('convert hsv to rgb complex 2', () => {
        expect(convertHSVToRGB([18, 72, 49])).toEqual([123, 61, 35]);
      });
      test('convert hsv to rgb complex 3', () => {
        expect(convertHSVToRGB([120, 100, 27])).toEqual([0, 71, 0]);
      });
      test('fail improper value', () => {
        expect(() => convertHSVToRGB([])).toThrow(
          'Malformed HSV array! Array: ',
        );
      });
    });
    describe('convertHSVToHSL', () => {
      test('convert hsv to hsl black', () => {
        expect(convertHSVToHSL([0, 0, 0])).toEqual([0, 0, 0]);
      });
      test('convert hsv to hsl white', () => {
        expect(convertHSVToHSL([0, 0, 100])).toEqual([0, 0, 100]);
      });
      test('convert hsv to hsl blue', () => {
        expect(convertHSVToHSL([240, 100, 100])).toEqual([240, 100, 50]);
      });
      test('convert hsv to hsl complex 1', () => {
        expect(convertHSVToHSL([160, 50, 100])).toEqual([160, 100, 75]);
      });
      test('convert hsv to hsl complex 2', () => {
        expect(convertHSVToHSL([18, 72, 49])).toEqual([18, 56, 31]);
      });
      test('convert hsv to hsl complex 3', () => {
        expect(convertHSVToHSL([120, 100, 27])).toEqual([120, 100, 14]);
      });
      test('fail improper value', () => {
        expect(() => convertHSVToHSL([])).toThrow('');
      });
    });
  });
});
