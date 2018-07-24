/** 
 * Colour names and code constants 
 *
 * @export
 * @class Colours
 */
export class Colours {

    /**
     * Constant array of colours and codes
     *
     * @static
     * @memberof Colours
     */
    static colours = [
        { name: 'Red', code: 'l-red' },
        { name: 'Orange', code: 'l-orange' },
        { name: 'Yellow', code: 'l-yellow' },
        { name: 'Green', code: 'l-green' },
        { name: 'Blue', code: 'l-blue' },
        { name: 'Purple', code: 'l-purple' }
    ];

    /**
     * Returns the colours as an array
     *
     * @returns
     * @memberof Colours
     */
    public static getColoursAsArray(): Array<Object> {
        return this.colours;
    }

};