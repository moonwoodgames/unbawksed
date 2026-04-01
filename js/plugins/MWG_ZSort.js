/*:
 * @target MZ
 * @plugindesc [MWG_ZSort] Sorts specific picture ranges based on Y-coordinate.
 * @author Moonwood Games
 * @param Min ID
 * @desc The lowest Picture ID to include in the sorting (e.g., 1).
 * @type number
 * @default 1
 * @param Max ID
 * @desc The highest Picture ID to include in the sorting (e.g., 50).
 * @type number
 * @default 50
 *
 * @help 
 * This plugin changes the z-axis of pictures within the specified range based on 
 * their screen Y position. 
 * Pictures outside the specified range will remain in their standard layer order.
 */

(() => {
    const pluginName = "MWG_ZSort";
    const parameters = PluginManager.parameters(pluginName);
    const minID = Number(parameters['Min ID'] || 1);
    const maxID = Number(parameters['Max ID'] || 50);

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.sortUnbawksedPictures();
    };

    Spriteset_Map.prototype.sortUnbawksedPictures = function() {
        if (!this._pictureContainer) return;

        // We sort the children array of the picture container
        this._pictureContainer.children.sort((a, b) => {
            const idA = a._pictureId;
            const idB = b._pictureId;

            // Check if both pictures are within the "Chicken Range"
            const aInRange = (idA >= minID && idA <= maxID);
            const bInRange = (idB >= minID && idB <= maxID);

            // Case 1: Both are chickens - Sort by Y position
            if (aInRange && bInRange) {
                if (a.y !== b.y) {
                    return a.y - b.y;
                }
                return idA - idB; // Secondary sort by ID to prevent flicker
            }

            // Case 2: One is a chicken, one is UI - Keep UI (higher ID) on top
            // This maintains the standard RM layer logic for non-sorted IDs
            return idA - idB;
        });
    };
})();