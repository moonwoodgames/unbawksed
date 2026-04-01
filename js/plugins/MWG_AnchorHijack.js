/*:
 * @target MZ
 * @plugindesc [v1.0] Hijacks standard Picture Origins to allow for "Bottom-Center" anchoring.
 * @author Moonwood Games
 *
 * @help
 * This plugin hijacks the set target origin (top-left or center)
 * and switches it to bottom-center. This is useful for adding idle
 * breathing animations to pictures or for when wanting to make the
 * "feet" of a picture the origin point.
 *
 * @param targetOrigin
 * @text Target Origin to Replace
 * @desc 0 = Top-Left, 1 = Center. The chosen origin will become Bottom-Center.
 * @type select
 * @option Top-Left (0)
 * @value 0
 * @option Center (1)
 * @value 1
 * @default 0
 */

(() => {
    const pluginName = "MWG_AnchorHijack";
    const parameters = PluginManager.parameters(pluginName);
    const targetOrigin = Number(parameters['targetOrigin'] || 0);

    const _Sprite_Picture_updateOrigin = Sprite_Picture.prototype.updateOrigin;
    Sprite_Picture.prototype.updateOrigin = function() {
        // Run the original logic first
        _Sprite_Picture_updateOrigin.call(this);
        
        // If the current picture matches the target origin, override the anchor
        if (this.picture() && this.picture().origin() === targetOrigin) {
            this.anchor.x = 0.5; // Horizontal Center
            this.anchor.y = 1.0; // Vertical Bottom
        }
    };
})();