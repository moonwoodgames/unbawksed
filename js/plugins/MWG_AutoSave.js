/*:
 * @target MZ
 * @author Moonwood Games
 * @plugindesc Auto saves the game periodically. Useful for auto-clicker games.
 * @help Saves the game every X seconds if a specific switch is ON.
 * @param SaveInterval
 * @text Save Interval (Seconds)
 * @type number
 * @default 10
 * @param ControlSwitch
 * @text Activation Switch ID
 * @type switch
 * @default 1
 * @param DateVariable
 * @text Date.now() Variable ID
 * @type variable
 * @default 210
 */

(() => {
    const pluginName = "MWG_AutoSave";
    const parameters = PluginManager.parameters(pluginName);
    const saveInterval = Number(parameters['SaveInterval'] || 10) * 1000;
    const controlSwitch = Number(parameters['ControlSwitch'] || 1);
    const dateVarId = Number(parameters['DateVariable'] || 210);

    let lastSaveTime = Date.now();

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        
        // Only attempt to save if the Switch is ON
        if ($gameSwitches.value(controlSwitch)) {
            const currentTime = Date.now();
            
            // Check if 10 seconds (or SaveInterval) has passed
            if (currentTime - lastSaveTime >= saveInterval) {
                lastSaveTime = currentTime;
                
                // 1. Convert Current Time to SECONDS (10 digits)
                const timestampInSeconds = Math.floor(Date.now() / 1000);
                
                // 2. Push that 10-digit number to Variable 210
                $gameVariables.setValue(dateVarId, timestampInSeconds);
                
                // 3. Trigger the Autosave to Slot 0
                $gameSystem.onBeforeSave();
                DataManager.saveGame(0)
                    .then(() => {
                        console.log("Chicken Empire: Autosave Successful. Timestamp: " + timestampInSeconds);
                    })
                    .catch(() => {
                        console.warn("Chicken Empire: Autosave Failed.");
                    });
            }
        }
    };
})();