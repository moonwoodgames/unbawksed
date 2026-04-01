/*:
 * @target MZ
 * @plugindesc Calculates seconds elapsed since the last save for idle games.
 * @author Moonwood Games
 * * @param TimeVariable
 * @text Seconds Variable ID
 * @type variable
 * @default 1
 * @desc The ID of the Variable where the "seconds passed" will be stored.
 *
 * @help 
 * This plugin automatically saves the system time when you save the game.
 * When the game is loaded, it calculates how many seconds have passed.
 * It stores that number in the variable you choose in the parameters.
 */

(() => {
    const pluginName = "MWG_IdleProgress";
    const parameters = PluginManager.parameters(pluginName);
    const timeVarId = Number(parameters['TimeVariable'] || 1);

    // 1. Inject the current timestamp into the save file data
    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        const contents = _DataManager_makeSaveContents.call(this);
        contents.lastSystemTime = Date.now(); 
        return contents;
    };

    // 2. When loading, compare the saved time to the current time
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        
        if (contents.lastSystemTime) {
            const currentTime = Date.now();
            const elapsedMs = currentTime - contents.lastSystemTime;
            const elapsedSeconds = Math.floor(elapsedMs / 1000);

            // Store the difference in your designated RPG Maker Variable
            $gameVariables.setValue(timeVarId, elapsedSeconds);
        } else {
            // If it's a brand new game or no time was saved, set to 0
            $gameVariables.setValue(timeVarId, 0);
        }
    };
})();