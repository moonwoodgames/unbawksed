/*:
 * @target MZ
 * @plugindesc Prevents the game from pausing when the window loses focus.
 * @help This plugin overrides the default blur behavior.
 */

SceneManager.isGameActive = function() {
    return true;
};